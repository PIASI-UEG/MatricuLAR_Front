/* tslint:disable */
/* eslint-disable */
export interface UsuarioDto {
  cargo?: 'ADMIN' | 'SECRETARIA' | 'DIRETORA' | 'COORDENADORA';
  email?: string;
  id?: number;
  idUsuarioRequisicao?: number;
  pessoaCpf?: string;
  pessoaNome?: string;
  pessoaTelefone?: string;
  senha?: string;
}
