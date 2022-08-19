import { ref } from 'vue'
import axios from 'axios'
import customProtocolCheck from 'custom-protocol-check'

export function useOpenWorld (store) {
  const currentCount = ref(0)
  const openWorldType = ref('')
  const isWorldLoadingModal = ref(false)
  const os = navigator.userAgent

  let openWorldUrl = ref(null)

  const getSessionApiCall = (id) => {
    currentCount.value += 1

    const config = {
      method: 'get',
      url: `${store.state.apiEndpoint}/getsessionstarted?session=${id}`,
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    }
    axios(config)
      .then((res) => {
        if (res.data === 'WAITING') {
          if (currentCount.value === 7) {
            isWorldLoadingModal.value = false
          }
          setTimeout(() => {
            getSessionApiCall(id)
          }, 1000)
        } else if (res.data === 'STARTED') {
          isWorldLoadingModal.value = false
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const startNewSessionApiCall = () => {
    const body = {}
    const config = {
      method: 'post',
      url: `${store.state.apiEndpoint}/startnewsession`,
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      },
      data: body
    }
    axios(config)
      .then((res) => {
        openWorldUrl.value += `+session-id:${res.data.response}`
        openWorldUrl.value += `+mode:${openWorldType.value}`
        if (os.includes('Mac')) {
          customProtocolCheck(
            openWorldUrl.value,
            () => {
              console.log('Custom protocol not found.', `${openWorldUrl.value}`)
            },
            () => {
              console.log('Custom protocol found and opened the file successfully.')
            }, 5000
          )
        } else {
          window.open(openWorldUrl.value, '_self')
        }
        getSessionApiCall(res.data.response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const openWorld = (type, world) => {
    isWorldLoadingModal.value = true
    openWorldType.value = type
    if (world.template_name === 'Camelot') {
      openWorldUrl = ref('sequincamelot://')
    } else {
      openWorldUrl = ref(`sequinworld://+world-id:${world.public_id}+auth:${store.state.accessToken}`)
    }
    startNewSessionApiCall()
  }

  return {
    isWorldLoadingModal,
    openWorld
  }
}
