[![npm version](https://badge.fury.io/js/consultanfe.svg)](https://www.npmjs.com/package/consultanfe)
[![Build Status](https://travis-ci.org/ymoreiratiti/consultaNFE.svg?branch=master)](https://travis-ci.org/ymoreiratiti/consultaNFE)
[![GitHub release](https://img.shields.io/github/release/ymoreiratiti/consultaNFE.svg)](https://github.com/ymoreiratiti/consultaNFE/releases/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ymoreiratiti/consultaNFE/)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/ymoreiratiti/)

# consultaNFE

Biblioteca para retorno de uma [promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise) com os dados de uma NFE (Nota Fiscal Eletrônica) baseada no QRCode.

### Unidade Federativas Suportadas
- CE - Ceará
- MG - Minas Gerais
- RN - Rio Grande do Norte
- RS - Rio Grande do Sul

### Instalação

Necessário [Node.js](https://nodejs.org/) v8 ou superior.

Instale o ConsultaNFE

```sh
$ npm install --save consultanfe
```

Importe a biblioteca

```javascript
const consultaNFE = require("consultaNFE");
const QRCodeURL =
	"https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=43181012384687000438651040002069031002069033&nVersao=100&tpAmb=1&cDest=03013156040&dhEmi=323031382D31302D31335431303A34383A32352D30333A3030&vNF=41.33&vICMS=0.00&digVal=4B6C68775A4A4A744D6D396D636264625238794937712B384939303D&cIdToken=000004&cHashQRCode=45EF73C4A9FD11FE6636C6D41678B12F863D6AA7";

var QueryNFE = new consultaNFE(QRCodeURL).get();

QueryNFE.then((NFEDados) => {
	console.log(NFEDados);
});

/*
Deve retornar:
{
  "cabecalho": {
    "dataEmissao": "2018-10-13T13:48:25.000Z",
    "dataEntradaSaida": null,
    "modelo": "65",
    "numero": "206903",
    "serie": "104",
    "total": 41.33
  },
  "emitente": {
    "nome": "FORMENTON FL03",
    "razaoSocial": "SUPERMERCADOS FORMENTON LTDA FL 3",
    "cnpj": "12.384.687/0004-38",
    "rua": "RUA NELSON PAIM TERRA, 934",
    "bairro": "RIO BRANCO",
    "cep": 92200040,
    "cidade": "CANOAS",
    "telefone": "(51)3031-1850",
    "estado": "RS",
    "ibge": 4304606
  },
  "produtos": [
    {
      "descricao": "MASSA LASANHA ROMENA 500G",
      "quantidade": 1,
      "unidade": "UN",
      "preco": 6.98,
      "codigo": 13437,
      "NCM": 19021100,
      "eanComercial": 7896249500066
    },
    {
      "descricao": "CARNE BOV MOIDA PRIMEIRA kg",
      "quantidade": 1.142,
      "unidade": "KG",
      "preco": 27.39,
      "codigo": 12794,
      "NCM": 2013000,
      "eanComercial": null
    },
    {
      "descricao": "AMAC GIRANDO SOL 2L TRAD TALCO",
      "quantidade": 1,
      "unidade": "UN",
      "preco": 3.99,
      "codigo": 1734,
      "NCM": 38099190,
      "eanComercial": 7896404601010
    },
    {
      "descricao": "MOLHO TOMATE CAJAMAR 340G SC",
      "quantidade": 1,
      "unidade": "UN",
      "preco": 1.19,
      "codigo": 6492,
      "NCM": 21032010,
      "eanComercial": 7891080146893
    },
    {
      "descricao": "MOLHO TOMATE CAJAMAR 340G SC",
      "quantidade": 1,
      "unidade": "UN",
      "preco": 1.19,
      "codigo": 6492,
      "NCM": 21032010,
      "eanComercial": 7891080146893
    },
    {
      "descricao": "MOLHO TOMATE CAJAMAR 340G SC",
      "quantidade": 1,
      "unidade": "UN",
      "preco": 1.19,
      "codigo": 6492,
      "NCM": 21032010,
      "eanComercial": 7891080146893
    }
  ]
}
*/
```

### Pendências

- Escrever mais testes
- Adicionar mais Unidades federativas

## Licença

MIT
