import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatriculaControllerService } from "../../../api/services/matricula-controller.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ResponsavelControllerService } from "../../../api/services/responsavel-controller.service";
import { MatriculaDto } from "../../../api/models/matricula-dto";
import { ResponsavelDto } from '../../../api/models/responsavel-dto';

@Component({
    selector: 'app-add-pessoa-autorizada',
    templateUrl: './add-pessoa-autorizada.component.html',
    styleUrls: ['./add-pessoa-autorizada.component.scss']
})
export class AddPessoaAutorizadaComponent implements OnInit {
    formGroup!: FormGroup;
    alunoID: number;
    aluno?: MatriculaDto;

    constructor(
        private formBuilder: FormBuilder,
        public responsavelService: ResponsavelControllerService,
        public matriculaService: MatriculaControllerService,
        private dialogRef: MatDialogRef<AddPessoaAutorizadaComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.alunoID = data.id;
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            nomeResponsavel: [null, Validators.required],
            vinculo: [null, Validators.required],
            cpfResponsavel: [null]  // Add cpfResponsavel as an optional field
        });
        this.buscarDados();
    }

    private buscarDados() {
        this.matriculaService.matriculaControllerObterPorId({ id: this.alunoID }).subscribe(data => {
            this.aluno = data;
        });
    }

    private realizarInclusao() {
        if (this.formGroup.valid) {

            const responsavel: ResponsavelDto = {
                idMatricula: this.alunoID,
                nomeResponsavel: this.formGroup.get('nomeResponsavel')?.value,
                vinculo: this.formGroup.get('vinculo')?.value,
            };

            this.responsavelService.responsavelControllerIncluirResponsavel({ body: responsavel }).subscribe(
                data => {
                    this.snackBar.open('Responsável adicionado com sucesso', 'Fechar', {
                        duration: 3000,
                    });
                    this.dialogRef.close(data);
                },
                error => {
                    console.error('Erro ao adicionar responsável:', error);
                    this.snackBar.open('Erro ao adicionar responsável: ' + error.message, 'Fechar', {
                        duration: 3000,
                    });
                }
            );
        } else {
            this.snackBar.open('Formulário inválido. Por favor, preencha os campos obrigatórios.', 'Fechar', {
                duration: 3000,
            });
        }
    }

    fechar(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.realizarInclusao();
    }

    limparFormulario() {
        this.formGroup.reset();
    }
}
