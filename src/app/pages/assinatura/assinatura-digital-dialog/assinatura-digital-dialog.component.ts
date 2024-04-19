import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validacoes} from "../../../../Validacoes";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import SignaturePad, {PointGroup} from "signature_pad";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {AssinaturaDto} from "../../../api/models/assinatura-dto";

@Component({
  selector: 'app-assinatura-digital-dialog',
  templateUrl: './assinatura-digital-dialog.component.html',
  styleUrls: ['./assinatura-digital-dialog.component.scss']
})
export class AssinaturaDigitalDialogComponent implements AfterViewInit{
  mensagens = new MensagensUniversais({dialog: this.dialog, dialogRefParameter: this.dialogRef, dialogConfirmation: this.dialogConfirmation});
  flexDivAlinhar: string = 'row';
  @ViewChild("canvas", { static: true }) canvas?: ElementRef;
  sig?: SignaturePad;
  verificarAlinharDiv :boolean = false;
  image!: string;
  assinatura!: AssinaturaDto;
  public constructor(
    private dialogRef: MatDialogRef<AssinaturaDigitalDialogComponent>,
    private dialog: MatDialog,
    private dialogConfirmation: MatDialog,
    private matriculaContrller: MatriculaControllerService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngAfterViewInit() {
      this.ativarCanva();
  }

  ativarCanva(){
    if (this.canvas && this.canvas.nativeElement) {
      this.sig = new SignaturePad(this.canvas.nativeElement);
      console.log("CHEGOU AQUI")
    }
    console.log("NAO FUNCIONA" + this.canvas, this.canvas?.nativeElement)
  }

  clearCanvas() {
    if(this.sig && !this.sig.isEmpty())
      this.sig.clear();
  }
  gerarImagemAssinatura(): void {
    if (this.sig && !this.sig.isEmpty()) {
      const image = this.sig.toDataURL();
      const base64Image = this.convertToBase64(image);
      this.assinatura.imagemAss = base64Image;
      this.assinatura.cpfass = "12345678900";
      const listAss: AssinaturaDto[] = [];
      listAss.push(this.assinatura);
      this.matriculaContrller.matriculaControllerGerarTermoBack({body:listAss})
    } else {
    }
  }

  convertToBase64(svgImage: string): string {
    // Remova a parte inicial do SVG (data:image/svg+xml;base64,) se existir
    const startIndex = svgImage.indexOf(',') + 1;
    const svgData = svgImage.slice(startIndex);

    // Converta o SVG para base64
    const base64Image = btoa(svgData);

    return base64Image;
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

