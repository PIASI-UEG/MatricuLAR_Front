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
import {Turma} from "../../../custom_models/turma";
import {FormTurmaDialogComponent} from "../form-turma-dialog/form-turma-dialog.component";
import {UsuarioControllerService} from "../../../api/services/usuario-controller.service";
import {TurmaControllerService} from "../../../api/services/turma-controller.service";

@Component({
  selector: 'app-list-turma',
  templateUrl: './list-turma.component.html',
  styleUrls: ['./list-turma.component.scss']
})
export class ListTurmaComponent implements OnInit{

  colunasMostrar = ['nome','professora','telefoneProfessora','quantidadeAlunos','acao'];
  turmaListaDataSource: MatTableDataSource<Turma> = new MatTableDataSource<Turma>([]);
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, snackBar: this.snackBar})
  admin!: boolean;
  pageSlice!: Turma[];
  qtdRegistros!: number;
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
    this.turmaService.turmaControllerListAllPage({page: {page: event.pageIndex, size: event.pageSize, sort:["cpf"]}}).subscribe(data => {
      this.turmaListaDataSource.data = data.content;
      this.pageSlice = this.turmaListaDataSource.data;
    })
  }


  private buscarDados() {
    this.turmaService.turmaControllerListAllPage({page: {page: 0, size: 5, sort:["pessoaCpf"]}}).subscribe(data => {
      this.turmaListaDataSource.data = data.content;
      this.pageSlice = this.turmaListaDataSource.data;
      this.qtdRegistros = data.totalElements;
    })
  }

  showResult($event: any[]) {
    this.turmaListaDataSource.data = $event;
  }

  remover(turma: Turma) {
    console.log("Removido", turma.nome);
    this.turmaService.turmaControllerRemover({ id: turma.id || 0})
      .subscribe(
        retorno => {
          this.buscarDados();
          this.mensagens.showMensagemSimples("Excluído com sucesso!");
          console.log("Exclusão:", retorno);
        },error => {
          this.mensagens.confirmarErro("Excluir", error.message)
        }
      );

  }


  confirmarExcluir(turma: Turma) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${turma.nome} (ID: ${turma.id})?`,
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

}
