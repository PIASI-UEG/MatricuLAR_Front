/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NecessidadeEspecialDto } from '../../models/necessidade-especial-dto';

export interface NecessidadeEspecialControllerIncluir$Params {
      body: NecessidadeEspecialDto
}

export function necessidadeEspecialControllerIncluir(http: HttpClient, rootUrl: string, params: NecessidadeEspecialControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, necessidadeEspecialControllerIncluir.PATH, 'post');
  if (params) {
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

necessidadeEspecialControllerIncluir.PATH = '/api/v1/necessidade_esp';
