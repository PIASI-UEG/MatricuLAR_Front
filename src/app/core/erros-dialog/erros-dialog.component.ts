import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ErrosControl} from "./ErrosControls";
import {ErrosForm} from "./ErrosForm";
import {TranslationField} from "./TranslationFields";
import {TranslationError} from "./TranslationErros";
import {ExibirErrosStringForms} from "./ExibirErrosStringForms";

@Component({
  selector: 'app-erros-dialog',
  templateUrl: './erros-dialog.component.html',
  styleUrls: ['./erros-dialog.component.scss']
})
export class ErrosDialogComponent {
  errosControls!: ErrosControl[];
  errosForms!: ErrosForm[];
  trnaslationfield!: TranslationField[];
  trnaslationerror!: TranslationError[];
  formName: string | null = null;

  translatedErrors: ExibirErrosStringForms[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      errosControls: ErrosControl[],
      errosForms: ErrosForm[],
      trnaslationfield: TranslationField[],
      trnaslationerror: TranslationError[];
      formName: string | null;
    }){
      this.errosControls = data.errosControls;
      this.errosForms = data.errosForms;
      this.trnaslationfield = data.trnaslationfield;
      this.trnaslationerror = data.trnaslationerror;
      this.formName = data.formName;

      if(this.formName == null) {
          this.translatedErrors = this.translateErrors();
          console.log("string erros traduzidos", this.translatedErrors)
      }else{
        this.translatedErrors = this.translateErrors().filter(error => error.formName === this.formName)
      }
    }

  private translateErrors(): ExibirErrosStringForms[] {
    // Mapa para armazenar os erros por formulário
    const formErrorsMap: { [key: string]: string[] } = {};

// Traduz erros de controle
    this.errosControls.forEach(errorControl => {
      const formName = this.getFormNameByField(errorControl.fieldName);
      const translationField = this.trnaslationfield.find(tf => tf.formName === formName);
      const translationError = this.trnaslationerror.find(te => te.formName === formName);

      if (translationField && translationError) {
        const fieldTranslation = translationField[errorControl.fieldName];
        const errorTranslation = translationError[errorControl.erros];

        if (fieldTranslation && errorTranslation) {
          if (!formErrorsMap[formName]) {
            formErrorsMap[formName] = [];
          }
          formErrorsMap[formName].push(`${fieldTranslation}: ${errorTranslation}`);
        }
      }
    });

// Traduz erros de formulário
    this.errosForms.forEach(errorForm => {
      const formName = this.getFormNameByError(errorForm.erros); // Ajuste conforme necessário para determinar o formName
      const translationError = this.trnaslationerror.find(te => te.formName === formName);

      console.log(translationError)
      if (translationError) {

        const translatedError = translationError[errorForm.erros];
        if (translatedError) {
          if (!formErrorsMap[formName]) {
            formErrorsMap[formName] = [];
          }

          formErrorsMap[formName].push(translatedError);
        }
      }
    });

// Converte o mapa de erros para um array de objetos
    const formErrorsArray: ExibirErrosStringForms[] = Object.keys(formErrorsMap).map(formName => ({
      formName: formName,
      erros: formErrorsMap[formName]
    }));

    return formErrorsArray;
  }

  private getFormNameByField(field: string): string {
    // Implementar a lógica para obter o nome do formulário pelo campo
    for (let tf of this.trnaslationfield) {
      if (tf[field]) {
        return tf.formName;
      }
    }
    return '';
  }

  private getFormNameByError(error: string): string {
    for (let te of this.trnaslationerror) {
      if (te[error]) {
        return te.formName;
      }
    }
    return '';
  }
}
