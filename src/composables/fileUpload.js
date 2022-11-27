import { ref, computed } from 'vue'
import axios from '@/axios/index'

export function useFileUpload (store) {
  const MULTIPART_CHUNK_SIZE = 52428800 // 50Mb
  const promises = ref([])
  const etags = ref([])
  const uploadUrls = ref({})
  const chunks = ref([])
  const progress = ref(0)
  const chunksLength = computed(() => chunks.value?.length)
  const file = computed(() => store.state.worlds.file)
  const uploadId = computed(() => uploadUrls.value?.uploadid)
  const progressDivision = computed(() => chunksLength.value ? Math.round(100 / chunksLength.value) : 0)

  const createChunks = () => {
    let startPointer = 0
    const endPointer = file.value.size
    while (startPointer < endPointer) {
      const newStartPointer = startPointer + MULTIPART_CHUNK_SIZE
      chunks.value.push(file.value.raw.slice(startPointer, newStartPointer, file.value.type))
      startPointer = newStartPointer
    }
  }

  const getUploadUrl = async () => {
    uploadUrls.value = await store.dispatch('worlds/getUploadUrl', {
      file: {
        fileName: file.value.name,
        partsRequested: chunksLength.value,
        multiPart: true
      }
    })
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
          headers: { 'Content-Type': file.value.type }
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

  const uploadFile = async () => {
    createChunks()
    await getUploadUrl()
    await uploadChanks()
    await store.dispatch('worlds/completeMultipartUpload', {
      fileName: file.value.name, etags: etags.value, uploadID: uploadId.value
    })
  }

  return {
    uploadFile, progress
  }
}
