import React, { PropTypes } from 'react'

import { connect } from 'react-redux'
import { selecionarNota } from '../actions'
import { Link, IndexLink } from 'react-router'
import { View, Card, Block, ColumnBlock } from '../components'

const query = ({entities}, {params}) => {
  return {
    nota: entities.notas[params.numero]
  }
}

const BackButton = <IndexLink className='fa fa-chevron-left p1 text-decoration-none' to='/' />

export class NotaView extends React.Component {
  static propTypes = {
    nota: PropTypes.object,
    selecionarNota: PropTypes.func
  };

  render () {
    const nota = this.props.nota
    const emitente = Object.assign(nota.emitente, {
      endereco: `${nota.emitente.rua}, ${nota.emitente.bairro}, ${nota.emitente.cidade.split('-').pop().trim()} - ${nota.emitente.estado}`
    })

    return (
      <View title={`Nota: ${nota.cabecalho.numero}`} leftItems={BackButton}>
        <Card>
          <Block title='Modelo' value={nota.cabecalho.modelo}/>
          <Block title='Série' value={nota.cabecalho.serie}/>
          <Block title='Numero' value={nota.cabecalho.numero} />
          <Block title='Data' value={nota.cabecalho.dataEmissao.substring(0, 10)}/>
          <Block title='Total' value={nota.total} className='right bold' />
        </Card>

        <Card header={emitente.nome || emitente.razaoSocial}>
          <ColumnBlock title='Razão Social' value={emitente.razaoSocial} truncate={false} column={6}/>
          <ColumnBlock title='Cnpj' value={emitente.cnpj} column={3}/>
          <ColumnBlock title='Telefone' value={emitente.telefone} column={3}/>
          <ColumnBlock title='Endereço' value={emitente.endereco} truncate={false} column={9}/>
          <ColumnBlock title='Cep' value={emitente.cep} column={3}/>
        </Card>

        <Card header='Produtos'>
          {nota.produtos.map((p, i) => (
            <Link key={i} className='flex items-center text-decoration-none navy'
                  to={`${p.ncm}`}>
              <ColumnBlock title='Descrição' value={p.descricao} truncate={false} column={9}/>
              <ColumnBlock title='Quantidade' value={`${p.quantidade} (${p.unidade})`} column={2}/>
              <ColumnBlock title='Preço' value={p.preco} column={2}/>
              <aside>
                <i className='fa fa-chevron-right p1'></i>
              </aside>
            </Link>
          ))}
        </Card>
      </View>
    )
  }
}

export default connect(query, { selecionarNota })(NotaView)
