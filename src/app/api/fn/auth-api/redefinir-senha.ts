/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CredencialDto } from '../../models/credencial-dto';
import { UsuarioSenhaDto } from '../../models/usuario-senha-dto';

export interface RedefinirSenha$Params {

/**
 * Request Token
 */
  requestToken?: string;

/**
 * Request Token
 */
  'Request-Token'?: string;
      body: UsuarioSenhaDto
}

export function redefinirSenha(http: HttpClient, rootUrl: string, params: RedefinirSenha$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CredencialDto>>> {
  const rb = new RequestBuilder(rootUrl, redefinirSenha.PATH, 'put');
  if (params) {
    rb.query('requestToken', params.requestToken, {});
    rb.header('Request-Token', params['Request-Token'], {});
    rb.body(params.body, 'application/json');
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

redefinirSenha.PATH = '/api/v1/auth/senha';
