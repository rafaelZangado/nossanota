import React, { PropTypes } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators as bind } from 'redux'
import { goBack, consultarLinkNota } from '../actions'
import { NFECamera } from '../components'

const actions = dispatch => bind({
  onCancel: goBack,
  onScan: link => consultarLinkNota(`//crossorigin.me/${link}`)
}, dispatch)

export class ScannerView extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onFail: PropTypes.func,
    onScan: PropTypes.func
  };

  render () {
    return (
      <NFECamera {...this.props}/>
    )
  }
}

export default connect(undefined, actions)(ScannerView)
