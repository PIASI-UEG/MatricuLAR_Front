/* tslint:disable */
/* eslint-disable */
import { AdvertenciaDto } from './advertencia-dto';
import { MatriculaTurmaDto } from './matricula-turma-dto';
import { InformacoesMatriculaDto } from './informacoes-matricula-dto';
import { NecessidadeEspecialDto } from './necessidade-especial-dto';
import { ResponsavelDto } from './responsavel-dto';
import { TurmaDto } from './turma-dto';
import { TutorDto } from './tutor-dto';
export interface MatriculaDto {
  advertencias?: Array<AdvertenciaDto>;
  cpf?: string;
  endereco_id?: number;
  moramJuntos?: boolean;
  nascimento?: string;
  necessidades?: Array<NecessidadeEspecialDto>;
  nome?: string;
  observacao?: string;
  paisCasados?: boolean;
  renda?: number;
  responsaveis?: Array<ResponsavelDto>;
  status?: 'ATIVO' | 'INATIVO';
  turmaAtual?: TurmaDto;
  turmasHistorico?: Array<MatriculaTurmaDto>;
  enderecoId?: number;
  id?: number;
  informacoesMatricula?: InformacoesMatriculaDto;
  nascimento?: string;
  necessidades?: Array<NecessidadeEspecialDto>;
  nome?: string;
  responsaveis?: Array<ResponsavelDto>;
  status?: 'ATIVO' | 'INATIVO';
  turma?: TurmaDto;
  tutorDTOList?: Array<TutorDto>;
}
