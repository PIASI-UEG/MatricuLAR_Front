/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { pessoaControllerAlterar } from '../fn/pessoa-controller/pessoa-controller-alterar';
import { PessoaControllerAlterar$Params } from '../fn/pessoa-controller/pessoa-controller-alterar';
import { pessoaControllerIncluir } from '../fn/pessoa-controller/pessoa-controller-incluir';
import { PessoaControllerIncluir$Params } from '../fn/pessoa-controller/pessoa-controller-incluir';
import { pessoaControllerListAll } from '../fn/pessoa-controller/pessoa-controller-list-all';
import { PessoaControllerListAll$Params } from '../fn/pessoa-controller/pessoa-controller-list-all';
import { pessoaControllerListAllPage } from '../fn/pessoa-controller/pessoa-controller-list-all-page';
import { PessoaControllerListAllPage$Params } from '../fn/pessoa-controller/pessoa-controller-list-all-page';
import { pessoaControllerObterPorId } from '../fn/pessoa-controller/pessoa-controller-obter-por-id';
import { PessoaControllerObterPorId$Params } from '../fn/pessoa-controller/pessoa-controller-obter-por-id';
import { pessoaControllerRemover } from '../fn/pessoa-controller/pessoa-controller-remover';
import { PessoaControllerRemover$Params } from '../fn/pessoa-controller/pessoa-controller-remover';
import { pessoaControllerSearchFieldsAction } from '../fn/pessoa-controller/pessoa-controller-search-fields-action';
import { PessoaControllerSearchFieldsAction$Params } from '../fn/pessoa-controller/pessoa-controller-search-fields-action';
import { pessoaControllerSearchFieldsList } from '../fn/pessoa-controller/pessoa-controller-search-fields-list';
import { PessoaControllerSearchFieldsList$Params } from '../fn/pessoa-controller/pessoa-controller-search-fields-list';
import { SearchField } from '../models/search-field';

@Injectable({ providedIn: 'root' })
export class PessoaControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `pessoaControllerObterPorId()` */
  static readonly PessoaControllerObterPorIdPath = '/api/v1/pessoa/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pessoaControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerObterPorId$Response(params: PessoaControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return pessoaControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pessoaControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerObterPorId(params: PessoaControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.pessoaControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `pessoaControllerAlterar()` */
  static readonly PessoaControllerAlterarPath = '/api/v1/pessoa/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pessoaControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pessoaControllerAlterar$Response(params: PessoaControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return pessoaControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pessoaControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pessoaControllerAlterar(params: PessoaControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.pessoaControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `pessoaControllerRemover()` */
  static readonly PessoaControllerRemoverPath = '/api/v1/pessoa/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pessoaControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerRemover$Response(params: PessoaControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return pessoaControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pessoaControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerRemover(params: PessoaControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.pessoaControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `pessoaControllerListAll()` */
  static readonly PessoaControllerListAllPath = '/api/v1/pessoa';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pessoaControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerListAll$Response(params?: PessoaControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return pessoaControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pessoaControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerListAll(params?: PessoaControllerListAll$Params, context?: HttpContext): Observable<any> {
    return this.pessoaControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `pessoaControllerIncluir()` */
  static readonly PessoaControllerIncluirPath = '/api/v1/pessoa';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pessoaControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pessoaControllerIncluir$Response(params: PessoaControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return pessoaControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pessoaControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pessoaControllerIncluir(params: PessoaControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.pessoaControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `pessoaControllerSearchFieldsList()` */
  static readonly PessoaControllerSearchFieldsListPath = '/api/v1/pessoa/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pessoaControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerSearchFieldsList$Response(params?: PessoaControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return pessoaControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pessoaControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerSearchFieldsList(params?: PessoaControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.pessoaControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `pessoaControllerSearchFieldsAction()` */
  static readonly PessoaControllerSearchFieldsActionPath = '/api/v1/pessoa/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pessoaControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pessoaControllerSearchFieldsAction$Response(params: PessoaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return pessoaControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pessoaControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pessoaControllerSearchFieldsAction(params: PessoaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.pessoaControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `pessoaControllerListAllPage()` */
  static readonly PessoaControllerListAllPagePath = '/api/v1/pessoa/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pessoaControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerListAllPage$Response(params: PessoaControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return pessoaControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pessoaControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pessoaControllerListAllPage(params: PessoaControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.pessoaControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
