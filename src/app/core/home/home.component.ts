import {Component, OnInit, ViewChild} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NavigationEnd, Router} from "@angular/router";
import {delay} from "rxjs";
import {filter} from "rxjs/operators";
import {SecurityService} from "../../arquitetura/security/security.service";
import {AssinaturaDialogComponent} from "../../pages/assinatura/assinatura-dialog/assinatura-dialog.component";
import {MatDialog} from "@angular/material/dialog";


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


  constructor(
    private dialog : MatDialog,
    private observer: BreakpointObserver,
    private router: Router,
    protected securityService: SecurityService) {
  }

  openDialogAssinatura(): void {
    this.dialog.open(AssinaturaDialogComponent);
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

  sair() {
    this.securityService.invalidate();
    this.router.navigate(['/acesso']);
  }

  protected readonly AssinaturaDialogComponent = AssinaturaDialogComponent;
}
