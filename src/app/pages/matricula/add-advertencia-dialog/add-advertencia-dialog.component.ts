import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {MatriculaDto} from "../../../api/models/matricula-dto";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {AdvertenciaControllerService} from "../../../api/services/advertencia-controller.service";
import {AdvertenciaDto} from "../../../api/models/advertencia-dto";

@Component({
  selector: 'app-add-advertencia-dialog',
  templateUrl: './add-advertencia-dialog.component.html',
  styleUrls: ['./add-advertencia-dialog.component.scss']
})
export class AddAdvertenciaDialogComponent {
  alunoID: number;
  formGroup!: FormGroup;
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, router: this.router, telaAtual: 'turma'});
  aluno?: MatriculaDto;

  constructor(
    private formBuilder: FormBuilder,
    public advertenciaService: AdvertenciaControllerService,
    public matriculaService: MatriculaControllerService,
    private dialogRef: MatDialogRef<AddAdvertenciaDialogComponent>,
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
    this.matriculaService.matriculaControllerObterPorId({id: this.alunoID}).subscribe(data => {
      this.aluno = data;
    })
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      titulo: [null,Validators.required],
      descricao: [null,Validators.required]
    })
  }

  private realizarInclusao() {
    console.log("Dados:",this.formGroup.value);
    let advertenciaDto: AdvertenciaDto = this.formGroup.value;
    advertenciaDto.idMatricula = this.aluno?.id;
    this.advertenciaService.advertenciaControllerIncluir({body: advertenciaDto})
      .subscribe( retorno =>{
        console.log("Retorno:",retorno);
        this.confirmarAcao(retorno);
        this.router.navigate(["/matricula"]);
      }, erro =>{
        console.log("Erro:"+erro.message);
        //this.mensagens.confirmarErro(erro.message)
      })
  }

  confirmarAcao(advertencia: AdvertenciaDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Advertência Registrada!',
        mensagem: `Advertência: ${advertencia.titulo} - Aluno: ${this.aluno?.id}). Ação realizada com sucesso!`,
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
      if(this.aluno){
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

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
}
