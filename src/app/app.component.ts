import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LoaderService} from "./arquitetura/loader/loader.service";
import {SecurityService} from "./arquitetura/security/security.service";
import {AutenticacaoService} from "./arquitetura/autenticacao/autenticacao.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageItem, MessageService} from "./arquitetura/message/message.service";
import {User} from "./arquitetura/security/User";
import {LoaderDialogComponent} from "./arquitetura/loader-dialog/loader-dialog.component";
import {ConfirmDialogComponent} from "./arquitetura/message/confirm-mesage/confirm-dialog.component";
import DevExpress from "devextreme";
import dialog = DevExpress.ui.dialog;

class MessageDialog {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'MatricuLAR_Front';
    private dialogRef!: MatDialogRef<any>;
    public constructor(
        private router: Router,
        private dialog: MatDialog,
        private loaderService: LoaderService,
        private autenticationService: AutenticacaoService,
        private securityService: SecurityService,
        private snackBar: MatSnackBar,
        private messageService: MessageService,
    ){}
    ngOnInit(): void {
        this.securityService.onRefresh.subscribe((refreshToken: string) => {

            this.autenticationService.refresh(refreshToken).subscribe(data => {
                const user: User = {
                    id: data.id,
                    nome: data.nome,
                    login: data.login,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    expiresIn: data.expiresIn,
                    roles: data.roles
                };
                this.securityService.init(user);
            }, error => {
                console.log(error);
                this.messageService.addMsgInf(error);
            });
        });

        this.securityService.onForbidden.subscribe(() => {
            this.messageService.addMsgWarning("Sem acesso");
            //this.router.navigate([this.config.loginRouter]);
            this.router.navigate(['/acesso']);
        });

        this.securityService.onUnauthorized.subscribe(() => {
            this.messageService.addMsgWarning("Não autorizado!");
            this.router.navigate(['/acesso']);
            this.securityService.invalidate();
        });
        this.securityService.init();


        this.loaderService.onStart.subscribe(() => {
            this.dialogRef = this.dialog.open(LoaderDialogComponent, {
                minWidth: '50px',
                minHeight: '50px',
                hasBackdrop: true,
                disableClose: true
            });
        });

        this.loaderService.onStop.subscribe(() => {
            if (this.dialogRef !== undefined) {
                this.dialogRef.close();
            }
        });
        this.messageService.getConfirmEmitter().subscribe((item: MessageItem) => this.addConfirmItem(item));
    }

    /**
     * Adiciona o modal de confirmação a view.
     *
     * @param item
     */
    private addConfirmItem(item: MessageItem): void {
        this.dialog.open(ConfirmDialogComponent, {
            minWidth: '30%',
            minHeight: '30%',
            disableClose: true,
            data: {item}
        });
    }
}
