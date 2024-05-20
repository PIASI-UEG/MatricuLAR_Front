/* tslint:disable */
/* eslint-disable */
import { MatriculaDto } from './matricula-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageMatriculaDto {
  content?: Array<MatriculaDto>;
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
