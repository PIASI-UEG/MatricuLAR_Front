import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SecurityService } from '../../../arquitetura/security/security.service';
import { MatriculaControllerService } from '../../../api/services/matricula-controller.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NecessidadeEspecialControllerService } from '../../../api/services/necessidade-especial-controller.service';
import {MatriculaVisualizarDto} from "../../../api/models/matricula-visualizar-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {NecessidadeEspecialDto} from "../../../api/models/necessidade-especial-dto";

@Component({
    selector: 'app-add-necessidade-especial-dialog',
    templateUrl: './add-necessidade-especial-dialog.component.html',
    styleUrls: ['./add-necessidade-especial-dialog.component.scss']
})
export class AddNecessidadeEspecialDialogComponent implements OnInit {
    formGroup!: FormGroup;
    public readonly ACAO_INCLUIR = 'Cadastrar';
    public readonly ACAO_EDITAR = 'Editar';
    acao: string = this.ACAO_INCLUIR;
    nomeAluno: string = '';
    matricula: MatriculaVisualizarDto[] = [];
    dados: any;

    constructor(
        private formBuilder: FormBuilder,
        private _adapter: DateAdapter<any>,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<AddNecessidadeEspecialDialogComponent>,
        private snackBar: MatSnackBar,
        private securityService: SecurityService,
        private matriculaService: MatriculaControllerService,
        private necessidadeService: NecessidadeEspecialControllerService,
        private sanitizer: DomSanitizer,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this._adapter.setLocale('pt-br');
        this.dados = data;
    }

    ngOnInit() {
        this.criaFormulario();
        this.buscaNomeAluno();
    }

    criaFormulario() {
        this.formGroup = this.formBuilder.group({
            id: [null, Validators.required],
            titulo: [null, Validators.required],
            observacoes: [null, Validators.required],
        });
    }

    private buscaNomeAluno() {
        const matricula = this.dados.matricula;
        this.matriculaService.matriculaControllerGetMatriculaVisualizar({ IdMatricula: matricula.id }).subscribe(
            (response: MatriculaVisualizarDto) => {
                this.nomeAluno = response.nomeAluno ?? '';
            },
            (error) => {
                console.error('Erro ao obter o nome do aluno:', error);
                this.snackBar.open('Erro ao obter os dados da matrícula', 'Fechar', {
                    duration: 3000,
                });
                this.fechar();
            }
        );
    }

    onSubmit() {
        this.incluirNecessidade();
    }

    private incluirNecessidade() {
        console.log("Dados da Necessidade:", this.formGroup.value);
        const necessidadeEspecialData = this.formGroup.value;
        this.necessidadeService.necessidadeEspecialControllerIncluir(necessidadeEspecialData)
            .subscribe(retorno => {
                console.log("Retorno da inclusão da necessidade especial:", retorno);
            }, erro => {
                console.error("Erro ao incluir necessidade especial:", erro);
            });
    }

    confirmarAcao(necessidadeDto: NecessidadeEspecialDto) {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Cadastro!',
                mensagem: `Ação de dados: ${necessidadeDto.titulo} realizada com sucesso!`,
                textoBotoes: {
                    ok: 'Confirmar',
                },
            },
        });
    }

    fechar(): void {
        this.dialogRef.close();
    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };
    public handleErrorForm = (errorName: string) => {
        const formGroup = this.formGroup;
        return formGroup.hasError(errorName);
    };
}
