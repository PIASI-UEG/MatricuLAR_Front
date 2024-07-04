/* tslint:disable:no-redundant-jsdoc callable-types no-shadowed-variable */
/* tslint:disable:variable-name */
import { Observable } from 'rxjs';
import {Injectable, Inject, OnInit} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SecurityService } from './security.service';
import { config, IConfig } from './config';
import {
  ControlePeriodoMatriculaControllerService
} from "../../api/services/controle-periodo-matricula-controller.service";
import {LoaderService} from "../loader/loader.service";
import {finalize} from "rxjs/operators";

/**
 * Implementação que garante a segurança das rotas permitindo o acesso apenas se o 'Usuário' estiver autenticado
 * na aplicação e possuir os papéis necessários para o acessar.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class SecurityMatriculaGuard implements CanActivate, OnInit{
    valid = false;
    /**
     * Construtor da classe.
     *
     * @param router
     * @param securityService
     * @param config
     */
    constructor(
      private router: Router,
      private securityService: SecurityService,
      private controlePeriodoMatriculaService: ControlePeriodoMatriculaControllerService,
      private loaderService: LoaderService,
      @Inject(config) private config: IConfig) { }

    /**
     * Intercepta a rota e verifica se a mesma poderá ou não ser apresentada.
     *
     * @param next
     * @param state
     */

    ngOnInit(): void {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.securityService.isValid()) {
            return true;
        } else {
            console.log('loading...');
            return new Observable<boolean>((observer) => {
              this.obterStatus();
              setTimeout(() => {
                console.log('done!');
                if (!this.valid) {
                  this.securityService.onForbidden.emit(this.securityService.credential);
                  this.router.navigate(['/']);
                }
                observer.next(this.valid);
                observer.complete();
              }, 500);
            });
        }
    }

    obterStatus() {
      this.controlePeriodoMatriculaService.controlePeriodoMatriculaControllerOberStatus().subscribe(
        data => {
          console.log(data);
          this.valid = data;
        }
      );
    }

}
