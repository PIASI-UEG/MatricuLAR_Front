/* tslint:disable */
/* eslint-disable */
import { AdvertenciaDto } from '../models/advertencia-dto';
import { DocumentoMatriculaDto } from '../models/documento-matricula-dto';
import { EnderecoDto } from '../models/endereco-dto';
import { InformacoesMatriculaDto } from '../models/informacoes-matricula-dto';
import { NecessidadeEspecialDto } from '../models/necessidade-especial-dto';
import { ResponsavelDto } from '../models/responsavel-dto';
import { TurmaDto } from '../models/turma-dto';
import { TutorDto } from '../models/tutor-dto';
export interface MatriculaDto {
  advertencias?: Array<AdvertenciaDto>;
  cpf?: string;
  documentoMatricula?: Array<DocumentoMatriculaDto>;
  endereco?: EnderecoDto;
  id?: number;
  informacoesMatricula?: InformacoesMatriculaDto;
  nascimento?: string;
  necessidades?: Array<NecessidadeEspecialDto>;
  nome?: string;
  responsaveis?: Array<ResponsavelDto>;
  status?: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
  turma?: TurmaDto;
  tutorDTOList?: Array<TutorDto>;
}
