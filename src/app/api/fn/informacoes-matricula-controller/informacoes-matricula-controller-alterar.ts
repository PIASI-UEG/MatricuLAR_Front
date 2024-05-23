/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InformacoesMatriculaDto } from '../../models/informacoes-matricula-dto';

export interface InformacoesMatriculaControllerAlterar$Params {
  id: number;
      body: InformacoesMatriculaDto
}

export function informacoesMatriculaControllerAlterar(http: HttpClient, rootUrl: string, params: InformacoesMatriculaControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, informacoesMatriculaControllerAlterar.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

informacoesMatriculaControllerAlterar.PATH = '/api/v1/infomatricula/{id}';
