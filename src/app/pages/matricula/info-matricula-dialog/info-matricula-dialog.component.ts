import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SecurityService } from "../../../arquitetura/security/security.service";
import {MatriculaVisualizarDto} from "../../../api/models/matricula-visualizar-dto";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {DateAdapter} from "@angular/material/core";

@Component({
    selector: 'app-info-matricula-dialog',
    templateUrl: './info-matricula-dialog.component.html',
    styleUrls: ['./info-matricula-dialog.component.scss']
})
export class InfoMatriculaDialogComponent implements OnInit {
    matricula: MatriculaVisualizarDto[] = [];
    formGroup!: FormGroup;
    dados: any;
    caminhoImagem: string = '';
    nomeAluno: string = '';
    cpfAluno: string = '';
    nascimento: string = '';
    statusAluno: string = '';
    tutoresNomes: string[] = [];
    tutoresTelefone: string[] = [];
    responsaveisNome: string[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private _adapter: DateAdapter<any>,
        private matriculas: MatriculaControllerService,
        private dialogRef: MatDialogRef<InfoMatriculaDialogComponent>,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private securityService: SecurityService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this._adapter.setLocale('pt-br');
        this.dados = data;
    }

    ngOnInit(): void {
        this.visualizacao();
    }

    private visualizacao(){
        const matricula = this.dados.matricula;

        if (!matricula) {
            console.error('Dados da matrícula não fornecidos');
            this.snackBar.open('Dados da matrícula não fornecidos', 'Fechar', {
                duration: 3000,
            });
            this.fechar();
            return;
        }

        this.matriculas.matriculaControllerGetMatriculaVisualizar({ IdMatricula: matricula.id }).subscribe(
            (response: MatriculaVisualizarDto) => {
                this.caminhoImagem = response.caminhoImagem ?? '';
                this.nomeAluno = response.nomeAluno ?? '';
                this.cpfAluno = response.cpfAluno ?? '';
                this.nascimento = response.nascimento ?? '';
                this.statusAluno = response.statusAluno ?? '';
                this.tutoresNomes = response.tutoresNomes ?? [];
                this.tutoresTelefone = response.tutoresTelefone ?? [];
                this.responsaveisNome = response.responsaveisNome ?? [];
            },
            (error) => {
                console.error('Erro ao obter os dados da matrícula:', error);
                this.snackBar.open('Erro ao obter os dados da matrícula', 'Fechar', {
                    duration: 3000,
                });
                this.fechar();
            }
        );
    }



    fechar(): void {
        this.dialogRef.close();
    }

    onSubmit() {
    }
}
