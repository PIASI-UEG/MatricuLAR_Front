import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { SecurityService } from "../../../arquitetura/security/security.service";
import { DateAdapter } from "@angular/material/core";
import { stubFalse } from "lodash";

@Component({
    selector: 'app-imprimir-termo',
    templateUrl: './imprimir-termo.component.html',
    styleUrls: ['./imprimir-termo.component.scss']
})
export class ImprimirTermoComponent {
    public imprimir: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private securityService: SecurityService,
        private _adapter: DateAdapter<any>,
    ) {}

    public imprimirTermo(){
        this.imprimir = true;
        window.print();
        setTimeout(()=>{
            this.imprimir = false;
        }, 1000);
    }
}
