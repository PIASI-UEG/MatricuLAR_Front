import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NavigationEnd, Router} from "@angular/router";
import {delay} from "rxjs";
import {filter} from "rxjs/operators";
import {SecurityService} from "../../arquitetura/security/security.service";

import {MatDialog} from "@angular/material/dialog";
import {MensagensUniversais} from "../../../MensagensUniversais";
import {
  ControlePeriodoMatriculaControllerService
} from "../../api/services/controle-periodo-matricula-controller.service";


@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  admin!: any;
  mensagens: MensagensUniversais = new MensagensUniversais({
      dialog: this.dialog,
      router: this.router,
      securityService: this.securityService
  })
    route!: string;
  statusControlePreMat: boolean = false;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    protected securityService: SecurityService,
    private controlePeriodoMatriculaService: ControlePeriodoMatriculaControllerService,
    ) {
      this.router.events.subscribe(event =>{
          if(event instanceof NavigationEnd) {
              this.route = event.urlAfterRedirects;
          }
      });
  }

  ngOnInit(): void {
    if(this.router.url == '/') {
      this.router.navigate(['/home']);
    }
    /*if (this.securityService.credential.accessToken == "") {
      this.router.navigate(['/acesso']);
    } else {*/
      if (this.securityService.isValid()) {
       /*
        }*/
        this.admin = !this.securityService.hasRoles(['ROLE_ADMIN'])
      }
      /*if (!this.securityService.isValid())
        this.router.navigate(['/acesso']);
    }*/
    this.obterStatusControleMat();
  }

  obterStatusControleMat(){
    this.controlePeriodoMatriculaService.controlePeriodoMatriculaControllerOberStatus().subscribe(
      data => {
        console.log(data);
        this.statusControlePreMat = data;
      }
    );
  }

  usuarioLogado(): number {
    return this.securityService.getUserId()
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  isActive(url: string){
      return this.route === url;
  }

}
