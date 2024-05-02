import {Component, OnInit, ViewChild} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NavigationEnd, Router} from "@angular/router";
import {delay} from "rxjs";
import {filter} from "rxjs/operators";
import {SecurityService} from "../../arquitetura/security/security.service";
import {VerificaCPFDialogComponent} from "../../pages/assinatura/verifica-cpf-dialog/verifica-c-p-f-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatriculaControllerService} from "../../api/services/matricula-controller.service";
import {TurmaDto} from "../../api/models/turma-dto";
import {ConfirmationDialog} from "../confirmation-dialog/confirmation-dialog.component";
import {MensagensUniversais} from "../../../MensagensUniversais";


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
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, router: this.router, telaAtual: 'home'});


  constructor(
    private dialog : MatDialog,
    private observer: BreakpointObserver,
    private router: Router,
    private matriculaContrller: MatriculaControllerService,
    protected securityService: SecurityService) {
  }
  onFilechange(event: any){
    const file = event.target.files[0];
    const fileName = file.name;
    console.log(file);
    let blob: Blob;
    blob = file;

    this.matriculaContrller.matriculaControllerUploadTermoValidar({cpfCrianca:"12345678922", body:{multipartFile: blob}})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, "Validar");
        this.router.navigate(["/home"]);
      }, erro => {
        console.log("Erro:", erro.error);
        this.mensagens.confirmarErro("Validar", erro.message)
        //this.showError(erro.error, this.ACAO_EDITAR);
      })

  }

  confirmarAcao(turma: TurmaDto, nome: String) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'VALIDAÇÃO!!',
        mensagem: `A assinatura é válida, e foi feita pelo sistema!`,
        textoBotoes: {
          ok: 'OK',
        },
      },
    });
  }


  openDialogAssinatura(): void {
    const config: MatDialogConfig = {
      data: {
        CPFValido: false
      }
    };
    this.dialog.open(VerificaCPFDialogComponent, config);
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

  protected readonly AssinaturaDialogComponent = VerificaCPFDialogComponent;
}
