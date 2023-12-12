import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "./app/core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

export class MensagensUniversais {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private telaAtual: string,
    private snackBar: MatSnackBar
  ) {
  }
  confirmarErro(acao: String, erro: String){
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

  acaoCancelar(){
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
      if (confirmed?.resultado) {
        this.router.navigate(["/"+ this.telaAtual]);
      }
    });
  }

  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
