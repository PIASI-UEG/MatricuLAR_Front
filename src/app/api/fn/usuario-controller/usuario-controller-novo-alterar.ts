/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UsuarioAlterarDto } from '../../models/usuario-alterar-dto';

export interface UsuarioControllerNovoAlterar$Params {
  id: number;
      body: UsuarioAlterarDto
}

export function usuarioControllerNovoAlterar(http: HttpClient, rootUrl: string, params: UsuarioControllerNovoAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, usuarioControllerNovoAlterar.PATH, 'put');
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

usuarioControllerNovoAlterar.PATH = '/api/v1/usuario/alterar/{id}';
