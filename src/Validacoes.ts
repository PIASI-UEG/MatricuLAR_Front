import {AbstractControl} from "@angular/forms";
import {isEmail} from "class-validator";
import {cpf} from "cpf-cnpj-validator";

export class Validacoes{
     validarEmail(control: AbstractControl): { [key: string]: any } | null {
         const email: string = control.value;
          //npm install class-validator --save
         if (isEmail(email) || email == '' || email == null) {
           return null;
         }

       return { 'emailInvalido': true };
     }

    validarCpf(control: AbstractControl): { [key: string]: any } | null {
        const cpfValidar: string = control.value;
        //npm install produtoId-cnpj-validator
        if (cpf.isValid(cpfValidar) || cpfValidar == '' || cpfValidar == null) {
          return null;
        }

      return { 'cpfInvalido': true };
    }

  validarTelefone(control: AbstractControl): { [key: string]: any } | null {
    const telefone: string = control.value;

    const formatoValido = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{5}$/.test(telefone);

    if (telefone == '' || formatoValido || telefone == null) {
      return null;
    }

    // Retorna um objeto se o telefone não for válido
    return { 'telefoneInvalido': true };
  }

  validarCaracterEspecial(control: AbstractControl): { [key: string]: any } | null {
    const senha: string = control.value;
    const temCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (senha == '' || temCaracterEspecial || senha == null) {
      return null;
    }

    // Retorna um objeto se o telefone não for válido
    return { 'senhaInvalidaCaracter': true };
  }

  validarLetraMaiuscula(control: AbstractControl): { [key: string]: any } | null {
    const senha: string = control.value;

    const temLetraMaiuscula = /[A-Z]/.test(senha);

    if (senha == '' || temLetraMaiuscula || senha == null) {
      return null;
    }

    // Retorna um objeto se o telefone não for válido
    return { 'senhaInvalidaMaiuscula': true };
  }

  validarPeloMenosTresNumeros(control: AbstractControl): { [key: string]: any } | null {
    const senha: string = control.value;

    const temPeloMenosTresNumeros = /[0-9].*[0-9].*[0-9]/.test(senha);

    if (senha == '' || temPeloMenosTresNumeros || senha == null) {
      return null;
    }

    // Retorna um objeto se o telefone não for válido
    return { 'senhaInvalidaNumeros': true };
  }

}
