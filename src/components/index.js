import React, { PropTypes } from 'react'
export HomeView from './HomeView'
export ScannerView from './ScannerView'
export DevTools from './DevTools'
export NFECamera from './NFECamera'
export NotaView from './NotaView'

export var Button = ({label, icon, onClick, className}) => (
  <a onClick={onClick} className={`btn py1 px2 m0 ${className}`}>
    {label && <span className='mr1'>{label}</span> }
    {icon && <i className={`fa fa-${icon}`}/> }
  </a>
)

export var Card = ({children, header, margin = true}) => (
  <article className={`p1 navy bg-white clearfix ${margin ? 'mb1' : ''}`}>
    <h2 className='m1'>{header}</h2>
    {children}
  </article>
)

export var Block = ({title, value = '', truncate = true, className = ''}) => {
  const classNameText = truncate ? 'truncate' : ''
  value = value.length > 0 ? value : 'N/A'

  return (
    <div className={`p1 navy bg-white inline-block ${className}`}>
      <small className={`block ${classNameText}`}>{title}</small>
      <span className={`block ${classNameText}`}>{value}</span>
    </div>
  )
}

export var ColumnBlock = ({column, className = '', ...props}) => (
  <Block className={`${className} col col-${column}`} {...props} />
)

let NavItems = ({children, side}) => (
  <div className={`flex flex-wrap items-center justify-${side}`} style={{width: '50%'}}>
    {children}
  </div>
)

export var View = ({title, children, leftItems, rightItems}) => (
  <section className='flex flex-column max-width-3 mx-auto' style={{height: '100%'}}>
    <header className='p1 flex items-center justify-between bg-white md-mt2' style={{flexShrink: 0}}>
      <NavItems side='start' children={leftItems}/>
      <h1 className='m0 navy regular center truncate' style={{width: '100%'}}>{title}</h1>
      <NavItems side='end' children={rightItems}/>
    </header>
    <article className='flex-auto overflow-auto bg-white'>
      {children}
    </article>
  </section>
)

export class ChaveAcessoInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    onScanRequest: PropTypes.func,
    defaultValue: PropTypes.string
  };

  constructor () {
    super()
    this.state = {}
  }

  componentWillMount () {
    this.setState({value: this.props.defaultValue})
  }

  componentWillReceiveProps ({defaultValue}) {
    this.setState({value: defaultValue})
  }

  changeHandler = (event) => {
    event.preventDefault()
    this.setState({value: event.target.value})
  };

  submitHandler = (event) => {
    let value = this.refs.input.value
    event.preventDefault()
    if (value) {
      this.props.onSubmit(this.refs.input.value)
      this.setState({value: ''})
    } else {
      this.props.onScanRequest()
    }
  };

  render () {
    const value = this.state.value
    const defaultValue = this.props.defaultValue
    const iconName = value ? 'send' : 'camera-retro'

    return (
      <form
        className={`flex items-center bg-white ${this.props.className}`}
        onSubmit={this.submitHandler}>

        <input
          ref='input'
          type='tel'
          maxLength={44}
          className='input m0 p2 rounded'
          placeholder='Digite a chave de acesso'
          defaultValue={defaultValue}
          value={value}
          onChange={this.changeHandler}
          style={{height: 'auto'}}/>

        <button
          onClick={this.submitHandler}
          className={`fa fa-${iconName} border-none fa-lg ml2 p2 white bg-navy line-height-1 circle`}/>

      </form>
    )
  }
}
