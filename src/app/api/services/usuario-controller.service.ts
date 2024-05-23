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
import { usuarioControllerAlterar } from '../fn/usuario-controller/usuario-controller-alterar';
import { UsuarioControllerAlterar$Params } from '../fn/usuario-controller/usuario-controller-alterar';
import { usuarioControllerCount } from '../fn/usuario-controller/usuario-controller-count';
import { UsuarioControllerCount$Params } from '../fn/usuario-controller/usuario-controller-count';
import { usuarioControllerIncluir } from '../fn/usuario-controller/usuario-controller-incluir';
import { UsuarioControllerIncluir$Params } from '../fn/usuario-controller/usuario-controller-incluir';
import { usuarioControllerListAll } from '../fn/usuario-controller/usuario-controller-list-all';
import { UsuarioControllerListAll$Params } from '../fn/usuario-controller/usuario-controller-list-all';
import { usuarioControllerListAllPage } from '../fn/usuario-controller/usuario-controller-list-all-page';
import { UsuarioControllerListAllPage$Params } from '../fn/usuario-controller/usuario-controller-list-all-page';
import { usuarioControllerListAllWithSort } from '../fn/usuario-controller/usuario-controller-list-all-with-sort';
import { UsuarioControllerListAllWithSort$Params } from '../fn/usuario-controller/usuario-controller-list-all-with-sort';
import { usuarioControllerListUsuariosWithPagination } from '../fn/usuario-controller/usuario-controller-list-usuarios-with-pagination';
import { UsuarioControllerListUsuariosWithPagination$Params } from '../fn/usuario-controller/usuario-controller-list-usuarios-with-pagination';
import { usuarioControllerNovoAlterar } from '../fn/usuario-controller/usuario-controller-novo-alterar';
import { UsuarioControllerNovoAlterar$Params } from '../fn/usuario-controller/usuario-controller-novo-alterar';
import { usuarioControllerObterPorId } from '../fn/usuario-controller/usuario-controller-obter-por-id';
import { UsuarioControllerObterPorId$Params } from '../fn/usuario-controller/usuario-controller-obter-por-id';
import { usuarioControllerRedefinirSenha } from '../fn/usuario-controller/usuario-controller-redefinir-senha';
import { UsuarioControllerRedefinirSenha$Params } from '../fn/usuario-controller/usuario-controller-redefinir-senha';
import { usuarioControllerRemover } from '../fn/usuario-controller/usuario-controller-remover';
import { UsuarioControllerRemover$Params } from '../fn/usuario-controller/usuario-controller-remover';
import { usuarioControllerSearchFieldsAction } from '../fn/usuario-controller/usuario-controller-search-fields-action';
import { UsuarioControllerSearchFieldsAction$Params } from '../fn/usuario-controller/usuario-controller-search-fields-action';
import { usuarioControllerSearchFieldsList } from '../fn/usuario-controller/usuario-controller-search-fields-list';
import { UsuarioControllerSearchFieldsList$Params } from '../fn/usuario-controller/usuario-controller-search-fields-list';

@Injectable({ providedIn: 'root' })
export class UsuarioControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `usuarioControllerObterPorId()` */
  static readonly UsuarioControllerObterPorIdPath = '/api/v1/usuario/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerObterPorId$Response(params: UsuarioControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerObterPorId(params: UsuarioControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerAlterar()` */
  static readonly UsuarioControllerAlterarPath = '/api/v1/usuario/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerAlterar$Response(params: UsuarioControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerAlterar(params: UsuarioControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerRemover()` */
  static readonly UsuarioControllerRemoverPath = '/api/v1/usuario/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerRemover$Response(params: UsuarioControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerRemover(params: UsuarioControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerNovoAlterar()` */
  static readonly UsuarioControllerNovoAlterarPath = '/api/v1/usuario/alterar/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerNovoAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerNovoAlterar$Response(params: UsuarioControllerNovoAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerNovoAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerNovoAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerNovoAlterar(params: UsuarioControllerNovoAlterar$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerNovoAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerIncluir()` */
  static readonly UsuarioControllerIncluirPath = '/api/v1/usuario/singup';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerIncluir$Response(params: UsuarioControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerIncluir(params: UsuarioControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerSearchFieldsList()` */
  static readonly UsuarioControllerSearchFieldsListPath = '/api/v1/usuario/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerSearchFieldsList$Response(params?: UsuarioControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return usuarioControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerSearchFieldsList(params?: UsuarioControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.usuarioControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `usuarioControllerSearchFieldsAction()` */
  static readonly UsuarioControllerSearchFieldsActionPath = '/api/v1/usuario/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerSearchFieldsAction$Response(params: UsuarioControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerSearchFieldsAction(params: UsuarioControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerRedefinirSenha()` */
  static readonly UsuarioControllerRedefinirSenhaPath = '/api/v1/usuario/redefinir-senha';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerRedefinirSenha()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerRedefinirSenha$Response(params: UsuarioControllerRedefinirSenha$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return usuarioControllerRedefinirSenha(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerRedefinirSenha$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerRedefinirSenha(params: UsuarioControllerRedefinirSenha$Params, context?: HttpContext): Observable<string> {
    return this.usuarioControllerRedefinirSenha$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `usuarioControllerListAll()` */
  static readonly UsuarioControllerListAllPath = '/api/v1/usuario';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAll$Response(params?: UsuarioControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAll(params?: UsuarioControllerListAll$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerListAllWithSort()` */
  static readonly UsuarioControllerListAllWithSortPath = '/api/v1/usuario/sort/{field}';

  /**
   * Reliza busca ordenada de acordo com o campo
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerListAllWithSort()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAllWithSort$Response(params: UsuarioControllerListAllWithSort$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerListAllWithSort(this.http, this.rootUrl, params, context);
  }

  /**
   * Reliza busca ordenada de acordo com o campo
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerListAllWithSort$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAllWithSort(params: UsuarioControllerListAllWithSort$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerListAllWithSort$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerCount()` */
  static readonly UsuarioControllerCountPath = '/api/v1/usuario/pagination';

  /**
   * Busca a quantidade de registros
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerCount$Response(params?: UsuarioControllerCount$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerCount(this.http, this.rootUrl, params, context);
  }

  /**
   * Busca a quantidade de registros
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerCount(params?: UsuarioControllerCount$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerCount$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerListUsuariosWithPagination()` */
  static readonly UsuarioControllerListUsuariosWithPaginationPath = '/api/v1/usuario/pagination/{offset}/{pageSize}';

  /**
   * Realiza busca paginada de acordo com o tamanho da pagina e a pagina
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerListUsuariosWithPagination()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListUsuariosWithPagination$Response(params: UsuarioControllerListUsuariosWithPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerListUsuariosWithPagination(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza busca paginada de acordo com o tamanho da pagina e a pagina
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerListUsuariosWithPagination$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListUsuariosWithPagination(params: UsuarioControllerListUsuariosWithPagination$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerListUsuariosWithPagination$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `usuarioControllerListAllPage()` */
  static readonly UsuarioControllerListAllPagePath = '/api/v1/usuario/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAllPage$Response(params: UsuarioControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return usuarioControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAllPage(params: UsuarioControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.usuarioControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
