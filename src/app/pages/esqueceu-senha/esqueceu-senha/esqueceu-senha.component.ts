import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioControllerService } from '../../../api/services/usuario-controller.service';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {cpf} from "cpf-cnpj-validator";

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
        const verifica = { body: pessoaCpf};
        this.usuarioController.usuarioControllerRedefinirSenha(verifica).subscribe(() => {
            console.log('Solicitação de redefinição de senha enviada com sucesso.');
            this.mostrarMensagemSucesso('A senha foi enviada para o seu e-mail.');
            this.router.navigate(["/acesso/login"]);
        }, error => {
            console.error('Erro ao enviar solicitação de redefinição de senha:', error);
            this.mostrarMensagemErro('CPF não cadastrado no sistema. Por favor, verifique o CPF e informe novamente');
        });
    }

    mostrarMensagemSucesso(mensagem: string): void {
        alert(mensagem);
    }

    mostrarMensagemErro(mensagem: string): void {
        alert(mensagem);
    }

    private gerarSenhaAleatoria(): string {
        const tamanho = 6;
        const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        const caracteresEspeciais = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let senha = '';
        let caracterEspecial = false;
        let hasUppercase = false;
        let numCount = 0;

        for (let i = 0; i < tamanho; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            const caractere = caracteres[indiceAleatorio];
            senha += caractere;

            if (caracteresEspeciais.includes(caractere)) {
                caracterEspecial = true;
            } else if (caractere === caractere.toUpperCase()) {
                hasUppercase = true;
            } else if (!isNaN(parseInt(caractere))) {
                numCount++;
            }
        }

        if (!caracterEspecial) {
            // Se não tiver caracter especial, adiciona um
            const caracterEspecialAleatorio = caracteresEspeciais[Math.floor(Math.random() * caracteresEspeciais.length)];
            const indiceAleatorio = Math.floor(Math.random() * senha.length);
            senha = senha.substr(0, indiceAleatorio) + caracterEspecialAleatorio + senha.substr(indiceAleatorio + 1);
        }

        if (!hasUppercase) {
            // Se não tiver letra maiúscula, transforma um caractere em maiúsculo
            const indiceAleatorio = Math.floor(Math.random() * senha.length);
            senha = senha.substr(0, indiceAleatorio) + senha[indiceAleatorio].toUpperCase() + senha.substr(indiceAleatorio + 1);
        }

        if (numCount < 3) {
            // Se não tiver pelo menos 3 números, adiciona mais números aleatórios
            const numbersToAdd = 3 - numCount;
            for (let i = 0; i < numbersToAdd; i++) {
                const indiceAleatorio = Math.floor(Math.random() * senha.length);
                const numeroAleatorio = Math.floor(Math.random() * 10);
                senha = senha.substr(0, indiceAleatorio) + numeroAleatorio.toString() + senha.substr(indiceAleatorio + 1);
            }
        }

        return senha;
    }
}
