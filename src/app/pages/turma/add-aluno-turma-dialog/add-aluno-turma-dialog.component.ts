import {Component, Inject} from '@angular/core';
import {TurmaDto} from "../../../api/models/turma-dto";
import {TurmaControllerService} from "../../../api/services/turma-controller.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-aluno-turma-dialog',
  templateUrl: './add-aluno-turma-dialog.component.html',
  styleUrls: ['./add-aluno-turma-dialog.component.scss']
})
export class AddAlunoTurmaDialogComponent {
  turma?: TurmaDto;
  turmaID: number;
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Cadastrar";
  public readonly ACAO_EDITAR = "Editar";
  acao: string = this.ACAO_INCLUIR;
  private turmaListaDataSource: any;

  constructor(
    public turmaService: TurmaControllerService,
    private dialogRef: MatDialogRef<AddAlunoTurmaDialogComponent>,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private securityService: SecurityService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.turmaID = data.id;
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.turmaService.turmaControllerListAll().subscribe(data => {
      this.turmaListaDataSource.data = data.content;
    })
  }


  fechar(): void {
    this.dialogRef.close();
  }

  onSubmit() {
  }

  limparFormulario(){
      this.formGroup.reset();
      this.formGroup.patchValue({
          usuarioId: this.securityService.getUserId()
      });
  }
}
