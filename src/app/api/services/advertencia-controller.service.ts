/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { advertenciaControllerAlterar } from '../fn/advertencia-controller/advertencia-controller-alterar';
import { AdvertenciaControllerAlterar$Params } from '../fn/advertencia-controller/advertencia-controller-alterar';
import { advertenciaControllerIncluir } from '../fn/advertencia-controller/advertencia-controller-incluir';
import { AdvertenciaControllerIncluir$Params } from '../fn/advertencia-controller/advertencia-controller-incluir';
import { advertenciaControllerListAll } from '../fn/advertencia-controller/advertencia-controller-list-all';
import { AdvertenciaControllerListAll$Params } from '../fn/advertencia-controller/advertencia-controller-list-all';
import { advertenciaControllerListAllPage } from '../fn/advertencia-controller/advertencia-controller-list-all-page';
import { AdvertenciaControllerListAllPage$Params } from '../fn/advertencia-controller/advertencia-controller-list-all-page';
import { advertenciaControllerObterPorId } from '../fn/advertencia-controller/advertencia-controller-obter-por-id';
import { AdvertenciaControllerObterPorId$Params } from '../fn/advertencia-controller/advertencia-controller-obter-por-id';
import { advertenciaControllerRemover } from '../fn/advertencia-controller/advertencia-controller-remover';
import { AdvertenciaControllerRemover$Params } from '../fn/advertencia-controller/advertencia-controller-remover';
import { advertenciaControllerSearchFieldsAction } from '../fn/advertencia-controller/advertencia-controller-search-fields-action';
import { AdvertenciaControllerSearchFieldsAction$Params } from '../fn/advertencia-controller/advertencia-controller-search-fields-action';
import { advertenciaControllerSearchFieldsList } from '../fn/advertencia-controller/advertencia-controller-search-fields-list';
import { AdvertenciaControllerSearchFieldsList$Params } from '../fn/advertencia-controller/advertencia-controller-search-fields-list';
import { SearchField } from '../models/search-field';

@Injectable({ providedIn: 'root' })
export class AdvertenciaControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `advertenciaControllerObterPorId()` */
  static readonly AdvertenciaControllerObterPorIdPath = '/api/v1/advertencia/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertenciaControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerObterPorId$Response(params: AdvertenciaControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return advertenciaControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `advertenciaControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerObterPorId(params: AdvertenciaControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.advertenciaControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `advertenciaControllerAlterar()` */
  static readonly AdvertenciaControllerAlterarPath = '/api/v1/advertencia/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertenciaControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertenciaControllerAlterar$Response(params: AdvertenciaControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return advertenciaControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `advertenciaControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertenciaControllerAlterar(params: AdvertenciaControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.advertenciaControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `advertenciaControllerRemover()` */
  static readonly AdvertenciaControllerRemoverPath = '/api/v1/advertencia/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertenciaControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerRemover$Response(params: AdvertenciaControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return advertenciaControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `advertenciaControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerRemover(params: AdvertenciaControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.advertenciaControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `advertenciaControllerListAll()` */
  static readonly AdvertenciaControllerListAllPath = '/api/v1/advertencia';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertenciaControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerListAll$Response(params?: AdvertenciaControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return advertenciaControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `advertenciaControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerListAll(params?: AdvertenciaControllerListAll$Params, context?: HttpContext): Observable<any> {
    return this.advertenciaControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `advertenciaControllerIncluir()` */
  static readonly AdvertenciaControllerIncluirPath = '/api/v1/advertencia';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertenciaControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertenciaControllerIncluir$Response(params: AdvertenciaControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return advertenciaControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `advertenciaControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertenciaControllerIncluir(params: AdvertenciaControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.advertenciaControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `advertenciaControllerSearchFieldsList()` */
  static readonly AdvertenciaControllerSearchFieldsListPath = '/api/v1/advertencia/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertenciaControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerSearchFieldsList$Response(params?: AdvertenciaControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return advertenciaControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `advertenciaControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerSearchFieldsList(params?: AdvertenciaControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.advertenciaControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `advertenciaControllerSearchFieldsAction()` */
  static readonly AdvertenciaControllerSearchFieldsActionPath = '/api/v1/advertencia/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertenciaControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertenciaControllerSearchFieldsAction$Response(params: AdvertenciaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return advertenciaControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `advertenciaControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertenciaControllerSearchFieldsAction(params: AdvertenciaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.advertenciaControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `advertenciaControllerListAllPage()` */
  static readonly AdvertenciaControllerListAllPagePath = '/api/v1/advertencia/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertenciaControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerListAllPage$Response(params: AdvertenciaControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return advertenciaControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `advertenciaControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertenciaControllerListAllPage(params: AdvertenciaControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.advertenciaControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
