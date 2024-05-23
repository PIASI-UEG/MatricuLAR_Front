/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { responsavelControllerAlterar } from '../fn/responsavel-controller/responsavel-controller-alterar';
import { ResponsavelControllerAlterar$Params } from '../fn/responsavel-controller/responsavel-controller-alterar';
import { responsavelControllerIncluir } from '../fn/responsavel-controller/responsavel-controller-incluir';
import { ResponsavelControllerIncluir$Params } from '../fn/responsavel-controller/responsavel-controller-incluir';
import { responsavelControllerListAll } from '../fn/responsavel-controller/responsavel-controller-list-all';
import { ResponsavelControllerListAll$Params } from '../fn/responsavel-controller/responsavel-controller-list-all';
import { responsavelControllerListAllPage } from '../fn/responsavel-controller/responsavel-controller-list-all-page';
import { ResponsavelControllerListAllPage$Params } from '../fn/responsavel-controller/responsavel-controller-list-all-page';
import { responsavelControllerObterPorId } from '../fn/responsavel-controller/responsavel-controller-obter-por-id';
import { ResponsavelControllerObterPorId$Params } from '../fn/responsavel-controller/responsavel-controller-obter-por-id';
import { responsavelControllerRemover } from '../fn/responsavel-controller/responsavel-controller-remover';
import { ResponsavelControllerRemover$Params } from '../fn/responsavel-controller/responsavel-controller-remover';
import { responsavelControllerSearchFieldsAction } from '../fn/responsavel-controller/responsavel-controller-search-fields-action';
import { ResponsavelControllerSearchFieldsAction$Params } from '../fn/responsavel-controller/responsavel-controller-search-fields-action';
import { responsavelControllerSearchFieldsList } from '../fn/responsavel-controller/responsavel-controller-search-fields-list';
import { ResponsavelControllerSearchFieldsList$Params } from '../fn/responsavel-controller/responsavel-controller-search-fields-list';
import { SearchField } from '../models/search-field';

@Injectable({ providedIn: 'root' })
export class ResponsavelControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `responsavelControllerObterPorId()` */
  static readonly ResponsavelControllerObterPorIdPath = '/api/v1/responsavel/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerObterPorId$Response(params: ResponsavelControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return responsavelControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerObterPorId(params: ResponsavelControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.responsavelControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `responsavelControllerAlterar()` */
  static readonly ResponsavelControllerAlterarPath = '/api/v1/responsavel/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerAlterar$Response(params: ResponsavelControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return responsavelControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerAlterar(params: ResponsavelControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.responsavelControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `responsavelControllerRemover()` */
  static readonly ResponsavelControllerRemoverPath = '/api/v1/responsavel/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerRemover$Response(params: ResponsavelControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return responsavelControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerRemover(params: ResponsavelControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.responsavelControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `responsavelControllerListAll()` */
  static readonly ResponsavelControllerListAllPath = '/api/v1/responsavel';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerListAll$Response(params?: ResponsavelControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return responsavelControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerListAll(params?: ResponsavelControllerListAll$Params, context?: HttpContext): Observable<any> {
    return this.responsavelControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `responsavelControllerIncluir()` */
  static readonly ResponsavelControllerIncluirPath = '/api/v1/responsavel';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerIncluir$Response(params: ResponsavelControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return responsavelControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerIncluir(params: ResponsavelControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.responsavelControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `responsavelControllerSearchFieldsList()` */
  static readonly ResponsavelControllerSearchFieldsListPath = '/api/v1/responsavel/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerSearchFieldsList$Response(params?: ResponsavelControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return responsavelControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerSearchFieldsList(params?: ResponsavelControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.responsavelControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `responsavelControllerSearchFieldsAction()` */
  static readonly ResponsavelControllerSearchFieldsActionPath = '/api/v1/responsavel/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerSearchFieldsAction$Response(params: ResponsavelControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return responsavelControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerSearchFieldsAction(params: ResponsavelControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.responsavelControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `responsavelControllerListAllPage()` */
  static readonly ResponsavelControllerListAllPagePath = '/api/v1/responsavel/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerListAllPage$Response(params: ResponsavelControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return responsavelControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerListAllPage(params: ResponsavelControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.responsavelControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
