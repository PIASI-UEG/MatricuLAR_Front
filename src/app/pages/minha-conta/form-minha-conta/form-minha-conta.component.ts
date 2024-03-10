import {Component, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {Validacoes} from "../../../../Validacoes";
import {DateAdapter} from "@angular/material/core";
import {UsuarioControllerService} from "../../../api/services/usuario-controller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {Mascaras} from "../../../../Mascaras";

@Component({
  selector: 'app-form-minha-conta',
  templateUrl: './form-minha-conta.component.html',
  styleUrls: ['./form-minha-conta.component.scss']
})
export class FormMinhaContaComponent {
  formGroup!: FormGroup;
  codigo!: number;
  //cargos: CargoDto[] = [];
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, router: this.router, telaAtual: 'funcionario'})
  validacoes: Validacoes = new Validacoes();
  mascaras: Mascaras = new Mascaras();
  flexDivAlinhar: string = 'row';
  admin!: boolean
  innerWidth: number = window.innerWidth;
  hide = true;
  submitFormulario!: boolean;
  userAtual !: UsuarioDto;
  campoVisivelEmail = false;
  campoVisivelTelefone = false;
  userCpf!: string;
  userTelefone!: string;
  userNome!: string;
  userCargo!: string;
  userEmail!: string;


  constructor(
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private usuarioService: UsuarioControllerService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private securityService: SecurityService,
  ) {
    this._adapter.setLocale('pt-br');
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
  }

  clickCampoEmail() {
    this.campoVisivelEmail = !this.campoVisivelEmail;
  }
  clickCampoTelefone() {
    this.campoVisivelTelefone = !this.campoVisivelTelefone;
  }


  validarSenhas() {
    // Obtém os valores das senhas
    const senha = this.formGroup.get('senha')?.value;
    const confirmarSenha = this.formGroup.get('confirmarSenha')?.value;
    // Verifica se as senhas são iguais

    if (senha !== confirmarSenha && confirmarSenha && confirmarSenha !== '') {
      // Adiciona um erro personalizado ao formulário
      this.formGroup.get('confirmarSenha')?.setErrors({ 'naoConfere': true });
      // Retorna falso
      return false;
    }
    // Retorna verdadeiro
    return true;
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      pessoaNome: [null, Validators.required],
      pessoaCpf: [null, [Validators.required, this.validacoes.validarCpf]],
      cargo: [null, Validators.required],
      email: [null, [Validators.required, this.validacoes.validarEmail]],
      pessoaTelefone: [null, [Validators.required, this.validacoes.validarTelefone]],
      senha: [null, [Validators.required,
        Validators.minLength(6),
        this.validacoes.validarCaracterEspecial,
        this.validacoes.validarLetraMaiuscula,
        this.validacoes.validarPeloMenosTresNumeros]],
      confirmarSenha: [null, Validators.required],
      idUsuarioRequisicao: [this.securityService.getUserId()],
      alterarSenha: false,
    })
  }


  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    this.submitFormulario = true;
    if (!this.validarSenhas()) {
      return;
    }

    if (this.formGroup.get('email')?.invalid && !this.campoVisivelEmail) {
      this.formGroup.patchValue({
        email: this.userAtual.email
      });
    }

    if (this.formGroup.get('pessoaTelefone')?.invalid && !this.campoVisivelTelefone) {
      this.formGroup.patchValue({
        pessoaTelefone: this.userAtual.pessoaTelefone
      });
    }

    if(this.formGroup.get('alterarSenha')?.value && this.campoVisivelTelefone && this.campoVisivelEmail)
    {
      if(this.formGroup.get('email')?.valid &&
        this.formGroup.get('pessoaTelefone')?.valid &&
        this.formGroup.get('senha')?.valid &&  this.formGroup.get('confirmarSenha')?.valid){
        this.realizarEdicao();
      }
    }else if (this.campoVisivelTelefone && this.campoVisivelEmail){
      if(this.formGroup.get('email')?.valid &&
        this.formGroup.get('pessoaTelefone')?.valid) {
        this.realizarEdicao();
      }
    }else if (this.formGroup.get('alterarSenha')?.value && this.campoVisivelTelefone){
      if(this.formGroup.get('pessoaTelefone')?.valid &&
        this.formGroup.get('senha')?.valid &&  this.formGroup.get('confirmarSenha')?.valid){
        this.realizarEdicao();
      }
    }else if (this.formGroup.get('alterarSenha')?.value && this.campoVisivelEmail){
      if(this.formGroup.get('email')?.valid &&
        this.formGroup.get('senha')?.valid &&  this.formGroup.get('confirmarSenha')?.valid){
        this.realizarEdicao();
      }
    }else if (this.formGroup.get('alterarSenha')?.value){
      if(this.formGroup.get('senha')?.valid &&  this.formGroup.get('confirmarSenha')?.valid){
        this.realizarEdicao();
      }
    }else if (this.campoVisivelTelefone){
      if(this.formGroup.get('pessoaTelefone')?.valid){
        this.realizarEdicao();
      }
    }else if (this.campoVisivelEmail){
      if(this.formGroup.get('email')?.valid){
        this.realizarEdicao();
      }
    }

  }

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId){
      const codigo = parseInt(paramId);
      console.log("codigo pessoa",paramId);
      this.usuarioService.usuarioControllerObterPorId({id: codigo}).subscribe(
        retorno => {
          console.log("retorno", retorno);
          this.codigo = retorno.id || -1;
          this.formGroup.patchValue(retorno);
          this.userAtual = retorno;
          if(this.userAtual.pessoaCpf &&
            this.userAtual.pessoaTelefone &&
            this.userAtual.pessoaNome &&
            this.userAtual.cargo &&
            this.userAtual.email){

            this.userCpf = this.mascaras.mascaraCpf(this.userAtual.pessoaCpf);
            this.userTelefone = this.mascaras.mascaraTelefone(this.userAtual.pessoaTelefone);
            this.userNome = this.userAtual.pessoaNome;
            this.userCargo = this.userAtual.cargo;
            this.userEmail = this.userAtual.email;
          }
        },error => {
          this.mensagens.confirmarErro("Editar", error.message)
          console.log("erro", error);
        }
      )
    }
  }

  confirmarAcao() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Alterar dados!',
        mensagem: `Dados alterados com sucesso!`,
        textoBotoes: {
          ok: 'Confirmar',
        },
        reload: true,
      },
    });

  }

  private realizarEdicao(){
    this.atribuirUsuarioForm();
    console.log("Dados:", this.formGroup.value);
    const usuario: UsuarioDto = this.formGroup.value;
    usuario.id = this.codigo
    this.usuarioService.usuarioControllerAlterar( {id: this.codigo, body: usuario})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao();
      }, erro => {
        console.log("Erro:", erro.error);
        this.mensagens.confirmarErro("Editar", erro.message)
      })
  }

  private atribuirUsuarioForm() {
    this.formGroup.patchValue({
      idUsuarioRequisicao: this.securityService.getUserId()
    });
  }

  mudarAlinhar() {
    if(innerWidth < 1000)
    {
      return this.flexDivAlinhar = "column";
    }
    return this.flexDivAlinhar = "row";
  }

  verificarAlinhar(){
    if(this.flexDivAlinhar == "column"){
      return true;
    }
    return false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = window.innerWidth;
  }

  getErrorClass(controlName: string): { [key: string]: any } | null {
    const control = this.formGroup.get(controlName);
      if (this.submitFormulario && control && control.errors) {
        const qdErros = Object.keys(control.errors).length;

        return {
          'margin-top': 17 * qdErros + 'px'
        };
      }

      if (!this.submitFormulario && control && control.errors && control.touched) {
        const qdErros = Object.keys(control.errors).length;

        return {
          'margin-top': 17 * qdErros + 'px'
        };
      }
      this.submitFormulario = false;
      return {};
  }

}

