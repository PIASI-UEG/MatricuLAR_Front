import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from "@angular/forms";
import { MatriculaDto } from "../../../api/models/matricula-dto";
import { NecessidadeEspecialDto } from "../../../api/models/necessidade-especial-dto";
import { NecessidadeEspecialControllerService } from "../../../api/services/necessidade-especial-controller.service";
import { MatriculaControllerService } from "../../../api/services/matricula-controller.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SecurityService } from "../../../arquitetura/security/security.service";
import { ConfirmationDialog } from "../../../core/confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-add-necessidade-especial-dialog',
    templateUrl: './add-necessidade-especial-dialog.component.html',
    styleUrls: ['./add-necessidade-especial-dialog.component.scss']
})
export class AddNecessidadeEspecialDialogComponent {
    alunoID: number;
    formGroup!: FormGroup;
    aluno?: MatriculaDto;

    constructor(
        private formBuilder: FormBuilder,
        public necessidadeService: NecessidadeEspecialControllerService,
        public matriculaService: MatriculaControllerService,
        private dialogRef: MatDialogRef<AddNecessidadeEspecialDialogComponent>,
        private dialog: MatDialog,
        private router: Router,
        private snackBar: MatSnackBar,
        private securityService: SecurityService,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.alunoID = data.id;
    }

    ngOnInit(): void {
        this.buscarDados();
        this.formGroup = this.formBuilder.group({
            necessidadesEspeciais: this.formBuilder.array([], [this.validarNecessidadeEspecial()])
        });
        this.adicionarCampoNecessidade(null);
    }

    private buscarDados() {
        this.matriculaService.matriculaControllerObterPorId({ id: this.alunoID }).subscribe(data => {
            this.aluno = data;
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

    private makeDTONecessidadeEspecial(): NecessidadeEspecialDto[] {
        const necessidadesEspeciaisArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
        return necessidadesEspeciaisArray.value.map((necessidade: any) => ({
            matriculaId: this.aluno?.id,
            titulo: necessidade.titulo
        }));
    }

    private realizarInclusao() {
        const necessidadesEspeciais: NecessidadeEspecialDto[] = this.makeDTONecessidadeEspecial();
        necessidadesEspeciais.forEach(necessidadeEspecialDto => {
            this.necessidadeService.necessidadeEspecialControllerIncluir({ body: necessidadeEspecialDto })
                .subscribe(retorno => {
                    console.log("Retorno:", retorno);
                    this.confirmarAcao(retorno);
                }, erro => {
                    console.log("Erro:", erro.message);
                });
        });

        this.router.navigate(["/matricula"]);
    }

    confirmarAcao(necessidadeEspecial: NecessidadeEspecialDto) {
        this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Necessidade Especial Registrada!',
                mensagem: `Necessidade Especial: ${necessidadeEspecial.titulo}. Ação realizada com sucesso!`,
                textoBotoes: {
                    ok: 'Confirmar',
                },
            },
        });
    }

    fechar(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.formGroup.valid) {
            if (this.aluno) {
                this.realizarInclusao();
            }
            this.fechar();
        }
    }

    limparFormulario() {
        this.formGroup.reset();
        this.formGroup.setControl('necessidadesEspeciais', this.formBuilder.array([]));
        this.adicionarCampoNecessidade(null);
    }

    validarNecessidadeEspecial(): ValidatorFn {
        return (formArray: AbstractControl): ValidationErrors | null => {
            const necessidades = (formArray as FormArray).controls;
            for (let i = 0; i < necessidades.length; i++) {
                const necessidade = necessidades[i];
                if (!necessidade.get('titulo')?.value) {
                    return { 'campoNaoPreenchido': true };
                }
            }
            return null;
        };
    }
}
