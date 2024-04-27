import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validacoes} from "../../../../Validacoes";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import SignaturePad, {PointGroup} from "signature_pad";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-assinatura-digital-dialog',
  templateUrl: './assinatura-digital-dialog.component.html',
  styleUrls: ['./assinatura-digital-dialog.component.scss']
})
export class AssinaturaDigitalDialogComponent implements AfterViewInit {
  mensagens = new MensagensUniversais({
    dialog: this.dialog,
    dialogRefParameter: this.dialogRef,
    dialogConfirmation: this.dialogConfirmation
  });
  flexDivAlinhar: string = 'row';
  @ViewChild("canvas", {static: true}) canvas?: ElementRef;
  sig?: SignaturePad;
  verificarAlinharDiv: boolean = false;
  image!: string;
  private fileTermo !: File


  public constructor(
    private sanitizer: DomSanitizer,
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

  ativarCanva() {
    if (this.canvas && this.canvas.nativeElement) {
      this.sig = new SignaturePad(this.canvas.nativeElement);
      console.log("CHEGOU AQUI")
    }
    console.log("NAO FUNCIONA" + this.canvas, this.canvas?.nativeElement)
  }

  clearCanvas() {
    if (this.sig && !this.sig.isEmpty())
      this.sig.clear();
  }

  gerarImagemAssinatura(): string {
    if (this.sig && !this.sig.isEmpty()) {
      const image = this.sig.toDataURL();
      const base64Img = image.split(',')[1];
      // const listAss: AssinaturaDto[] = [];
      // listAss.push(this.assinatura);
      return base64Img;
    } else {
      return '';
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
    if (innerWidth < 1000) {
      this.verificarAlinharDiv = true;
      return this.flexDivAlinhar = "column";
    }
    this.verificarAlinharDiv = false;
    return this.flexDivAlinhar = "row";
  }

  async testarCrypto() {
    //https://nodejs.org/api/webcrypto.html
    try {
      // Gerar o par de chaves RSA
      const {publicKey, privateKey} = await this.generateRsaKey();


      const imgAss = this.gerarImagemAssinatura()
      // fazer uma requisicao passando a imagem da assinatura com o cpf
      // retornar o termo com a assinaura e o carimbo de data e hora prontos como esta
      // this.matriculaContrller.matriculaControllerUploadTermoAssinado({idMatricula: 1, body: imgAss}).subscribe()
      this.matriculaContrller.matriculaControllerGetTermo({caminhodoc: "Termo-Responsabilidade-12345678922.pdf"})
        .subscribe( (response: Blob) => {
        this.fileTermo = new File([response], "Termo-Responsabilidade-Assinado12345678922.pdf", { type: response.type });
      });
      // this.matriculaContrller.matriculaControllerGetTermoAssinado({caminhodoc: "Termo-Responsabilidade-Assinado12345678922.pdf"})
      //   .subscribe((response: Blob) => {
      //     this.fileTermo = new File([response], "Termo-Responsabilidade-Assinado12345678922.pdf", { type: response.type });
      //   });

      if(this.fileTermo) {
        // apos isso assinar o documento digitalmente e fazer o hash que sera criptografado com a chave privada

        const selectedFile = this.makeURLFile(this.fileTermo);
        // gerando hash de documento
        const hashString = await this.calcularHashSHA256(this.fileTermo);

        // assinando documento
        const assinatura = await this.sign(privateKey, hashString)

        // PDF assinado
        await this.assinaPDF(imgAss, assinatura)
        // mandar esse PDF com a assinatura e a chave publica para o back
        // ele vai guardar esse PDF assinado e a chave publica em uma tabela
        // apos isso fazer uma funcao no back que recebe um pdf e verifica se ele foi assinado pelo sistema da creche
        // o arquivo de termo estara no back entao fazer um hash dele, depois usar chave publica para descriptografar o hash e testar se conferem

        console.log("hash", hashString)
      }
      // Sem um certificado digital emitido por uma autoridade de certificação (CA), a abordagem mais comum para implementar uma assinatura digital em um PDF é usar uma chave privada para assinar o documento. Aqui está uma sequência de passos simplificada para realizar isso:
      //
      //   Geração do par de chaves: Use uma biblioteca criptográfica para gerar um par de chaves pública/privada. Isso pode ser feito usando algoritmos como RSA ou ECDSA. Exemplos de bibliotecas incluem OpenSSL para ambientes de servidor ou a API Web Cryptography para navegadores.
      //   Assinatura do PDF:
      //   Calcule um hash do conteúdo do PDF. Isso normalmente é feito usando um algoritmo de hash seguro, como SHA-256.
      // Use sua chave privada para assinar o hash calculado. Isso pode ser feito criptografando o hash com sua chave privada.
      //   Anexe a assinatura resultante ao PDF. Isso pode ser feito adicionando um campo de assinatura ao PDF ou adicionando a assinatura como um anexo.
      //   Validação da assinatura:
      //   Extraia a assinatura do PDF.
      //   Recalcule o hash do conteúdo do PDF original.
      //   Use a chave pública correspondente à chave privada usada para assinar o PDF para verificar a assinatura. Isso normalmente envolve descriptografar a assinatura com a chave pública e comparar o hash recalculado com o hash extraído da assinatura.



      // debug
      console.log('Chave Pública:', publicKey);
      console.log('Chave Privada:', privateKey);
    } catch (error) {
      console.error('Erro ao assinar documento:', error);
    }
  }

  //adicionar imagem ao pdf
  async assinaPDF(URLAss: string, assinatura: ArrayBuffer) {
    //https://pdf-lib.js.org/
    const { PDFDocument } = require('pdf-lib');
    const axios = require('axios');
    const imgBuffer = Uint8Array.from(atob(URLAss), c => c.charCodeAt(0)).buffer

    const pdfDoc = await PDFDocument.load( await this.fileTermo.arrayBuffer());

    const pngImage = await pdfDoc.embedPng(imgBuffer);
    const page = pdfDoc.getPages()[pdfDoc.getPageCount() - 1];
    const pngDims = pngImage.scale(0.5);
    const x = page.getWidth() / 2 - pngDims.width / 2;
    const y = pngDims.height + 40; // Distância da margem inferior
    page.drawImage(pngImage, {
      x: x,
      y: y,
      width: pngDims.width,
      height: pngDims.height,
    });

    const now = new Date();
    const formattedDate = now.toLocaleString('pt-BR');
    page.drawText(`Assinado Eletronicamente em: ${formattedDate}`, {
      x: 150,
      y: y - 30,
      size: 12,
    });

    await pdfDoc.attach(assinatura, 'assinatura.p7s', {
      mimeType: 'application/pkcs7-signature',
      description: 'Assinatura Digital',
      creationDate: new Date(),
      modificationDate: new Date(),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento-assinado.pdf';
    document.body.appendChild(a);
    a.click();

    // Limpa o URL blob criado
    URL.revokeObjectURL(url);
  }

  // funcao para calcular hash do arquivo gerado
  async calcularHashSHA256(data: any, algorithm = 'SHA-256') {
    const { subtle } = globalThis.crypto;
    const ec = new TextEncoder();
    const digest = await subtle.digest(algorithm, ec.encode(data));
    const hashArray = Array.from(new Uint8Array(digest));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  // funcao para gerar url do arquivo
  private makeURLFile(file: any) {
    const fileUrl = URL.createObjectURL(file); // Obter o URL do arquivo
    return fileUrl as string;
  }

  // funcao para assinar o documento
  async sign(key: any, data: string) {
    const {subtle} = globalThis.crypto;
    const ec = new TextEncoder();
    const signature =
      await subtle.sign('RSASSA-PKCS1-v1_5', key, ec.encode(data));
    return signature;
  }

  // Função para gerar o par de chaves RSA
  async generateRsaKey(modulusLength = 2048, hash = 'SHA-256') {
    // https://nodejs.org/api/webcrypto.html
    // API Web Cryptography
    const {subtle} = globalThis.crypto;
    const publicExponent = new Uint8Array([1, 0, 1]);
    const {
      publicKey,
      privateKey,
    } = await subtle.generateKey({
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength,
      publicExponent,
      hash,
    }, true, ['sign', 'verify']);

    return {publicKey, privateKey};
  }


}

