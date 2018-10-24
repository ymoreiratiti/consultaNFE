const consultaNFE = require('../dist/index')
const QRCodeURL = 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=43181012384687000438651040002069031002069033&nVersao=100&tpAmb=1&cDest=03013156040&dhEmi=323031382D31302D31335431303A34383A32352D30333A3030&vNF=41.33&vICMS=0.00&digVal=4B6C68775A4A4A744D6D396D636264625238794937712B384939303D&cIdToken=000004&cHashQRCode=45EF73C4A9FD11FE6636C6D41678B12F863D6AA7'
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require('chai')

//  Resultado Esperado
const result = {
  cabecalho: {
    dataEmissao: new Date('2018-10-13T13:48:25.000Z'),
    dataEntradaSaida: null,
    modelo: '65',
    numero: '206903',
    serie: '104',
    total: 41.33
  },
  emitente: {
    nome: 'FORMENTON FL03',
    razaoSocial: 'SUPERMERCADOS FORMENTON LTDA FL 3',
    cnpj: '12.384.687/0004-38',
    rua: 'RUA NELSON PAIM TERRA, 934',
    bairro: 'RIO BRANCO',
    cep: 92200040,
    cidade: 'CANOAS',
    telefone: '(51)3031-1850',
    estado: 'RS',
    ibge: 4304606
  },
  produtos: [
    { descricao: 'MASSA LASANHA ROMENA 500G', quantidade: 1, unidade: 'UN', preco: 6.98, codigo: 13437, 'NCM': 19021100, eanComercial: 7896249500066 },
    { descricao: 'CARNE BOV MOIDA PRIMEIRA kg', quantidade: 1.142, unidade: 'KG', preco: 27.39, codigo: 12794, 'NCM': 2013000, eanComercial: null },
    { descricao: 'AMAC GIRANDO SOL 2L TRAD TALCO', quantidade: 1, unidade: 'UN', preco: 3.99, codigo: 1734, 'NCM': 38099190, eanComercial: 7896404601010 },
    { descricao: 'MOLHO TOMATE CAJAMAR 340G SC', quantidade: 1, unidade: 'UN', preco: 1.19, codigo: 6492, 'NCM': 21032010, eanComercial: 7891080146893 },
    { descricao: 'MOLHO TOMATE CAJAMAR 340G SC', quantidade: 1, unidade: 'UN', preco: 1.19, codigo: 6492, 'NCM': 21032010, eanComercial: 7891080146893 },
    { descricao: 'MOLHO TOMATE CAJAMAR 340G SC', quantidade: 1, unidade: 'UN', preco: 1.19, codigo: 6492, 'NCM': 21032010, eanComercial: 7891080146893 }
  ]
}

describe('Nota Fiscal - RS - Chave 43181012384687000438651040002069031002069033', function () {
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