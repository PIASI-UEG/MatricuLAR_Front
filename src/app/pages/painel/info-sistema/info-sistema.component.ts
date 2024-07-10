import {Component, OnInit, ViewChild} from '@angular/core';
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TurmaControllerService} from "../../../api/services/turma-controller.service";
import DevExpress from "devextreme";
import data = DevExpress.data;
import {
  ControlePeriodoMatriculaControllerService
} from "../../../api/services/controle-periodo-matricula-controller.service";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-info-sistema',
  templateUrl: './info-sistema.component.html',
  styleUrls: ['./info-sistema.component.scss']
})
export class InfoSistemaComponent implements OnInit{
  @ViewChild('slideTogglePreMatricula') slideTogglePreMatricula!: MatSlideToggle;
  totalMatriculas: number = 0;
  totalTurmas: number = 0;
  qtdMatriculasPendente: number = 0;
  qtdMatriculasInativas: number = 0;
  qtdMatriculasAtivas: number = 0;
  qtdMatriculasParaRenovar: number = 0;
  innerWidth: number = window.innerWidth;
  status: boolean = false;
  mensagens: MensagensUniversais = new MensagensUniversais({
    dialog: this.dialog,
    router: this.router,
    securityService: this.securityService,
    snackBar: this.snackBar
  })

  constructor(
    public matriculaService: MatriculaControllerService,
    public turmaService: TurmaControllerService,
    public controlePeriodoMatriculaService: ControlePeriodoMatriculaControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private securityService: SecurityService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.buscarDados();
    this.obterStatus();
  }


  private buscarDados() {
    //Matriculas
    this.matriculaService.matriculaControllerCount({statusMatricula: 'ATIVO'}).
    subscribe(data => {
      this.qtdMatriculasAtivas = data;
    });
    this.matriculaService.matriculaControllerCount({statusMatricula: 'INATIVO'}).
    subscribe(data => {
      this.qtdMatriculasInativas = data;
    });
    this.matriculaService.matriculaControllerCount({statusMatricula: 'AGUARDANDO_RENOVACAO'}).
    subscribe(data => {
      this.qtdMatriculasParaRenovar = data;
    });
    this.matriculaService.matriculaControllerCount({statusMatricula: 'AGUARDANDO_ACEITE'}).
    subscribe(data => {
      this.qtdMatriculasPendente = data;
    });
    this.matriculaService.matriculaControllerQuantidadeTotalMatriculas({}).
    subscribe(data => {
      this.totalMatriculas = data;
    });
    //Turmas
    this.turmaService.turmaControllerQuantidadeTotal().
    subscribe(data =>{
      this.totalTurmas = data;
    })
  }



  controlePreMatricula(event: any) {
    if (event.checked) {
      const dialogConfirmacao = this.dialog.open(ConfirmationDialog, {
        data: {
          titulo: 'ATENÇÃO!!!',
          mensagem: `A pré matrícula será ativada. Tem certeza dessa ação ?`,
          textoBotoes: {
            ok: 'Sim',
            cancel: 'Não',
          },
        },
      });

      dialogConfirmacao.afterClosed().subscribe(result => {
        if(result){
          this.controlePeriodoMatriculaService.controlePeriodoMatriculaControllerAtivaPeriodoMatricula(
            {aceitandoCadastroMatricula: true}, undefined
          ).subscribe(
            data => {
              this.mensagens.showMensagemSimples("Pré matrícula ativada.");
            }, error => {
              this.mensagens.showMensagemSimples("Erro ao ativar pré matrícula: "+ error);
              this.status = false;
              if (this.slideTogglePreMatricula) {
                this.slideTogglePreMatricula.checked = false;
              }
            })
        } else {
          this.status = false;
          if (this.slideTogglePreMatricula) {
            this.slideTogglePreMatricula.checked = false;
          }
        }
      })
    } else {
      this.controlePeriodoMatriculaService.controlePeriodoMatriculaControllerAtivaPeriodoMatricula(
        {aceitandoCadastroMatricula: false}, undefined
      ).subscribe(
        data => {
          this.mensagens.showMensagemSimples("Pré matrícula desativada.");
        }, error => {
          this.mensagens.showMensagemSimples("Erro ao desativada pré matrícula: " + error);
          this.status = true;
          if (this.slideTogglePreMatricula) {
            this.slideTogglePreMatricula.checked = true;
          }
        })
    }
  }

  obterStatus(){
    this.controlePeriodoMatriculaService.controlePeriodoMatriculaControllerOberStatus().subscribe(
      data => {
        this.status = data;
      }, error => {
        this.mensagens.showMensagemSimples("Erro ao obter status de pré matrícula: " + error);
      }
    );
  }

  controleReMatricula(event: any) {
    if (event.checked) {
      const dialogConfirmacao = this.dialog.open(ConfirmationDialog, {
        data: {
          titulo: 'ATENÇÃO!!!',
          mensagem: `Todas as martrículas ativas, serão alteradas para o status de re-matrícula. Tem cereza dessa ação ?`,
          textoBotoes: {
            ok: 'Sim',
            cancel: 'Não',
          },
        },
      });

      dialogConfirmacao.afterClosed().subscribe(result => {
        if (result) {
          this.matriculaService.matriculaControllerMudaStatusTodasMatriculasAguardandoRenovacao().subscribe(retorno => {
              this.mensagens.showMensagemSimples(result);
          }, error => {
              this.mensagens.showMensagemSimples(error);
          });
        }
      })

    }
  }


}
