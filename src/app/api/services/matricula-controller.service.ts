/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DocumentoMatriculaDto } from '../models/documento-matricula-dto';
import { MatriculaDto } from '../models/matricula-dto';
import { MatriculaListagemDto } from '../models/matricula-listagem-dto';
import { MatriculaVisualizarDto } from '../models/matricula-visualizar-dto';
import { Pageable } from '../models/pageable';
import { SearchField } from '../models/search-field';
import { SearchFieldValue } from '../models/search-field-value';

@Injectable({
  providedIn: 'root',
})
export class MatriculaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation matriculaControllerObterPorId
   */
  static readonly MatriculaControllerObterPorIdPath = '/api/v1/matricula/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerObterPorIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.matriculaControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation matriculaControllerAlterar
   */
  static readonly MatriculaControllerAlterarPath = '/api/v1/matricula/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerAlterar$Response(params: {
    id: number;
    body: MatriculaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerAlterarPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerAlterar(params: {
    id: number;
    body: MatriculaDto
  },
  context?: HttpContext

): Observable<any> {

    return this.matriculaControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation matriculaControllerRemover
   */
  static readonly MatriculaControllerRemoverPath = '/api/v1/matricula/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerRemoverPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.matriculaControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation matriculaControllerListAll
   */
  static readonly MatriculaControllerListAllPath = '/api/v1/matricula';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.matriculaControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation matriculaControllerIncluir
   */
  static readonly MatriculaControllerIncluirPath = '/api/v1/matricula';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerIncluir$Response(params: {
    body: MatriculaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerIncluirPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerIncluir(params: {
    body: MatriculaDto
  },
  context?: HttpContext

): Observable<any> {

    return this.matriculaControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation matriculaControllerValidaMatricula
   */
  static readonly MatriculaControllerValidaMatriculaPath = '/api/v1/matricula/valida';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerValidaMatricula()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerValidaMatricula$Response(params: {
    body: MatriculaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerValidaMatriculaPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaDto>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerValidaMatricula$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerValidaMatricula(params: {
    body: MatriculaDto
  },
  context?: HttpContext

): Observable<MatriculaDto> {

    return this.matriculaControllerValidaMatricula$Response(params,context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>) => r.body as MatriculaDto)
    );
  }

  /**
   * Path part for operation matriculaControllerGerarTermo
   */
  static readonly MatriculaControllerGerarTermoPath = '/api/v1/matricula/termo/{id}';

  /**
   * Gera o termo da matricula
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerGerarTermo()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGerarTermo$Response(params: {
    id: number;
    cpfTutor: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerGerarTermoPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('cpfTutor', params.cpfTutor, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Gera o termo da matricula
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerGerarTermo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGerarTermo(params: {
    id: number;
    cpfTutor: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.matriculaControllerGerarTermo$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation matriculaControllerSearchFieldsList
   */
  static readonly MatriculaControllerSearchFieldsListPath = '/api/v1/matricula/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerSearchFieldsList$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<SearchField>>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerSearchFieldsListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SearchField>>;
      })
    );
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerSearchFieldsList(params?: {
  },
  context?: HttpContext

): Observable<Array<SearchField>> {

    return this.matriculaControllerSearchFieldsList$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>) => r.body as Array<SearchField>)
    );
  }

  /**
   * Path part for operation matriculaControllerSearchFieldsAction
   */
  static readonly MatriculaControllerSearchFieldsActionPath = '/api/v1/matricula/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerSearchFieldsAction$Response(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerSearchFieldsActionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerSearchFieldsAction(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<any> {

    return this.matriculaControllerSearchFieldsAction$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation matriculaControllerObterDocumentoMatricula
   */
  static readonly MatriculaControllerObterDocumentoMatriculaPath = '/api/v1/matricula/obter-documento';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerObterDocumentoMatricula()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerObterDocumentoMatricula$Response(params: {
    body: DocumentoMatriculaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerObterDocumentoMatriculaPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerObterDocumentoMatricula$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerObterDocumentoMatricula(params: {
    body: DocumentoMatriculaDto
  },
  context?: HttpContext

): Observable<Blob> {

    return this.matriculaControllerObterDocumentoMatricula$Response(params,context).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation matriculaControllerIncluirComDocumentos
   */
  static readonly MatriculaControllerIncluirComDocumentosPath = '/api/v1/matricula/inclusao-com-docs';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerIncluirComDocumentos$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerIncluirComDocumentos$FormData$Response(params?: {
    body?: {
'dto': MatriculaDto;
'files': Array<Blob>;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerIncluirComDocumentosPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaDto>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerIncluirComDocumentos$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerIncluirComDocumentos$FormData(params?: {
    body?: {
'dto': MatriculaDto;
'files': Array<Blob>;
}
  },
  context?: HttpContext

): Observable<MatriculaDto> {

    return this.matriculaControllerIncluirComDocumentos$FormData$Response(params,context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>) => r.body as MatriculaDto)
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerIncluirComDocumentos$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerIncluirComDocumentos$Json$Response(params?: {
    body?: {
'dto': MatriculaDto;
'files': Array<Blob>;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerIncluirComDocumentosPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaDto>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerIncluirComDocumentos$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerIncluirComDocumentos$Json(params?: {
    body?: {
'dto': MatriculaDto;
'files': Array<Blob>;
}
  },
  context?: HttpContext

): Observable<MatriculaDto> {

    return this.matriculaControllerIncluirComDocumentos$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>) => r.body as MatriculaDto)
    );
  }

  /**
   * Path part for operation matriculaControllerUploadDocumentos
   */
  static readonly MatriculaControllerUploadDocumentosPath = '/api/v1/matricula/documentos';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerUploadDocumentos()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumentos$Response(params: {
    idMatricula: number;
    body: {
'multipartFile'?: Array<Blob>;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerUploadDocumentosPath, 'post');
    if (params) {
      rb.query('idMatricula', params.idMatricula, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaDto>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerUploadDocumentos$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumentos(params: {
    idMatricula: number;
    body: {
'multipartFile'?: Array<Blob>;
}
  },
  context?: HttpContext

): Observable<MatriculaDto> {

    return this.matriculaControllerUploadDocumentos$Response(params,context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>) => r.body as MatriculaDto)
    );
  }

  /**
   * Path part for operation matriculaControllerUploadDocumento
   */
  static readonly MatriculaControllerUploadDocumentoPath = '/api/v1/matricula/documento';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerUploadDocumento()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumento$Response(params: {
    idMatricula: number;
    tipoDocumento: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2';
    body: {
'multipartFile'?: Blob;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerUploadDocumentoPath, 'post');
    if (params) {
      rb.query('idMatricula', params.idMatricula, {});
      rb.query('tipoDocumento', params.tipoDocumento, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaDto>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerUploadDocumento$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumento(params: {
    idMatricula: number;
    tipoDocumento: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2';
    body: {
'multipartFile'?: Blob;
}
  },
  context?: HttpContext

): Observable<MatriculaDto> {

    return this.matriculaControllerUploadDocumento$Response(params,context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>) => r.body as MatriculaDto)
    );
  }

  /**
   * Path part for operation matriculaControllerAtualizaDocumentoMatricula
   */
  static readonly MatriculaControllerAtualizaDocumentoMatriculaPath = '/api/v1/matricula/documento/atualiza-documento';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerAtualizaDocumentoMatricula()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerAtualizaDocumentoMatricula$Response(params: {
    idMatricula: number;
    tipoDocumento: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2';
    body: {
'multipartFile'?: Blob;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerAtualizaDocumentoMatriculaPath, 'post');
    if (params) {
      rb.query('idMatricula', params.idMatricula, {});
      rb.query('tipoDocumento', params.tipoDocumento, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaDto>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerAtualizaDocumentoMatricula$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerAtualizaDocumentoMatricula(params: {
    idMatricula: number;
    tipoDocumento: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2';
    body: {
'multipartFile'?: Blob;
}
  },
  context?: HttpContext

): Observable<MatriculaDto> {

    return this.matriculaControllerAtualizaDocumentoMatricula$Response(params,context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>) => r.body as MatriculaDto)
    );
  }

  /**
   * Path part for operation matriculaControllerGetTermo
   */
  static readonly MatriculaControllerGetTermoPath = '/api/v1/matricula/termo/{caminhodoc}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerGetTermo()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetTermo$Response(params: {
    caminhodoc: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerGetTermoPath, 'get');
    if (params) {
      rb.path('caminhodoc', params.caminhodoc, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerGetTermo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetTermo(params: {
    caminhodoc: string;
  },
  context?: HttpContext

): Observable<Blob> {

    return this.matriculaControllerGetTermo$Response(params,context).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation matriculaControllerQuantidadeTotalMatriculas
   */
  static readonly MatriculaControllerQuantidadeTotalMatriculasPath = '/api/v1/matricula/quantidade-total';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerQuantidadeTotalMatriculas()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerQuantidadeTotalMatriculas$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerQuantidadeTotalMatriculasPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerQuantidadeTotalMatriculas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerQuantidadeTotalMatriculas(params?: {
  },
  context?: HttpContext

): Observable<number> {

    return this.matriculaControllerQuantidadeTotalMatriculas$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation matriculaControllerQuantidadeMatriculasPorStatus
   */
  static readonly MatriculaControllerQuantidadeMatriculasPorStatusPath = '/api/v1/matricula/quantidade-status';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerQuantidadeMatriculasPorStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerQuantidadeMatriculasPorStatus$Response(params: {
    statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerQuantidadeMatriculasPorStatusPath, 'get');
    if (params) {
      rb.query('statusMatricula', params.statusMatricula, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerQuantidadeMatriculasPorStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerQuantidadeMatriculasPorStatus(params: {
    statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
  },
  context?: HttpContext

): Observable<number> {

    return this.matriculaControllerQuantidadeMatriculasPorStatus$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation matriculaControllerListAllPage
   */
  static readonly MatriculaControllerListAllPagePath = '/api/v1/matricula/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAllPage$Response(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerListAllPagePath, 'get');
    if (params) {
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAllPage(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<any> {

    return this.matriculaControllerListAllPage$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation matriculaControllerGetMatriculaVisualizar
   */
  static readonly MatriculaControllerGetMatriculaVisualizarPath = '/api/v1/matricula/matricula-visualiza';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerGetMatriculaVisualizar()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetMatriculaVisualizar$Response(params: {
    IdMatricula: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MatriculaVisualizarDto>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerGetMatriculaVisualizarPath, 'get');
    if (params) {
      rb.query('IdMatricula', params.IdMatricula, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaVisualizarDto>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerGetMatriculaVisualizar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetMatriculaVisualizar(params: {
    IdMatricula: number;
  },
  context?: HttpContext

): Observable<MatriculaVisualizarDto> {

    return this.matriculaControllerGetMatriculaVisualizar$Response(params,context).pipe(
      map((r: StrictHttpResponse<MatriculaVisualizarDto>) => r.body as MatriculaVisualizarDto)
    );
  }

  /**
   * Path part for operation matriculaControllerListarAlunosPorTurma
   */
  static readonly MatriculaControllerListarAlunosPorTurmaPath = '/api/v1/matricula/listar-por-turma';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListarAlunosPorTurma()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListarAlunosPorTurma$Response(params: {
    idTurma: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<MatriculaListagemDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerListarAlunosPorTurmaPath, 'get');
    if (params) {
      rb.query('idTurma', params.idTurma, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MatriculaListagemDto>>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListarAlunosPorTurma$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListarAlunosPorTurma(params: {
    idTurma: number;
  },
  context?: HttpContext

): Observable<Array<MatriculaListagemDto>> {

    return this.matriculaControllerListarAlunosPorTurma$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<MatriculaListagemDto>>) => r.body as Array<MatriculaListagemDto>)
    );
  }

  /**
   * Path part for operation matriculaControllerListarMatriculasListagemPorStatus
   */
  static readonly MatriculaControllerListarMatriculasListagemPorStatusPath = '/api/v1/matricula/listar-matriculas-status';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListarMatriculasListagemPorStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListarMatriculasListagemPorStatus$Response(params: {
    statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<MatriculaListagemDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerListarMatriculasListagemPorStatusPath, 'get');
    if (params) {
      rb.query('statusMatricula', params.statusMatricula, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MatriculaListagemDto>>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListarMatriculasListagemPorStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListarMatriculasListagemPorStatus(params: {
    statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
  },
  context?: HttpContext

): Observable<Array<MatriculaListagemDto>> {

    return this.matriculaControllerListarMatriculasListagemPorStatus$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<MatriculaListagemDto>>) => r.body as Array<MatriculaListagemDto>)
    );
  }

  /**
   * Path part for operation matriculaControllerCount
   */
  static readonly MatriculaControllerCountPath = '/api/v1/matricula/listar-matriculas-status-pagination';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerCount$Response(params: {
    statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerCountPath, 'get');
    if (params) {
      rb.query('statusMatricula', params.statusMatricula, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerCount(params: {
    statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
  },
  context?: HttpContext

): Observable<number> {

    return this.matriculaControllerCount$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation matriculaControllerListAllPageMatriculaListagemDto
   */
  static readonly MatriculaControllerListAllPageMatriculaListagemDtoPath = '/api/v1/matricula/listar-matriculas-status-pagination/{offset}/{pageSize}';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListAllPageMatriculaListagemDto()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAllPageMatriculaListagemDto$Response(params: {
    offset: number;
    pageSize: number;
    statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<MatriculaListagemDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerListAllPageMatriculaListagemDtoPath, 'get');
    if (params) {
      rb.path('offset', params.offset, {});
      rb.path('pageSize', params.pageSize, {});
      rb.query('statusMatricula', params.statusMatricula, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MatriculaListagemDto>>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListAllPageMatriculaListagemDto$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAllPageMatriculaListagemDto(params: {
    offset: number;
    pageSize: number;
    statusMatricula: 'ATIVO' | 'INATIVO' | 'AGUARDANDO_RENOVACAO' | 'AGUARDANDO_ACEITE';
  },
  context?: HttpContext

): Observable<Array<MatriculaListagemDto>> {

    return this.matriculaControllerListAllPageMatriculaListagemDto$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<MatriculaListagemDto>>) => r.body as Array<MatriculaListagemDto>)
    );
  }

}
