/* tslint:disable */
/* eslint-disable */
import { NecessidadeEspecialDto } from './necessidade-especial-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageNecessidadeEspecialDto {
  content?: Array<NecessidadeEspecialDto>;
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
