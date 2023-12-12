/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UsuarioDto } from '../../models/usuario-dto';

export interface UsuarioControllerIncluir$Params {
  usuarioDTO: UsuarioDto;
}

export function usuarioControllerIncluir(http: HttpClient, rootUrl: string, params: UsuarioControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, usuarioControllerIncluir.PATH, 'post');
  if (params) {
    rb.query('usuarioDTO', params.usuarioDTO, {});
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

usuarioControllerIncluir.PATH = '/api/v1/usuario/singup';
