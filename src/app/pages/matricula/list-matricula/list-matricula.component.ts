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
import {Matricula} from "../../../custom_models/matricula";

@Component({
  selector: 'app-list-matricula',
  templateUrl: './list-matricula.component.html',
  styleUrls: ['./list-matricula.component.scss']
})
export class ListMatriculaComponent implements OnInit{

  colunasMostrar = ['numeroMatricula','nome','turma','nomeResponsaveis','telefone','status','acao'];
  turmaListaDataSource: MatTableDataSource<Matricula> = new MatTableDataSource<Matricula>([]);
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, snackBar:this.snackBar})
  admin!: boolean;
  pageSlice!: Matricula[];
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

  remover(listaMatricula: Matricula) {
    console.log("Removido", listaMatricula.nome);
    this.mensagens.showMensagemSimples("Excluído com sucesso!");
  }


  confirmarExcluir(listaMatricula: Matricula) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${listaMatricula.nome} (ID: ${listaMatricula.numeroMatricula})?`,
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

}
