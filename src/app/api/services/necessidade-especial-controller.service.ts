/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { necessidadeEspecialControllerAlterar } from '../fn/necessidade-especial-controller/necessidade-especial-controller-alterar';
import { NecessidadeEspecialControllerAlterar$Params } from '../fn/necessidade-especial-controller/necessidade-especial-controller-alterar';
import { necessidadeEspecialControllerIncluir } from '../fn/necessidade-especial-controller/necessidade-especial-controller-incluir';
import { NecessidadeEspecialControllerIncluir$Params } from '../fn/necessidade-especial-controller/necessidade-especial-controller-incluir';
import { necessidadeEspecialControllerListAll } from '../fn/necessidade-especial-controller/necessidade-especial-controller-list-all';
import { NecessidadeEspecialControllerListAll$Params } from '../fn/necessidade-especial-controller/necessidade-especial-controller-list-all';
import { necessidadeEspecialControllerListAllPage } from '../fn/necessidade-especial-controller/necessidade-especial-controller-list-all-page';
import { NecessidadeEspecialControllerListAllPage$Params } from '../fn/necessidade-especial-controller/necessidade-especial-controller-list-all-page';
import { necessidadeEspecialControllerObterPorId } from '../fn/necessidade-especial-controller/necessidade-especial-controller-obter-por-id';
import { NecessidadeEspecialControllerObterPorId$Params } from '../fn/necessidade-especial-controller/necessidade-especial-controller-obter-por-id';
import { necessidadeEspecialControllerRemover } from '../fn/necessidade-especial-controller/necessidade-especial-controller-remover';
import { NecessidadeEspecialControllerRemover$Params } from '../fn/necessidade-especial-controller/necessidade-especial-controller-remover';
import { necessidadeEspecialControllerSearchFieldsAction } from '../fn/necessidade-especial-controller/necessidade-especial-controller-search-fields-action';
import { NecessidadeEspecialControllerSearchFieldsAction$Params } from '../fn/necessidade-especial-controller/necessidade-especial-controller-search-fields-action';
import { necessidadeEspecialControllerSearchFieldsList } from '../fn/necessidade-especial-controller/necessidade-especial-controller-search-fields-list';
import { NecessidadeEspecialControllerSearchFieldsList$Params } from '../fn/necessidade-especial-controller/necessidade-especial-controller-search-fields-list';
import { NecessidadeEspecialDto } from '../models/necessidade-especial-dto';
import { SearchField } from '../models/search-field';

@Injectable({ providedIn: 'root' })
export class NecessidadeEspecialControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `necessidadeEspecialControllerObterPorId()` */
  static readonly NecessidadeEspecialControllerObterPorIdPath = '/api/v1/necessidade_esp/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerObterPorId$Response(params: NecessidadeEspecialControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return necessidadeEspecialControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `necessidadeEspecialControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerObterPorId(params: NecessidadeEspecialControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.necessidadeEspecialControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `necessidadeEspecialControllerAlterar()` */
  static readonly NecessidadeEspecialControllerAlterarPath = '/api/v1/necessidade_esp/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerAlterar$Response(params: NecessidadeEspecialControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return necessidadeEspecialControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `necessidadeEspecialControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerAlterar(params: NecessidadeEspecialControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.necessidadeEspecialControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `necessidadeEspecialControllerRemover()` */
  static readonly NecessidadeEspecialControllerRemoverPath = '/api/v1/necessidade_esp/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerRemover$Response(params: NecessidadeEspecialControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return necessidadeEspecialControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `necessidadeEspecialControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerRemover(params: NecessidadeEspecialControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.necessidadeEspecialControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `necessidadeEspecialControllerListAll()` */
  static readonly NecessidadeEspecialControllerListAllPath = '/api/v1/necessidade_esp';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerListAll$Response(params?: NecessidadeEspecialControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NecessidadeEspecialDto>>> {
    return necessidadeEspecialControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `necessidadeEspecialControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerListAll(params?: NecessidadeEspecialControllerListAll$Params, context?: HttpContext): Observable<Array<NecessidadeEspecialDto>> {
    return this.necessidadeEspecialControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<NecessidadeEspecialDto>>): Array<NecessidadeEspecialDto> => r.body)
    );
  }

  /** Path part for operation `necessidadeEspecialControllerIncluir()` */
  static readonly NecessidadeEspecialControllerIncluirPath = '/api/v1/necessidade_esp';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerIncluir$Response(params: NecessidadeEspecialControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return necessidadeEspecialControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `necessidadeEspecialControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerIncluir(params: NecessidadeEspecialControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.necessidadeEspecialControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `necessidadeEspecialControllerSearchFieldsList()` */
  static readonly NecessidadeEspecialControllerSearchFieldsListPath = '/api/v1/necessidade_esp/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerSearchFieldsList$Response(params?: NecessidadeEspecialControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return necessidadeEspecialControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `necessidadeEspecialControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerSearchFieldsList(params?: NecessidadeEspecialControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.necessidadeEspecialControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `necessidadeEspecialControllerSearchFieldsAction()` */
  static readonly NecessidadeEspecialControllerSearchFieldsActionPath = '/api/v1/necessidade_esp/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerSearchFieldsAction$Response(params: NecessidadeEspecialControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return necessidadeEspecialControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `necessidadeEspecialControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerSearchFieldsAction(params: NecessidadeEspecialControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.necessidadeEspecialControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `necessidadeEspecialControllerListAllPage()` */
  static readonly NecessidadeEspecialControllerListAllPagePath = '/api/v1/necessidade_esp/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerListAllPage$Response(params: NecessidadeEspecialControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return necessidadeEspecialControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `necessidadeEspecialControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerListAllPage(params: NecessidadeEspecialControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.necessidadeEspecialControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
