export interface ICabecalho {
  modelo: string | null;
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
  rua: string | null;
  bairro: string | null;
  cep: number | null;
  cidade: string | null;
  ibge: number | null;
  telefone: string | null;
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
