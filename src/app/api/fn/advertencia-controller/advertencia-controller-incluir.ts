/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AdvertenciaDto } from '../../models/advertencia-dto';

export interface AdvertenciaControllerIncluir$Params {
      body: AdvertenciaDto
}

export function advertenciaControllerIncluir(http: HttpClient, rootUrl: string, params: AdvertenciaControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, advertenciaControllerIncluir.PATH, 'post');
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

advertenciaControllerIncluir.PATH = '/api/v1/advertencia';
