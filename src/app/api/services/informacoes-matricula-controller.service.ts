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

import { InformacoesMatriculaDto } from '../models/informacoes-matricula-dto';
import { PageInformacoesMatriculaDto } from '../models/page-informacoes-matricula-dto';
import { Pageable } from '../models/pageable';
import { SearchField } from '../models/search-field';
import { SearchFieldValue } from '../models/search-field-value';

@Injectable({
  providedIn: 'root',
})
export class InformacoesMatriculaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation informacoesMatriculaControllerObterPorId
   */
  static readonly InformacoesMatriculaControllerObterPorIdPath = '/api/v1/infomatricula/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<InformacoesMatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, InformacoesMatriculaControllerService.InformacoesMatriculaControllerObterPorIdPath, 'get');
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
        return r as StrictHttpResponse<InformacoesMatriculaDto>;
      })
    );
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<InformacoesMatriculaDto> {

    return this.informacoesMatriculaControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<InformacoesMatriculaDto>) => r.body as InformacoesMatriculaDto)
    );
  }

  /**
   * Path part for operation informacoesMatriculaControllerAlterar
   */
  static readonly InformacoesMatriculaControllerAlterarPath = '/api/v1/infomatricula/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerAlterar$Response(params: {
    id: number;
    body: InformacoesMatriculaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<InformacoesMatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, InformacoesMatriculaControllerService.InformacoesMatriculaControllerAlterarPath, 'put');
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
        return r as StrictHttpResponse<InformacoesMatriculaDto>;
      })
    );
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerAlterar(params: {
    id: number;
    body: InformacoesMatriculaDto
  },
  context?: HttpContext

): Observable<InformacoesMatriculaDto> {

    return this.informacoesMatriculaControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<InformacoesMatriculaDto>) => r.body as InformacoesMatriculaDto)
    );
  }

  /**
   * Path part for operation informacoesMatriculaControllerRemover
   */
  static readonly InformacoesMatriculaControllerRemoverPath = '/api/v1/infomatricula/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<InformacoesMatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, InformacoesMatriculaControllerService.InformacoesMatriculaControllerRemoverPath, 'delete');
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
        return r as StrictHttpResponse<InformacoesMatriculaDto>;
      })
    );
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<InformacoesMatriculaDto> {

    return this.informacoesMatriculaControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<InformacoesMatriculaDto>) => r.body as InformacoesMatriculaDto)
    );
  }

  /**
   * Path part for operation informacoesMatriculaControllerListAll
   */
  static readonly InformacoesMatriculaControllerListAllPath = '/api/v1/infomatricula';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<InformacoesMatriculaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, InformacoesMatriculaControllerService.InformacoesMatriculaControllerListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<InformacoesMatriculaDto>>;
      })
    );
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<Array<InformacoesMatriculaDto>> {

    return this.informacoesMatriculaControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<InformacoesMatriculaDto>>) => r.body as Array<InformacoesMatriculaDto>)
    );
  }

  /**
   * Path part for operation informacoesMatriculaControllerIncluir
   */
  static readonly InformacoesMatriculaControllerIncluirPath = '/api/v1/infomatricula';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerIncluir$Response(params: {
    body: InformacoesMatriculaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<InformacoesMatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, InformacoesMatriculaControllerService.InformacoesMatriculaControllerIncluirPath, 'post');
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
        return r as StrictHttpResponse<InformacoesMatriculaDto>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerIncluir(params: {
    body: InformacoesMatriculaDto
  },
  context?: HttpContext

): Observable<InformacoesMatriculaDto> {

    return this.informacoesMatriculaControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<InformacoesMatriculaDto>) => r.body as InformacoesMatriculaDto)
    );
  }

  /**
   * Path part for operation informacoesMatriculaControllerSearchFieldsList
   */
  static readonly InformacoesMatriculaControllerSearchFieldsListPath = '/api/v1/infomatricula/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerSearchFieldsList$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<SearchField>>> {

    const rb = new RequestBuilder(this.rootUrl, InformacoesMatriculaControllerService.InformacoesMatriculaControllerSearchFieldsListPath, 'get');
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
   * To access the full response (for headers, for example), `informacoesMatriculaControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerSearchFieldsList(params?: {
  },
  context?: HttpContext

): Observable<Array<SearchField>> {

    return this.informacoesMatriculaControllerSearchFieldsList$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>) => r.body as Array<SearchField>)
    );
  }

  /**
   * Path part for operation informacoesMatriculaControllerSearchFieldsAction
   */
  static readonly InformacoesMatriculaControllerSearchFieldsActionPath = '/api/v1/infomatricula/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerSearchFieldsAction$Response(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<InformacoesMatriculaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, InformacoesMatriculaControllerService.InformacoesMatriculaControllerSearchFieldsActionPath, 'post');
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
        return r as StrictHttpResponse<Array<InformacoesMatriculaDto>>;
      })
    );
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerSearchFieldsAction(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<Array<InformacoesMatriculaDto>> {

    return this.informacoesMatriculaControllerSearchFieldsAction$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<InformacoesMatriculaDto>>) => r.body as Array<InformacoesMatriculaDto>)
    );
  }

  /**
   * Path part for operation informacoesMatriculaControllerSearchFieldsActionPage
   */
  static readonly InformacoesMatriculaControllerSearchFieldsActionPagePath = '/api/v1/infomatricula/search-fields/page';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerSearchFieldsActionPage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerSearchFieldsActionPage$Response(params: {
    page?: number;
    size?: number;
    sort?: Array<string>;
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PageInformacoesMatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, InformacoesMatriculaControllerService.InformacoesMatriculaControllerSearchFieldsActionPagePath, 'post');
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
        return r as StrictHttpResponse<PageInformacoesMatriculaDto>;
      })
    );
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerSearchFieldsActionPage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  informacoesMatriculaControllerSearchFieldsActionPage(params: {
    page?: number;
    size?: number;
    sort?: Array<string>;
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<PageInformacoesMatriculaDto> {

    return this.informacoesMatriculaControllerSearchFieldsActionPage$Response(params,context).pipe(
      map((r: StrictHttpResponse<PageInformacoesMatriculaDto>) => r.body as PageInformacoesMatriculaDto)
    );
  }

  /**
   * Path part for operation informacoesMatriculaControllerListAllPage
   */
  static readonly InformacoesMatriculaControllerListAllPagePath = '/api/v1/infomatricula/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `informacoesMatriculaControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerListAllPage$Response(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PageInformacoesMatriculaDto>> {

    const rb = new RequestBuilder(this.rootUrl, InformacoesMatriculaControllerService.InformacoesMatriculaControllerListAllPagePath, 'get');
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
        return r as StrictHttpResponse<PageInformacoesMatriculaDto>;
      })
    );
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `informacoesMatriculaControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  informacoesMatriculaControllerListAllPage(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<PageInformacoesMatriculaDto> {

    return this.informacoesMatriculaControllerListAllPage$Response(params,context).pipe(
      map((r: StrictHttpResponse<PageInformacoesMatriculaDto>) => r.body as PageInformacoesMatriculaDto)
    );
  }

}
