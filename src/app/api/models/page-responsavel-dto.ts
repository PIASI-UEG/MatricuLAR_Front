/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { ResponsavelDto } from './responsavel-dto';
import { SortObject } from './sort-object';
export interface PageResponsavelDto {
  content?: Array<ResponsavelDto>;
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
