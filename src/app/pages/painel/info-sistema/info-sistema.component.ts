import {Component, OnInit} from '@angular/core';
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TurmaControllerService} from "../../../api/services/turma-controller.service";
import DevExpress from "devextreme";
import data = DevExpress.data;
import {
  ControlePeriodoMatriculaControllerService
} from "../../../api/services/controle-periodo-matricula-controller.service";

@Component({
  selector: 'app-info-sistema',
  templateUrl: './info-sistema.component.html',
  styleUrls: ['./info-sistema.component.scss']
})
export class InfoSistemaComponent implements OnInit{
  totalMatriculas: number = 0;
  totalTurmas: number = 0;
  qtdMatriculasPendente: number = 0;
  qtdMatriculasInativas: number = 0;
  qtdMatriculasAtivas: number = 0;
  qtdMatriculasParaRenovar: number = 0;
  innerWidth: number = window.innerWidth;

  constructor(
    public matriculaService: MatriculaControllerService,
    public turmaService: TurmaControllerService,
    public controlePeriodoMatriculaService: ControlePeriodoMatriculaControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private securityService: SecurityService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.buscarDados();
  }


  private buscarDados() {
    //Matriculas
    this.matriculaService.matriculaControllerCount({statusMatricula: 'ATIVO'}).
    subscribe(data => {
      this.qtdMatriculasAtivas = data;
    });
    this.matriculaService.matriculaControllerCount({statusMatricula: 'INATIVO'}).
    subscribe(data => {
      this.qtdMatriculasInativas = data;
    });
    this.matriculaService.matriculaControllerCount({statusMatricula: 'AGUARDANDO_RENOVACAO'}).
    subscribe(data => {
      this.qtdMatriculasParaRenovar = data;
    });
    this.matriculaService.matriculaControllerCount({statusMatricula: 'AGUARDANDO_ACEITE'}).
    subscribe(data => {
      this.qtdMatriculasPendente = data;
    });
    this.matriculaService.matriculaControllerQuantidadeTotalMatriculas({}).
    subscribe(data => {
      this.totalMatriculas = data;
    });
    //Turmas
    this.turmaService.turmaControllerQuantidadeTotal().
    subscribe(data =>{
      this.totalTurmas = data;
    })
  }



  controlePreMatricula(event: any) {
    if (event.checked) {
      this.controlePeriodoMatriculaService.controlePeriodoMatriculaControllerAtivaPeriodoMatricula(
        {aceitandoCadastroMatricula: true}, undefined
      ).subscribe(
        data => {console.log(data)}
      )
      console.log('O botão está ligado');
    } else {
      this.controlePeriodoMatriculaService.controlePeriodoMatriculaControllerAtivaPeriodoMatricula(
        {aceitandoCadastroMatricula: false}, undefined
      )
      console.log('O botão está desligado');
    }
  }

  controleReMatricula(event: any) {
    if (event.checked) {
      console.log('O botão está ligado');
    } else {
      console.log('O botão está desligado');
    }
  }


}
