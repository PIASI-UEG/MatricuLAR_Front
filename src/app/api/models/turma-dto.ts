/* tslint:disable */
/* eslint-disable */
import { MatriculaListagemDto } from '../models/matricula-listagem-dto';
export interface TurmaDto {
  alunos?: Array<MatriculaListagemDto>;
  ano?: number;
  horaFim?: string;
  horaInicio?: string;
  id?: number;
  nomeProfessor?: string;
  quantidadeAlunos?: number;
  telefoneProfessor?: string;
  titulo?: string;
  turno?: 'MATUTINO' | 'VESPERTINO' | 'INTEGRAL';
}
