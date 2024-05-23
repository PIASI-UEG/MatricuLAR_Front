/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SearchField } from '../../models/search-field';

export interface MatriculaControllerSearchFieldsList$Params {
}

export function matriculaControllerSearchFieldsList(http: HttpClient, rootUrl: string, params?: MatriculaControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerSearchFieldsList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SearchField>>;
    })
  );
}

matriculaControllerSearchFieldsList.PATH = '/api/v1/matricula/search-fields';
