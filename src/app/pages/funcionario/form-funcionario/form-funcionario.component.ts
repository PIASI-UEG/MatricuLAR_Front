import {Component, HostListener, OnInit} from '@angular/core';
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {DateAdapter} from "@angular/material/core";
import {UsuarioControllerService} from "../../../api/services/usuario-controller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {Validacoes} from "../../../../Validacoes";


@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.scss']
})
export class FormFuncionarioComponent implements OnInit{
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Cadastrar";
  public readonly ACAO_EDITAR = "Editar";
  acao: string = this.ACAO_INCLUIR;
  codigo!: number;
  //cargos: CargoDto[] = [];
  mensagens: MensagensUniversais = new MensagensUniversais(this.dialog, this.router, "funcionario", this.snackBar)
  validacoes: Validacoes = new Validacoes();
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2008,0,0);
  flexDivAlinhar: string = 'row';
  admin!: boolean
  innerWidth: number = window.innerWidth;
  hide = true;
  submitFormulario!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private usuarioService: UsuarioControllerService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
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
    if(this.acao == "Editar"){
      this.usuarioService.usuarioControllerObterPorId({id: this.codigo}).
      subscribe(retorno =>
        this.formGroup = this.formBuilder.group({
          pessoaNome: [retorno.pessoaNome, Validators.required],
          pessoaCpf: [retorno.pessoaCpf, [Validators.required, this.validacoes.validarCpf]],
          cargo: [retorno.cargo, Validators.required],
          telefone: [retorno.telefone, [Validators.required, this.validacoes.validarTelefone]],
          senha: [null,[Validators.required,
                  Validators.minLength(6),
                  this.validacoes.validarCaracterEspecial,
                  this.validacoes.validarLetraMaiuscula,
                  this.validacoes.validarPeloMenosTresNumeros]],
          confirmarSenha: [null, Validators.required]
        }));
    }else{
      this.formGroup = this.formBuilder.group({
          pessoaNome: [null, Validators.required],
          pessoaCpf: [null, [Validators.required, this.validacoes.validarCpf]],
          cargo: [null, Validators.required],
          telefone: [null, [Validators.required, this.validacoes.validarTelefone]],
          senha: [null, [Validators.required,
            Validators.minLength(6),
            this.validacoes.validarCaracterEspecial,
            this.validacoes.validarLetraMaiuscula,
            this.validacoes.validarPeloMenosTresNumeros]],
          confirmarSenha: [null, Validators.required]
      })
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    this.submitFormulario = true;
    if (!this.validarSenhas()) {
      return;
    }

    if (this.formGroup.valid) {
      if(!this.codigo){
        this.realizarInclusao();
      }else{
        this.realizarEdicao();
      }
    }
  }

  private realizarInclusao(){
    console.log("Dados:",this.formGroup.value);
    const usuario: UsuarioDto = this.formGroup.value;
    this.usuarioService.usuarioControllerIncluir({usuarioDTO: usuario})
      .subscribe( retorno =>{
        console.log("Retorno:",retorno);
        this.confirmarAcao(retorno, this.ACAO_INCLUIR);
        this.router.navigate(["/funcionario"]);
      }, erro =>{
        console.log("Erro:"+erro);
        this.mensagens.confirmarErro(this.ACAO_INCLUIR, erro.message)
      })
  }


  limparFormulario() {
    this.formGroup.reset(); // limpa os campos do formulario.
    this.formGroup.patchValue({
      usuarioId: this.securityService.getUserId()
    });
  }

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId){
      const codigo = parseInt(paramId);
      console.log("codigo pessoa",paramId);
      this.usuarioService.usuarioControllerObterPorId({id: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          this.codigo = retorno.id || -1;
          this.formGroup.patchValue(retorno);
        },error => {
          this.mensagens.confirmarErro(this.ACAO_EDITAR, error.message)
          console.log("erro", error);
        }
      )
    }
  }

  confirmarAcao(usuarioDto: UsuarioDto, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Cadastro!',
        mensagem: `Ação de ${acao} dados: ${usuarioDto.pessoaNome} (ID: ${usuarioDto.pessoaCpf}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'Confirmar',
        },
      },
    });
  }

  private realizarEdicao(){
    console.log("Dados:", this.formGroup.value);
    const usuario: UsuarioDto = this.formGroup.value;
    this.usuarioService.usuarioControllerAlterar( {id: this.codigo, body: usuario})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
        this.router.navigate(["/funcionario"]);
      }, erro => {
        console.log("Erro:", erro.error);
        this.mensagens.confirmarErro(this.ACAO_EDITAR, erro.message)
        //this.showError(erro.error, this.ACAO_EDITAR);
      })
  }

  mudarAlinhar() {

    if(innerWidth < 1000)
    {
      return this.flexDivAlinhar = "column";
    }
    return this.flexDivAlinhar = "row";

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = window.innerWidth;
  }

  getErrorClass(controlName: string): { [key: string]: any } | null {
    const control = this.formGroup.get(controlName);

    if (this.submitFormulario && control && control.errors){
      const qdErros = Object.keys(control.errors).length;

      return {
        'margin-top': 17 * qdErros + 'px'
      };
    }

    if (!this.submitFormulario && control && control.errors && control.touched){
      const qdErros = Object.keys(control.errors).length;

      return {
        'margin-top': 17 * qdErros + 'px'
      };
    }
    this.submitFormulario = false;
    return {};
  }

}
