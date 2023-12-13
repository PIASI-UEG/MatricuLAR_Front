import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {PageEvent} from "@angular/material/paginator";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {UsuarioControllerService} from "../../../api/services/usuario-controller.service";
import {MensagensUniversais} from "../../../../MensagensUniversais";

@Component({
  selector: 'app-list-funcionario',
  templateUrl: './list-funcionario.component.html',
  styleUrls: ['./list-funcionario.component.scss']
})
export class ListFuncionarioComponent implements OnInit {
  colunasMostrar = ['pessoaCpf','pessoaNome','cargo','acao'];
  usuarioListaDataSource: MatTableDataSource<UsuarioDto> = new MatTableDataSource<UsuarioDto>([]);
  mensagens: MensagensUniversais = new MensagensUniversais(this.dialog, this.router, "funcionario", this.snackBar)
  admin!: boolean;
  pageSlice!: UsuarioDto[];
  qtdRegistros!: number;
  innerWidth: number = window.innerWidth;
  flexDivAlinhar: string = 'row';
  constructor(
    public usuarioService: UsuarioControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private securityService: SecurityService
  ){
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.buscarDados();
  }

  onPageChange(event: PageEvent){
    this.usuarioService.usuarioControllerListAllPage({page: {page: event.pageIndex, size: event.pageSize, sort:["cpf"]}}).subscribe(data => {
      this.usuarioListaDataSource.data = data.content;
      this.pageSlice = this.usuarioListaDataSource.data;
    })
  }


  private buscarDados() {
    this.usuarioService.usuarioControllerListAllPage({page: {page: 0, size: 5, sort:["pessoaCpf"]}}).subscribe(data => {
      this.usuarioListaDataSource.data = data.content;
      this.pageSlice = this.usuarioListaDataSource.data;
      this.qtdRegistros = data.totalElements;
    })
  }

  showResult($event: any[]) {
    this.usuarioListaDataSource.data = $event;
  }

  remover(usuarioDto: UsuarioDto) {
    console.log("Removido", usuarioDto.pessoaCpf);
    this.usuarioService.usuarioControllerRemover({ id: usuarioDto.codigo || -1})
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


  confirmarExcluir(usuarioDto: UsuarioDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${usuarioDto.pessoaNome} (ID: ${usuarioDto.pessoaCpf})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: usuarioDto
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
