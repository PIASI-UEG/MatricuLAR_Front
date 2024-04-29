/* tslint:disable */
/* eslint-disable */
export interface ResponsavelDto {
  chavePub?: string;
  cpfResponsavel?: string;
  idMatricula?: number;
  nomeMatricula?: string;
  nomeResponsavel?: string;
  tutor?: boolean;
  vinculo?: 'PAI' | 'MAE' | 'TIO' | 'VIZINHO' | 'AVO';
}
