/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface MatriculaControllerGerarTermo$Params {
  id: number;
  cpfTutor: string;
}

export function matriculaControllerGerarTermo(http: HttpClient, rootUrl: string, params: MatriculaControllerGerarTermo$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerGerarTermo.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('cpfTutor', params.cpfTutor, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    })
  );
}

matriculaControllerGerarTermo.PATH = '/api/v1/matricula/termo/{id}';
