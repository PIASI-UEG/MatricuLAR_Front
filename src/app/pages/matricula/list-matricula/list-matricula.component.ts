import {Component, HostListener, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {PageEvent} from "@angular/material/paginator";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MatriculaDto} from "../../../api/models/matricula-dto";
import {InfoMatriculaDialogComponent} from "../info-matricula-dialog/info-matricula-dialog.component";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import DevExpress from "devextreme";
import data = DevExpress.data;

@Component({
  selector: 'app-list-matricula',
  templateUrl: './list-matricula.component.html',
  styleUrls: ['./list-matricula.component.scss']
})
export class ListMatriculaComponent implements OnInit{

  colunasMostrar = ['id','nome','turma','responsaveis','telefoneWhatsapp','status','acao'];
  matriculaListaDataSource: MatTableDataSource<MatriculaDto> = new MatTableDataSource<MatriculaDto>([]);
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, snackBar:this.snackBar})
  admin!: boolean;
  pageSlice!: MatriculaDto[];
  qtdRegistros!: number;
  innerWidth: number = window.innerWidth;
  flexDivAlinhar: string = 'row';
  matricula!: MatriculaDto;
  constructor(
    public matriculaService: MatriculaControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private securityService: SecurityService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.buscarDados();
  }

  onPageChange(event: PageEvent){

  }


  private buscarDados() {
    this.matriculaService.matriculaControllerListAllPage({page: {page: 0, size: 5, sort:["id"]}}).subscribe(data => {
      this.matriculaListaDataSource.data = data.content;
      console.log(data.content);
      this.pageSlice = this.matriculaListaDataSource.data;
      this.qtdRegistros = data.totalElements;
    })
  }

  showResult($event: any[]) {
    this.matriculaListaDataSource.data = $event;
  }

  remover(listaMatricula: MatriculaDto) {
    console.log("Removido", listaMatricula.nome);
    this.mensagens.showMensagemSimples("Excluído com sucesso!");
  }


  confirmarExcluir(listaMatricula: MatriculaDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${listaMatricula.nome} (ID: ${listaMatricula.id})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: listaMatricula
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.remover(confirmed.dado);
      }
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = window.innerWidth;
  }

  mudarAlinhar() {

    if(this.innerWidth < 1500)
    {
      return this.flexDivAlinhar = "column";
    }
    return this.flexDivAlinhar = "row";

  }

    imprimirTermodaMatricula(id: number, cpfTutor: string){
      this.matriculaService.matriculaControllerGerarTermo({id: id, cpfTutor: cpfTutor}).subscribe(data=>{
        this.matricula = data;
        console.log(data);
        const caminhoDoc = "Termo-Responsabilidade-"+this.matricula.cpf+".pdf";
        this.matriculaService.matriculaControllerGetDocumentoMatricula({caminhodoc:caminhoDoc})
          .subscribe(response =>{
            let blob:Blob = response
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = caminhoDoc;
            downloadLink.click()
          })
      })
    }

  openDialog(matriculaDto: MatriculaDto) {
    console.log(matriculaDto);
    const dialogRef = this.dialog.open(InfoMatriculaDialogComponent,
      {
        data:
          {
            matricula: matriculaDto
          }
      })
    dialogRef.afterClosed().subscribe(() => {
        this.buscarDados()
      }
    )
  }

}
