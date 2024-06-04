import {Inject, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadArquivoComponent } from './upload-arquivo/upload-arquivo.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {RouterLink} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import { ViwerDocumetDialogComponent } from './viewer-documet-dialog/viwer-documet-dialog.component';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {ImageModule} from "primeng/image";
import {NgxImageZoomModule} from "ngx-image-zoom";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";

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
        FlexModule,
        NgxExtendedPdfViewerModule,
        ImageModule,
        NgxImageZoomModule,
        MatProgressSpinnerModule,
        MatIconModule,
    ]
})
export class ArquivoViewerModule {

}
