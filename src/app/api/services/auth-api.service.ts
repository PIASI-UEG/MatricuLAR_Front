/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CredencialDto } from '../models/credencial-dto';
import { getInfoByToken } from '../fn/auth-api/get-info-by-token';
import { GetInfoByToken$Params } from '../fn/auth-api/get-info-by-token';
import { getInfoByTokenValidacao } from '../fn/auth-api/get-info-by-token-validacao';
import { GetInfoByTokenValidacao$Params } from '../fn/auth-api/get-info-by-token-validacao';
import { login } from '../fn/auth-api/login';
import { Login$Params } from '../fn/auth-api/login';
import { recuperarSenha } from '../fn/auth-api/recuperar-senha';
import { RecuperarSenha$Params } from '../fn/auth-api/recuperar-senha';
import { redefinirSenha } from '../fn/auth-api/redefinir-senha';
import { RedefinirSenha$Params } from '../fn/auth-api/redefinir-senha';
import { refresh } from '../fn/auth-api/refresh';
import { Refresh$Params } from '../fn/auth-api/refresh';

@Injectable({ providedIn: 'root' })
export class AuthApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `redefinirSenha()` */
  static readonly RedefinirSenhaPath = '/api/v1/auth/senha';

  /**
   * Inclusão ou alteração a senha do usuário.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `redefinirSenha()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  redefinirSenha$Response(params: RedefinirSenha$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CredencialDto>>> {
    return redefinirSenha(this.http, this.rootUrl, params, context);
  }

  /**
   * Inclusão ou alteração a senha do usuário.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `redefinirSenha$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  redefinirSenha(params: RedefinirSenha$Params, context?: HttpContext): Observable<Array<CredencialDto>> {
    return this.redefinirSenha$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>): Array<CredencialDto> => r.body)
    );
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/api/v1/auth/login';

  /**
   * Concede o token de acesso ao Usuário através do 'login' e 'senha'.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CredencialDto>>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * Concede o token de acesso ao Usuário através do 'login' e 'senha'.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<Array<CredencialDto>> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>): Array<CredencialDto> => r.body)
    );
  }

  /** Path part for operation `recuperarSenha()` */
  static readonly RecuperarSenhaPath = '/api/v1/auth/senha/solicitacao/{email}';

  /**
   * Realiza a solicitação de recuperar a senha do usuário.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recuperarSenha()` instead.
   *
   * This method doesn't expect any request body.
   */
  recuperarSenha$Response(params: RecuperarSenha$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CredencialDto>>> {
    return recuperarSenha(this.http, this.rootUrl, params, context);
  }

  /**
   * Realiza a solicitação de recuperar a senha do usuário.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recuperarSenha$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recuperarSenha(params: RecuperarSenha$Params, context?: HttpContext): Observable<Array<CredencialDto>> {
    return this.recuperarSenha$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>): Array<CredencialDto> => r.body)
    );
  }

  /** Path part for operation `getInfoByTokenValidacao()` */
  static readonly GetInfoByTokenValidacaoPath = '/api/v1/auth/senha/solicitacao/info';

  /**
   * Valida o token de alteração de senha.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInfoByTokenValidacao()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInfoByTokenValidacao$Response(params?: GetInfoByTokenValidacao$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<boolean>>> {
    return getInfoByTokenValidacao(this.http, this.rootUrl, params, context);
  }

  /**
   * Valida o token de alteração de senha.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getInfoByTokenValidacao$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInfoByTokenValidacao(params?: GetInfoByTokenValidacao$Params, context?: HttpContext): Observable<Array<boolean>> {
    return this.getInfoByTokenValidacao$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<boolean>>): Array<boolean> => r.body)
    );
  }

  /** Path part for operation `refresh()` */
  static readonly RefreshPath = '/api/v1/auth/refresh';

  /**
   * Concede um novo token de acesso conforme o token de refresh informado.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refresh()` instead.
   *
   * This method doesn't expect any request body.
   */
  refresh$Response(params: Refresh$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CredencialDto>>> {
    return refresh(this.http, this.rootUrl, params, context);
  }

  /**
   * Concede um novo token de acesso conforme o token de refresh informado.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refresh$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refresh(params: Refresh$Params, context?: HttpContext): Observable<Array<CredencialDto>> {
    return this.refresh$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>): Array<CredencialDto> => r.body)
    );
  }

  /** Path part for operation `getInfoByToken()` */
  static readonly GetInfoByTokenPath = '/api/v1/auth/info';

  /**
   * Recupera as informações do Usuário conforme o token informado.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInfoByToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInfoByToken$Response(params: GetInfoByToken$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CredencialDto>>> {
    return getInfoByToken(this.http, this.rootUrl, params, context);
  }

  /**
   * Recupera as informações do Usuário conforme o token informado.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getInfoByToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInfoByToken(params: GetInfoByToken$Params, context?: HttpContext): Observable<Array<CredencialDto>> {
    return this.getInfoByToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>): Array<CredencialDto> => r.body)
    );
  }

}
