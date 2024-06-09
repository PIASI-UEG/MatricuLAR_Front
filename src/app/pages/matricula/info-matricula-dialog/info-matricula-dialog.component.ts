import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SecurityService } from "../../../arquitetura/security/security.service";
import { MatriculaVisualizarDto } from "../../../api/models/matricula-visualizar-dto";
import { MatriculaControllerService } from "../../../api/services/matricula-controller.service";
import { DateAdapter } from "@angular/material/core";
import { AddAdvertenciaDialogComponent } from "../add-advertencia-dialog/add-advertencia-dialog.component";
import { NecessidadeEspecialDto } from "../../../api/models/necessidade-especial-dto";
import { NecessidadeEspecialControllerService } from "../../../api/services/necessidade-especial-controller.service";
import { ConfirmationDialog } from "../../../core/confirmation-dialog/confirmation-dialog.component";
import { MatriculaDto } from "../../../api/models/matricula-dto";
import {AdvertenciaDto} from "../../../api/models/advertencia-dto";
import {AdvertenciaControllerService} from "../../../api/services/advertencia-controller.service";

@Component({
    selector: 'app-info-matricula-dialog',
    templateUrl: './info-matricula-dialog.component.html',
    styleUrls: ['./info-matricula-dialog.component.scss']
})
export class InfoMatriculaDialogComponent{
    matriculaVisualiza?: MatriculaVisualizarDto;
    matriculaId: number;
    formGroup!: FormGroup;
    botaoNecessidadeClicado: boolean = false;
    matricula?: MatriculaDto;
    advertenciasAluno: Array<AdvertenciaDto> | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private _adapter: DateAdapter<any>,
        private matriculas: MatriculaControllerService,
        private advertenciaService: AdvertenciaControllerService,
        private dialogRef: MatDialogRef<InfoMatriculaDialogComponent>,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private securityService: SecurityService,
        private necessidadeEspecialService: NecessidadeEspecialControllerService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this._adapter.setLocale('pt-br');
        this.matriculaId = data.nroMatricula;
    }

    ngOnInit(): void {
        this.createForm();
        this.visualizacao();
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
            possuiNecessidadeEspecial: [false],
            necessidadesEspeciais: this.formBuilder.array<NecessidadeEspecialDto>([])
        });
    }

    private visualizacao() {
        this.matriculas.matriculaControllerGetMatriculaVisualizar({ IdMatricula: this.matriculaId }).subscribe(
            (data) => {
                this.matriculaVisualiza = data;
                console.log(data)
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

    openDialogAdvertencia() {
        this.dialogRef.close();
        const dialogRefAdvertencia = this.dialog.open(AddAdvertenciaDialogComponent, {
            data: {
                id: this.matriculaId
            }
        });

        dialogRefAdvertencia.afterClosed().subscribe(result => {
            if (result === this.fechar()) {
                this.dialogRef = this.dialog.open(InfoMatriculaDialogComponent, {
                    data: this.matriculaId
                });
            }
        });
    }

    criarCampoNecessidadeEspecial(): FormGroup {
        return this.formBuilder.group({
            titulo: [null, Validators.required]
        });
    }

    adicionarNecessidadePreenchido(necessidade: NecessidadeEspecialDto): FormGroup {
        return this.formBuilder.group({
            titulo: [necessidade.titulo, Validators.required]
        });
    }

    firstClickNecessidades(): boolean {
        if (this.botaoNecessidadeClicado && this.formGroup.get('possuiNecessidadeEspecial')?.value) {
            return true;
        } else if (this.formGroup.get('possuiNecessidadeEspecial')?.value && !this.formGroup.get('necessidadesEspeciais')?.value.length) {
            this.adicionarCampoNecessidade(null);
            this.botaoNecessidadeClicado = true;
            return true;
        } else if (this.formGroup.get('possuiNecessidadeEspecial')?.value) {
            return true;
        }
        this.botaoNecessidadeClicado = false;
        return false;
    }

    adicionarCampoNecessidade(necessidade: NecessidadeEspecialDto | null): void {
        const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
        if (necessidade != null) {
            formArray.push(this.adicionarNecessidadePreenchido(necessidade));
        } else {
            formArray.push(this.criarCampoNecessidadeEspecial());
        }
    }

    removerCampoNecessidade(index: number): void {
        const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
        formArray.removeAt(index);
    }

    getNecessidadesEspeciaisControls(): AbstractControl[] {
        const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
        return formArray.controls;
    }

    getNecessidadeEspecialControl(index: number): AbstractControl {
        const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
        return formArray.at(index)?.get('titulo') as AbstractControl;
    }

    private realizarInclusao() {
        const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
        const necessidadesEspeciais: NecessidadeEspecialDto[] = formArray.value.map((necessidade: NecessidadeEspecialDto) => ({
            ...necessidade,
            idMatricula: this.matricula?.id
        }));

        necessidadesEspeciais.forEach(necessidadeEspecial => {
            this.necessidadeEspecialService.necessidadeEspecialControllerIncluir({ body: necessidadeEspecial })
                .subscribe(
                    retorno => {
                        console.log("Retorno do servidor:", retorno);
                        this.confirmarAcao();
                        this.router.navigate(["/matricula"]);
                    },
                    erro => {
                        console.error("Erro ao incluir necessidade especial:", erro);
                        this.snackBar.open('Erro ao incluir necessidade especial', 'Fechar', {
                            duration: 3000,
                        });
                    }
                );
        });
    }

    confirmarAcao() {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Necessidades Registradas!',
                mensagem: `Necessidade Incluida Com Sucesso!!`,
                textoBotoes: {
                    ok: 'Confirmar',
                },
            },
        });
    }


    onSubmit() {
        if (this.formGroup.valid) {
            if (this.formGroup.get('possuiNecessidadeEspecial')?.value) {
                this.realizarInclusao();
            }
        }
    }

    fechar(): void {
        this.dialogRef.close();
    }
}