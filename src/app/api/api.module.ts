/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UsuarioControllerService } from './services/usuario-controller.service';
import { TutorControllerService } from './services/tutor-controller.service';
import { TurmaControllerService } from './services/turma-controller.service';
import { ResponsavelControllerService } from './services/responsavel-controller.service';
import { PessoaControllerService } from './services/pessoa-controller.service';
import { NecessidadeEspecialControllerService } from './services/necessidade-especial-controller.service';
import { MatriculaControllerService } from './services/matricula-controller.service';
import { InformacoesMatriculaControllerService } from './services/informacoes-matricula-controller.service';
import { EnderecoControllerService } from './services/endereco-controller.service';
import { AuthApiService } from './services/auth-api.service';
import { AdvertenciaControllerService } from './services/advertencia-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UsuarioControllerService,
    TutorControllerService,
    TurmaControllerService,
    ResponsavelControllerService,
    PessoaControllerService,
    NecessidadeEspecialControllerService,
    MatriculaControllerService,
    InformacoesMatriculaControllerService,
    EnderecoControllerService,
    AuthApiService,
    AdvertenciaControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
