import React, { Component, PropTypes } from 'react'

export default class MediaSelector extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['audio', 'video']),
    onChange: PropTypes.func
  };

  constructor () {
    super()
    this.state = {
      selectedSource: 'Select',
      sources: []
    }
  }

  componentDidMount () {
    this.setup()
  }

  setup () {
    const type = this.props.type
    const regex = new RegExp(`${type}(input)?$`)

    navigator.mediaDevices.enumerateDevices()
      .then(sources => sources.filter(s => regex.test(s.kind)))
      .then(sources => this.setState({sources}))
  }

  handleChange (e) {
    if (!Object.is(e.target.value, 'Select')) {
      this.props.onChange(e.target.value)
      this.setState({selectedSource: e.target.value})
    }
  }

  render () {
    return (
      <div style={{display: 'inline-block', margin: '5px 10px'}}>

        {(() => {
          switch (this.props.type) {
            case 'video': return 'Video Selector'
            case 'audio': return 'Audio Selector'
          }
        })()}

        { this.props.type &&
          <select style={{display: 'block', width: '100%'}} value={this.state.selectedSource} onChange={this.handleChange.bind(this)}>
           <option>Select</option>
            {this.state.sources.map(s => (
              <option key={`${s.id || s.deviceId}-${s.label}`} value={s.id || s.deviceId}>{s.label || 'Generic'}</option>
            ))}
          </select>
        }
      </div>
    )
  }
}
