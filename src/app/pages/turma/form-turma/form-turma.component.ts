import {Component, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {TurmaControllerService} from "../../../api/services/turma-controller.service";
import {DateAdapter} from "@angular/material/core";
import {TurmaDto} from "../../../api/models/turma-dto";
import {Validacoes} from "../../../../Validacoes";
import {UsuarioDto} from "../../../api/models/usuario-dto";

@Component({
  selector: 'app-form-turma',
  templateUrl: './form-turma.component.html',
  styleUrls: ['./form-turma.component.scss']
})
export class FormTurmaComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Cadastrar";
  public readonly ACAO_EDITAR = "Editar";
  acao: string = this.ACAO_INCLUIR;
  turma?: TurmaDto;
  codigo!: number;
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, router: this.router, telaAtual: 'turma', securityService: this.securityService});
  validacoes: Validacoes = new Validacoes();
  flexDivAlinhar: string = 'row';
  innerWidth: number = window.innerWidth;
  submitFormulario!: boolean;


  public constructor(
    private turmaservice: TurmaControllerService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private securityService: SecurityService,
    private _adapter: DateAdapter<any>,
  ) {
  }


  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };


  onSubmit() {
    this.submitFormulario = true;
    if (this.codigo != null || this.formGroup.valid) {
      if(!this.codigo){
        this.realizarInclusao();
      }else{
        this.realizarEdicao();
      }
    }
  }

  createForm() {
    if(this.acao == "Editar"){
      this.turmaservice.turmaControllerObterPorId({id: this.codigo as number}).subscribe(retorno =>
        this.formGroup = this.formBuilder.group({
          titulo: [retorno.titulo, [Validators.required, this.validacoes.validarCampoEmBranco, Validators.maxLength(100)]],
          turno: [retorno.turno, Validators.required],
          ano: [retorno.ano, [Validators.required, Validators.pattern('^[0-9]{4}$')]],
          horaInicio: [retorno.horaInicio, [Validators.required, Validators.maxLength(4),Validators.minLength(4)]],
          horaFim: [retorno.horaFim, [Validators.required, Validators.maxLength(4),Validators.minLength(4)]],
          nomeProfessor: [retorno.nomeProfessor, [Validators.required, this.validacoes.validarCampoEmBranco, Validators.maxLength(200)]],
          telefoneProfessor: [retorno.telefoneProfessor, [Validators.required, this.validacoes.validarTelefone , Validators.maxLength(11)]]
        }));
    }
    else{
      this.formGroup = this.formBuilder.group({
        titulo: [null, [Validators.required, this.validacoes.validarCampoEmBranco, Validators.maxLength(100)]],
        turno: [null, Validators.required],
        ano: [null, [Validators.required, Validators.pattern('^[0-9]{4}$')]],
        horaInicio: [null, [Validators.required, Validators.maxLength(4),Validators.minLength(4)]],
        horaFim: [null, [Validators.required, Validators.maxLength(4),Validators.minLength(4)]],
        nomeProfessor: [null, [Validators.required, this.validacoes.validarCampoEmBranco, Validators.maxLength(200)]],
        telefoneProfessor: [null, [Validators.required, this.validacoes.validarTelefone, Validators.maxLength(11)]]
      })
    }

  }


  private realizarInclusao() {
    console.log("Dados:",this.formGroup.value);
    const turma: TurmaDto = this.formGroup.value;
    this.turmaservice.turmaControllerIncluir({body: turma})
      .subscribe( retorno =>{
        console.log("Retorno:",retorno);
        this.confirmarAcao(retorno, this.ACAO_INCLUIR);
        this.router.navigate(["/turma"]);
      }, erro =>{
        console.log("Erro:"+erro);
        this.mensagens.confirmarErro(this.ACAO_INCLUIR, erro.message)
      })
  }

  private realizarEdicao(){
    console.log("Dados:", this.formGroup.value);
    const turma: TurmaDto = this.formGroup.value;
    this.turmaservice.turmaControllerAlterar( {id: this.codigo, body: turma})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
        this.router.navigate(["/turma"]);
      }, erro => {
        console.log("Erro:", erro.error);
        this.mensagens.confirmarErro(this.ACAO_EDITAR, erro.message)
        //this.showError(erro.error, this.ACAO_EDITAR);
      })

  }

    confirmarAcao(turmaDTO: TurmaDto, nome: string) {
        let titulo = 'Cadastro!';
        if (nome === this.ACAO_INCLUIR) {
            titulo = 'Cadastro realizado!';
        } else if (nome === this.ACAO_EDITAR) {
            titulo = 'Edição realizada!';
        }

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: titulo,
                mensagem: `Ação de ${nome} dados: ${turmaDTO.titulo} realizada com sucesso!`,
                textoBotoes: {
                    ok: 'Confirmar',
                },
            },
        });
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
      console.log("codigo turma",paramId);
      this.turmaservice.turmaControllerObterPorId({id: codigo}).subscribe(
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

  verificarAlinhar() {
    if (this.flexDivAlinhar == "column") {
      return true;
    }
    return false;
  }

}


