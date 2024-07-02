import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TurmaDto} from "../../../api/models/turma-dto";
import {TurmaControllerService} from "../../../api/services/turma-controller.service";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MatriculaListagemDto} from "../../../api/models/matricula-listagem-dto";
import {MatTableDataSource} from "@angular/material/table";
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {
    ConfirmationDialog,
    ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-info-turma-dialog',
  templateUrl: './info-turma-dialog.component.html',
  styleUrls: ['./info-turma-dialog.component.scss']
})
export class InfoTurmaDialogComponent {
  turma?: TurmaDto;
  turmaID: number;
  alunosNaTurma: Array<MatriculaListagemDto> | undefined = [];
  alunosDataSource : MatTableDataSource<MatriculaListagemDto> = new MatTableDataSource<MatriculaListagemDto>([]);
  colunas: string[] = ['nroMatricula','nomeAluno', 'acoes'];

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
        this.alunosDataSource.data = data.alunos || [];
        console.log(data)
      },
      (error) => {
        console.error('Erro ao buscar dados da turma:', error);
      }
    );
  }


  fechar(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    // Lógica de envio do formulário, se necessário
  }

  formatTime(horaString: string): string {
    // Verifique se a string de entrada tem 4 caracteres
    if (horaString.length === 4) {
      // Extraia as horas e minutos
      const horas = horaString.substring(0, 2);
      const minutos = horaString.substring(2);
      // Adicione os dois pontos entre as horas e minutos
      return `${horas}:${minutos}`;
    } else {
      // Retorne a string original se não tiver o formato correto
      return horaString;
    }
  }

    removerAluno(aluno: MatriculaListagemDto): void {
        const alunoId = aluno.nroMatricula;
        if (alunoId !== undefined) {
            const dialogRef = this.dialog.open(ConfirmationDialog, {
                data: {
                    titulo: 'Confirmar?',
                    mensagem: `Deseja excluir o aluno: ${aluno.nomeAluno} da turma?`,
                    textoBotoes: {
                        ok: 'Confirmar',
                        cancel: 'Cancelar',
                    },
                    dado: aluno
                },
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.turmaService.turmaControllerRemoveAlunosTurma({
                        idTurma: this.turmaID,
                        body: [alunoId]
                    }).subscribe(
                        (data) => {
                            this.alunosDataSource.data = this.alunosDataSource.data.filter(a => a.nroMatricula !== alunoId);
                        },
                        (error) => {
                            this.snackBar.open('Erro ao remover aluno', 'Fechar', { duration: 3000 });
                        }
                    );
                }
            });
        }
    }




}
