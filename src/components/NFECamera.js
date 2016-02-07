import React, { PropTypes, Component } from 'react'
import Camera from './Camera'
import CameraTarget from './CameraTarget'
import { decode } from '../qrcode'

export default class NFECamera extends Component {
  static defaultProps = {
    height: '100%',
    width: '100%',
    target: '60%'
  };

  static propTypes = {
    target: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.boolean]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onScan: PropTypes.func,
    onCancel: PropTypes.func,
    onFail: PropTypes.func
  };

  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    const isVideo = (s) => /video(input)?$/.test(s.kind)
    const isFacingBack = (s) => !/back/.test(s.label)

    navigator.mediaDevices.enumerateDevices()
      .then(sources => sources.filter(isVideo))
      .then(cameras => cameras.sort(isFacingBack))
      .then(([facingBackCamera, ...cameras]) => this.setState({
        videoSource: facingBackCamera.deviceId
      }))
  }

  startScanning () {
    const {target, camera} = this.refs
    const isValidCode = (code) => /\d{44}/.test(code)

    if (camera) {
      decode(camera.getScreenshot(target.area()))
        .then(code => (
          isValidCode(code)
            ? Promise.resolve(code)
            : Promise.reject('QRCode Inválido')
        ))
        .then(this.props.onScan)
        .catch(this.props.onFail)
        .catch(e => console.log(e))
        .then(this.startScanning.bind(this))
    }
  }

  render () {
    const {width, height} = this.props
    return (
      <div className='bg-black relative flex flex-column justify-center'
           style={{width, height}}>

        <Camera
          ref='camera'
          width={this.props.width}
          height={this.props.height}
          videoSource={this.state.videoSource}
          onUserMedia={this.startScanning.bind(this)}/>

        { this.props.target &&
          <CameraTarget ref='target' size={this.props.target}/>
        }
        <i onClick={this.props.onCancel}
           className='fa fa-times fa-2x absolute p2 line-height-1 top-0 right-0 white'
           style={{textShadow: '0 1px 1px rgba(0, 0, 0, 0.3)'}}/>

        </div>
    )
  }
}
