import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TurmaDto} from "../../../api/models/turma-dto";
import {TurmaControllerService} from "../../../api/services/turma-controller.service";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MatriculaListagemDto} from "../../../api/models/matricula-listagem-dto";

@Component({
  selector: 'app-info-turma-dialog',
  templateUrl: './info-turma-dialog.component.html',
  styleUrls: ['./info-turma-dialog.component.scss']
})
export class InfoTurmaDialogComponent {
  turma?: TurmaDto;
  turmaID: number;
  alunosNaTurma: Array<MatriculaListagemDto> = [];

  constructor(
    public turmaService: TurmaControllerService,
    public matriculaService: MatriculaControllerService,
    private dialogRef: MatDialogRef<InfoTurmaDialogComponent>,
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
    this.turmaService.turmaControllerObterPorId({id: this.turmaID}).subscribe(
      (data) => {
        this.turma = data;
      },
      (error) => {
        console.error('Erro ao buscar dados da turma:', error);
      }
    );
    this.matriculaService.matriculaControllerListarAlunosPorTurma({idTurma: this.turmaID}).subscribe(
      (data) => {
        this.alunosNaTurma = data;
        console.log(this.alunosNaTurma[0]);
      },
      (error) => {
        console.error('Erro ao buscar dados dos alunos na turma:', error);
      }
    );
  }


  fechar(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // Lógica de envio do formulário, se necessário
  }
}
