/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SearchFieldValue } from '../../models/search-field-value';

export interface PessoaControllerSearchFieldsAction$Params {
      body: Array<SearchFieldValue>
}

export function pessoaControllerSearchFieldsAction(http: HttpClient, rootUrl: string, params: PessoaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, pessoaControllerSearchFieldsAction.PATH, 'post');
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

pessoaControllerSearchFieldsAction.PATH = '/api/v1/pessoa/search-fields';
