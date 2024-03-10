import {Component, Inject} from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from "@angular/router";


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialog {
  titulo?: string;
  mensagem?: string;
  textoBotaoOk = "Ok"
  textoBotaoCancelar = "Cancelar"
  reload : boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ConfirmationDialogData,
    private dialogRef: MatDialogRef<ConfirmationDialog, ConfirmationDialogResult>){
    if(data){
      this.titulo = data?.titulo;
      this.mensagem = data.mensagem;
      this.textoBotaoOk = data?.textoBotoes?.ok || this.textoBotaoOk;
      this.textoBotaoCancelar = data?.textoBotoes?.cancel || this.textoBotaoCancelar;
      this.reload = data?.reload
      dialogRef.disableClose = true;
    }

  }
  get showCancelButton(): boolean{
    return !!this.data?.textoBotoes?.cancel;
  }

  get showOkButton(): boolean {
    return !!this.data?.textoBotoes?.ok
  }

  onConfirmClick(): void {

    this.dialogRef.close(
      {
        resultado: true,
        dado: this.data?.dado
    });

    if(this.reload)
    {
      window.location.reload();
    }

  }

}
export interface ConfirmationDialogData {
  titulo?: string;
  mensagem?: string;
  textoBotoes?: {
    ok?: string;
    cancel?: string;
    sim?: string;
  }
  reload: boolean;
  dado?: any
}

export interface ConfirmationDialogResult {
  resultado: boolean;
  dado?: any;
}
