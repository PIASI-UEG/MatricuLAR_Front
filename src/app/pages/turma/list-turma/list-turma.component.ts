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
import {TurmaControllerService} from "../../../api/services/turma-controller.service";
import {TurmaDto} from "../../../api/models/turma-dto";
import {Mascaras} from "../../../../Mascaras";
import {InfoTurmaDialogComponent} from "../info-turma-dialog/info-turma-dialog.component";

@Component({
  selector: 'app-list-turma',
  templateUrl: './list-turma.component.html',
  styleUrls: ['./list-turma.component.scss']
})
export class ListTurmaComponent implements OnInit{

  colunasMostrar = ['titulo','turno','nomeProfessor', 'telefoneProfessor','quantidadeAlunos','acao'];
  turmaListaDataSource: MatTableDataSource<TurmaDto> = new MatTableDataSource<TurmaDto>([]) ;
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, snackBar: this.snackBar})
  mascaras: Mascaras = new Mascaras();
  admin!: boolean;
  pageSlice!: TurmaDto[];
  qtdRegistros!: number | undefined;
  innerWidth: number = window.innerWidth;
  flexDivAlinhar: string = 'row';
  constructor(
    public turmaService: TurmaControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private securityService: SecurityService
  ){
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.buscarDados();
  }

  onPageChange(event: PageEvent){
    console.log("teste")
    this.turmaService.turmaControllerListAllPage({page: {page: event.pageIndex, size: event.pageSize, sort:["id"]}}).subscribe(data => {
      this.turmaListaDataSource.data = data?.content || [];
      this.pageSlice = this.turmaListaDataSource.data;
    })
  }

  private buscarDados() {
    this.turmaService.turmaControllerListAllPage({page: {page: 0, size: 5, sort:["id"]}}).subscribe(data => {
      this.turmaListaDataSource.data = data?.content || [];
      this.pageSlice = this.turmaListaDataSource.data;
      this.qtdRegistros = data.totalElements;
    })
  }

  // private buscarDados() {
  //   this.turmaService.turmaControllerListAll().subscribe(data => {
  //     const turmasa : TurmaDto = data;
  //     console.log("DATA:  " , turmasa)
  //     this.turmaListaDataSource.data = data.content;
  //     this.pageSlice = this.turmaListaDataSource.data;
  //     this.qtdRegistros = data.totalElements;
  //   })
  //   console.log("turma: " + this.turmaListaDataSource.data)
  // }

  showResult($event: any[]) {
    this.turmaListaDataSource.data = $event;
    //console.log(this.turmaListaDataSource.data)
  }

  remover(turma: TurmaDto) {
    this.turmaService.turmaControllerRemover({ id: turma.id || 0})
      .subscribe(
        retorno => {
          this.buscarDados();
          this.mensagens.showMensagemSimples("Excluído com sucesso!");
        },error => {
          this.mensagens.confirmarErro("Excluir", error.message)
        }
      );

  }


  confirmarExcluir(turma: TurmaDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${turma.titulo} (ID: ${turma.id})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: turma
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

  openDialog(turmaID: number) {
    console.log(turmaID);
    const dialogRef = this.dialog.open(InfoTurmaDialogComponent,
      {
        data:
          {
            id: turmaID
          }
      })
    dialogRef.afterClosed().subscribe(() => {
        this.buscarDados()
      }
    )
  }

}
