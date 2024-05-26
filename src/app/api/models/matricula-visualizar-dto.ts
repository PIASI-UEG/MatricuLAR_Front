/* tslint:disable */
/* eslint-disable */
import { AdvertenciaDto } from './advertencia-dto';
import { NecessidadeEspecialDto } from './necessidade-especial-dto';
export interface MatriculaVisualizarDto {
  advertencias?: Array<AdvertenciaDto>;
  caminhoImagem?: string;
  cpfAluno?: string;
  nascimento?: string;
  necessidadesEspeciais?: Array<NecessidadeEspecialDto>;
  nomeAluno?: string;
  responsaveisNome?: Array<string>;
  statusAluno?: string;
  tutoresNomes?: Array<string>;
  tutoresTelefone?: Array<string>;
}
