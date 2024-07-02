import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SecurityService } from "../../../arquitetura/security/security.service";
import { MatriculaVisualizarDto } from "../../../api/models/matricula-visualizar-dto";
import { MatriculaControllerService } from "../../../api/services/matricula-controller.service";
import { DateAdapter } from "@angular/material/core";
import { AddAdvertenciaDialogComponent } from "../add-advertencia-dialog/add-advertencia-dialog.component";
import { NecessidadeEspecialDto } from "../../../api/models/necessidade-especial-dto";
import { NecessidadeEspecialControllerService } from "../../../api/services/necessidade-especial-controller.service";
import { ConfirmationDialog } from "../../../core/confirmation-dialog/confirmation-dialog.component";
import { MatriculaDto } from "../../../api/models/matricula-dto";
import { AdvertenciaDto } from "../../../api/models/advertencia-dto";
import { AdvertenciaControllerService } from "../../../api/services/advertencia-controller.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatriculaListagemDto } from "../../../api/models/matricula-listagem-dto";
import { DocumentoMatriculaDto } from "../../../api/models/documento-matricula-dto";
import { EnumDoc } from "../../../arquitetura/arquivo-viwer/EnumDoc";
import { MatriculaControllerGetDocumentoMatricula$Params } from "../../../api/fn/matricula-controller/matricula-controller-get-documento-matricula";
import {
    AddNecessidadeEspecialDialogComponent
} from "../add-necessidade-especial-dialog/add-necessidade-especial-dialog.component";

@Component({
    selector: 'app-info-matricula-dialog',
    templateUrl: './info-matricula-dialog.component.html',
    styleUrls: ['./info-matricula-dialog.component.scss']
})
export class InfoMatriculaDialogComponent implements OnInit {
    matriculaVisualiza?: MatriculaVisualizarDto;
    matriculaId: number;
    formGroup!: FormGroup;
    botaoNecessidadeClicado: boolean = false;
    matricula!: MatriculaDto;
    matriculaDataSource: MatTableDataSource<MatriculaVisualizarDto> = new MatTableDataSource<MatriculaVisualizarDto>([])
    colunasTutores: string[] = ['tutoresNomes', 'tutoresTelefone'];
    colunasResponsaveis: string[] = ['responsaveisNome'];
    colunasNecessidadesEspeciais: string[] = ['titulo'];
    colunasAdvertencia: string[] = ['titulo', 'descricao'];

    caminhoDocumento!: string;
    constructor(
        private formBuilder: FormBuilder,
        private _adapter: DateAdapter<any>,
        private matriculaService: MatriculaControllerService,
        private advertenciaService: AdvertenciaControllerService,
        private dialogRef: MatDialogRef<InfoMatriculaDialogComponent>,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private securityService: SecurityService,
        private necessidadeEspecialService: NecessidadeEspecialControllerService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this._adapter.setLocale('pt-br');
        this.matriculaId = data.id;
    }

    ngOnInit(): void {
        this.createForm();
        this.visualizacao();
    }

    private visualizacao() {
        this.matriculaService.matriculaControllerGetMatriculaVisualizar({ IdMatricula: this.matriculaId }).subscribe(
            (data: MatriculaVisualizarDto) => {
                this.matriculaVisualiza = data;

                // Verifica se há caminho de imagem definido
                if (data.caminhoImagem) {
                    this.buscarCaminhoImagem(data.caminhoImagem);
                }

                const tutoresNomesArray = data.tutoresNomes || [];
                const tutoresTelefoneArray = data.tutoresTelefone || [];
                const responsaveisAutorizadosNomeArray = data.responsaveisNome || [];
                const necessidadeEspecialArray = data.necessidades || [];
                const advertenciasArray = data.advertencias || [];

                this.matriculaDataSource.data = [{
                    tutoresNomes: tutoresNomesArray,
                    tutoresTelefone: tutoresTelefoneArray,
                    responsaveisNome: responsaveisAutorizadosNomeArray,
                    advertencias: advertenciasArray
                }];

            },
            (error) => {
                this.snackBar.open('Erro ao obter os dados da matrícula', 'Fechar', { duration: 3000 });
                this.fechar();
            }
        );
    }



    private buscarCaminhoImagem(caminhoImagem: string) {
        this.matriculaService.matriculaControllerObterDocumentoMatricula({ body: { idMatricula: this.matriculaId, tipoDocumento: EnumDoc.FOTO_CRIANCA } }).subscribe(
            (response: Blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.caminhoDocumento = reader.result as string;
                };
                reader.readAsDataURL(response);
            },
            (error) => {
                console.error('Erro ao obter o caminho da imagem:', error.message);
            }
        );
    }


    createForm() {
        this.formGroup = this.formBuilder.group({
            possuiNecessidadeEspecial: [false],
            necessidadesEspeciais: this.formBuilder.array<NecessidadeEspecialDto>([])
        });
    }

    openDialogAdvertencia() {
        this.dialogRef.close();
        const dialogRefAdvertencia = this.dialog.open(AddAdvertenciaDialogComponent, {
            data: { id: this.matriculaId }
        });

        dialogRefAdvertencia.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(InfoMatriculaDialogComponent, {
                    data: { id: this.matriculaId }
                });
            }else{
                this.dialog.open(InfoMatriculaDialogComponent,{
                    data: {id: this.matriculaId}
                });
            }
        });
    }

    openDialogNecessidade(){
        this.dialogRef.close();
        const dialogRefAdvertencia = this.dialog.open(AddNecessidadeEspecialDialogComponent, {
            data: { id: this.matriculaId }
        });

        dialogRefAdvertencia.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(InfoMatriculaDialogComponent, {
                    data: { id: this.matriculaId }
                });
            }else{
                this.dialog.open(InfoMatriculaDialogComponent,{
                    data: {id: this.matriculaId}
                });
            }
        });
    }

    fechar(): void {
        this.dialogRef.close();
    }


}
