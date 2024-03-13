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

import { NecessidadeEspecialDto } from '../models/necessidade-especial-dto';
import { Pageable } from '../models/pageable';
import { SearchField } from '../models/search-field';
import { SearchFieldValue } from '../models/search-field-value';

@Injectable({
  providedIn: 'root',
})
export class NecessidadeEspecialControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation necessidadeEspecialControllerObterPorId
   */
  static readonly NecessidadeEspecialControllerObterPorIdPath = '/api/v1/necessidade_esp/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, NecessidadeEspecialControllerService.NecessidadeEspecialControllerObterPorIdPath, 'get');
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
   * To access the full response (for headers, for example), `necessidadeEspecialControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.necessidadeEspecialControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation necessidadeEspecialControllerAlterar
   */
  static readonly NecessidadeEspecialControllerAlterarPath = '/api/v1/necessidade_esp/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerAlterar$Response(params: {
    id: number;
    body: NecessidadeEspecialDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, NecessidadeEspecialControllerService.NecessidadeEspecialControllerAlterarPath, 'put');
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
   * To access the full response (for headers, for example), `necessidadeEspecialControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerAlterar(params: {
    id: number;
    body: NecessidadeEspecialDto
  },
  context?: HttpContext

): Observable<any> {

    return this.necessidadeEspecialControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation necessidadeEspecialControllerRemover
   */
  static readonly NecessidadeEspecialControllerRemoverPath = '/api/v1/necessidade_esp/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, NecessidadeEspecialControllerService.NecessidadeEspecialControllerRemoverPath, 'delete');
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
   * To access the full response (for headers, for example), `necessidadeEspecialControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.necessidadeEspecialControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation necessidadeEspecialControllerListAll
   */
  static readonly NecessidadeEspecialControllerListAllPath = '/api/v1/necessidade_esp';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, NecessidadeEspecialControllerService.NecessidadeEspecialControllerListAllPath, 'get');
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
   * To access the full response (for headers, for example), `necessidadeEspecialControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.necessidadeEspecialControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation necessidadeEspecialControllerIncluir
   */
  static readonly NecessidadeEspecialControllerIncluirPath = '/api/v1/necessidade_esp';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerIncluir$Response(params: {
    body: NecessidadeEspecialDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, NecessidadeEspecialControllerService.NecessidadeEspecialControllerIncluirPath, 'post');
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
   * To access the full response (for headers, for example), `necessidadeEspecialControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerIncluir(params: {
    body: NecessidadeEspecialDto
  },
  context?: HttpContext

): Observable<any> {

    return this.necessidadeEspecialControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation necessidadeEspecialControllerSearchFieldsList
   */
  static readonly NecessidadeEspecialControllerSearchFieldsListPath = '/api/v1/necessidade_esp/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerSearchFieldsList$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<SearchField>>> {

    const rb = new RequestBuilder(this.rootUrl, NecessidadeEspecialControllerService.NecessidadeEspecialControllerSearchFieldsListPath, 'get');
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
   * To access the full response (for headers, for example), `necessidadeEspecialControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerSearchFieldsList(params?: {
  },
  context?: HttpContext

): Observable<Array<SearchField>> {

    return this.necessidadeEspecialControllerSearchFieldsList$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>) => r.body as Array<SearchField>)
    );
  }

  /**
   * Path part for operation necessidadeEspecialControllerSearchFieldsAction
   */
  static readonly NecessidadeEspecialControllerSearchFieldsActionPath = '/api/v1/necessidade_esp/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerSearchFieldsAction$Response(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, NecessidadeEspecialControllerService.NecessidadeEspecialControllerSearchFieldsActionPath, 'post');
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
   * To access the full response (for headers, for example), `necessidadeEspecialControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  necessidadeEspecialControllerSearchFieldsAction(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<any> {

    return this.necessidadeEspecialControllerSearchFieldsAction$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation necessidadeEspecialControllerListAllPage
   */
  static readonly NecessidadeEspecialControllerListAllPagePath = '/api/v1/necessidade_esp/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `necessidadeEspecialControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerListAllPage$Response(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, NecessidadeEspecialControllerService.NecessidadeEspecialControllerListAllPagePath, 'get');
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
   * To access the full response (for headers, for example), `necessidadeEspecialControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  necessidadeEspecialControllerListAllPage(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<any> {

    return this.necessidadeEspecialControllerListAllPage$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
