/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TurmaDto } from '../../models/turma-dto';

export interface TurmaControllerAdicionaAlunos$Params {
  idTurma: number;
      body: Array<number>
}

export function turmaControllerAdicionaAlunos(http: HttpClient, rootUrl: string, params: TurmaControllerAdicionaAlunos$Params, context?: HttpContext): Observable<StrictHttpResponse<TurmaDto>> {
  const rb = new RequestBuilder(rootUrl, turmaControllerAdicionaAlunos.PATH, 'post');
  if (params) {
    rb.query('idTurma', params.idTurma, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TurmaDto>;
    })
  );
}

turmaControllerAdicionaAlunos.PATH = '/api/v1/turma/adicionaAlunos';
