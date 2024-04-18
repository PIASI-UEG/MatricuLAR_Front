import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {Validacoes} from "../../../../Validacoes";
import {User} from "../../../arquitetura/security/User";
import {ConfirmationDialogResult} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import SignaturePad from "signature_pad";
import {AssinaturaDigitalDialogComponent} from "../assinatura-digital-dialog/assinatura-digital-dialog.component";

@Component({
  selector: 'app-assinatura-dialog',
  templateUrl: './verifica-c-p-f-dialog.component.html',
  styleUrls: ['./verifica-c-p-f-dialog.component.scss']
})
export class VerificaCPFDialogComponent implements OnInit{
  formGroup!: FormGroup;
  private validacoes = new Validacoes();
  mensagens = new MensagensUniversais({dialog: this.dialog, dialogRefParameter: this.dialogRef, dialogConfirmation: this.dialogConfirmation});
  flexDivAlinhar: string = 'row';
  verificarAlinharDiv :boolean = false;
  public constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VerificaCPFDialogComponent>,
    private dialog: MatDialog,
    private dialogConfirmation: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      cpf: [null, [Validators.required, this.validacoes.validarCpf]],
    });
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {

      this.dialogRef.close(); // fecha o diálogo atual

      const novoDialogRef = this.dialog.open(AssinaturaDigitalDialogComponent); // abre um novo diálogo com as configurações fornecidas
    }
    }


  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  mudarAlinhar() {
    if(innerWidth < 1000)
    {
      this.verificarAlinharDiv = true;
      return this.flexDivAlinhar = "column";
    }
    this.verificarAlinharDiv = false;
    return this.flexDivAlinhar = "row";
  }

}
