import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DocumentoMatriculaDto} from "../../../api/models/documento-matricula-dto";
import {EnumDoc} from "../EnumDoc";

@Component({
  selector: 'app-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.scss']
})
export class UploadArquivoComponent {
  @Input() enumDocPai!: EnumDoc;
  @Input() idBotaoInputImagem !: string;
  @Input() idBotaoInputImagemPreview !: string;
  @Input() validar: boolean = false;
  @Output() enviarDados = new EventEmitter<{ doc: DocumentoMatriculaDto }>();

  arqNome: string = 'Escolha um arquivo';
  selectedFile: string = '';
  isFileImage = false;
  isFileDocument = false;

  onFilechange(event: any){
    const file = event.target.files[0];
    const fileName = file.name;
    console.log(file);
    let blob: Blob;
    blob = file;

    console.log("Enum doc pai", this.enumDocPai)

    if (file) {
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

    let doc: DocumentoMatriculaDto = {
      aceito: false,
      idMatricula: 1,
      tipoDocumento: this.enumDocPai,
      caminhoDocumento: file.name,
      arquivo: blob
    };

    const dados = {doc: doc};
    this.enviarDados.emit(dados)

  }

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
}

