import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatriculaControllerService } from "../../../api/services/matricula-controller.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ResponsavelControllerService } from "../../../api/services/responsavel-controller.service";
import { MatriculaDto } from "../../../api/models/matricula-dto";
import { ResponsavelDto } from '../../../api/models/responsavel-dto';
import {PkResponsavel} from "../../../api/models/pk-responsavel";

@Component({
    selector: 'app-add-pessoa-autorizada',
    templateUrl: './add-pessoa-autorizada.component.html',
    styleUrls: ['./add-pessoa-autorizada.component.scss']
})
export class AddPessoaAutorizadaComponent implements OnInit {
    formGroup!: FormGroup;
    alunoID: number;
    aluno?: MatriculaDto;
    responsavel?: ResponsavelDto;

    constructor(
        private formBuilder: FormBuilder,
        public pessoaAutorizadaService: ResponsavelControllerService,
        public matriculaService: MatriculaControllerService,
        private dialogRef: MatDialogRef<AddPessoaAutorizadaComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.alunoID = data.id;
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            titulo: ['']
        });
        this.buscarDados();
    }

    private buscarDados() {
        this.matriculaService.matriculaControllerObterPorId({ id: this.alunoID }).subscribe(data => {
            this.aluno = data;
        });
        const responsavelId: PkResponsavel = { matricula: this.alunoID };

        this.pessoaAutorizadaService.responsavelControllerObterPorId({ id: responsavelId }).subscribe(data => {
            this.responsavel = data;

            this.formGroup.patchValue({
                titulo: this.responsavel?.nomeResponsavel || ''
            });
        });
    }

    fechar(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const formValue = this.formGroup.value;
            console.log(formValue);
            this.dialogRef.close(formValue);
        }
    }

    limparFormulario() {
        this.formGroup.reset();
    }
}
