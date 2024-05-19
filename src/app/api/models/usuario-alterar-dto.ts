/* tslint:disable */
/* eslint-disable */
export interface UsuarioAlterarDto {
  cargo?: 'ADMIN' | 'SECRETARIA' | 'COORDENADORA';
  email?: string;
  id?: number;
  idUsuarioRequisicao?: number;
  pessoaCpf?: string;
  pessoaNome?: string;
  pessoaTelefone?: string;
  senha?: string;
  senhaAntiga?: string;
}
