/* tslint:disable */
/* eslint-disable */
export interface TutorDto {
  casado?: boolean;
  cpf?: string;
  dataNascimento?: string;
  empresaCnpj?: string;
  empresaNome?: string;
  moraComConjuge?: boolean;
  nomeTutor?: string;
  pessoaTelefone?: string;
  profissao?: string;
  telefoneCelularEmpresarial?: string;
  telefoneFixoEmpresarial?: string;
  telefoneReserva?: string;
  vinculo?: 'PAI' | 'MAE' | 'TIO' | 'VIZINHO' | 'AVO' | 'TIA' | 'BISAVO';
}
