import React, { PropTypes } from 'react'

import { Link } from 'react-router'
import { connect } from 'react-redux'
import { push } from '../actions'
import { View, Button } from '../components'
import { SimularScan, DevContainer } from '../components/development'

const query = state => ({
  notas: Object.values(state.entities.notas),
  loading: state.ui.loading
})

const actions = {
  onScanClick: _ => push('camera')
}

export class HomeView extends React.Component {
  static propTypes = {
    notas: PropTypes.array,
    loading: PropTypes.bool,
    onScanClick: PropTypes.func
  };

  render () {
    const {notas, loading, onScanClick} = this.props

    return (
      <View title='Nossa Nota'
            rightItems={
              <Button onClick={onScanClick}
                      tooltip='Escanear Recibo'
                      icon='camera'
                      className='bg-blue white'/>
            }>

        <span className={`gray p1 center ${!loading && 'hide'}`}>
          Carregando Nota...
        </span>

        {notas.map((n, i) => (
          <Link key={i}
                className='p2 border-bottom border--silver flex items-center text-decoration-none navy'
                to={`nota/${n.cabecalho.numero}`}>
            <header className='flex-auto'>
              <h2 className='h3 regular m0'>{n.emitente.nome || n.emitente.razaoSocial}</h2>
              <span>{n.dataCriacao.substring(0, 10)}</span>
            </header>
            <aside>
              <span className='h2'>{n.total}</span>
              <i className='fa fa-chevron-right p1'></i>
            </aside>
          </Link>

        ))}

        <DevContainer>
          <SimularScan />
        </DevContainer>
      </View>
    )
  }
}

export default connect(query, actions)(HomeView)
