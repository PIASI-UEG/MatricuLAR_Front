import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDto } from "../../../api/models/usuario-dto";
import { Observable } from "rxjs";
import { UsuarioSenhaDto } from "../../../api/models/usuario-senha-dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { UsuarioControllerService } from "../../../api/services/usuario-controller.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { SecurityService } from "../../../arquitetura/security/security.service";
import {Validacoes} from "../../../../Validacoes";

@Component({
    selector: 'app-esqueceu-senha',
    templateUrl: 'esqueceu-senha.component.html',
    styleUrls: ['./esqueceu-senha.component.scss']
})
export class EsqueceuSenhaComponent implements OnInit{

    formGroup!: FormGroup;
    validacoes: Validacoes = new Validacoes();

    constructor(private formBuilder: FormBuilder,
                private _adapter: DateAdapter<any>,
                private usuarioService: UsuarioControllerService,
                private router: Router,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private securityService: SecurityService,
                private http: HttpClient) {
        this._adapter.setLocale('pt-br');
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
            cpf: [null, [Validators.required, this.validacoes.validarCpf]],
            email: [null, Validators.required],
        });
    }

    ngOnInit() {
        this.createForm();
    }

    onSubmit() {

    }

    recuperarSenha(email: string, cpf: string): void {
        this.verificarCPF(email, cpf).subscribe((usuario: UsuarioDto) => {
            if (usuario) {
                this.solicitarRedefinicaoSenha(email);
            } else {
                console.log('CPF não cadastrado.');
            }
        });
    }

    verificarCPF(email: string, cpf: string): Observable<UsuarioDto> {
        return this.http.get<UsuarioDto>('URL_VERIFICAR_CPF', { params: { email, cpf } });
    }

    solicitarRedefinicaoSenha(email: string): void {
        const novaSenhaAleatoria = this.gerarSenhaAleatoria();

        const body: UsuarioSenhaDto = {
            email,
            novaSenha: novaSenhaAleatoria
        };

        this.http.post('URL_REDEFINIR_SENHA', body).subscribe(() => {
            console.log('Solicitação de redefinição de senha enviada com sucesso.');
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
