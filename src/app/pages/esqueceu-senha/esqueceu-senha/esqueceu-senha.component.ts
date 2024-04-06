import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioControllerService } from '../../../api/services/usuario-controller.service';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {cpf} from "cpf-cnpj-validator";
import {RedefinirSenhaDto} from "../../../api/models/redefinir-senha-dto";

@Component({
    selector: 'app-esqueceu-senha',
    templateUrl: 'esqueceu-senha.component.html',
    styleUrls: ['./esqueceu-senha.component.scss']
})
export class EsqueceuSenhaComponent implements OnInit {

    formGroup!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private usuarioController: UsuarioControllerService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.createForm();
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
            this.mostrarMensagemSucesso('A senha foi enviada para o seu e-mail.');
            this.router.navigate(["/acesso/login"]);
        }, error => {
            console.error('Erro ao enviar solicitação de redefinição de senha:', error);
            this.mostrarMensagemErro('CPF ou E-mail não cadastrado no sistema. Por favor, verifique o CPF e E-mail  e informe novamente');
        });
    }
    mostrarMensagemSucesso(mensagem: string): void {
        alert(mensagem);
    }

    mostrarMensagemErro(mensagem: string): void {
        alert(mensagem);
    }
}
