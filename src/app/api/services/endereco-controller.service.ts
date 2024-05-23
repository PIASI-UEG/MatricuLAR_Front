/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { enderecoControllerAlterar } from '../fn/endereco-controller/endereco-controller-alterar';
import { EnderecoControllerAlterar$Params } from '../fn/endereco-controller/endereco-controller-alterar';
import { enderecoControllerIncluir } from '../fn/endereco-controller/endereco-controller-incluir';
import { EnderecoControllerIncluir$Params } from '../fn/endereco-controller/endereco-controller-incluir';
import { enderecoControllerListAll } from '../fn/endereco-controller/endereco-controller-list-all';
import { EnderecoControllerListAll$Params } from '../fn/endereco-controller/endereco-controller-list-all';
import { enderecoControllerListAllPage } from '../fn/endereco-controller/endereco-controller-list-all-page';
import { EnderecoControllerListAllPage$Params } from '../fn/endereco-controller/endereco-controller-list-all-page';
import { enderecoControllerObterPorId } from '../fn/endereco-controller/endereco-controller-obter-por-id';
import { EnderecoControllerObterPorId$Params } from '../fn/endereco-controller/endereco-controller-obter-por-id';
import { enderecoControllerRemover } from '../fn/endereco-controller/endereco-controller-remover';
import { EnderecoControllerRemover$Params } from '../fn/endereco-controller/endereco-controller-remover';
import { enderecoControllerSearchFieldsAction } from '../fn/endereco-controller/endereco-controller-search-fields-action';
import { EnderecoControllerSearchFieldsAction$Params } from '../fn/endereco-controller/endereco-controller-search-fields-action';
import { enderecoControllerSearchFieldsList } from '../fn/endereco-controller/endereco-controller-search-fields-list';
import { EnderecoControllerSearchFieldsList$Params } from '../fn/endereco-controller/endereco-controller-search-fields-list';
import { SearchField } from '../models/search-field';

@Injectable({ providedIn: 'root' })
export class EnderecoControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `enderecoControllerObterPorId()` */
  static readonly EnderecoControllerObterPorIdPath = '/api/v1/endereco/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enderecoControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerObterPorId$Response(params: EnderecoControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return enderecoControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enderecoControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerObterPorId(params: EnderecoControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.enderecoControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `enderecoControllerAlterar()` */
  static readonly EnderecoControllerAlterarPath = '/api/v1/endereco/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enderecoControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  enderecoControllerAlterar$Response(params: EnderecoControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return enderecoControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enderecoControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  enderecoControllerAlterar(params: EnderecoControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.enderecoControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `enderecoControllerRemover()` */
  static readonly EnderecoControllerRemoverPath = '/api/v1/endereco/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enderecoControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerRemover$Response(params: EnderecoControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return enderecoControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enderecoControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerRemover(params: EnderecoControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.enderecoControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `enderecoControllerListAll()` */
  static readonly EnderecoControllerListAllPath = '/api/v1/endereco';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enderecoControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerListAll$Response(params?: EnderecoControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return enderecoControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enderecoControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerListAll(params?: EnderecoControllerListAll$Params, context?: HttpContext): Observable<any> {
    return this.enderecoControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `enderecoControllerIncluir()` */
  static readonly EnderecoControllerIncluirPath = '/api/v1/endereco';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enderecoControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  enderecoControllerIncluir$Response(params: EnderecoControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return enderecoControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enderecoControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  enderecoControllerIncluir(params: EnderecoControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.enderecoControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `enderecoControllerSearchFieldsList()` */
  static readonly EnderecoControllerSearchFieldsListPath = '/api/v1/endereco/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enderecoControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerSearchFieldsList$Response(params?: EnderecoControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return enderecoControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enderecoControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerSearchFieldsList(params?: EnderecoControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.enderecoControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `enderecoControllerSearchFieldsAction()` */
  static readonly EnderecoControllerSearchFieldsActionPath = '/api/v1/endereco/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enderecoControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  enderecoControllerSearchFieldsAction$Response(params: EnderecoControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return enderecoControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enderecoControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  enderecoControllerSearchFieldsAction(params: EnderecoControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.enderecoControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `enderecoControllerListAllPage()` */
  static readonly EnderecoControllerListAllPagePath = '/api/v1/endereco/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enderecoControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerListAllPage$Response(params: EnderecoControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return enderecoControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enderecoControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  enderecoControllerListAllPage(params: EnderecoControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.enderecoControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
