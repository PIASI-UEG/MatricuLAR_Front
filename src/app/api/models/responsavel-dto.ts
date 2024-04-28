/* tslint:disable */
/* eslint-disable */
export interface ResponsavelDto {
  chavePub?: {
'encoded'?: Array<string>;
'algorithm'?: string;
'format'?: string;
};
  cpfResponsavel?: string;
  idMatricula?: number;
  nomeMatricula?: string;
  nomeResponsavel?: string;
  tutor?: boolean;
  vinculo?: 'PAI' | 'MAE' | 'TIO' | 'VIZINHO' | 'AVO';
}
