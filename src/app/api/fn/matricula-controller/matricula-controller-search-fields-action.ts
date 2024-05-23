/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SearchFieldValue } from '../../models/search-field-value';

export interface MatriculaControllerSearchFieldsAction$Params {
      body: Array<SearchFieldValue>
}

export function matriculaControllerSearchFieldsAction(http: HttpClient, rootUrl: string, params: MatriculaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerSearchFieldsAction.PATH, 'post');
  if (params) {
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

matriculaControllerSearchFieldsAction.PATH = '/api/v1/matricula/search-fields';
