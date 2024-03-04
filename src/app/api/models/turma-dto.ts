/* tslint:disable */
/* eslint-disable */
import { MatriculaTurmaDto } from './matricula-turma-dto';
export interface TurmaDto {
  ano?: number;
  horaFim?: string;
  horaInicio?: string;
  id?: number;
  nomeProfessor?: string;
  quantidadeAlunos?: number;
  telefoneProfessor?: string;
  titulo?: string;
  turmaMatriculas?: Array<MatriculaTurmaDto>;
  turno?: 'MATUTINO' | 'VESPERTINO' | 'NOTURNO';
}
