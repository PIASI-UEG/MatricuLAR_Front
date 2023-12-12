/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetInfoByTokenValidacao$Params {

/**
 * Request Token
 */
  requestToken?: string;

/**
 * Request Token
 */
  'Request-Token'?: string;
}

export function getInfoByTokenValidacao(http: HttpClient, rootUrl: string, params?: GetInfoByTokenValidacao$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<boolean>>> {
  const rb = new RequestBuilder(rootUrl, getInfoByTokenValidacao.PATH, 'get');
  if (params) {
    rb.query('requestToken', params.requestToken, {});
    rb.header('Request-Token', params['Request-Token'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<boolean>>;
    })
  );
}

getInfoByTokenValidacao.PATH = '/api/v1/auth/senha/solicitacao/info';
