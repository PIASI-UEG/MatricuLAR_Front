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

  }


  private buscarDados() {

  }

  showResult($event: any[]) {
    this.turmaListaDataSource.data = $event;
  }

  remover(turma: Turma) {
    console.log("Removido", turma.nome);
    this.mensagens.showMensagemSimples("Excluído com sucesso!");
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
  openDialogCreate(): void {
    console.log("Novo");
    const dialogRef = this.dialog.open(FormTurmaDialogComponent,
      {
        data:
          {
            turma: null
          }
      })
    dialogRef.afterClosed().subscribe(() => {
        this.buscarDados()
      }
    )
  }
  openDialog(turma: Turma): void {
    console.log(turma);
    const dialogRef = this.dialog.open(FormTurmaDialogComponent,
      {
        data:
          {
            turma: turma
          }
      })
    dialogRef.afterClosed().subscribe(() => {
        this.buscarDados()
      }
    )
  }

}
