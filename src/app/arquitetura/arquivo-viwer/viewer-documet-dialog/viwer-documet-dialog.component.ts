import {ChangeDetectorRef, Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import DevExpress from "devextreme";
import {PdfBreakpoints} from "ngx-extended-pdf-viewer";
import {DocumentoMatriculaDto} from "../../../api/models/documento-matricula-dto";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatriculaDto} from "../../../api/models/matricula-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-viwer-documet-dialog',
  templateUrl: './viwer-documet-dialog.component.html',
  styleUrls: ['./viwer-documet-dialog.component.scss']
})
export class ViwerDocumetDialogComponent implements OnInit {
  public innerWidth: number = window.innerWidth;
  public file: File;
  public fileSRC!: string;
  public isFileImage!: boolean;
  public isFileDocument!: boolean;
  public tipoDeFormulario: string = "Cadastrar";
  // edicao e validação
  public documentoEditarValidar!: DocumentoMatriculaDto;
  private matriculaService!: MatriculaControllerService;
  mensagens: MensagensUniversais = new MensagensUniversais({
    dialog: this.dialog
  })
  flexDivAlinhar: string = 'row';
  naoTemArq: boolean = false;
  listaDocumentosEditareValidar!: DocumentoMatriculaDto[];
  mudouArq = false;

  public constructor(
    private dialogRef: MatDialogRef<ViwerDocumetDialogComponent>,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) data: {
      file: File
      isFileImage: boolean
      isFileDocument: boolean
      documentoEditarValidar: DocumentoMatriculaDto
      tipoDeFormulario: string
      matriculaService: MatriculaControllerService,
      listaDocumentos: DocumentoMatriculaDto[]
    }
  ) {
    this.file = data.file;
    this.isFileImage = data.isFileImage;
    this.isFileDocument = data.isFileDocument;
    this.documentoEditarValidar = data.documentoEditarValidar
    this.tipoDeFormulario = data.tipoDeFormulario || "Cadastrar"
    this.matriculaService = data.matriculaService
    this.listaDocumentosEditareValidar = data.listaDocumentos
  }

  private makeURLFile(file: any) {
    const fileUrl = URL.createObjectURL(file); // Obter o URL do arquivo
    return fileUrl as string;
  }

  ngOnInit(): void {
    this.cd.detectChanges();

    if (this.tipoDeFormulario == "Cadastrar") {
      this.fileSRC = this.makeURLFile(this.file);
      this.naoTemArq = false;
    } else {

      if (!this.documentoEditarValidar) {
        this.mensagens.confirmarErro("Visualizar documento", "Esse documeno não existe na lista");
        this.naoTemArq = true;
        return;
      } else if(!this.documentoEditarValidar.caminhoDocumento){
        this.naoTemArq = true;
        return;
      } else {
        const document = this.documentoEditarValidar;

        this.matriculaService.matriculaControllerObterDocumentoMatricula({body: document})
          .subscribe(response => {
            this.naoTemArq = false;
            const fileName = this.documentoEditarValidar.caminhoDocumento || 'arquivo_sem_nome';
            const fileExtension = fileName.split('.').pop()?.toLowerCase();

            if (fileExtension && ['jpg', 'jpeg', 'png'].includes(fileExtension)) {
              this.isFileImage = true;
              this.isFileDocument = false;
            } else if (fileExtension && ['pdf'].includes(fileExtension)) {
              this.isFileImage = false;
              this.isFileDocument = true;
            } else {
              this.mensagens.confirmarErro("Visualizar documento", "Extensão de arquivo inválida. Por favor, selecione um arquivo .jpg, .jpeg, .png ou .pdf.");
              return;
            }

            const file = new File([response], fileName, {type: response.type});
            this.file = file;
            this.fileSRC = this.makeURLFile(file);

          }, error => {
            this.mensagens.confirmarErro("Obter o documento", error.message);
          });
      }

    }
    this.innerWidth = window.innerWidth;
  }

  closeDialog() {
    this.dialogRef.close(this.mudouArq);
  }

  substituirArq(event: any) {
    this.naoTemArq = false;
    const file = event.target.files[0];
    const fileName = file.name;
    this.file = file;
    const extensoesSuportadas = ['.jpg', '.jpeg', '.pdf', '.png'];

    if (file) {

      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      if (extensoesSuportadas.indexOf('.' + fileExtension) === -1) {
        this.mensagens.confirmarErro("Enviar documento", "Extensão de arquivo inválida. Por favor, selecione um arquivo .jpg, .jpeg , .png ou .pdf.")
        return;
      }

      this.fileSRC = this.makeURLFile(file);
      if (file.type.includes("image")) {
        this.isFileImage = true;
        this.isFileDocument = false;
      } else {
        this.isFileImage = false;
        this.isFileDocument = true;
      }

    }
  }

  salvarArq() {
    const document = this.documentoEditarValidar;
    if(this.documentoEditarValidar.caminhoDocumento)
    {
      if (document.idMatricula && document.tipoDocumento) {
        this.documentoEditarValidar.caminhoDocumento = this.file.name;
        this.matriculaService.matriculaControllerAtualizaDocumentoMatricula({
          idMatricula: document.idMatricula,
          tipoDocumento: document.tipoDocumento,
          body: {multipartFile: this.file}
        }).subscribe(response => {
          this.mudouArq = true;
          this.closeDialog();
          this.confirmarAcao(response, "Salvar documento");
        }, error => {
          this.mensagens.confirmarErro("Salvar documento", error.message);
        });
      }
    }else {
      this.documentoEditarValidar.caminhoDocumento = this.file.name;
      if (document.idMatricula && document.tipoDocumento) {
      this.matriculaService.matriculaControllerUploadDocumento({
        idMatricula: document.idMatricula,
        tipoDocumento: document.tipoDocumento,
        body: {multipartFile: this.file}
      }).subscribe(response => {
        this.mudouArq = true;
        this.closeDialog();
        this.confirmarAcao(response, "Salvar documento");
      }, error => {
        this.mensagens.confirmarErro("Salvar documento", error.message);
      });

      }
    }
  }

  confirmarAcao(matricula: MatriculaDto, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Cadastro!',
        mensagem: `Ação de ${acao} realizada com sucesso!`,
        textoBotoes: {
          ok: 'Confirmar',
        },
      },
    });
  }

  mudarAlinharDocWidth() {
    if (this.innerWidth < 650) {
      return {'width': '28vh'};
    } else if (innerWidth < 1200) {
      return {'width': '60vh'};
    }
    return {'width': '100vh'};
  }

  mudarAlinharDocHeight() {
    if (this.innerWidth < 650) {
      return '40vh';
    } else if (innerWidth < 1200) {
      return '50vh';
    }
    return '61vh';
  }

  mudarAlinharBotoes() {
    if (this.innerWidth < 1000) {
      return this.flexDivAlinhar = "column";
    }
    return this.flexDivAlinhar = "row";
  }

  verificarAlinhar() {
    if (this.flexDivAlinhar == "column") {
      return true;
    }
    return false;
  }

  mudarZoom() {
    if (innerWidth < 650) {
      return '30%';
    } else if (innerWidth < 1200) {
      return '70%';
    }
    return '100%';
  }

  mudarAlinharImagem() {
    if (innerWidth < 650) {
      return {'width': '28vh', 'height': '38vh'};
    } else if (innerWidth < 1200) {
      return {'width': '60vh', 'height': '48vh'};
    }
    return {'width': '100vh', 'height': '61vh'};
  }

  // funcionalidade de zoom na imagem
  zoomLevel = 1;
  offsetX = 0;
  offsetY = 0;
  initialTouchX = 0;
  initialTouchY = 0;
  initialPointerX = 0;
  initialPointerY = 0;
  isDragging = false;

  onWheel(event: WheelEvent) {
    event.preventDefault();
    const wheelDelta = event.deltaY * -0.01;
    this.zoomLevel = Math.min(Math.max(0.5, this.zoomLevel + wheelDelta), 3);
  }

  onTouchStart(event: TouchEvent) {
    event.preventDefault();
    if (event.touches.length === 1) {
      this.initialTouchX = event.touches[0].clientX;
      this.initialTouchY = event.touches[0].clientY;
      this.isDragging = true;
    }
  }

  onTouchMove(event: TouchEvent) {
    event.preventDefault();
    if (this.isDragging && event.touches.length === 1) {
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;
      this.offsetX += touchX - this.initialTouchX;
      this.offsetY += touchY - this.initialTouchY;
      this.initialTouchX = touchX;
      this.initialTouchY = touchY;
    }
  }

  onTouchEnd(event: TouchEvent) {
    this.isDragging = false;
  }

  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 3);
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5);
  }

  onPointerDown(event: PointerEvent) {
    event.preventDefault();
    if (event.pointerType === 'touch' || event.pointerType === 'mouse') {
      this.isDragging = true;
      this.initialPointerX = event.clientX;
      this.initialPointerY = event.clientY;
    }
  }

  onPointerMove(event: PointerEvent) {
    event.preventDefault();
    if (this.isDragging) {
      const pointerX = event.clientX;
      const pointerY = event.clientY;
      this.offsetX += pointerX - this.initialPointerX;
      this.offsetY += pointerY - this.initialPointerY;
      this.initialPointerX = pointerX;
      this.initialPointerY = pointerY;
    }
  }

  onPointerUp(event: PointerEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  downloadFile() {
    const blob = new Blob([this.file], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.file.name;
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  }

}
