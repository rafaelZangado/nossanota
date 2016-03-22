/*global fetch*/

import 'isomorphic-fetch'

const url = (link) => (
  `https://54.233.138.100/nfe/${link}`
)

export function consultarNotaFiscal (link) {
  return fetch(url(link))
    .then(res => res.json())
    .then(nota => (
      nota.total
        ? Promise.resolve(nota)
        : Promise.reject('Nota Fiscal Inválida')
    ))
}
