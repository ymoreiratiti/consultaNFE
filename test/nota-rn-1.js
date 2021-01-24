const consultaNFE = require('../dist/index')
const QRCodeURL = 'http://nfce.set.rn.gov.br/consultarNFCe.aspx?p=24200645543915006899650390000259671033517796%7C2%7C1%7C1%7C7652F52598121E23FBEA7179910B497947CC4D0B'
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require('chai')

//  Resultado Esperado
const result = {
  cabecalho: {
    dataEmissao: new Date('2020-06-08T23:39:27.000Z'),
    dataEntradaSaida: null,
    modelo: '',
    numero: '25967',
    serie: '039',
    total: 1499
  },
  emitente: {
    nome: 'CARREFOUR COMERCIO E INDUSTRIA LTDA',
    razaoSocial: 'CARREFOUR COMERCIO E INDUSTRIA LTDA',
    cnpj: '45.543.915/0068-99',
    rua: null,
    bairro: null,
    cep: null,
    cidade: null,
    telefone: null,
    estado: 'RN',
    ibge: null
  },
  produtos: [
    {
      descricao: 'LAVADORA ELECTROLUX',
      quantidade: 1,
      unidade: 'un',
      preco: 1499.00,
      codigo: null,
      NCM: null,
      eanComercial: null
    },
  ]
}

describe('Nota Fiscal - RN - Chave 24200645543915006899650390000259671033517796', function () {
  this.timeout(0);
  it('Cabeçalho', done => {
    QueryNFE
      .then(NFE => {
        chai.expect(NFE.cabecalho).to.deep.equal(result.cabecalho)
        done()
      })
      .catch(done)
  })

  it('Emitente', done => {
    QueryNFE
      .then(NFE => {
        chai.expect(NFE.emitente).to.deep.equal(result.emitente)
        done()
      })
      .catch(done)
  })

  it('Produtos/Serviços', done => {
    QueryNFE
      .then(NFE => {
        chai.expect(NFE.produtos).to.deep.equal(result.produtos)
        done()
      })
      .catch(done)
  })
}); 