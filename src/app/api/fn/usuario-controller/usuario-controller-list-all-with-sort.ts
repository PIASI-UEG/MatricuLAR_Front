/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UsuarioControllerListAllWithSort$Params {
  field: string;
}

export function usuarioControllerListAllWithSort(http: HttpClient, rootUrl: string, params: UsuarioControllerListAllWithSort$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, usuarioControllerListAllWithSort.PATH, 'get');
  if (params) {
    rb.path('field', params.field, {});
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

usuarioControllerListAllWithSort.PATH = '/api/v1/usuario/sort/{field}';
