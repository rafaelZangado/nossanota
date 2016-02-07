const initialState = {
  loading: false
}

export default function ui (state = initialState, action) {
  switch (action.type) {
    case 'INSERIR_NOTA_FISCAL_PENDENTE': {
      return { ...state, loading: true }
    }
    case 'INSERIR_NOTA_FISCAL_SUCESSO': {
      return { ...state, loading: false }
    }
    default: {
      return state
    }
  }
}
