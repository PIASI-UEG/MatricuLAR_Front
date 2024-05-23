/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface MatriculaControllerGetTermo$Params {
  caminhodoc: string;
}

export function matriculaControllerGetTermo(http: HttpClient, rootUrl: string, params: MatriculaControllerGetTermo$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerGetTermo.PATH, 'get');
  if (params) {
    rb.path('caminhodoc', params.caminhodoc, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Blob>;
    })
  );
}

matriculaControllerGetTermo.PATH = '/api/v1/matricula/termo/{caminhodoc}';
