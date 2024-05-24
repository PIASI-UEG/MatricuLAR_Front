/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SearchField } from '../../models/search-field';

export interface TutorControllerSearchFieldsList$Params {
}

export function tutorControllerSearchFieldsList(http: HttpClient, rootUrl: string, params?: TutorControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
  const rb = new RequestBuilder(rootUrl, tutorControllerSearchFieldsList.PATH, 'get');
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

tutorControllerSearchFieldsList.PATH = '/api/v1/tutor/search-fields';
