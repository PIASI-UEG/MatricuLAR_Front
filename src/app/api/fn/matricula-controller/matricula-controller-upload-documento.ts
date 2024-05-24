/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MatriculaDto } from '../../models/matricula-dto';

export interface MatriculaControllerUploadDocumento$Params {
  idMatricula: number;
  tipoDocumento: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2';
      body: {
'multipartFile'?: Blob;
}
}

export function matriculaControllerUploadDocumento(http: HttpClient, rootUrl: string, params: MatriculaControllerUploadDocumento$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaDto>> {
  const rb = new RequestBuilder(rootUrl, matriculaControllerUploadDocumento.PATH, 'post');
  if (params) {
    rb.query('idMatricula', params.idMatricula, {});
    rb.query('tipoDocumento', params.tipoDocumento, {});
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

matriculaControllerUploadDocumento.PATH = '/api/v1/matricula/documento';
