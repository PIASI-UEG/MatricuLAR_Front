/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AdvertenciaDto } from '../../models/advertencia-dto';
import { PkAdvertencia } from '../../models/pk-advertencia';

export interface AdvertenciaControllerAlterar$Params {
  id: PkAdvertencia;
      body: AdvertenciaDto
}

export function advertenciaControllerAlterar(http: HttpClient, rootUrl: string, params: AdvertenciaControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, advertenciaControllerAlterar.PATH, 'put');
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

advertenciaControllerAlterar.PATH = '/api/v1/advertencia/{id}';
