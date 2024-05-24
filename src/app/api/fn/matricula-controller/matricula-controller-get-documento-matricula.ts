/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DocumentoMatriculaDto } from '../../models/documento-matricula-dto';

export interface MatriculaControllerGetDocumentoMatricula$Params {
  documentoMatriculaDTO: DocumentoMatriculaDto;
}

export function matriculaControllerGetDocumentoMatricula(http: HttpClient, rootUrl: string, params: MatriculaControllerGetDocumentoMatricula$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerGetDocumentoMatricula.PATH, 'get');
  if (params) {
    rb.query('documentoMatriculaDTO', params.documentoMatriculaDTO, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

matriculaControllerGetDocumentoMatricula.PATH = '/api/v1/matricula/obter-documento';
