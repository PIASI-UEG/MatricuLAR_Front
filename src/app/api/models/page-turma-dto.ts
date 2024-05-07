/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
import { TurmaDto } from './turma-dto';
export interface PageTurmaDto {
  content?: Array<TurmaDto>;
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
