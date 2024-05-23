/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SearchField } from '../../models/search-field';

export interface PessoaControllerSearchFieldsList$Params {
}

export function pessoaControllerSearchFieldsList(http: HttpClient, rootUrl: string, params?: PessoaControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
  const rb = new RequestBuilder(rootUrl, pessoaControllerSearchFieldsList.PATH, 'get');
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

pessoaControllerSearchFieldsList.PATH = '/api/v1/pessoa/search-fields';
