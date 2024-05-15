import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import DevExpress from "devextreme";
import {PdfBreakpoints} from "ngx-extended-pdf-viewer";

@Component({
  selector: 'app-viwer-documet-dialog',
  templateUrl: './viwer-documet-dialog.component.html',
  styleUrls: ['./viwer-documet-dialog.component.scss']
})
export class ViwerDocumetDialogComponent implements OnInit{
  public innerWidth: number = window.innerWidth;
  public file: File;
  public fileSRC!: string;
  public isFileImage!: boolean;
  public isFileDocument!: boolean;

  public constructor(
    private dialogRef: MatDialogRef<ViwerDocumetDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: {
      file: File
      isFileImage: boolean
      isFileDocument: boolean
    }
  ) {
    this.file = data.file;
    this.isFileImage =data.isFileImage;
    this.isFileDocument = data.isFileDocument;
    // PdfBreakpoints.xs = 490; // unit: pixels
    // PdfBreakpoints.sm = 560;
    // PdfBreakpoints.md = 610;
    // PdfBreakpoints.lg = 660;
    // PdfBreakpoints.xl = 740;
    // PdfBreakpoints.xxl = 830;
  }

  private makeURLFile(file: any) {
    const fileUrl = URL.createObjectURL(file); // Obter o URL do arquivo
    return fileUrl as string;
  }

  ngOnInit(): void {
    this.fileSRC = this.makeURLFile(this.file);
    this.innerWidth = window.innerWidth;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  mudarAlinhar() {
    if(innerWidth < 650)
    {
      return {'width' : '28vh'};
    }
    else if (innerWidth < 1200){
      return {'width' : '60vh'};
    }
    return {'width': '100vh'};
  }

  mudarZoom() {
    if(innerWidth < 650)
    {
      return '30%';
    }
    else if (innerWidth < 1200){
      return '70%';
    }
    return '100%';
  }


}
