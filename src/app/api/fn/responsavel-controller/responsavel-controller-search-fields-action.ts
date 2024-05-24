/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SearchFieldValue } from '../../models/search-field-value';

export interface ResponsavelControllerSearchFieldsAction$Params {
      body: Array<SearchFieldValue>
}

export function responsavelControllerSearchFieldsAction(http: HttpClient, rootUrl: string, params: ResponsavelControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, responsavelControllerSearchFieldsAction.PATH, 'post');
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

responsavelControllerSearchFieldsAction.PATH = '/api/v1/responsavel/search-fields';
