/* tslint:disable */
/* eslint-disable */
import { EnderecoDto } from './endereco-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageEnderecoDto {
  content?: Array<EnderecoDto>;
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
