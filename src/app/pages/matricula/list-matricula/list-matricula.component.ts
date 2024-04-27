import {Component, HostListener, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {PageEvent} from "@angular/material/paginator";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MatriculaDto} from "../../../api/models/matricula-dto";
import {InfoMatriculaDialogComponent} from "../info-matricula-dialog/info-matricula-dialog.component";
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
  public readonly LIST_NORMAL = "Normal";
  public readonly LIST_VALIDACACAO = "Validar";
  tipoDeListagem: string = this.LIST_NORMAL;
  constructor(
    public matriculaService: MatriculaControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private securityService: SecurityService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.tipoListagem();
    this.buscarDados();
  }

  onPageChange(event: PageEvent){

  }


  private buscarDados() {
    if(this.tipoDeListagem == "Validar"){

      this.matriculaService.matriculaControllerSearchFieldsAction({body: [{name: "status", type: "StatusMatricula", value: "AC", searchType: "CONTAINS" }]})
          .subscribe(data => {
        this.matriculaListaDataSource.data = data.content;
        this.pageSlice = this.matriculaListaDataSource.data;
        this.qtdRegistros = data.totalElements;
          })}
    else{

      this.matriculaService.matriculaControllerListAllPage({page: {page: 0, size: 5, sort:["id"]}}).subscribe(data => {
        this.matriculaListaDataSource.data = data.content;
        this.pageSlice = this.matriculaListaDataSource.data;
        this.qtdRegistros = data.totalElements;
        console.log(data.content);
      })
    }
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

    imprimirTermodaMatricula(element: any){

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

  private tipoListagem() {
    const param = this.route.snapshot.url.at(0)?.path;

    if(param == "validar"){
      console.log(param);
      this.tipoDeListagem = this.LIST_VALIDACACAO;
    }
  }
}
