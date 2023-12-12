/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CredencialDto } from '../../models/credencial-dto';

export interface Refresh$Params {

/**
 * Token de refresh
 */
  refreshToken: string;
}

export function refresh(http: HttpClient, rootUrl: string, params: Refresh$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CredencialDto>>> {
  const rb = new RequestBuilder(rootUrl, refresh.PATH, 'get');
  if (params) {
    rb.query('refreshToken', params.refreshToken, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CredencialDto>>;
    })
  );
}

refresh.PATH = '/api/v1/auth/refresh';
