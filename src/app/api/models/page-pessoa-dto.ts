/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { PessoaDto } from './pessoa-dto';
import { SortObject } from './sort-object';
export interface PagePessoaDto {
  content?: Array<PessoaDto>;
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
