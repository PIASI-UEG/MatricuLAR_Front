import {Component, Inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {AdvertenciaControllerService} from "../../../api/services/advertencia-controller.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {NecessidadeEspecialControllerService} from "../../../api/services/necessidade-especial-controller.service";
import {ResponsavelControllerService} from "../../../api/services/responsavel-controller.service";
import {ConfirmationDialogResult} from "../../../core/confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-tutorial-pre-maricula-dialog',
    templateUrl: './tutorial-pre-maricula-dialog.component.html',
    styleUrls: ['./tutorial-pre-maricula-dialog.component.scss']
})
export class TutorialPreMariculaDialogComponent {
    public innerWidth: number = window.innerWidth;


    constructor(
        private dialogRef: MatDialogRef<TutorialPreMariculaDialogComponent>,
        private _adapter: DateAdapter<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.dialogRef.disableClose = true;
        this._adapter.setLocale('pt-br');
    }


    mudarTamanho() {
        if(innerWidth < 380){
            return {'width': '40vh', 'height': '38vh'};
        }
        else if (innerWidth < 650) {
            return {'width': '35vh', 'height': '38vh'};
        }
        else if (innerWidth < 950) {
            return {'width': '35vh', 'height': '38vh'};
        } else if (innerWidth < 1200) {
            return {'width': '60vh', 'height': '48vh'};
        }
        return {'width': '100vh', 'height': '61vh'};
    }
}
