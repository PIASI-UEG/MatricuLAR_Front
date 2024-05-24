import {Component, OnInit} from '@angular/core';
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TurmaControllerService} from "../../../api/services/turma-controller.service";
import DevExpress from "devextreme";
import data = DevExpress.data;

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


}
