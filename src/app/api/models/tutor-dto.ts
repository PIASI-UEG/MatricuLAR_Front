/* tslint:disable */
/* eslint-disable */
export interface TutorDto {
  cpf?: string;
  empresaCnpj?: string;
  empresaNome?: string;
  empresaTelefone?: string;
  pessoaNome?: string;
  pessoaTelefone?: string;
  profissao?: string;
  telefoneWhatsapp?: boolean;
  vinculo?: 'PAI' | 'MAE' | 'TIO' | 'VIZINHO' | 'AVO';
}
