/* tslint:disable */
/* eslint-disable */
export interface ResponsavelDto {
  cpfAluno?: string;
  cpfResponsavel?: string;
  nomeAluno?: string;
  idMatricula?: number;
  nomeMatricula?: string;
  nomeResponsavel?: string;
  tutor?: boolean;
  vinculo?: 'PAI' | 'MAE' | 'TIO' | 'VIZINHO' | 'AVO';
}
