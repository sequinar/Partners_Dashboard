import { ref } from 'vue'
import axios from 'axios'
import customProtocolCheck from './customProtocolCheck'

export function useOpenWorld (store) {
  const currentCount = ref(0)
  const openWorldType = ref('')
  const isWorldLoadingModal = ref(false)

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
  const startNewSessionApiCall = (world) => {
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
        if (world.template_name === 'Camelot') {
          isWorldLoadingModal.value = true
          customProtocolCheck(
            `sequincamelot://?world-id:${world.public_id}?auth:${store.state.accessToken}?session-id:${res.data.response}?mode:${openWorldType.value}`,
            () => {
              console.log('Custom protocol not found.')
            },
            () => {
              console.log('Custom protocol found and opened the file successfully.')
            }, 5000
          )
        } else {
          customProtocolCheck(
            `sequin://?world-id:${world.public_id}?auth:${store.state.accessToken}?session-id:${res.data.response}?mode:${openWorldType.value}`,
            () => {
              console.log('Custom protocol not found.')
            },
            () => {
              console.log('Custom protocol found and opened the file successfully.')
            }, 5000
          )
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
    startNewSessionApiCall(world)
  }

  return {
    isWorldLoadingModal,
    openWorld
  }
}
