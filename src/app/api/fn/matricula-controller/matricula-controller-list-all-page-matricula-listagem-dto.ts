/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MatriculaListagemDto } from '../../models/matricula-listagem-dto';

export interface MatriculaControllerListAllPageMatriculaListagemDto$Params {
  offset: number;
  pageSize: number;
  statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
}

export function matriculaControllerListAllPageMatriculaListagemDto(http: HttpClient, rootUrl: string, params: MatriculaControllerListAllPageMatriculaListagemDto$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MatriculaListagemDto>>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerListAllPageMatriculaListagemDto.PATH, 'get');
  if (params) {
    rb.path('offset', params.offset, {});
    rb.path('pageSize', params.pageSize, {});
    rb.query('statusMatricula', params.statusMatricula, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<MatriculaListagemDto>>;
    })
  );
}

matriculaControllerListAllPageMatriculaListagemDto.PATH = '/api/v1/matricula/listar-matriculas-status-pagination/{offset}/{pageSize}';
