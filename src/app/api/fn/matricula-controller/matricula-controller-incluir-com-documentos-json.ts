/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MatriculaDto } from '../../models/matricula-dto';

export interface MatriculaControllerIncluirComDocumentos$Json$Params {
      body?: {
'dto': MatriculaDto;
'files': Array<Blob>;
}
}

export function matriculaControllerIncluirComDocumentos$Json(http: HttpClient, rootUrl: string, params?: MatriculaControllerIncluirComDocumentos$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaDto>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerIncluirComDocumentos$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MatriculaDto>;
    })
  );
}

matriculaControllerIncluirComDocumentos$Json.PATH = '/api/v1/matricula/inclusao-com-docs';
