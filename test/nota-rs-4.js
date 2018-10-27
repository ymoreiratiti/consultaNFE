const consultaNFE = require('../dist/index')
const QRCodeURL = 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=43180905316123000150650020000091901000184323&nVersao=100&tpAmb=1&cDest=03013156040&dhEmi=323031382d30392d30355431333a30313a33352d30333a3030&vNF=28.80&vICMS=0.00&digVal=6f5349373768426a6a6236765973527150614667585a6b62614b343d&cIdToken=000001&cHashQRCode=5CD8E1519993FFF94301D0B73049DF82622AE3CC'
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require('chai')

//  Resultado Esperado
const result = {
  cabecalho: {
    dataEmissao: new Date('2018-09-05T16:01:35.000Z'),
    dataEntradaSaida: null,
    modelo: '65',
    numero: '9190',
    serie: '2',
    total: 28.8
  },
  emitente: {
    nome: 'PROVENSI E CHIESA LTDA',
    razaoSocial: 'PROVENSI E CHIESA LTDA',
    cnpj: '05.316.123/0001-50',
    rua: 'RUA DOUTOR BOZANO, 1167',
    bairro: 'CENTRO',
    cep: 97015003,
    cidade: 'SANTA MARIA',
    telefone: '(55)3028-5440',
    estado: 'RS',
    ibge: 4316907
  },
  produtos: [
    { descricao: 'ALMOCO', quantidade: 0.538, unidade: 'KG', preco: 26.3, codigo: 1, NCM: 21069090, eanComercial: null },
    { descricao: 'AGUA CGAS', quantidade: 1, unidade: 'UN', preco: 2.5, codigo: 13, NCM: 22011000, eanComercial: null }
  ]
}

describe('Nota Fiscal - RS - Chave 43180905316123000150650020000091901000184323', function () {
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