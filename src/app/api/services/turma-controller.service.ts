/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { SearchField } from '../models/search-field';
import { turmaControllerAdicionaAlunos } from '../fn/turma-controller/turma-controller-adiciona-alunos';
import { TurmaControllerAdicionaAlunos$Params } from '../fn/turma-controller/turma-controller-adiciona-alunos';
import { turmaControllerAlterar } from '../fn/turma-controller/turma-controller-alterar';
import { TurmaControllerAlterar$Params } from '../fn/turma-controller/turma-controller-alterar';
import { turmaControllerIncluir } from '../fn/turma-controller/turma-controller-incluir';
import { TurmaControllerIncluir$Params } from '../fn/turma-controller/turma-controller-incluir';
import { turmaControllerListAll } from '../fn/turma-controller/turma-controller-list-all';
import { TurmaControllerListAll$Params } from '../fn/turma-controller/turma-controller-list-all';
import { turmaControllerListAllPage } from '../fn/turma-controller/turma-controller-list-all-page';
import { TurmaControllerListAllPage$Params } from '../fn/turma-controller/turma-controller-list-all-page';
import { turmaControllerObterPorId } from '../fn/turma-controller/turma-controller-obter-por-id';
import { TurmaControllerObterPorId$Params } from '../fn/turma-controller/turma-controller-obter-por-id';
import { turmaControllerQuantidadeTotal } from '../fn/turma-controller/turma-controller-quantidade-total';
import { TurmaControllerQuantidadeTotal$Params } from '../fn/turma-controller/turma-controller-quantidade-total';
import { turmaControllerRemover } from '../fn/turma-controller/turma-controller-remover';
import { TurmaControllerRemover$Params } from '../fn/turma-controller/turma-controller-remover';
import { turmaControllerSearchFieldsAction } from '../fn/turma-controller/turma-controller-search-fields-action';
import { TurmaControllerSearchFieldsAction$Params } from '../fn/turma-controller/turma-controller-search-fields-action';
import { turmaControllerSearchFieldsList } from '../fn/turma-controller/turma-controller-search-fields-list';
import { TurmaControllerSearchFieldsList$Params } from '../fn/turma-controller/turma-controller-search-fields-list';
import { TurmaDto } from '../models/turma-dto';

@Injectable({ providedIn: 'root' })
export class TurmaControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `turmaControllerObterPorId()` */
  static readonly TurmaControllerObterPorIdPath = '/api/v1/turma/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerObterPorId$Response(params: TurmaControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return turmaControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerObterPorId(params: TurmaControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.turmaControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `turmaControllerAlterar()` */
  static readonly TurmaControllerAlterarPath = '/api/v1/turma/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerAlterar$Response(params: TurmaControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return turmaControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerAlterar(params: TurmaControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.turmaControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `turmaControllerRemover()` */
  static readonly TurmaControllerRemoverPath = '/api/v1/turma/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerRemover$Response(params: TurmaControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return turmaControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerRemover(params: TurmaControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.turmaControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `turmaControllerListAll()` */
  static readonly TurmaControllerListAllPath = '/api/v1/turma';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerListAll$Response(params?: TurmaControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return turmaControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerListAll(params?: TurmaControllerListAll$Params, context?: HttpContext): Observable<any> {
    return this.turmaControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `turmaControllerIncluir()` */
  static readonly TurmaControllerIncluirPath = '/api/v1/turma';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerIncluir$Response(params: TurmaControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return turmaControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerIncluir(params: TurmaControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.turmaControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `turmaControllerSearchFieldsList()` */
  static readonly TurmaControllerSearchFieldsListPath = '/api/v1/turma/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerSearchFieldsList$Response(params?: TurmaControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return turmaControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerSearchFieldsList(params?: TurmaControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.turmaControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `turmaControllerSearchFieldsAction()` */
  static readonly TurmaControllerSearchFieldsActionPath = '/api/v1/turma/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerSearchFieldsAction$Response(params: TurmaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return turmaControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerSearchFieldsAction(params: TurmaControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.turmaControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `turmaControllerAdicionaAlunos()` */
  static readonly TurmaControllerAdicionaAlunosPath = '/api/v1/turma/adicionaAlunos';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerAdicionaAlunos()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerAdicionaAlunos$Response(params: TurmaControllerAdicionaAlunos$Params, context?: HttpContext): Observable<StrictHttpResponse<TurmaDto>> {
    return turmaControllerAdicionaAlunos(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerAdicionaAlunos$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  turmaControllerAdicionaAlunos(params: TurmaControllerAdicionaAlunos$Params, context?: HttpContext): Observable<TurmaDto> {
    return this.turmaControllerAdicionaAlunos$Response(params, context).pipe(
      map((r: StrictHttpResponse<TurmaDto>): TurmaDto => r.body)
    );
  }

  /** Path part for operation `turmaControllerQuantidadeTotal()` */
  static readonly TurmaControllerQuantidadeTotalPath = '/api/v1/turma/quantidade-total';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerQuantidadeTotal()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerQuantidadeTotal$Response(params?: TurmaControllerQuantidadeTotal$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return turmaControllerQuantidadeTotal(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerQuantidadeTotal$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerQuantidadeTotal(params?: TurmaControllerQuantidadeTotal$Params, context?: HttpContext): Observable<number> {
    return this.turmaControllerQuantidadeTotal$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `turmaControllerListAllPage()` */
  static readonly TurmaControllerListAllPagePath = '/api/v1/turma/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `turmaControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerListAllPage$Response(params: TurmaControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return turmaControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `turmaControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  turmaControllerListAllPage(params: TurmaControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.turmaControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
