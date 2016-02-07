
import Worker from 'worker!./Worker'

const raf = window.requestAnimationFrame
const worker = new Worker()

export const decode = (data) => new Promise((resolve, reject) => {
  raf(() => worker.postMessage(data))
  worker.onmessage = ({data}) => {
    return /error/.test(data) ? reject(data) : resolve(data)
  }
})
