/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UsuarioControllerListUsuariosWithPagination$Params {
  offset: number;
  pageSize: number;
}

export function usuarioControllerListUsuariosWithPagination(http: HttpClient, rootUrl: string, params: UsuarioControllerListUsuariosWithPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, usuarioControllerListUsuariosWithPagination.PATH, 'get');
  if (params) {
    rb.path('offset', params.offset, {});
    rb.path('pageSize', params.pageSize, {});
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

usuarioControllerListUsuariosWithPagination.PATH = '/api/v1/usuario/pagination/{offset}/{pageSize}';
