import {Inject, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadArquivoComponent } from './upload-arquivo/upload-arquivo.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {RouterLink} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import { ViwerDocumetDialogComponent } from './viwer-documet-dialog/viwer-documet-dialog.component';

@NgModule({
  declarations: [
    UploadArquivoComponent,
    ViwerDocumetDialogComponent
  ],
  exports: [
    UploadArquivoComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    PdfViewerModule,
    RouterLink,
    FlexModule
  ]
})
export class ArquivoViwerModule {

}
