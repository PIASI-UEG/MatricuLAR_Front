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

import { Pageable } from '../models/pageable';
import { SearchField } from '../models/search-field';
import { SearchFieldValue } from '../models/search-field-value';
import { UsuarioDto } from '../models/usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation usuarioControllerObterPorId
   */
  static readonly UsuarioControllerObterPorIdPath = '/api/v1/usuario/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerObterPorIdPath, 'get');
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
   * To access the full response (for headers, for example), `usuarioControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerAlterar
   */
  static readonly UsuarioControllerAlterarPath = '/api/v1/usuario/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerAlterar$Response(params: {
    id: number;
    body: UsuarioDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerAlterarPath, 'put');
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
   * To access the full response (for headers, for example), `usuarioControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerAlterar(params: {
    id: number;
    body: UsuarioDto
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerRemover
   */
  static readonly UsuarioControllerRemoverPath = '/api/v1/usuario/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerRemoverPath, 'delete');
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
   * To access the full response (for headers, for example), `usuarioControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerIncluir
   */
  static readonly UsuarioControllerIncluirPath = '/api/v1/usuario/singup';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerIncluir()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerIncluir$Response(params: {
    usuarioDTO: UsuarioDto;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerIncluirPath, 'post');
    if (params) {
      rb.query('usuarioDTO', params.usuarioDTO, {});
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
   * To access the full response (for headers, for example), `usuarioControllerIncluir$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerIncluir(params: {
    usuarioDTO: UsuarioDto;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerSearchFieldsList
   */
  static readonly UsuarioControllerSearchFieldsListPath = '/api/v1/usuario/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerSearchFieldsList$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<SearchField>>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerSearchFieldsListPath, 'get');
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
   * To access the full response (for headers, for example), `usuarioControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerSearchFieldsList(params?: {
  },
  context?: HttpContext

): Observable<Array<SearchField>> {

    return this.usuarioControllerSearchFieldsList$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>) => r.body as Array<SearchField>)
    );
  }

  /**
   * Path part for operation usuarioControllerSearchFieldsAction
   */
  static readonly UsuarioControllerSearchFieldsActionPath = '/api/v1/usuario/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerSearchFieldsAction$Response(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerSearchFieldsActionPath, 'post');
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
   * To access the full response (for headers, for example), `usuarioControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerSearchFieldsAction(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerSearchFieldsAction$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerListAll
   */
  static readonly UsuarioControllerListAllPath = '/api/v1/usuario';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerListAllPath, 'get');
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
   * To access the full response (for headers, for example), `usuarioControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerListAllWithSort
   */
  static readonly UsuarioControllerListAllWithSortPath = '/api/v1/usuario/sort/{field}';

  /**
   * Reliza busca ordenada de acordo com o campo
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerListAllWithSort()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAllWithSort$Response(params: {
    field: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerListAllWithSortPath, 'get');
    if (params) {
      rb.path('field', params.field, {});
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
   * Reliza busca ordenada de acordo com o campo
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerListAllWithSort$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAllWithSort(params: {
    field: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerListAllWithSort$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerCount
   */
  static readonly UsuarioControllerCountPath = '/api/v1/usuario/pagination';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerCount$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerCountPath, 'get');
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
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerCount(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerCount$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerListUsuariosWithPagination
   */
  static readonly UsuarioControllerListUsuariosWithPaginationPath = '/api/v1/usuario/pagination/{offset}/{pageSize}';

  /**
   * Realiza busca paginada de acordo com o tamanho da pagina e a pagina
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerListUsuariosWithPagination()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListUsuariosWithPagination$Response(params: {
    offset: number;
    pageSize: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerListUsuariosWithPaginationPath, 'get');
    if (params) {
      rb.path('offset', params.offset, {});
      rb.path('pageSize', params.pageSize, {});
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
   * Realiza busca paginada de acordo com o tamanho da pagina e a pagina
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerListUsuariosWithPagination$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListUsuariosWithPagination(params: {
    offset: number;
    pageSize: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerListUsuariosWithPagination$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerListAllPage
   */
  static readonly UsuarioControllerListAllPagePath = '/api/v1/usuario/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAllPage$Response(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerListAllPagePath, 'get');
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
   * To access the full response (for headers, for example), `usuarioControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAllPage(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerListAllPage$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
