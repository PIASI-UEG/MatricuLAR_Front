import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './core/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LoaderModule} from "./arquitetura/loader/loader.module";
import {LoaderDialogComponent} from "./arquitetura/loader-dialog/loader-dialog.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AutenticacaoModule} from "./arquitetura/autenticacao/autenticacao.module";
import {SecurityModule} from "./arquitetura/security/security.module";
import {SecurityInterceptor} from "./arquitetura/security/security.interceptor";
import {MessageModule} from "./arquitetura/message/message.module";
import {AppInterceptor} from "./arquitetura/app.interceptor";
import {ConfirmationDialog} from "./core/confirmation-dialog/confirmation-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {FlexModule} from "@angular/flex-layout";
import {NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask} from "ngx-mask";
import {FuncionarioModule} from "./pages/funcionario/funcionario.module";
import {MatriculaModule} from "./pages/matricula/matricula.module";
import {TurmaModule} from "./pages/turma/turma.module";
import {MinhaContaModule} from "./pages/minha-conta/minha-conta.module";
import {HomePageModule} from "./pages/home-page/home-page.module";
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomePainelComponent } from './pages/painel/home-painel/home-painel.component';
import {PainelModule} from "./pages/painel/painel.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoaderDialogComponent,
    ConfirmationDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    LoaderModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AutenticacaoModule,
    MessageModule.forRoot(),
    SecurityModule,//TODO conferir a configuração
    SecurityModule.forRoot({
      nameStorage: 'portalSSOSecurityStorage',
      loginRouter: '/acesso/login'
    }),
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    FlexModule,
    MatCheckboxModule,
    MatSelectModule,
    FlexModule,
    MatCheckboxModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatFormFieldModule,
    FuncionarioModule,
    TurmaModule,
    MatriculaModule,
    MinhaContaModule,
    HomePageModule,
    NgbModule,
    NgbCarouselModule,
    PainelModule
  ],
  providers: [
    provideEnvironmentNgxMask(),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
