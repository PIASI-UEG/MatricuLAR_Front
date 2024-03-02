import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Turma} from "../../../custom_models/turma";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";

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
  turma?: Turma;
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, router: this.router, telaAtual: 'turma'});

  public constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private securityService: SecurityService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.turma = data.turma;
  }


  ngOnInit(): void {
    this.createForm();
    console.log(this.turma);
    this.prepararEdicao();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };


  onSubmit() {
    if (this.formGroup.valid) {
      if(!this.turma){
        this.realizarInclusao();
      }else{
        this.realizarEdicao();
      }
    }
  }

  createForm() {
    if(this.acao == "Editar"){
      this.formGroup = this.formBuilder.group({
        nome: ["aaaaaa", Validators.required],
        turno: ["aaaaaa", Validators.required],
        ano: ["aaaaaa", Validators.required],
        horarioInicio: ["aaaaaa", Validators.required],
        horarioFim: ["aaaaaa", Validators.required],
        professora: ["aaaaaa"],
        telefoneProfessora: ["aaaaaa" ]
      })
    }
    else{
      this.formGroup = this.formBuilder.group({
        nome: [null, Validators.required],
        turno: [null, Validators.required],
        ano: [null, Validators.required],
        horarioInicio: [null, Validators.required],
        horarioFim: [null, Validators.required],
        professora: [null],
        telefoneProfessora: [null]
      })
    }

  }


  private realizarInclusao() {
    const turma: Turma = this.formGroup.value;
    console.log(turma);
    this.confirmarAcao(turma, turma.nome ||"");
  }

  private realizarEdicao(){
    const turma: Turma = this.formGroup.value;
    console.log(turma);
    this.confirmarAcao(turma, this.ACAO_EDITAR);

  }

  confirmarAcao(turma: Turma, nome: String) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Cadastro!!',
        mensagem: `Nome turma: ${turma.nome} (ID: ${turma.id}). Cadastro realizada com sucesso!`,
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

  confirmarErro(acao: String) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'ERRO!!!',
        mensagem: `Erro ao ${acao} \n !`,
        textoBotoes: {
          ok: 'Ok',
        },
      },
    });
  }

  private prepararEdicao() {
    if (this.turma != null){
      this.acao = this.ACAO_EDITAR;
    }
  }

}


