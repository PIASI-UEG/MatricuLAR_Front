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
import {AddAlunoTurmaDialogComponent} from "../../turma/add-aluno-turma-dialog/add-aluno-turma-dialog.component";
import {AddAdvertenciaDialogComponent} from "../add-advertencia-dialog/add-advertencia-dialog.component";
import {MatriculaListagemDto} from "../../../api/models/matricula-listagem-dto";

@Component({
    selector: 'app-list-matricula',
    templateUrl: './list-matricula.component.html',
    styleUrls: ['./list-matricula.component.scss']
})
export class ListMatriculaComponent implements OnInit{

    colunasMostrar = ['id','nome','turma','responsaveis','telefoneWhatsapp','status','acao'];
    matriculaListaDataSource: MatTableDataSource<MatriculaListagemDto> = new MatTableDataSource<MatriculaListagemDto>([]);
    mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, snackBar:this.snackBar})
    admin!: boolean;
    pageSlice!: MatriculaListagemDto[];
    qtdRegistros!: number;
    innerWidth: number = window.innerWidth;
    flexDivAlinhar: string = 'row';
    public readonly LIST_NORMAL = "Normal";
    public readonly LIST_VALIDACACAO = "Validar";
    tipoDeListagem: string = this.LIST_NORMAL;
    matricula!: MatriculaDto;
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
      if(this.tipoDeListagem != "Validar"){
        this.matriculaService.matriculaControllerListAllPageMatriculaListagemDto({offset: event.pageIndex, pageSize:event.pageSize, statusMatricula:"ATIVO"})
          .subscribe(data =>{
            this.matriculaListaDataSource.data = data;
          })
      } else {
        this.matriculaService.matriculaControllerListAllPageMatriculaListagemDto({offset: event.pageIndex, pageSize:event.pageSize, statusMatricula:"AGUARDANDO_ACEITE"})
          .subscribe(data =>{
            this.matriculaListaDataSource.data = data;
          })
      }
    }


    private buscarDados() {
        if(this.tipoDeListagem == "Validar"){

            this.matriculaService.matriculaControllerListarMatriculasListagemPorStatus({statusMatricula:"AGUARDANDO_ACEITE"}).subscribe(data => {
                this.matriculaListaDataSource.data = data || [];
                this.pageSlice = this.matriculaListaDataSource.data;
                this.matriculaService.matriculaControllerQuantidadeMatriculasPorStatus({statusMatricula: "AGUARDANDO_ACEITE"}).subscribe(data =>{
                  this.qtdRegistros = data;
                });
            })}
        else{

            this.matriculaService.matriculaControllerListAllPageMatriculaListagemDto({offset: 0, pageSize: 5,statusMatricula: "ATIVO" }).subscribe(data => {
                this.matriculaListaDataSource.data = data || [];
                this.pageSlice = this.matriculaListaDataSource.data;
              this.matriculaService.matriculaControllerQuantidadeMatriculasPorStatus({statusMatricula: "ATIVO"}).subscribe(data =>{
                this.qtdRegistros = data;
              });
                // console.log(data.content);
            })
        }
    }

    showResult($event: any[]) {
        console.log($event)
        this.matriculaListaDataSource.data = $event;
    }

    remover(listaMatricula: MatriculaListagemDto) {
        console.log(listaMatricula)
        this.matriculaService.matriculaControllerRemover({id: listaMatricula.nroMatricula || 0})
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


    confirmarExcluir(listaMatricula: MatriculaListagemDto) {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Confirmar?',
                mensagem: `A exclusão de: ${listaMatricula.nomeAluno} (ID: ${listaMatricula.nroMatricula})?`,
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

    imprimirTermodaMatricula(id: number, nomeTutor: string) {
        this.matriculaService.matriculaControllerGerarTermo({ id: id, nomeTutor: nomeTutor }).subscribe(data => {
            this.matricula = data;
            console.log(data);
            const caminhoTermo = "Termos-" + this.matricula.cpf + ".pdf";
            this.matriculaService.matriculaControllerGetTermo({ caminhodoc: caminhoTermo }).subscribe(response => {
                let blob: Blob = new Blob([response], { type: 'application/pdf' });
                let downloadLink = document.createElement('a');

                const nav = window.navigator as any;

                if (nav.msSaveOrOpenBlob) {
                    // Para IE
                    nav.msSaveOrOpenBlob(blob, caminhoTermo);
                } else {
                    // Para outros navegadores
                    let url = window.URL.createObjectURL(blob);
                    downloadLink.href = url;
                    downloadLink.download = caminhoTermo;

                    // Para dispositivos móveis
                    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
                        downloadLink.target = '_blank';
                    }

                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);

                    // Limpeza do objeto URL
                    setTimeout(() => {
                        window.URL.revokeObjectURL(url);
                    }, 100);
                }
            });
        });
    }



    openDialog(matriculaDto: MatriculaListagemDto) {
        console.log(matriculaDto);
        const dialogRef = this.dialog.open(InfoMatriculaDialogComponent,
            {
                data:
                    {
                        id: matriculaDto.nroMatricula
                    }
            })
          dialogRef.afterClosed().subscribe(() => {
                this.buscarDados()
            }
        )
    }

    openDialogTest(matriculaDto: MatriculaListagemDto) {
        console.log(matriculaDto);
        const dialogRef = this.dialog.open(AddAlunoTurmaDialogComponent,
            {
                data:
                    {
                        id: matriculaDto.nroMatricula
                    }
            })
        dialogRef.afterClosed().subscribe(() => {
                this.buscarDados()
            }
        )
    }


    public gerarPdfDados(id: number): void {
        this.matriculaService.matriculaControllerGerarPdfDados({ id: id }).subscribe(data => {
            const caminhoTermo = `${id}_Dados-Matricula.pdf`;
            this.matriculaService.matriculaControllerGetTermo({ caminhodoc: caminhoTermo }).subscribe(response => {
                let blob: Blob = new Blob([response], { type: 'application/pdf' });
                let downloadLink = document.createElement('a');

                const nav = window.navigator as any;

                if (nav && nav.msSaveOrOpenBlob) {
                    // Para IE
                    nav.msSaveOrOpenBlob(blob, caminhoTermo);
                } else {
                    // Para outros navegadores
                    let url = window.URL.createObjectURL(blob);
                    downloadLink.href = url;
                    downloadLink.download = caminhoTermo;

                    // Para dispositivos móveis
                    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
                        downloadLink.target = '_blank';
                    }

                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);

                    // Limpeza do objeto URL
                    setTimeout(() => {
                        window.URL.revokeObjectURL(url);
                    }, 100);
                }
            });
        });
    }



    private tipoListagem() {
        const param = this.route.snapshot.url.at(0)?.path;

        if(param == "validar"){
            console.log(param);
            this.tipoDeListagem = this.LIST_VALIDACACAO;
        }
    }
}
