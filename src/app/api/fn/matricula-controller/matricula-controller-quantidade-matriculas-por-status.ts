/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface MatriculaControllerQuantidadeMatriculasPorStatus$Params {
  statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
}

export function matriculaControllerQuantidadeMatriculasPorStatus(http: HttpClient, rootUrl: string, params: MatriculaControllerQuantidadeMatriculasPorStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerQuantidadeMatriculasPorStatus.PATH, 'get');
  if (params) {
    rb.query('statusMatricula', params.statusMatricula, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

matriculaControllerQuantidadeMatriculasPorStatus.PATH = '/api/v1/matricula/quantidade-status';
