import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "./app/core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

export class MensagensUniversais {
  private dialog?: MatDialog;
  private router?: Router;
  private telaAtual?: string;
  private snackBar?: MatSnackBar;

  constructor(config: {
    dialog?: MatDialog,
    router?: Router,
    telaAtual?: string,
    snackBar?: MatSnackBar
  }) {
    this.dialog = config.dialog;
    this.router = config.router;
    this.telaAtual = config.telaAtual;
    this.snackBar = config.snackBar;
  }
  confirmarErro(acao: String, erro: String){
    if(this.dialog) {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          titulo: 'ERRO!!!',
          mensagem: `Erro ao ${acao}! ` + erro,
          textoBotoes: {
            ok: 'Confirmar',
          },
        },
      });
    }
  }

  acaoCancelar(){
    if (this.dialog && this.router && this.telaAtual) {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          titulo: 'TEM CERTEZA QUE DESEJA CANCELAR ?',
          textoBotoes: {
            ok: 'Sim',
            cancel: 'Não',
          },
        },
      });

      dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
        if (confirmed?.resultado && this.router) {
          this.router.navigate(["/" + this.telaAtual]);
        }
      });
    }
  }

  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    if(this.snackBar) {
      this.snackBar.open(mensagem, 'Fechar', {
        duration: duracao,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
}
