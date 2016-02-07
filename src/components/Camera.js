import React, { Component, PropTypes } from 'react'
import { getUserMedia } from 'webrtc-adapter-test'

const captureUserMedia = (constraints) => new Promise((resolve, reject) => getUserMedia(constraints, resolve, reject))
const createObjectURL = window.URL.createObjectURL.bind(window.URL)
const is = Object.is.bind(Object)

export default class Camera extends Component {
  static defaultProps = {
    audio: false,
    height: 480,
    width: 640,
    screenshotFormat: 'image/jpeg',
    onUserMedia: () => {}
  };

  static propTypes = {
    audio: PropTypes.bool,
    videoSource: PropTypes.string,
    onUserMedia: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    screenshotFormat: PropTypes.oneOf(['image/webp', 'image/png', 'image/jpeg']),
    className: PropTypes.string
  };

  static userMediaRequested = false;

  constructor () {
    super()
    this.state = {}
  }

  componentWillReceiveProps ({videoSource, audioSource}) {
    if (!is(videoSource, this.props.videoSource) && getUserMedia) {
      let constraints = {
        audio: audioSource ? {deviceId: {exact: audioSource}} : false,
        video: videoSource ? {deviceId: {exact: videoSource}} : false
      }

      captureUserMedia(constraints)
        .catch(err => this.setState({ err }))
        .then(stream => {
          this.setState({
            stream,
            src: createObjectURL(stream)
          })
          this.props.onUserMedia(stream)
        })
    }
  }

  componentWillUpdate (nextProps, {src, stream}) {
    if (!is(this.state.src, src) && this.state.stream) {
      this.state.stream.getTracks().forEach(t => t.stop())
    }
  }

  componentWillUnmount () {
    if (this.state.stream) {
      this.state.stream.getTracks().forEach(t => t.stop())
    }
  }

  getScreenshot ({x, y, width, height}) {
    const {canvas, video} = this.refs
    const dx = video.videoWidth / video.clientWidth
    const dy = video.videoHeight / video.clientHeight

    if (canvas) {
      this.ctx = this.ctx || canvas.getContext('2d')
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = width
      canvas.height = height
      this.ctx.drawImage(video, x * dx, y * dy, width * dx, height * dy, 0, 0, width, height)
      return this.ctx.getImageData(0, 0, width, height)
    }
  }

  render () {
    return (
      <div>
        <video
          ref='video'
          autoPlay
          width={this.props.width}
          height={this.props.height}
          src={this.state.src}
          className={this.props.className}/>
        <canvas ref='canvas' style={{display: 'none'}}/>
      </div>
    )
  }
}
