/*global localStorage*/

const initialState = {
  notas: JSON.parse(localStorage.getItem('notas') || '{}')
}

export default function entities (state = initialState, action) {
  switch (action.type) {
    case 'CONSULTAR_LINK_NOTA_SUCESSO': {
      let nota = action.payload
      let notas = {
        ...state.notas,
        [nota.cabecalho.numero]: nota
      }

      localStorage.setItem('notas', JSON.stringify(notas))
      return {notas}
    }
    default: return state
  }
}
