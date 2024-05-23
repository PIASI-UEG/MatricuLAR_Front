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
import { tutorControllerAlterar } from '../fn/tutor-controller/tutor-controller-alterar';
import { TutorControllerAlterar$Params } from '../fn/tutor-controller/tutor-controller-alterar';
import { tutorControllerIncluir } from '../fn/tutor-controller/tutor-controller-incluir';
import { TutorControllerIncluir$Params } from '../fn/tutor-controller/tutor-controller-incluir';
import { tutorControllerListAll } from '../fn/tutor-controller/tutor-controller-list-all';
import { TutorControllerListAll$Params } from '../fn/tutor-controller/tutor-controller-list-all';
import { tutorControllerListAllPage } from '../fn/tutor-controller/tutor-controller-list-all-page';
import { TutorControllerListAllPage$Params } from '../fn/tutor-controller/tutor-controller-list-all-page';
import { tutorControllerObterPorId } from '../fn/tutor-controller/tutor-controller-obter-por-id';
import { TutorControllerObterPorId$Params } from '../fn/tutor-controller/tutor-controller-obter-por-id';
import { tutorControllerRemover } from '../fn/tutor-controller/tutor-controller-remover';
import { TutorControllerRemover$Params } from '../fn/tutor-controller/tutor-controller-remover';
import { tutorControllerSearchFieldsAction } from '../fn/tutor-controller/tutor-controller-search-fields-action';
import { TutorControllerSearchFieldsAction$Params } from '../fn/tutor-controller/tutor-controller-search-fields-action';
import { tutorControllerSearchFieldsList } from '../fn/tutor-controller/tutor-controller-search-fields-list';
import { TutorControllerSearchFieldsList$Params } from '../fn/tutor-controller/tutor-controller-search-fields-list';

@Injectable({ providedIn: 'root' })
export class TutorControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `tutorControllerObterPorId()` */
  static readonly TutorControllerObterPorIdPath = '/api/v1/tutor/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tutorControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerObterPorId$Response(params: TutorControllerObterPorId$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return tutorControllerObterPorId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `tutorControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerObterPorId(params: TutorControllerObterPorId$Params, context?: HttpContext): Observable<any> {
    return this.tutorControllerObterPorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `tutorControllerAlterar()` */
  static readonly TutorControllerAlterarPath = '/api/v1/tutor/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tutorControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  tutorControllerAlterar$Response(params: TutorControllerAlterar$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return tutorControllerAlterar(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `tutorControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  tutorControllerAlterar(params: TutorControllerAlterar$Params, context?: HttpContext): Observable<any> {
    return this.tutorControllerAlterar$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `tutorControllerRemover()` */
  static readonly TutorControllerRemoverPath = '/api/v1/tutor/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tutorControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerRemover$Response(params: TutorControllerRemover$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return tutorControllerRemover(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `tutorControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerRemover(params: TutorControllerRemover$Params, context?: HttpContext): Observable<any> {
    return this.tutorControllerRemover$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `tutorControllerListAll()` */
  static readonly TutorControllerListAllPath = '/api/v1/tutor';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tutorControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerListAll$Response(params?: TutorControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return tutorControllerListAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `tutorControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerListAll(params?: TutorControllerListAll$Params, context?: HttpContext): Observable<any> {
    return this.tutorControllerListAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `tutorControllerIncluir()` */
  static readonly TutorControllerIncluirPath = '/api/v1/tutor';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tutorControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  tutorControllerIncluir$Response(params: TutorControllerIncluir$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return tutorControllerIncluir(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `tutorControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  tutorControllerIncluir(params: TutorControllerIncluir$Params, context?: HttpContext): Observable<any> {
    return this.tutorControllerIncluir$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `tutorControllerSearchFieldsList()` */
  static readonly TutorControllerSearchFieldsListPath = '/api/v1/tutor/search-fields';

  /**
   * Listagem dos campos de busca
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tutorControllerSearchFieldsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerSearchFieldsList$Response(params?: TutorControllerSearchFieldsList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SearchField>>> {
    return tutorControllerSearchFieldsList(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem dos campos de busca
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `tutorControllerSearchFieldsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerSearchFieldsList(params?: TutorControllerSearchFieldsList$Params, context?: HttpContext): Observable<Array<SearchField>> {
    return this.tutorControllerSearchFieldsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SearchField>>): Array<SearchField> => r.body)
    );
  }

  /** Path part for operation `tutorControllerSearchFieldsAction()` */
  static readonly TutorControllerSearchFieldsActionPath = '/api/v1/tutor/search-fields';

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tutorControllerSearchFieldsAction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  tutorControllerSearchFieldsAction$Response(params: TutorControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return tutorControllerSearchFieldsAction(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a busca pelos valores dos campos informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `tutorControllerSearchFieldsAction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  tutorControllerSearchFieldsAction(params: TutorControllerSearchFieldsAction$Params, context?: HttpContext): Observable<any> {
    return this.tutorControllerSearchFieldsAction$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `tutorControllerListAllPage()` */
  static readonly TutorControllerListAllPagePath = '/api/v1/tutor/page';

  /**
   * Listagem Geral paginada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tutorControllerListAllPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerListAllPage$Response(params: TutorControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return tutorControllerListAllPage(this.http, this.rootUrl, params, context);
  }

  /**
   * Listagem Geral paginada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `tutorControllerListAllPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  tutorControllerListAllPage(params: TutorControllerListAllPage$Params, context?: HttpContext): Observable<any> {
    return this.tutorControllerListAllPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
