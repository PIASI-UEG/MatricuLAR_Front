/* tslint:disable */
/* eslint-disable */
import { InformacoesMatriculaDto } from './informacoes-matricula-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageInformacoesMatriculaDto {
  content?: Array<InformacoesMatriculaDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
