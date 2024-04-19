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

import { AssinaturaDto } from '../models/assinatura-dto';
import { MatriculaDto } from '../models/matricula-dto';
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
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaDto>;
      })
    );
  }

  /**
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
   * Path part for operation matriculaControllerGerarTermoBack
   */
  static readonly MatriculaControllerGerarTermoBackPath = '/api/v1/matricula/termo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerGerarTermoBack()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerGerarTermoBack$Response(params: {
    body: Array<AssinaturaDto>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<AssinaturaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerGerarTermoBackPath, 'post');
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
        return r as StrictHttpResponse<Array<AssinaturaDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerGerarTermoBack$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerGerarTermoBack(params: {
    body: Array<AssinaturaDto>
  },
  context?: HttpContext

): Observable<Array<AssinaturaDto>> {

    return this.matriculaControllerGerarTermoBack$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<AssinaturaDto>>) => r.body as Array<AssinaturaDto>)
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
   * Path part for operation matriculaControllerUploadDocumento
   */
  static readonly MatriculaControllerUploadDocumentoPath = '/api/v1/matricula/documentos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerUploadDocumento()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumento$Response(params: {
    idMatricula: number;
    tipoDocumento: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2' | 'CERTIDAO_ESTADO_CIVIL2';
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
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerUploadDocumento$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumento(params: {
    idMatricula: number;
    tipoDocumento: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2' | 'CERTIDAO_ESTADO_CIVIL2';
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
   * Path part for operation matriculaControllerAtualizaContraChequeMatricula
   */
  static readonly MatriculaControllerAtualizaContraChequeMatriculaPath = '/api/v1/matricula/documento/atualiza-contra-cheque';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerAtualizaContraChequeMatricula()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerAtualizaContraChequeMatricula$Response(params: {
    idMatricula: number;
    tipoDocumento: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2' | 'CERTIDAO_ESTADO_CIVIL2';
    body: {
'multipartFile'?: Blob;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerAtualizaContraChequeMatriculaPath, 'post');
    if (params) {
      rb.query('idMatricula', params.idMatricula, {});
      rb.query('tipoDocumento', params.tipoDocumento, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatriculaDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerAtualizaContraChequeMatricula$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerAtualizaContraChequeMatricula(params: {
    idMatricula: number;
    tipoDocumento: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2' | 'CERTIDAO_ESTADO_CIVIL2';
    body: {
'multipartFile'?: Blob;
}
  },
  context?: HttpContext

): Observable<MatriculaDto> {

    return this.matriculaControllerAtualizaContraChequeMatricula$Response(params,context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>) => r.body as MatriculaDto)
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
   * Path part for operation matriculaControllerGetDocumentoMatricula
   */
  static readonly MatriculaControllerGetDocumentoMatriculaPath = '/api/v1/matricula/documento/{caminhodoc}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerGetDocumentoMatricula()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetDocumentoMatricula$Response(params: {
    caminhodoc: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, MatriculaControllerService.MatriculaControllerGetDocumentoMatriculaPath, 'get');
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
   * To access the full response (for headers, for example), `matriculaControllerGetDocumentoMatricula$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetDocumentoMatricula(params: {
    caminhodoc: string;
  },
  context?: HttpContext

): Observable<Blob> {

    return this.matriculaControllerGetDocumentoMatricula$Response(params,context).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
