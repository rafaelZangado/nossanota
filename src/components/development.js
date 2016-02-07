import React from 'react'
import { bindActionCreators as bind } from 'redux'
import { Button } from '../components'
import { connect } from 'react-redux'
import * as all from '../actions'

const actions = dispatch => bind(all, dispatch)

export var SimularScan = connect(undefined, actions)(props => {
  return (
    <Button label='Simular Scanner'
            onClick={_ => props.consultarLinkNota('/nf.html')}
            className={props.className}/>
  )
})

export var DevContainer = ({children}) => {
  return /development/.test(process.env.NODE_ENV)
    ? <div>{children}</div>
    : null
}
