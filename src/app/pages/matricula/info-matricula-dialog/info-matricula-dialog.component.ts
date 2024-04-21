import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SecurityService } from "../../../arquitetura/security/security.service";
import { forkJoin } from 'rxjs';
import { MatriculaControllerService } from "../../../api/services/matricula-controller.service";
import { InformacoesMatriculaControllerService } from "../../../api/services/informacoes-matricula-controller.service";
import { AdvertenciaControllerService } from "../../../api/services/advertencia-controller.service";
import { NecessidadeEspecialControllerService } from "../../../api/services/necessidade-especial-controller.service";
import { ResponsavelControllerService } from "../../../api/services/responsavel-controller.service";
import { TutorControllerService } from "../../../api/services/tutor-controller.service";
import { EnderecoControllerService } from "../../../api/services/endereco-controller.service";
import { MatriculaDto } from "../../../api/models/matricula-dto";
import { InformacoesMatriculaDto } from "../../../api/models/informacoes-matricula-dto";
import { AdvertenciaDto } from "../../../api/models/advertencia-dto";
import { NecessidadeEspecialDto } from "../../../api/models/necessidade-especial-dto";
import { ResponsavelDto } from "../../../api/models/responsavel-dto";
import { TutorDto } from "../../../api/models/tutor-dto";
import { EnderecoDto } from "../../../api/models/endereco-dto";

@Component({
    selector: 'app-info-matricula-dialog',
    templateUrl: './info-matricula-dialog.component.html',
    styleUrls: ['./info-matricula-dialog.component.scss']
})
export class InfoMatriculaDialogComponent implements OnInit {
    matricula: MatriculaDto[] = [];
    informacoesMatricula: InformacoesMatriculaDto[] = [];
    advertencia: AdvertenciaDto[] = [];
    necessidadeEspecial: NecessidadeEspecialDto[] = [];
    responsavel: ResponsavelDto[] = [];
    tutor: TutorDto[] = [];
    endereco: EnderecoDto[] = [];
    formGroup!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public matriculaService: MatriculaControllerService,
        public informacoesService: InformacoesMatriculaControllerService,
        public advertenciaService: AdvertenciaControllerService,
        public necessidadeEspecialService: NecessidadeEspecialControllerService,
        public responsavelService: ResponsavelControllerService,
        public tutorService: TutorControllerService,
        public enderecoService: EnderecoControllerService,
        private dialogRef: MatDialogRef<InfoMatriculaDialogComponent>,
        private dialog: MatDialog,
        private router: Router,
        private snackBar: MatSnackBar,
        private securityService: SecurityService,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.matricula = data.matricula;
    }

    ngOnInit(): void {
        this.listarMatricula();
    }

    private listarMatricula() {
        forkJoin([
            this.matriculaService.matriculaControllerListAll(),
            this.informacoesService.informacoesMatriculaControllerListAll(),
            this.advertenciaService.advertenciaControllerListAll(),
            this.necessidadeEspecialService.necessidadeEspecialControllerListAll(),
            this.responsavelService.responsavelControllerListAll(),
            this.tutorService.tutorControllerListAll(),
            this.enderecoService.enderecoControllerListAll()
        ]).subscribe(
            ([matriculas, informacoes, advertencias, necessidades, responsaveis, tutores, enderecos]) => {
                this.matricula = matriculas as MatriculaDto[];
                this.informacoesMatricula = informacoes as InformacoesMatriculaDto[];
                this.advertencia = advertencias as AdvertenciaDto[];
                this.necessidadeEspecial = necessidades as NecessidadeEspecialDto[];
                this.responsavel = responsaveis as ResponsavelDto[];
                this.tutor = tutores as TutorDto[];
                this.endereco = enderecos as EnderecoDto[];
            },
            error => {
                console.error('Ocorreu um erro ao obter os dados:', error);
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
