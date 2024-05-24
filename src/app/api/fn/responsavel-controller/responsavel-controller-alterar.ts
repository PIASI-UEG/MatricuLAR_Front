/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PkResponsavel } from '../../models/pk-responsavel';
import { ResponsavelDto } from '../../models/responsavel-dto';

export interface ResponsavelControllerAlterar$Params {
  id: PkResponsavel;
      body: ResponsavelDto
}

export function responsavelControllerAlterar(http: HttpClient, rootUrl: string, params: ResponsavelControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, responsavelControllerAlterar.PATH, 'put');
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

responsavelControllerAlterar.PATH = '/api/v1/responsavel/{id}';
