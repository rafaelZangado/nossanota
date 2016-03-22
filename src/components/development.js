import React from 'react'
import { bindActionCreators as bind } from 'redux'
import { Button } from '../components'
import { connect } from 'react-redux'
import * as all from '../actions'

const NF = 'http://www.dfeportal.fazenda.pr.gov.br/dfe-portal/rest/servico/consultaNFCe?chNFe=41160214953750000192650020000777871331742869&nVersao=100&tpAmb=1&dhEmi=323031362d30322d32315430373a33383a35302d30333a3030&vNF=135.72&vICMS=0.00&digVal=36397577774536594c6c5233547a774a4c7431764273496634636b3d&cIdToken=000001&cHashQRCode=940323cec1085f246de3f87b7b069556cd58aae7'
const actions = dispatch => bind(all, dispatch)

export var SimularScan = connect(undefined, actions)(props => {
  return (
    <Button label='Simular Scanner'
            onClick={_ => props.consultarLinkNota(NF)}
            className={props.className}/>
  )
})

export var DevContainer = ({children}) => {
  return /development/.test(process.env.NODE_ENV)
    ? <div>{children}</div>
    : <div/>
}
