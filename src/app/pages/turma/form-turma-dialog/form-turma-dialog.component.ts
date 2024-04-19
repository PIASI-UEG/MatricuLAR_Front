import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {TurmaDto} from "../../../api/models/turma-dto";

@Component({
  selector: 'app-form-turma-dialog',
  templateUrl: './form-turma-dialog.component.html',
  styleUrls: ['./form-turma-dialog.component.scss']
})
export class FormTurmaDialogComponent implements OnInit {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Cadastrar";
  public readonly ACAO_EDITAR = "Editar";
  acao: string = this.ACAO_INCLUIR;
  turma?: TurmaDto;
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, router: this.router, telaAtual: 'turma'});

  public constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormTurmaDialogComponent>,
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

  fechar(): void {
    this.dialogRef.close();
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
      this.fechar();
    }
  }

  createForm() {
    if(this.acao == "Editar"){
      this.formGroup = this.formBuilder.group({
        titulo: ["aaaaaa", Validators.required],
        turno: ["aaaaaa", Validators.required],
        ano: ["aaaaaa", Validators.required],
        horaInicio: ["aaaaaa", Validators.required],
        horaFim: ["aaaaaa", Validators.required],
        nomeProfessor: ["aaaaaa"],
        telefoneProfessor: ["aaaaaa" ]
      })
    }
    else{
      this.formGroup = this.formBuilder.group({
        titulo: [null, Validators.required],
        turno: [null, Validators.required],
        ano: [null, Validators.required],
        horaInicio: [null, Validators.required],
        horaFim: [null, Validators.required],
        nomeProfessor: [null],
        telefoneProfessor: [null]
      })
    }

  }


  private realizarInclusao() {
    const turma: TurmaDto = this.formGroup.value;
    console.log(turma);
    this.confirmarAcao(turma, turma.titulo ||"");
  }

  private realizarEdicao(){
    const turma: TurmaDto = this.formGroup.value;
    console.log(turma);
    this.confirmarAcao(turma, this.ACAO_EDITAR);

  }

  confirmarAcao(turma: TurmaDto, nome: String) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Cadastro!!',
        mensagem: `Nome turma: ${turma.titulo} (ID: ${turma.id}). Cadastro realizada com sucesso!`,
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

