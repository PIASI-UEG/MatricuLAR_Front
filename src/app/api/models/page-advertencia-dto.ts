/* tslint:disable */
/* eslint-disable */
import { AdvertenciaDto } from './advertencia-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageAdvertenciaDto {
  content?: Array<AdvertenciaDto>;
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
