export interface ICabecalho {
  modelo: string;
  serie: string;
  numero: string;
  dataEmissao: Date | null;
  dataEntradaSaida: Date | null;
  total: number;
}

export interface IEmitente {
  nome: string;
  razaoSocial: string;
  cnpj: string;
  rua: string;
  bairro: string;
  cep: number | null;
  cidade: string;
  ibge: number | null;
  telefone: string;
  estado: string;
}

export interface IProduto {
  descricao: string;
  quantidade: number;
  unidade: string;
  preco: number;
  codigo: number | null;
  NCM: number | null;
  eanComercial: number | null;
}

export default interface IRootObject {
  cabecalho: ICabecalho;
  emitente: IEmitente;
  produtos: IProduto[];
}
