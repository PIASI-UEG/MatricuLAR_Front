import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnChanges,
  OnInit
} from '@angular/core';
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {DateAdapter} from "@angular/material/core";
import {UsuarioControllerService} from "../../../api/services/usuario-controller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {Validacoes} from "../../../../Validacoes";
import {ErrosDialogComponent} from "../../../core/erros-dialog/erros-dialog.component";


@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.scss']
})
export class FormFuncionarioComponent implements OnInit {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Cadastrar";
  public readonly ACAO_EDITAR = "Editar";
  acao: string = this.ACAO_INCLUIR;
  codigo!: number;
  usuario?:UsuarioDto;
  //cargos: CargoDto[] = [];
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, router: this.router, telaAtual: 'funcionario', securityService: this.securityService})
  validacoes: Validacoes = new Validacoes();
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
    private securityService: SecurityService,
    private cdr: ChangeDetectorRef
  ) {
    this._adapter.setLocale('pt-br');
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
    this.cdr.detectChanges();
  }

  private createForm() {
    if(this.acao == "Editar"){
      this.usuarioService.usuarioControllerObterPorId({id: this.codigo as number}).subscribe(retorno =>
        this.formGroup = this.formBuilder.group({
          pessoaNome: [retorno.pessoaNome, [Validators.required, this.validacoes.validarCampoEmBranco, Validators.maxLength(200)]],
          pessoaCpf: [retorno.pessoaCpf, [Validators.required, this.validacoes.validarCpf, Validators.maxLength(11)]],
          cargo: [retorno.cargo, Validators.required],
          email: [retorno.email, [Validators.required, this.validacoes.validarEmail, Validators.maxLength(100)]],
          pessoaTelefone: [retorno.pessoaTelefone, [Validators.required, this.validacoes.validarTelefone, Validators.maxLength(11)]],
          senha: [null],
          confirmarSenha: [null],
          idUsuarioRequisicao: [this.securityService.getUserId()]

        }));
    }
    else {
    }
      this.formGroup = this.formBuilder.group({
          pessoaNome: [null, [Validators.required, this.validacoes.validarCampoEmBranco, Validators.maxLength(200)]],
          pessoaCpf: [null, [Validators.required, this.validacoes.validarCpf, Validators.maxLength(11)]],
          cargo: [null, Validators.required],
          email: [null, [Validators.required, this.validacoes.validarEmail, Validators.maxLength(100)]],
          pessoaTelefone: [null, [Validators.required, this.validacoes.validarTelefone, Validators.maxLength(11)]],
          senha: [null, [Validators.required,
            Validators.minLength(6),
            this.validacoes.validarCaracterEspecial,
            this.validacoes.validarLetraMaiuscula,
            this.validacoes.validarPeloMenosTresNumeros]],
          confirmarSenha: [null, Validators.required],
          idUsuarioRequisicao: [this.securityService.getUserId()]
      })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  onSubmit(){

    if (this.formGroup.valid) {
      this.realizarInclusao();
    } else if (this.codigo) {
      const controlSenha = this.formGroup.get('senha');
      if (controlSenha) {
        controlSenha.setErrors(null);
      }
      const controlConfirmSenha = this.formGroup.get('confirmarSenha');
      if (controlConfirmSenha) {
        controlConfirmSenha.setErrors(null);
      }
      if (this.formGroup.valid) {
        this.realizarEdicao();
      } else {
        this.mensagens.confirmarErro(this.ACAO_EDITAR, "O formulário contém erros!")
      }
    } else {
      this.mensagens.confirmarErro(this.ACAO_INCLUIR, "O formulário contém erros!")
    }
  }

  private realizarInclusao(){
    this.atribuirUsuarioForm();
    const usuario: UsuarioDto = this.formGroup.value;
    if(this.formGroup.valid){
      this.usuarioService.usuarioControllerIncluir({body: usuario})
        .subscribe( retorno =>{
          console.log("Retorno:",retorno);
          this.confirmarAcao(retorno, this.ACAO_INCLUIR);
          this.router.navigate(["/funcionario"]);
        }, erro =>{
          this.mensagens.confirmarErro(this.ACAO_INCLUIR, erro.message)
        })
    }
  }


  limparFormulario() {
    this.formGroup.reset(); // limpa os campos do formulario.
    this.atribuirUsuarioForm();
  }

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId){
      const codigo = parseInt(paramId);
      this.usuarioService.usuarioControllerObterPorId({id: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          this.codigo = retorno.id || -1;
          this.formGroup.patchValue(retorno);
          this.cdr.detectChanges();
        },error => {
          this.mensagens.confirmarErro(this.ACAO_EDITAR, error.message)
        }
      )
    }
  }

    confirmarAcao(usuarioDto: UsuarioDto, acao: string) {
        let titulo = 'Cadastro!';
        if (acao === this.ACAO_INCLUIR) {
            titulo = 'Cadastro realizado!';
        } else if (acao === this.ACAO_EDITAR) {
            titulo = 'Edição realizada!';
        }

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: titulo,
                mensagem: `Ação de ${acao} dados: ${usuarioDto.pessoaNome} realizada com sucesso!`,
                textoBotoes: {
                    ok: 'Confirmar',
                },
            },
        });
    }

  private realizarEdicao(){

    this.atribuirUsuarioForm();
    console.log("Dados:", this.formGroup.value);
    const usuario: UsuarioDto = this.formGroup.value;
    usuario.id = this.codigo;
    if(this.formGroup.valid){
      this.usuarioService.usuarioControllerNovoAlterar( {id: this.codigo, body: usuario})
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
    if (this.codigo == null) {
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
    } else {
      return {
        'margin-top': 17 * 1 + 'px'
      };
    }
  }

}
