import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EnumDoc} from "../EnumDoc";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ViwerDocumetDialogComponent} from "../viewer-documet-dialog/viwer-documet-dialog.component";
import {MensagensUniversais} from "../../../../MensagensUniversais";

@Component({
  selector: 'app-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.scss']
})
export class UploadArquivoComponent{
  @Input() enumDocPai!: EnumDoc;
  @Input() idBotaoInputImagem !: string;
  @Input() idBotaoInputImagemPreview !: string;
  @Output() enviarDados = new EventEmitter<{ doc: File , tipoDocumento: EnumDoc}>();

  mensagens: MensagensUniversais = new MensagensUniversais({
    dialog: this.dialog
  })
  file!: File;
  arqNome: string = 'Escolha um arquivo';
  selectedFile: string = '';
  isFileImage = false;
  isFileDocument = false;

  constructor(
    private dialog: MatDialog,
  ) {}


  onFilechange(event: any){
    const file = event.target.files[0];
    const fileName = file.name;
    let blob: Blob;
    blob = file;
    this.file = file;
    const extensoesSuportadas = ['.jpg', '.jpeg', '.pdf', '.png'];
    const extensoesSuportadasFotoCrianca = ['.jpg', '.jpeg', '.png'];

    if (file) {

      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      if(this.enumDocPai == EnumDoc.FOTO_CRIANCA)
      {
        if (extensoesSuportadasFotoCrianca.indexOf('.' + fileExtension) === -1) {
          this.mensagens.confirmarErro("Enviar documento", "Extensão de arquivo inválida. Por favor, para a foto da criança selecione um arquivo .jpg, .jpeg ou .png.")
          return;
        }
      }
      else{
        if (extensoesSuportadas.indexOf('.' + fileExtension) === -1) {
          this.mensagens.confirmarErro("Enviar documento", "Extensão de arquivo inválida. Por favor, selecione um arquivo .jpg, .jpeg, .png ou .pdf.")
          return;
        }
      }



      this.selectedFile = this.makeURLFile(file);
      if (this.verificarTipoArquivo(file)) {
        this.isFileImage = true;
        this.isFileDocument = false;
      } else {
        this.isFileImage = false;
        this.isFileDocument = true;
      }
        this.arqNome = this.diminuirTamanhoNomeArquivo(fileName);
    }


    const dados = {doc: file, tipoDocumento: this.enumDocPai};
    this.enviarDados.emit(dados)

  }

  // ngAfterViewInit() {
  //   this.pegaDoc()
  // }

  private makeURLFile(file: any) {
    const fileUrl = URL.createObjectURL(file); // Obter o URL do arquivo
    return fileUrl as string;
  }

  private verificarTipoArquivo(file: any) {
    if (file.type.includes("image")) {
      return true;
    } else {
      return false;
    }
  }

  private diminuirTamanhoNomeArquivo(fileName: string) {
    return fileName.substring(0, 20 - 3) + '...';
  }

  openDialogPreviewExpanded(){
    const config: MatDialogConfig = {
      data: {
        file: this.file,
        isFileImage: this.isFileImage,
        isFileDocument: this.isFileDocument,
      }
    };
    this.dialog.open(ViwerDocumetDialogComponent, config);
  }

  // pegaDoc() {
  //
  //   this.matriculaService.matriculaControllerGetDocumentoMatricula({caminhodoc: "Amostra.pdf"})
  //     .subscribe((response: Blob) => {
  //       this.isFileDocument = true;
  //       const fileName = "Amostra.pdf";
  //       const file = new File([response], fileName, { type: response.type });
  //
  //       // Agora você tem o arquivo, você pode fazer o que precisar com ele
  //       this.selectedFile = this.makeURLFile(file); // Se selectedFile for um atributo da sua classe
  //
  //
  //       console.log("Arquivo:", file);
  //     });
  //
  // };
}

