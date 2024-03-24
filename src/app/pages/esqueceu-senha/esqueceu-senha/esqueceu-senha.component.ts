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
        const requestBody = { body: cpf };
        this.usuarioController.usuarioControllerRedefinirSenha(requestBody).subscribe(() => {
            console.log('Solicitação de redefinição de senha enviada com sucesso.');
        }, error => {
            console.error('Erro ao enviar solicitação de redefinição de senha:', error);
        });
    }

    gerarSenhaAleatoria(): string {
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

        // Verifica se atende aos critérios
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
