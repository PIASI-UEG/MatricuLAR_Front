/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MatriculaDto } from '../../models/matricula-dto';

export interface MatriculaControllerUploadDocumentos$Params {
  idMatricula: number;
      body: {
'multipartFile'?: Array<Blob>;
}
}

export function matriculaControllerUploadDocumentos(http: HttpClient, rootUrl: string, params: MatriculaControllerUploadDocumentos$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaDto>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerUploadDocumentos.PATH, 'post');
  if (params) {
    rb.query('idMatricula', params.idMatricula, {});
    rb.body(params.body, 'multipart/form-data');
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

matriculaControllerUploadDocumentos.PATH = '/api/v1/matricula/documentos';
