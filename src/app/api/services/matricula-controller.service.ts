/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { matriculaControllerAlterar } from '../fn/matricula-controller/matricula-controller-alterar';
import { MatriculaControllerAlterar$Params } from '../fn/matricula-controller/matricula-controller-alterar';
import { matriculaControllerAtualizaDocumentoMatricula } from '../fn/matricula-controller/matricula-controller-atualiza-documento-matricula';
import { MatriculaControllerAtualizaDocumentoMatricula$Params } from '../fn/matricula-controller/matricula-controller-atualiza-documento-matricula';
import { matriculaControllerCount } from '../fn/matricula-controller/matricula-controller-count';
import { MatriculaControllerCount$Params } from '../fn/matricula-controller/matricula-controller-count';
import { matriculaControllerGerarTermo } from '../fn/matricula-controller/matricula-controller-gerar-termo';
import { MatriculaControllerGerarTermo$Params } from '../fn/matricula-controller/matricula-controller-gerar-termo';
import { matriculaControllerGetDocumentoMatricula } from '../fn/matricula-controller/matricula-controller-get-documento-matricula';
import { MatriculaControllerGetDocumentoMatricula$Params } from '../fn/matricula-controller/matricula-controller-get-documento-matricula';
import { matriculaControllerGetMatriculaVisualizar } from '../fn/matricula-controller/matricula-controller-get-matricula-visualizar';
import { MatriculaControllerGetMatriculaVisualizar$Params } from '../fn/matricula-controller/matricula-controller-get-matricula-visualizar';
import { matriculaControllerGetTermo } from '../fn/matricula-controller/matricula-controller-get-termo';
import { MatriculaControllerGetTermo$Params } from '../fn/matricula-controller/matricula-controller-get-termo';
import { matriculaControllerIncluir } from '../fn/matricula-controller/matricula-controller-incluir';
import { MatriculaControllerIncluir$Params } from '../fn/matricula-controller/matricula-controller-incluir';
import { matriculaControllerIncluirComDocumentos$FormData } from '../fn/matricula-controller/matricula-controller-incluir-com-documentos-form-data';
import { MatriculaControllerIncluirComDocumentos$FormData$Params } from '../fn/matricula-controller/matricula-controller-incluir-com-documentos-form-data';
import { matriculaControllerIncluirComDocumentos$Json } from '../fn/matricula-controller/matricula-controller-incluir-com-documentos-json';
import { MatriculaControllerIncluirComDocumentos$Json$Params } from '../fn/matricula-controller/matricula-controller-incluir-com-documentos-json';
import { matriculaControllerListAll } from '../fn/matricula-controller/matricula-controller-list-all';
import { MatriculaControllerListAll$Params } from '../fn/matricula-controller/matricula-controller-list-all';
import { matriculaControllerListAllPage } from '../fn/matricula-controller/matricula-controller-list-all-page';
import { MatriculaControllerListAllPage$Params } from '../fn/matricula-controller/matricula-controller-list-all-page';
import { matriculaControllerListAllPageMatriculaListagemDto } from '../fn/matricula-controller/matricula-controller-list-all-page-matricula-listagem-dto';
import { MatriculaControllerListAllPageMatriculaListagemDto$Params } from '../fn/matricula-controller/matricula-controller-list-all-page-matricula-listagem-dto';
import { matriculaControllerListarAlunosPorTurma } from '../fn/matricula-controller/matricula-controller-listar-alunos-por-turma';
import { MatriculaControllerListarAlunosPorTurma$Params } from '../fn/matricula-controller/matricula-controller-listar-alunos-por-turma';
import { matriculaControllerListarMatriculasListagemPorStatus } from '../fn/matricula-controller/matricula-controller-listar-matriculas-listagem-por-status';
import { MatriculaControllerListarMatriculasListagemPorStatus$Params } from '../fn/matricula-controller/matricula-controller-listar-matriculas-listagem-por-status';
import { matriculaControllerObterPorId } from '../fn/matricula-controller/matricula-controller-obter-por-id';
import { MatriculaControllerObterPorId$Params } from '../fn/matricula-controller/matricula-controller-obter-por-id';
import { matriculaControllerRemover } from '../fn/matricula-controller/matricula-controller-remover';
import { MatriculaControllerRemover$Params } from '../fn/matricula-controller/matricula-controller-remover';
import { matriculaControllerSearchFieldsAction } from '../fn/matricula-controller/matricula-controller-search-fields-action';
import { MatriculaControllerSearchFieldsAction$Params } from '../fn/matricula-controller/matricula-controller-search-fields-action';
import { matriculaControllerSearchFieldsList } from '../fn/matricula-controller/matricula-controller-search-fields-list';
import { MatriculaControllerSearchFieldsList$Params } from '../fn/matricula-controller/matricula-controller-search-fields-list';
import { matriculaControllerUploadDocumento } from '../fn/matricula-controller/matricula-controller-upload-documento';
import { MatriculaControllerUploadDocumento$Params } from '../fn/matricula-controller/matricula-controller-upload-documento';
import { matriculaControllerUploadDocumentos } from '../fn/matricula-controller/matricula-controller-upload-documentos';
import { MatriculaControllerUploadDocumentos$Params } from '../fn/matricula-controller/matricula-controller-upload-documentos';
import { matriculaControllerValidaMatricula } from '../fn/matricula-controller/matricula-controller-valida-matricula';
import { MatriculaControllerValidaMatricula$Params } from '../fn/matricula-controller/matricula-controller-valida-matricula';
import { MatriculaDto } from '../models/matricula-dto';
import { MatriculaListagemDto } from '../models/matricula-listagem-dto';
import { MatriculaVisualizarDto } from '../models/matricula-visualizar-dto';
import { SearchField } from '../models/search-field';

@Injectable({ providedIn: 'root' })
export class MatriculaControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `matriculaControllerObterPorId()` */
  static readonly MatriculaControllerObterPorIdPath = '/api/v1/matricula/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerObterPorId$Response(params: MatriculaControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return matriculaControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerObterPorId(params: MatriculaControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.matriculaControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `matriculaControllerAlterar()` */
  static readonly MatriculaControllerAlterarPath = '/api/v1/matricula/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerAlterar$Response(params: MatriculaControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return matriculaControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerAlterar(params: MatriculaControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.matriculaControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `matriculaControllerRemover()` */
  static readonly MatriculaControllerRemoverPath = '/api/v1/matricula/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerRemover$Response(params: MatriculaControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return matriculaControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerRemover(params: MatriculaControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.matriculaControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `matriculaControllerListAll()` */
  static readonly MatriculaControllerListAllPath = '/api/v1/matricula';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAll$Response(params?: MatriculaControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return matriculaControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAll(params?: MatriculaControllerListAll$Params, context?: HttpContext): Observable<any> {
    return this.matriculaControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `matriculaControllerIncluir()` */
  static readonly MatriculaControllerIncluirPath = '/api/v1/matricula';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerIncluir$Response(params: MatriculaControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return matriculaControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerIncluir(params: MatriculaControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.matriculaControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `matriculaControllerValidaMatricula()` */
  static readonly MatriculaControllerValidaMatriculaPath = '/api/v1/matricula/valida';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerValidaMatricula()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerValidaMatricula$Response(params: MatriculaControllerValidaMatricula$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaDto>> {
    return matriculaControllerValidaMatricula(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerValidaMatricula$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerValidaMatricula(params: MatriculaControllerValidaMatricula$Params, context?: HttpContext): Observable<MatriculaDto> {
    return this.matriculaControllerValidaMatricula$Response(params, context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>): MatriculaDto => r.body)
    );
  }

  /** Path part for operation `matriculaControllerGerarTermo()` */
  static readonly MatriculaControllerGerarTermoPath = '/api/v1/matricula/termo/{id}';

  /**
   * Gera o termo da matricula
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerGerarTermo()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGerarTermo$Response(params: MatriculaControllerGerarTermo$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return matriculaControllerGerarTermo(this.http, this.rootUrl, params, context);
  }

  /**
   * Gera o termo da matricula
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerGerarTermo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGerarTermo(params: MatriculaControllerGerarTermo$Params, context?: HttpContext): Observable<any> {
    return this.matriculaControllerGerarTermo$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `matriculaControllerSearchFieldsList()` */
  static readonly MatriculaControllerSearchFieldsListPath = '/api/v1/matricula/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerSearchFieldsList$Response(params?: MatriculaControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return matriculaControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerSearchFieldsList(params?: MatriculaControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.matriculaControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `matriculaControllerSearchFieldsAction()` */
  static readonly MatriculaControllerSearchFieldsActionPath = '/api/v1/matricula/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerSearchFieldsAction$Response(params: MatriculaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return matriculaControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerSearchFieldsAction(params: MatriculaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.matriculaControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `matriculaControllerIncluirComDocumentos()` */
  static readonly MatriculaControllerIncluirComDocumentosPath = '/api/v1/matricula/inclusao-com-docs';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerIncluirComDocumentos$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerIncluirComDocumentos$FormData$Response(params?: MatriculaControllerIncluirComDocumentos$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaDto>> {
    return matriculaControllerIncluirComDocumentos$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerIncluirComDocumentos$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerIncluirComDocumentos$FormData(params?: MatriculaControllerIncluirComDocumentos$FormData$Params, context?: HttpContext): Observable<MatriculaDto> {
    return this.matriculaControllerIncluirComDocumentos$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>): MatriculaDto => r.body)
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
  matriculaControllerIncluirComDocumentos$Json$Response(params?: MatriculaControllerIncluirComDocumentos$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaDto>> {
    return matriculaControllerIncluirComDocumentos$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerIncluirComDocumentos$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  matriculaControllerIncluirComDocumentos$Json(params?: MatriculaControllerIncluirComDocumentos$Json$Params, context?: HttpContext): Observable<MatriculaDto> {
    return this.matriculaControllerIncluirComDocumentos$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>): MatriculaDto => r.body)
    );
  }

  /** Path part for operation `matriculaControllerUploadDocumentos()` */
  static readonly MatriculaControllerUploadDocumentosPath = '/api/v1/matricula/documentos';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerUploadDocumentos()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumentos$Response(params: MatriculaControllerUploadDocumentos$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaDto>> {
    return matriculaControllerUploadDocumentos(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerUploadDocumentos$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumentos(params: MatriculaControllerUploadDocumentos$Params, context?: HttpContext): Observable<MatriculaDto> {
    return this.matriculaControllerUploadDocumentos$Response(params, context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>): MatriculaDto => r.body)
    );
  }

  /** Path part for operation `matriculaControllerUploadDocumento()` */
  static readonly MatriculaControllerUploadDocumentoPath = '/api/v1/matricula/documento';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerUploadDocumento()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumento$Response(params: MatriculaControllerUploadDocumento$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaDto>> {
    return matriculaControllerUploadDocumento(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerUploadDocumento$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerUploadDocumento(params: MatriculaControllerUploadDocumento$Params, context?: HttpContext): Observable<MatriculaDto> {
    return this.matriculaControllerUploadDocumento$Response(params, context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>): MatriculaDto => r.body)
    );
  }

  /** Path part for operation `matriculaControllerAtualizaDocumentoMatricula()` */
  static readonly MatriculaControllerAtualizaDocumentoMatriculaPath = '/api/v1/matricula/documento/atualiza-documento';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerAtualizaDocumentoMatricula()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerAtualizaDocumentoMatricula$Response(params: MatriculaControllerAtualizaDocumentoMatricula$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaDto>> {
    return matriculaControllerAtualizaDocumentoMatricula(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerAtualizaDocumentoMatricula$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  matriculaControllerAtualizaDocumentoMatricula(params: MatriculaControllerAtualizaDocumentoMatricula$Params, context?: HttpContext): Observable<MatriculaDto> {
    return this.matriculaControllerAtualizaDocumentoMatricula$Response(params, context).pipe(
      map((r: StrictHttpResponse<MatriculaDto>): MatriculaDto => r.body)
    );
  }

  /** Path part for operation `matriculaControllerGetTermo()` */
  static readonly MatriculaControllerGetTermoPath = '/api/v1/matricula/termo/{caminhodoc}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerGetTermo()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetTermo$Response(params: MatriculaControllerGetTermo$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return matriculaControllerGetTermo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerGetTermo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetTermo(params: MatriculaControllerGetTermo$Params, context?: HttpContext): Observable<Blob> {
    return this.matriculaControllerGetTermo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

  /** Path part for operation `matriculaControllerListAllPage()` */
  static readonly MatriculaControllerListAllPagePath = '/api/v1/matricula/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAllPage$Response(params: MatriculaControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return matriculaControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAllPage(params: MatriculaControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.matriculaControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `matriculaControllerGetDocumentoMatricula()` */
  static readonly MatriculaControllerGetDocumentoMatriculaPath = '/api/v1/matricula/obter-documento';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerGetDocumentoMatricula()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetDocumentoMatricula$Response(params: MatriculaControllerGetDocumentoMatricula$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return matriculaControllerGetDocumentoMatricula(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerGetDocumentoMatricula$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetDocumentoMatricula(params: MatriculaControllerGetDocumentoMatricula$Params, context?: HttpContext): Observable<void> {
    return this.matriculaControllerGetDocumentoMatricula$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `matriculaControllerGetMatriculaVisualizar()` */
  static readonly MatriculaControllerGetMatriculaVisualizarPath = '/api/v1/matricula/matricula-visualiza';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerGetMatriculaVisualizar()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetMatriculaVisualizar$Response(params: MatriculaControllerGetMatriculaVisualizar$Params, context?: HttpContext): Observable<StrictHttpResponse<MatriculaVisualizarDto>> {
    return matriculaControllerGetMatriculaVisualizar(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerGetMatriculaVisualizar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerGetMatriculaVisualizar(params: MatriculaControllerGetMatriculaVisualizar$Params, context?: HttpContext): Observable<MatriculaVisualizarDto> {
    return this.matriculaControllerGetMatriculaVisualizar$Response(params, context).pipe(
      map((r: StrictHttpResponse<MatriculaVisualizarDto>): MatriculaVisualizarDto => r.body)
    );
  }

  /** Path part for operation `matriculaControllerListarAlunosPorTurma()` */
  static readonly MatriculaControllerListarAlunosPorTurmaPath = '/api/v1/matricula/listar-por-turma';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListarAlunosPorTurma()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListarAlunosPorTurma$Response(params: MatriculaControllerListarAlunosPorTurma$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MatriculaListagemDto>>> {
    return matriculaControllerListarAlunosPorTurma(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListarAlunosPorTurma$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListarAlunosPorTurma(params: MatriculaControllerListarAlunosPorTurma$Params, context?: HttpContext): Observable<Array<MatriculaListagemDto>> {
    return this.matriculaControllerListarAlunosPorTurma$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MatriculaListagemDto>>): Array<MatriculaListagemDto> => r.body)
    );
  }

  /** Path part for operation `matriculaControllerListarMatriculasListagemPorStatus()` */
  static readonly MatriculaControllerListarMatriculasListagemPorStatusPath = '/api/v1/matricula/listar-matriculas-status';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListarMatriculasListagemPorStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListarMatriculasListagemPorStatus$Response(params: MatriculaControllerListarMatriculasListagemPorStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MatriculaListagemDto>>> {
    return matriculaControllerListarMatriculasListagemPorStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListarMatriculasListagemPorStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListarMatriculasListagemPorStatus(params: MatriculaControllerListarMatriculasListagemPorStatus$Params, context?: HttpContext): Observable<Array<MatriculaListagemDto>> {
    return this.matriculaControllerListarMatriculasListagemPorStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MatriculaListagemDto>>): Array<MatriculaListagemDto> => r.body)
    );
  }

  /** Path part for operation `matriculaControllerCount()` */
  static readonly MatriculaControllerCountPath = '/api/v1/matricula/listar-matriculas-status-pagination';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerCount$Response(params: MatriculaControllerCount$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return matriculaControllerCount(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerCount(params: MatriculaControllerCount$Params, context?: HttpContext): Observable<number> {
    return this.matriculaControllerCount$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `matriculaControllerListAllPageMatriculaListagemDto()` */
  static readonly MatriculaControllerListAllPageMatriculaListagemDtoPath = '/api/v1/matricula/listar-matriculas-status-pagination/{offset}/{pageSize}';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `matriculaControllerListAllPageMatriculaListagemDto()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAllPageMatriculaListagemDto$Response(params: MatriculaControllerListAllPageMatriculaListagemDto$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MatriculaListagemDto>>> {
    return matriculaControllerListAllPageMatriculaListagemDto(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `matriculaControllerListAllPageMatriculaListagemDto$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  matriculaControllerListAllPageMatriculaListagemDto(params: MatriculaControllerListAllPageMatriculaListagemDto$Params, context?: HttpContext): Observable<Array<MatriculaListagemDto>> {
    return this.matriculaControllerListAllPageMatriculaListagemDto$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MatriculaListagemDto>>): Array<MatriculaListagemDto> => r.body)
    );
  }

}
