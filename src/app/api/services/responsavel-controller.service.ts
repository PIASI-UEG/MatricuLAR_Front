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

import { PageResponsavelDto } from '../models/page-responsavel-dto';
import { Pageable } from '../models/pageable';
import { PkResponsavel } from '../models/pk-responsavel';
import { ResponsavelDto } from '../models/responsavel-dto';
import { SearchField } from '../models/search-field';
import { SearchFieldValue } from '../models/search-field-value';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation responsavelControllerObterPorId
   */
  static readonly ResponsavelControllerObterPorIdPath = '/api/v1/responsavel/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerObterPorId$Response(params: {
    id: PkResponsavel;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ResponsavelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerObterPorIdPath, 'get');
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
        return r as StrictHttpResponse<ResponsavelDto>;
      })
    );
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerObterPorId(params: {
    id: PkResponsavel;
  },
  context?: HttpContext

): Observable<ResponsavelDto> {

    return this.responsavelControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<ResponsavelDto>) => r.body as ResponsavelDto)
    );
  }

  /**
   * Path part for operation responsavelControllerAlterar
   */
  static readonly ResponsavelControllerAlterarPath = '/api/v1/responsavel/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerAlterar$Response(params: {
    id: PkResponsavel;
    body: ResponsavelDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ResponsavelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerAlterarPath, 'put');
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
        return r as StrictHttpResponse<ResponsavelDto>;
      })
    );
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerAlterar(params: {
    id: PkResponsavel;
    body: ResponsavelDto
  },
  context?: HttpContext

): Observable<ResponsavelDto> {

    return this.responsavelControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<ResponsavelDto>) => r.body as ResponsavelDto)
    );
  }

  /**
   * Path part for operation responsavelControllerRemover
   */
  static readonly ResponsavelControllerRemoverPath = '/api/v1/responsavel/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerRemover$Response(params: {
    id: PkResponsavel;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ResponsavelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerRemoverPath, 'delete');
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
        return r as StrictHttpResponse<ResponsavelDto>;
      })
    );
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerRemover(params: {
    id: PkResponsavel;
  },
  context?: HttpContext

): Observable<ResponsavelDto> {

    return this.responsavelControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<ResponsavelDto>) => r.body as ResponsavelDto)
    );
  }

  /**
   * Path part for operation responsavelControllerListAll
   */
  static readonly ResponsavelControllerListAllPath = '/api/v1/responsavel';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ResponsavelDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ResponsavelDto>>;
      })
    );
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<Array<ResponsavelDto>> {

    return this.responsavelControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ResponsavelDto>>) => r.body as Array<ResponsavelDto>)
    );
  }

  /**
   * Path part for operation responsavelControllerIncluir
   */
  static readonly ResponsavelControllerIncluirPath = '/api/v1/responsavel';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerIncluir$Response(params: {
    body: ResponsavelDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ResponsavelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerIncluirPath, 'post');
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
        return r as StrictHttpResponse<ResponsavelDto>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerIncluir(params: {
    body: ResponsavelDto
  },
  context?: HttpContext

): Observable<ResponsavelDto> {

    return this.responsavelControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<ResponsavelDto>) => r.body as ResponsavelDto)
    );
  }

  /**
   * Path part for operation responsavelControllerSearchFieldsList
   */
  static readonly ResponsavelControllerSearchFieldsListPath = '/api/v1/responsavel/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerSearchFieldsList$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<SearchField>>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerSearchFieldsListPath, 'get');
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
   * To access the full response (for headers, for example), `responsavelControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerSearchFieldsList(params?: {
  },
  context?: HttpContext

): Observable<Array<SearchField>> {

    return this.responsavelControllerSearchFieldsList$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>) => r.body as Array<SearchField>)
    );
  }

  /**
   * Path part for operation responsavelControllerSearchFieldsAction
   */
  static readonly ResponsavelControllerSearchFieldsActionPath = '/api/v1/responsavel/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerSearchFieldsAction$Response(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ResponsavelDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerSearchFieldsActionPath, 'post');
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
        return r as StrictHttpResponse<Array<ResponsavelDto>>;
      })
    );
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerSearchFieldsAction(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<Array<ResponsavelDto>> {

    return this.responsavelControllerSearchFieldsAction$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ResponsavelDto>>) => r.body as Array<ResponsavelDto>)
    );
  }

  /**
   * Path part for operation responsavelControllerSearchFieldsActionPage
   */
  static readonly ResponsavelControllerSearchFieldsActionPagePath = '/api/v1/responsavel/search-fields/page';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerSearchFieldsActionPage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerSearchFieldsActionPage$Response(params: {
    page?: number;
    size?: number;
    sort?: Array<string>;
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PageResponsavelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerSearchFieldsActionPagePath, 'post');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageResponsavelDto>;
      })
    );
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerSearchFieldsActionPage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerSearchFieldsActionPage(params: {
    page?: number;
    size?: number;
    sort?: Array<string>;
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<PageResponsavelDto> {

    return this.responsavelControllerSearchFieldsActionPage$Response(params,context).pipe(
      map((r: StrictHttpResponse<PageResponsavelDto>) => r.body as PageResponsavelDto)
    );
  }

  /**
   * Path part for operation responsavelControllerIncluirResponsavel
   */
  static readonly ResponsavelControllerIncluirResponsavelPath = '/api/v1/responsavel/incluir-responsavel';

  /**
   * Adiciona responsavel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerIncluirResponsavel()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerIncluirResponsavel$Response(params: {
    body: ResponsavelDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ResponsavelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerIncluirResponsavelPath, 'post');
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
        return r as StrictHttpResponse<ResponsavelDto>;
      })
    );
  }

  /**
   * Adiciona responsavel
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerIncluirResponsavel$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responsavelControllerIncluirResponsavel(params: {
    body: ResponsavelDto
  },
  context?: HttpContext

): Observable<ResponsavelDto> {

    return this.responsavelControllerIncluirResponsavel$Response(params,context).pipe(
      map((r: StrictHttpResponse<ResponsavelDto>) => r.body as ResponsavelDto)
    );
  }

  /**
   * Path part for operation responsavelControllerListAllPage
   */
  static readonly ResponsavelControllerListAllPagePath = '/api/v1/responsavel/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerListAllPage$Response(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PageResponsavelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerListAllPagePath, 'get');
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
        return r as StrictHttpResponse<PageResponsavelDto>;
      })
    );
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerListAllPage(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<PageResponsavelDto> {

    return this.responsavelControllerListAllPage$Response(params,context).pipe(
      map((r: StrictHttpResponse<PageResponsavelDto>) => r.body as PageResponsavelDto)
    );
  }

  /**
   * Path part for operation responsavelControllerRemoverResponsavel
   */
  static readonly ResponsavelControllerRemoverResponsavelPath = '/api/v1/responsavel/remover-responsavel/{id-matricula}/{cpf-responsavel}';

  /**
   * Remove responsavel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responsavelControllerRemoverResponsavel()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerRemoverResponsavel$Response(params: {
    'id-matricula': number;
    'cpf-responsavel': string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ResponsavelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ResponsavelControllerService.ResponsavelControllerRemoverResponsavelPath, 'delete');
    if (params) {
      rb.path('id-matricula', params['id-matricula'], {});
      rb.path('cpf-responsavel', params['cpf-responsavel'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ResponsavelDto>;
      })
    );
  }

  /**
   * Remove responsavel
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responsavelControllerRemoverResponsavel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responsavelControllerRemoverResponsavel(params: {
    'id-matricula': number;
    'cpf-responsavel': string;
  },
  context?: HttpContext

): Observable<ResponsavelDto> {

    return this.responsavelControllerRemoverResponsavel$Response(params,context).pipe(
      map((r: StrictHttpResponse<ResponsavelDto>) => r.body as ResponsavelDto)
    );
  }

}
