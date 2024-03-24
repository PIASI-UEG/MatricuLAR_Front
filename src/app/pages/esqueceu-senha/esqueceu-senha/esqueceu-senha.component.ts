import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioDto } from '../../../api/models/usuario-dto';
import { Validacoes } from '../../../../Validacoes';
import { UsuarioControllerService } from '../../../api/services/usuario-controller.service';

@Component({
    selector: 'app-esqueceu-senha',
    templateUrl: 'esqueceu-senha.component.html',
    styleUrls: ['./esqueceu-senha.component.scss']
})
export class EsqueceuSenhaComponent implements OnInit {

    formGroup!: FormGroup;
    validacoes: Validacoes = new Validacoes();
    usuarioDTO: UsuarioDto[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private usuarioController: UsuarioControllerService,
    ) { }

    ngOnInit() {
        this.createForm();
    }

    private createForm() {
        this.formGroup = this.formBuilder.group({
            cpf: [null, [Validators.required, this.validacoes.validarCpf]],
            email: [null, [Validators.required, this.validacoes.validarEmail]],
        });
    }

    onSubmit() {
        const { email, cpf } = this.formGroup.value;
        this.recuperarSenha(email, cpf);
    }

    recuperarSenha(email: string, cpf: string): void {
        const requestBody = { body: cpf }; // Construindo o corpo da requisição
        this.usuarioController.usuarioControllerRedefinirSenha(requestBody).subscribe(() => {
            console.log('Solicitação de redefinição de senha enviada com sucesso.');
        }, error => {
            console.error('Erro ao enviar solicitação de redefinição de senha:', error);
        });
    }

    gerarSenhaAleatoria(): string {
        const length = 8;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let senha = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            senha += charset[randomIndex];
        }
        return senha;
    }
}
