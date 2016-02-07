import React, { PropTypes, Component } from 'react'

export default class CodeScanner extends Component {
  static defaultProps = {
    size: '50%'
  };

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  constructor () {
    super()
    this.state = {}
  }

  area () {
    const target = this.refs.target
    return {
      x: target.offsetLeft,
      y: target.offsetTop,
      width: target.offsetWidth,
      height: target.offsetHeight
    }
  }

  render () {
    return (
      <div
        ref='target'
        style={{
          position: 'absolute',
          paddingBottom: this.props.size,
          width: this.props.size,
          height: '0',
          border: '1px solid red',
          margin: 'auto',
          left: '0', right: '0', top: '0', bottom: '0'
        }}>
      </div>
    )
  }
}
