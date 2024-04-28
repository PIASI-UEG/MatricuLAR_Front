import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SecurityService } from '../../../arquitetura/security/security.service';
import { MatriculaControllerService } from '../../../api/services/matricula-controller.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NecessidadeEspecialControllerService } from '../../../api/services/necessidade-especial-controller.service';
import {MatriculaVisualizarDto} from "../../../api/models/matricula-visualizar-dto";
import {MatSnackBar} from "@angular/material/snack-bar";

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
            id: [],
            observacoes: [],
            titulo: []
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
        if (this.formGroup.valid) {
            const necessidadeEspecialData = this.formGroup.value;
            this.necessidadeService.necessidadeEspecialControllerIncluir(necessidadeEspecialData).subscribe(
                (response) => {
                    console.log('Necessidade especial incluída com sucesso!', response);
                },
                (error) => {
                    console.error('Erro ao incluir necessidade especial', error);
                }
            );
        } else {
            console.error('O formulário não é válido. Verifique os campos.');
        }
    }

    fechar(): void {
        this.dialogRef.close();
    }
}
