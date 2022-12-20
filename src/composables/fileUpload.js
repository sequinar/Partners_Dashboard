import { ref, computed } from 'vue'
import axios from '@/axios/index'

export function useFileUpload () {
  let worldId = null
  let worldFile = null
  const MULTIPART_CHUNK_SIZE = 52428800 // 50Mb
  const promises = ref([])
  const etags = ref([])
  const uploadUrls = ref({})
  const chunks = ref([])
  const progress = ref(0)
  const chunksLength = computed(() => chunks.value?.length)
  const uploadId = computed(() => uploadUrls.value?.uploadid)
  const progressDivision = computed(() => chunksLength.value ? (Math.round(100 / chunksLength.value)) / 2 : 0)

  const createChunks = () => {
    let startPointer = 0
    const endPointer = worldFile.size
    while (startPointer < endPointer) {
      const newStartPointer = startPointer + MULTIPART_CHUNK_SIZE
      chunks.value.push(worldFile.slice(startPointer, newStartPointer, worldFile.type))
      startPointer = newStartPointer
    }
  }

  const getUploadUrl = async () => {
    const response = await axios.post(`world/${worldId}/getprojectuploadurl`, {
      file: {
        fileName: worldFile.name,
        partsRequested: chunksLength.value,
        multiPart: true
      }
    })
    uploadUrls.value = response.data.data
  }

  const uploadChanks = async () => {
    const axiosInstance = axios.create()
    delete axiosInstance.defaults.headers.common.Authorization
    uploadUrls.value.urls.forEach((item, index) => {
      const promise = new Promise((resolve, reject) => {
        axiosInstance({
          method: 'put',
          url: item.url,
          data: chunks.value[index],
          headers: { 'Content-Type': worldFile.type }
        }).then((result) => {
          etags.value[item.PartNumber - 1] = {
            PartNumber: item.PartNumber,
            ETag: JSON.parse(result.headers.etag)
          }
          progress.value += progressDivision.value
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
      promises.value.push(promise)
    })
    await Promise.all(promises.value)
  }

  const completeMultipartUpload = async () => {
    const response = await axios.post(`world/${worldId}/completemultipartupload`, {
      fileName: worldFile.name, etags: etags.value, uploadID: uploadId.value
    })
    return response.data.data
  }

  const uploadFile = async (id, file) => {
    worldId = id
    worldFile = file
    etags.value = []
    chunks.value = []
    createChunks()
    await getUploadUrl()
    await uploadChanks()
    return await completeMultipartUpload()
  }

  return {
    uploadFile, progress
  }
}
