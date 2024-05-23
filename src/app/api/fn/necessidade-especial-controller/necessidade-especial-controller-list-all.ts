/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NecessidadeEspecialDto } from '../../models/necessidade-especial-dto';

export interface NecessidadeEspecialControllerListAll$Params {
}

export function necessidadeEspecialControllerListAll(http: HttpClient, rootUrl: string, params?: NecessidadeEspecialControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NecessidadeEspecialDto>>> {
  const rb = new RequestBuilder(rootUrl, necessidadeEspecialControllerListAll.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<NecessidadeEspecialDto>>;
    })
  );
}

necessidadeEspecialControllerListAll.PATH = '/api/v1/necessidade_esp';
