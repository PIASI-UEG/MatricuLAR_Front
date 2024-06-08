import {Component, Inject} from '@angular/core';
import {TurmaDto} from "../../../api/models/turma-dto";
import {TurmaControllerService} from "../../../api/services/turma-controller.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MatriculaDto} from "../../../api/models/matricula-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MensagensUniversais} from "../../../../MensagensUniversais";

@Component({
  selector: 'app-add-aluno-turma-dialog',
  templateUrl: './add-aluno-turma-dialog.component.html',
  styleUrls: ['./add-aluno-turma-dialog.component.scss']
})
export class AddAlunoTurmaDialogComponent {
  turma?: TurmaDto;
  alunoID: number;
  formGroup!: FormGroup;
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, router: this.router, telaAtual: 'turma'});
  turmas: TurmaDto[] = [];
  aluno?: MatriculaDto;

  constructor(
    private formBuilder: FormBuilder,
    public turmaService: TurmaControllerService,
    public matriculaService: MatriculaControllerService,
    private dialogRef: MatDialogRef<AddAlunoTurmaDialogComponent>,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private securityService: SecurityService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.alunoID = data.id;
  }

  ngOnInit(): void {
    this.buscarDados();
    this.createForm();
  }

  private buscarDados() {
    this.turmaService.turmaControllerListAll().subscribe(data => {
      this.turmas = data;
    })
    this.matriculaService.matriculaControllerObterPorId({id: this.alunoID}).subscribe(data => {
      this.aluno = data;
    })
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      turmaID: [null,Validators.required]
    })
  }

  private realizarInclusao() {
    console.log("Dados:",this.formGroup.value);
    let aluno: number = this.aluno?.id || -1;
    const turmaID: number = this.formGroup.get('turmaID')?.value;
    this.turmaService.turmaControllerAdicionaUmAluno({idTurma: turmaID, idAluno: aluno})
      .subscribe( retorno =>{
        console.log("Retorno Add aluno turma:",retorno);
        this.confirmarAcao(retorno);
        this.router.navigate(["/turma"]);
      }, erro =>{
        console.log("Erro:"+erro);
        this.mensagens.confirmarErro('Adicionar criança na turma.', erro.message)
      })
  }

  confirmarAcao(turma: TurmaDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Adicionado a turma!!',
        mensagem: `${this.aluno?.nome} adicionado a turma ! ${turma.titulo}`,
        textoBotoes: {
          ok: 'Confirmar',
        },
      },
    });
  }


  fechar(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if(!this.turma){
        this.realizarInclusao();
      }
      this.fechar();
    }
  }

  limparFormulario(){
      this.formGroup.reset();
      this.formGroup.patchValue({
          usuarioId: this.securityService.getUserId()
      });
  }
}
