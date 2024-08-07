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
import {Mascaras} from "../../../../Mascaras";

@Component({
  selector: 'app-list-funcionario',
  templateUrl: './list-funcionario.component.html',
  styleUrls: ['./list-funcionario.component.scss']
})
export class ListFuncionarioComponent implements OnInit {
  colunasMostrar = ['pessoaCpf','pessoaNome','pessoaTelefone','cargo','acao'];
  usuarioListaDataSource: MatTableDataSource<UsuarioDto> = new MatTableDataSource<UsuarioDto>([]);
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, snackBar: this.snackBar})
  mascaras: Mascaras = new Mascaras();
  admin!: boolean;
  pageSlice!: UsuarioDto[];
  qtdRegistros!: number;
  innerWidth: number = window.innerWidth;
  flexDivAlinhar: string = 'row';
  constructor(
    public usuarioService: UsuarioControllerService,
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
    this.usuarioService.usuarioControllerListAllPage({page: {page: event.pageIndex, size: event.pageSize, sort:["pessoaCpf"]}}).subscribe(data => {
      this.usuarioListaDataSource.data = data.content || [];
      this.pageSlice = this.usuarioListaDataSource.data;
    })
  }

  estaLogado(id: number){
    if(this.securityService.getUserId() == id){
      return true
    }
    else{
      return false;
    }
  }

  private buscarDados() {
    this.usuarioService.usuarioControllerListAllPage({page: {page: 0, size: 5, sort:["pessoaCpf"]}}).subscribe(data => {
      this.usuarioListaDataSource.data = data.content  || [];
      this.pageSlice = this.usuarioListaDataSource.data;
      this.qtdRegistros = data.totalElements || 0;
    })
  }

  showResult($event: any[]) {
    this.usuarioListaDataSource.data = $event;
  }

    remover(usuarioDto: UsuarioDto) {
        const currentUser = this.securityService.credential.user;
        const isPermissao = this.securityService.hasRoles(['ROLE_A']);

        if (!isPermissao && currentUser && usuarioDto.pessoaCpf !== currentUser.login) {
            this.mensagens.confirmarErro("Excluir", "Você não pode excluir outro usuário.");
            return;
        }

        this.usuarioService.usuarioControllerRemover({ id: usuarioDto.id || 0 })
            .subscribe(
                retorno => {
                    this.buscarDados();
                    this.mensagens.showMensagemSimples("Excluído com sucesso!");
                    if (currentUser && usuarioDto.pessoaCpf === currentUser.login) {
                        this.securityService.invalidate();
                        this.router.navigate(['/acesso']);
                    }
                },
                error => {
                    this.mensagens.confirmarErro("Excluir", error.message);
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
