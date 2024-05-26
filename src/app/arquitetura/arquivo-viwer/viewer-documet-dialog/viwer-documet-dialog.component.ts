import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import DevExpress from "devextreme";
import {PdfBreakpoints} from "ngx-extended-pdf-viewer";
import {DocumentoMatriculaDto} from "../../../api/models/documento-matricula-dto";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MensagensUniversais} from "../../../../MensagensUniversais";


@Component({
  selector: 'app-viwer-documet-dialog',
  templateUrl: './viwer-documet-dialog.component.html',
  styleUrls: ['./viwer-documet-dialog.component.scss']
})
export class ViwerDocumetDialogComponent implements OnInit{
  public innerWidth: number = window.innerWidth;
  public file: File;
  public fileSRC!: string;
  public isFileImage!: boolean;
  public isFileDocument!: boolean;
  public tipoDeFormuladorio: string =  "Cadastrar";
  // edicao e validação
  private documentoEditarValidar!: DocumentoMatriculaDto;
  private  matriculaService!: MatriculaControllerService;
  mensagens: MensagensUniversais = new MensagensUniversais({
    dialog: this.dialog
  })
  flexDivAlinhar: string = 'row';

  public constructor(
    private dialogRef: MatDialogRef<ViwerDocumetDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: {
      file: File
      isFileImage: boolean
      isFileDocument: boolean
      documentoEditarValidar: DocumentoMatriculaDto
      tipoDeFormuladorio: string
      matriculaService: MatriculaControllerService,
    }
  ) {
    this.file = data.file;
    this.isFileImage =data.isFileImage;
    this.isFileDocument = data.isFileDocument;
    this.documentoEditarValidar = data.documentoEditarValidar
    this.tipoDeFormuladorio = data.tipoDeFormuladorio
    this.matriculaService = data.matriculaService
  }

  private makeURLFile(file: any) {
    const fileUrl = URL.createObjectURL(file); // Obter o URL do arquivo
    return fileUrl as string;
  }

  ngOnInit(): void {
    if (!this.documentoEditarValidar) {
      console.error('documentoEditarValidar não está definido');
      return;
    }

    if (this.tipoDeFormuladorio === 'Cadastrar') {
      this.fileSRC = this.makeURLFile(this.file);
    } else {
      const document = this.documentoEditarValidar;

      this.matriculaService.matriculaControllerObterDocumentoMatricula({ body: document })
        .subscribe(response => {
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

          const file = new File([response], fileName, { type: response.type });
          this.fileSRC = this.makeURLFile(file);
        }, error => {
          console.error('Erro ao obter o documento:', error);
        });
    }
    this.innerWidth = window.innerWidth;
  }

  closeDialog(){
    this.dialogRef.close();
  }


  mudarAlinhar() {
    if(this.innerWidth < 650)
    {
      return {'width' : '28vh'};
    }
    else if (innerWidth < 1200){
      return {'width' : '60vh'};
    }
    return {'width': '100vh'};
  }

  mudarAlinharBotoes() {
    if(this.innerWidth < 1500)
    {
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
    if(innerWidth < 650)
    {
      return '30%';
    }
    else if (innerWidth < 1200){
      return '70%';
    }
    return '100%';
  }

  mudarAlinharImagem() {
    if(innerWidth < 650)
    {
      return {'width' : '28vh', 'height': '70vh'};
    }
    else if (innerWidth < 1200){
      return {'width' : '60vh', 'height': '70vh'};
    }
    return {'width': '100vh', 'height': '70vh'};
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

}
