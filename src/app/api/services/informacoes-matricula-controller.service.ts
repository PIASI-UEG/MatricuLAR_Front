/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { informacoesMatriculaControllerAlterar } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-alterar';
import { InformacoesMatriculaControllerAlterar$Params } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-alterar';
import { informacoesMatriculaControllerIncluir } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-incluir';
import { InformacoesMatriculaControllerIncluir$Params } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-incluir';
import { informacoesMatriculaControllerListAll } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-list-all';
import { InformacoesMatriculaControllerListAll$Params } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-list-all';
import { informacoesMatriculaControllerListAllPage } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-list-all-page';
import { InformacoesMatriculaControllerListAllPage$Params } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-list-all-page';
import { informacoesMatriculaControllerObterPorId } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-obter-por-id';
import { InformacoesMatriculaControllerObterPorId$Params } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-obter-por-id';
import { informacoesMatriculaControllerRemover } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-remover';
import { InformacoesMatriculaControllerRemover$Params } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-remover';
import { informacoesMatriculaControllerSearchFieldsAction } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-search-fields-action';
import { InformacoesMatriculaControllerSearchFieldsAction$Params } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-search-fields-action';
import { informacoesMatriculaControllerSearchFieldsList } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-search-fields-list';
import { InformacoesMatriculaControllerSearchFieldsList$Params } from '../fn/informacoes-matricula-controller/informacoes-matricula-controller-search-fields-list';
import { SearchField } from '../models/search-field';

@Injectable({ providedIn: 'root' })
export class InformacoesMatriculaControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `informacoesMatriculaControllerObterPorId()` */
  static readonly InformacoesMatriculaControllerObterPorIdPath = '/api/v1/infomatricula/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerObterPorId$Response(params: InformacoesMatriculaControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return informacoesMatriculaControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerObterPorId(params: InformacoesMatriculaControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.informacoesMatriculaControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `informacoesMatriculaControllerAlterar()` */
  static readonly InformacoesMatriculaControllerAlterarPath = '/api/v1/infomatricula/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerAlterar$Response(params: InformacoesMatriculaControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return informacoesMatriculaControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerAlterar(params: InformacoesMatriculaControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.informacoesMatriculaControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `informacoesMatriculaControllerRemover()` */
  static readonly InformacoesMatriculaControllerRemoverPath = '/api/v1/infomatricula/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerRemover$Response(params: InformacoesMatriculaControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return informacoesMatriculaControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerRemover(params: InformacoesMatriculaControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.informacoesMatriculaControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `informacoesMatriculaControllerListAll()` */
  static readonly InformacoesMatriculaControllerListAllPath = '/api/v1/infomatricula';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerListAll$Response(params?: InformacoesMatriculaControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return informacoesMatriculaControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerListAll(params?: InformacoesMatriculaControllerListAll$Params, context?: HttpContext): Observable<any> {
    return this.informacoesMatriculaControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `informacoesMatriculaControllerIncluir()` */
  static readonly InformacoesMatriculaControllerIncluirPath = '/api/v1/infomatricula';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerIncluir$Response(params: InformacoesMatriculaControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return informacoesMatriculaControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerIncluir(params: InformacoesMatriculaControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.informacoesMatriculaControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `informacoesMatriculaControllerSearchFieldsList()` */
  static readonly InformacoesMatriculaControllerSearchFieldsListPath = '/api/v1/infomatricula/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerSearchFieldsList$Response(params?: InformacoesMatriculaControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return informacoesMatriculaControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerSearchFieldsList(params?: InformacoesMatriculaControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.informacoesMatriculaControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `informacoesMatriculaControllerSearchFieldsAction()` */
  static readonly InformacoesMatriculaControllerSearchFieldsActionPath = '/api/v1/infomatricula/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerSearchFieldsAction$Response(params: InformacoesMatriculaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return informacoesMatriculaControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerSearchFieldsAction(params: InformacoesMatriculaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.informacoesMatriculaControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `informacoesMatriculaControllerListAllPage()` */
  static readonly InformacoesMatriculaControllerListAllPagePath = '/api/v1/infomatricula/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerListAllPage$Response(params: InformacoesMatriculaControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return informacoesMatriculaControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerListAllPage(params: InformacoesMatriculaControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.informacoesMatriculaControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
