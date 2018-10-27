const consultaNFE = require('../dist/index')
const QRCodeURL = 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?p=43181093209765016200650040001417721010722180|2|1|1|95AAC6E105B588A362AA3042C4BBBE3C4523B066'
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require('chai')

//  Resultado Esperado
const result = {
  cabecalho: {
    dataEmissao: new Date('2018-10-26T17:10:00.000Z'),
    dataEntradaSaida: null,
    modelo: '65',
    numero: '141772',
    serie: '4',
    total: 79.68
  },
  emitente: {
    nome: 'NACIONAL CANOAS',
    razaoSocial: 'WMS SUPERMERCADOS DO BRASIL LTDA',
    cnpj: '93.209.765/0162-00',
    rua: 'Av. Getulio Vargas, 2415',
    bairro: 'Niteroi',
    cep: 92110330,
    cidade: 'Canoas',
    telefone: '(00)4020-5050',
    estado: 'RS',
    ibge: 4304606
  },
  produtos: [
    { descricao: 'ESP ESFREBOM', quantidade: 2, unidade: 'UN', preco: 8.98, codigo: 500715986, NCM: 68053090, eanComercial: 7896001045446 },
    { descricao: 'EO AERO PLAYBOY PLAY', quantidade: 1, unidade: 'UN', preco: 10, codigo: 500541101, NCM: 33072010, eanComercial: 7892940000195 },
    { descricao: 'DEO AERO PLAYBOY NEW', quantidade: 1, unidade: 'UN', preco: 9.18, codigo: 500151145, NCM: 33072010, eanComercial: 7892940000164 },
    { descricao: 'DES AE MAS BIO INVIS', quantidade: 1, unidade: 'UN', preco: 11, codigo: 500337833, NCM: 33072010, eanComercial: null },
    { descricao: 'COCA SLEEK LATA', quantidade: 2, unidade: 'UN', preco: 4.58, codigo: 500145641, NCM: 22021000, eanComercial: 7894900011159 },
    { descricao: 'GV DESENGORG GATIL', quantidade: 1, unidade: 'UN', preco: 10.78, codigo: 500269998, NCM: 34022000, eanComercial: 7891737813451 },
    { descricao: 'GV SACO LIXO', quantidade: 1, unidade: 'UN', preco: 17.78, codigo: 500464447, NCM: 39232110, eanComercial: 7891737250959 },
    { descricao: 'ESC REC REC BETT 112', quantidade: 1, unidade: 'UN', preco: 7.38, codigo: 500211825, NCM: 96039000, eanComercial: 7896001001121 }
  ]
}

describe('Nota Fiscal - RS - Chave 43181093209765016200650040001417721010722180', function () {
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