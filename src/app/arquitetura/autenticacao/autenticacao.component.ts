/* tslint:disable:no-redundant-jsdoc callable-types */
/* tslint:disable:variable-name */
import { Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from "../security/security.service";
import {User} from "../security/User";
import {AuthDto} from "../../api/models/auth-dto";

@Component({
  selector: 'app-autentication',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})
export class AutenticacaoComponent implements OnInit {
  formGroup!: FormGroup;
    hide = true;


  /**
   * Construtor da classe.
   *
   * @param securityService
   * @param autenticationService
   * @param messageService
   * @param router
   */
  constructor(
    private securityService: SecurityService,
    private autenticationService: AutenticacaoService,
    private router: Router,
    private formBuilder: FormBuilder,) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(11)]],
      senha: [null, Validators.required],
    });
  }

  /**
   * Inicializa as dependências do componente.
   */
  ngOnInit(): void {
  }

  /**
   * Autentica o Usuário na aplicação conforme os parâmetros informados.
   *
   * @param usuarioDTO
   * @param form
   */
  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.autenticationService.login(this.formGroup.value).subscribe(data => {
        const userId = data.id; // Supondo que o ID do usuário seja obtido da resposta da API


        const user: User = {
          id: data.id,
          nome: data.nome,
          login: data.login,
          expiresIn: data.expiresIn,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          roles: data.roles
        };

        this.securityService.init(user);
        this.router.navigate(['/']);
      }, error => {
        console.log('erro', error);
        alert(error);
      });
    }
  }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };

}
