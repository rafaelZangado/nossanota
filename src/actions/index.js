import { consultarNotaFiscal } from '../sefaz'
export { goBack, push } from 'react-router-redux'
import { push } from 'react-router-redux'

export var selecionarNota = numero => ({
  type: 'SELECIONAR_NOTA',
  payload: numero
})

export var consultarLinkNota = link => ({
  type: 'CONSULTAR_LINK_NOTA',
  payload: {
    link: link,
    promise: consultarNotaFiscal(link).then(nota => (action, dispatch, getState) => {
      dispatch({...action, payload: nota})
      dispatch(push(`/nota/${nota.cabecalho.numero}`))
    })
  }
})
