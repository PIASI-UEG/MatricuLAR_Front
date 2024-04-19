import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatriculaDto} from "../../../api/models/matricula-dto";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";

@Component({
  selector: 'app-info-matricula-dialog',
  templateUrl: './info-matricula-dialog.component.html',
  styleUrls: ['./info-matricula-dialog.component.scss']
})
export class InfoMatriculaDialogComponent implements OnInit{
  nomeCrianca!: string;
  formGroup!: FormGroup;
  matricula!: MatriculaDto;

  public constructor(
    private formBuilder: FormBuilder,
    public matriculaService: MatriculaControllerService,
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
    this.createForm();
    console.log(this.matricula);
  }

  private createForm() {

  }

  fechar(): void {
    this.dialogRef.close();
  }

  onSubmit() {

  }
}
