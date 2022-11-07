export default function useUtils () {
  const getTimeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)

    let interval = seconds / 31536000

    if (interval > 1) {
      return Math.floor(interval) + ' years'
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + ' months'
    }
    interval = seconds / 86400
    if (interval === 1) {
      return Math.floor(interval) + ' day'
    }
    if (interval > 1) {
      return Math.floor(interval) + ' days'
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + 'h'
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' min'
    }
    return Math.floor(seconds) + ' seconds'
  }

  const file2Buffer = (file) => {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader()
      const readFile = function (event) {
        const buffer = reader.result
        resolve(buffer)
      }

      reader.addEventListener('load', readFile)
      reader.readAsArrayBuffer(file)
    })
  }

  return {
    getTimeSince,
    file2Buffer
  }
}
