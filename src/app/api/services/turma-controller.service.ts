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

import { PageTurmaDto } from '../models/page-turma-dto';
import { Pageable } from '../models/pageable';
import { SearchField } from '../models/search-field';
import { SearchFieldValue } from '../models/search-field-value';
import { TurmaDto } from '../models/turma-dto';

@Injectable({
  providedIn: 'root',
})
export class TurmaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation turmaControllerObterPorId
   */
  static readonly TurmaControllerObterPorIdPath = '/api/v1/turma/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<TurmaDto>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerObterPorIdPath, 'get');
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
        return r as StrictHttpResponse<TurmaDto>;
      })
    );
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<TurmaDto> {

    return this.turmaControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<TurmaDto>) => r.body as TurmaDto)
    );
  }

  /**
   * Path part for operation turmaControllerAlterar
   */
  static readonly TurmaControllerAlterarPath = '/api/v1/turma/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerAlterar$Response(params: {
    id: number;
    body: TurmaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<TurmaDto>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerAlterarPath, 'put');
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
        return r as StrictHttpResponse<TurmaDto>;
      })
    );
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerAlterar(params: {
    id: number;
    body: TurmaDto
  },
  context?: HttpContext

): Observable<TurmaDto> {

    return this.turmaControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<TurmaDto>) => r.body as TurmaDto)
    );
  }

  /**
   * Path part for operation turmaControllerRemover
   */
  static readonly TurmaControllerRemoverPath = '/api/v1/turma/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<TurmaDto>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerRemoverPath, 'delete');
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
        return r as StrictHttpResponse<TurmaDto>;
      })
    );
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<TurmaDto> {

    return this.turmaControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<TurmaDto>) => r.body as TurmaDto)
    );
  }

  /**
   * Path part for operation turmaControllerListAll
   */
  static readonly TurmaControllerListAllPath = '/api/v1/turma';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<TurmaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TurmaDto>>;
      })
    );
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<Array<TurmaDto>> {

    return this.turmaControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<TurmaDto>>) => r.body as Array<TurmaDto>)
    );
  }

  /**
   * Path part for operation turmaControllerIncluir
   */
  static readonly TurmaControllerIncluirPath = '/api/v1/turma';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerIncluir$Response(params: {
    body: TurmaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<TurmaDto>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerIncluirPath, 'post');
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
        return r as StrictHttpResponse<TurmaDto>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerIncluir(params: {
    body: TurmaDto
  },
  context?: HttpContext

): Observable<TurmaDto> {

    return this.turmaControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<TurmaDto>) => r.body as TurmaDto)
    );
  }

  /**
   * Path part for operation turmaControllerSearchFieldsList
   */
  static readonly TurmaControllerSearchFieldsListPath = '/api/v1/turma/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerSearchFieldsList$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<SearchField>>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerSearchFieldsListPath, 'get');
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
   * To access the full response (for headers, for example), `turmaControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerSearchFieldsList(params?: {
  },
  context?: HttpContext

): Observable<Array<SearchField>> {

    return this.turmaControllerSearchFieldsList$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>) => r.body as Array<SearchField>)
    );
  }

  /**
   * Path part for operation turmaControllerSearchFieldsAction
   */
  static readonly TurmaControllerSearchFieldsActionPath = '/api/v1/turma/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerSearchFieldsAction$Response(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<TurmaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerSearchFieldsActionPath, 'post');
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
        return r as StrictHttpResponse<Array<TurmaDto>>;
      })
    );
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerSearchFieldsAction(params: {
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<Array<TurmaDto>> {

    return this.turmaControllerSearchFieldsAction$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<TurmaDto>>) => r.body as Array<TurmaDto>)
    );
  }

  /**
   * Path part for operation turmaControllerSearchFieldsActionPage
   */
  static readonly TurmaControllerSearchFieldsActionPagePath = '/api/v1/turma/search-fields/page';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerSearchFieldsActionPage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerSearchFieldsActionPage$Response(params: {
    page?: number;
    size?: number;
    sort?: Array<string>;
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PageTurmaDto>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerSearchFieldsActionPagePath, 'post');
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
        return r as StrictHttpResponse<PageTurmaDto>;
      })
    );
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerSearchFieldsActionPage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerSearchFieldsActionPage(params: {
    page?: number;
    size?: number;
    sort?: Array<string>;
    body: Array<SearchFieldValue>
  },
  context?: HttpContext

): Observable<PageTurmaDto> {

    return this.turmaControllerSearchFieldsActionPage$Response(params,context).pipe(
      map((r: StrictHttpResponse<PageTurmaDto>) => r.body as PageTurmaDto)
    );
  }

  /**
   * Path part for operation turmaControllerAdicionaUmAluno
   */
  static readonly TurmaControllerAdicionaUmAlunoPath = '/api/v1/turma/adiciona-um-aluno';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerAdicionaUmAluno()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerAdicionaUmAluno$Response(params: {
    idTurma: number;
    idAluno: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<TurmaDto>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerAdicionaUmAlunoPath, 'post');
    if (params) {
      rb.query('idTurma', params.idTurma, {});
      rb.query('idAluno', params.idAluno, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TurmaDto>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerAdicionaUmAluno$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerAdicionaUmAluno(params: {
    idTurma: number;
    idAluno: number;
  },
  context?: HttpContext

): Observable<TurmaDto> {

    return this.turmaControllerAdicionaUmAluno$Response(params,context).pipe(
      map((r: StrictHttpResponse<TurmaDto>) => r.body as TurmaDto)
    );
  }

  /**
   * Path part for operation turmaControllerAdicionaAlunos
   */
  static readonly TurmaControllerAdicionaAlunosPath = '/api/v1/turma/adiciona-alunos';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerAdicionaAlunos()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerAdicionaAlunos$Response(params: {
    idTurma: number;
    body: Array<number>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<TurmaDto>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerAdicionaAlunosPath, 'post');
    if (params) {
      rb.query('idTurma', params.idTurma, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TurmaDto>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerAdicionaAlunos$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerAdicionaAlunos(params: {
    idTurma: number;
    body: Array<number>
  },
  context?: HttpContext

): Observable<TurmaDto> {

    return this.turmaControllerAdicionaAlunos$Response(params,context).pipe(
      map((r: StrictHttpResponse<TurmaDto>) => r.body as TurmaDto)
    );
  }

  /**
   * Path part for operation turmaControllerQuantidadeTotal
   */
  static readonly TurmaControllerQuantidadeTotalPath = '/api/v1/turma/quantidade-total';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerQuantidadeTotal()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerQuantidadeTotal$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerQuantidadeTotalPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerQuantidadeTotal$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerQuantidadeTotal(params?: {
  },
  context?: HttpContext

): Observable<number> {

    return this.turmaControllerQuantidadeTotal$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation turmaControllerListAllPage
   */
  static readonly TurmaControllerListAllPagePath = '/api/v1/turma/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerListAllPage$Response(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PageTurmaDto>> {

    const rb = new RequestBuilder(this.rootUrl, TurmaControllerService.TurmaControllerListAllPagePath, 'get');
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
        return r as StrictHttpResponse<PageTurmaDto>;
      })
    );
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerListAllPage(params: {
    page: Pageable;
  },
  context?: HttpContext

): Observable<PageTurmaDto> {

    return this.turmaControllerListAllPage$Response(params,context).pipe(
      map((r: StrictHttpResponse<PageTurmaDto>) => r.body as PageTurmaDto)
    );
  }

}
