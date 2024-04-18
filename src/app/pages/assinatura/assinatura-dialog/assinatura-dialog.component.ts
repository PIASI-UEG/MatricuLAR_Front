import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {Validacoes} from "../../../../Validacoes";
import {User} from "../../../arquitetura/security/User";
import {ConfirmationDialogResult} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import SignaturePad from "signature_pad";

@Component({
  selector: 'app-assinatura-dialog',
  templateUrl: './assinatura-dialog.component.html',
  styleUrls: ['./assinatura-dialog.component.scss']
})
export class AssinaturaDialogComponent implements OnInit{
  formGroup!: FormGroup;
  private validacoes = new Validacoes();
  mensagens = new MensagensUniversais({dialog: this.dialog, dialogRefParameter: this.dialogRef, dialogConfirmation: this.dialogConfirmation});
  flexDivAlinhar: string = 'row';
  @ViewChild("canvas", { static: true }) canvas?: ElementRef;
  sig?: SignaturePad;
  CPFValido: boolean = false;
  public constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AssinaturaDialogComponent>,
    private dialog: MatDialog,
    private dialogConfirmation: MatDialog,
    private router: Router,
    private securityService: SecurityService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    dialogRef.disableClose = true;

  }

  ngOnInit(): void {
    this.createForm();
  }

  ativarCanva(){
    if (this.canvas && this.canvas.nativeElement) {
      this.sig = new SignaturePad(this.canvas.nativeElement);
    }
  }

  clearCanvas() {
    if(this.sig && !this.sig.isEmpty())
      this.sig.clear();
  }
  gerarImagemAssinatura(): string {
    if (this.sig && !this.sig.isEmpty()) {
      const image = this.sig.toDataURL();
      return image;
    } else {

      return '';
    }
  }

  salvarImagemAssinatura(): void {
    if (this.sig && !this.sig.isEmpty()) {

      const imageData = this.sig.toDataURL();

      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'assinatura.png';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } else {
      // Exibe uma mensagem ou toma outra ação caso não haja uma assinatura
      console.log('Nenhuma assinatura encontrada para salvar.');
    }
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      cpf: [null, [Validators.required, this.validacoes.validarCpf]],
    });
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.CPFValido = true;
      this.ativarCanva();
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  mudarAlinhar() {
    if(innerWidth < 1000)
    {
      return this.flexDivAlinhar = "column";
    }
    return this.flexDivAlinhar = "row";
  }

  verificarAlinhar(){
    if(this.flexDivAlinhar == "column"){
      return true;
    }
    return false;
  }

}
