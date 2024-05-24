/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PkAdvertencia } from '../../models/pk-advertencia';

export interface AdvertenciaControllerObterPorId$Params {
  id: PkAdvertencia;
}

export function advertenciaControllerObterPorId(http: HttpClient, rootUrl: string, params: AdvertenciaControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, advertenciaControllerObterPorId.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

advertenciaControllerObterPorId.PATH = '/api/v1/advertencia/{id}';
