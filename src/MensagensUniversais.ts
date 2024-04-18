import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "./app/core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Component} from "@angular/core";

export class MensagensUniversais {
  private dialog?: MatDialog;
  private router?: Router;
  private dialogRefParameter?: MatDialogRef<any>;
  private telaAtual?: string;
  private snackBar?: MatSnackBar;
  private dialogConfirmation ?: MatDialog;

  constructor(config: {
    dialog?: MatDialog,
    dialogRefParameter?: MatDialogRef<any>,
    dialogConfirmation ?: MatDialog,
    router?: Router,
    telaAtual?: string,
    snackBar?: MatSnackBar
  }) {
    this.dialog = config.dialog;
    this.router = config.router;
    this.dialogRefParameter = config.dialogRefParameter;
    this.dialogConfirmation = config.dialogConfirmation;
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

  acaoCancelarDialog(){
    if (this.dialogConfirmation) {
      const dialogRef = this.dialogConfirmation.open(ConfirmationDialog, {
        data: {
          titulo: 'TEM CERTEZA QUE DESEJA CANCELAR ?',
          textoBotoes: {
            ok: 'Sim',
            cancel: 'Não',
          },
        },
      });

      dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
        if (confirmed?.resultado && this.dialogRefParameter) {
            this.dialogRefParameter.close();
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
