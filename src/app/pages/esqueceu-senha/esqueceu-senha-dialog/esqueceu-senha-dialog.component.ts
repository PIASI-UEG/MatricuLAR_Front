import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioControllerService } from "../../../api/services/usuario-controller.service";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SecurityService } from "../../../arquitetura/security/security.service";
import { RedefinirSenhaDto } from "../../../api/models/redefinir-senha-dto";

@Component({
    selector: 'app-esqueceu-senha-dialog',
    templateUrl: './esqueceu-senha-dialog.component.html',
    styleUrls: ['./esqueceu-senha-dialog.component.scss']
})
export class EsqueceuSenhaDialogComponent implements OnInit {
    formGroup!: FormGroup;
    innerWidth: number = window.innerWidth;
    flexDivAlinhar: string = 'row';

    constructor(
        private formBuilder: FormBuilder,
        private usuarioController: UsuarioControllerService,
        private dialogRef: MatDialogRef<EsqueceuSenhaDialogComponent>,
        private dialog: MatDialog,
        private router: Router,
        private snackBar: MatSnackBar,
        private securityService: SecurityService,
        @Inject(MAT_DIALOG_DATA) data: any
    ) { }

    ngOnInit() {
        this.createForm();
        this.innerWidth = window.innerWidth;
    }

    mudarAlinhar() {
        if (innerWidth < 1000) {
            return this.flexDivAlinhar = "column";
        }
        return this.flexDivAlinhar = "row";
    }

    // verificarAlinhar() {
    //     return this.flexDivAlinhar === "column";
    // }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.innerWidth = window.innerWidth;
    }

    private createForm() {
        this.formGroup = this.formBuilder.group({
            pessoaCpf: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
        });
    }

    public onSubmit() {
        if (this.formGroup.valid) {
            const { email, pessoaCpf } = this.formGroup.value;
            this.recuperarSenha(email, pessoaCpf);
        } else {
            console.error('Preencha todos os campos corretamente.');
        }
    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };

    private recuperarSenha(email: string, pessoaCpf: string): void {
        const verifica: RedefinirSenhaDto = {
            cpf: pessoaCpf,
            email: email
        };
        this.usuarioController.usuarioControllerRedefinirSenha({ body: verifica }).subscribe(() => {
            console.log('Solicitação de redefinição de senha enviada com sucesso.');
            this.mostrarMensagem('A senha foi enviada para o seu e-mail.', 'success');
            this.router.navigate(["/acesso/login"]);
        }, error => {
            console.error('Erro ao enviar solicitação de redefinição de senha:', error);
            this.mostrarMensagem('CPF ou E-mail não cadastrado no sistema. Por favor, verifique o CPF e E-mail e informe novamente', 'error');
        });
    }

    mostrarMensagem(mensagem: string, tipo: 'success' | 'error'): void {
        this.snackBar.open(mensagem, '', {
            duration:3000,
            panelClass: tipo === 'success' ? ['success-snackbar'] : ['error-snackbar']
        });
    }

    fechar(): void {
        this.dialogRef.close();
    }
}
