import {AbstractControl, FormGroup} from "@angular/forms";
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

     validarCep(control: AbstractControl): { [key: string]: any } | null {
       const cep: string = control.value;
       const formatoValido = /^[0-9]{5}[0-9]{3}$/.test(cep);

       if (cep == '' || formatoValido || cep == null) {
         return null;
       }

       return { 'cepInvalido': true };
     }

    validarCpf(control: AbstractControl): { [key: string]: any } | null {
        const cpfValidar: string = control.value;
        //npm install produtoId-cnpj-validator
        if (cpf.isValid(cpfValidar) || cpfValidar == '' || cpfValidar == null) {
          return null;
        }

      return { 'cpfInvalido': true };
    }

  validarCnpj(control: AbstractControl): { [key: string]: any } | null {
    const cnpj: string = control.value;

    if (!cnpj) {
      return { 'cnpjVazio': true };
    }

    const cnpjLimpo = cnpj.replace(/\D/g, '');

    if (cnpjLimpo.length !== 14 || /^(\d)\1+$/.test(cnpjLimpo)) {
      return { 'cnpjInvalido': true };
    }

    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpjLimpo.charAt(i)) * peso--;
      if (peso < 2) {
        peso = 9;
      }
    }
    const digito1 = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpjLimpo.charAt(i)) * peso--;
      if (peso < 2) {
        peso = 9;
      }
    }
    const digito2 = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

    if (parseInt(cnpjLimpo.charAt(12)) === digito1 && parseInt(cnpjLimpo.charAt(13)) === digito2) {
      return null;
    }
      return { 'cnpjInvalido': true };
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

  validarTelefoneFixo(control: AbstractControl): { [key: string]: any } | null {
    const telefone: string = control.value;

    const formatoValido = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/.test(telefone);

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

  //form de tutor validação de telefones
  validarTelefonesEmpresariais(formGroup: FormGroup): { [key: string]: any } | null {
       const campo1: string = formGroup.get('telefoneCelularEmpresarial')?.value;
       const campo2: string = formGroup.get('telefoneFixoEmpresarial')?.value;

       if((campo1 == '' && campo2 == '') ||
          (campo1 == null && campo2 == null) ||
          (campo1 == null && campo2 == '') ||
          (campo1 == '' && campo2 == null)){
         formGroup.setErrors({ 'informeUmTelefoneEmpresarial': true });
         return { 'informeUmTelefoneEmpresarial': true };
       }
       return null;
  }

  validarRazaoSaida(formGroup: FormGroup): { [key: string]: any } | null {
    if (formGroup.get('frequentouOutraCreche')?.value === "sim" && !formGroup.get('razaoSaida')?.value) {
      formGroup.get('razaoSaida')?.setErrors({ 'informeRazaoSaida': true });
      return { 'informeRazaoSaida': true }; // Indicate that an error was set
    } else {
      return null; // No error set
    }
  }

  validarAluguel(formGroup: FormGroup): { [key: string]: any } | null {
    if (formGroup.get('tipoResidencia')?.value === "alugado" && !formGroup.get('valorAluguel')?.value) {
      formGroup.get('valorAluguel')?.setErrors({ 'informeValorAluguel': true });
      return { 'informeValorAluguel': true }; // Indicate that an error was set
    } else {
      return null; // No error set
    }
  }

  validarBeneficio(formGroup: FormGroup): { [key: string]: any } | null {
    if (formGroup.get('possuiBeneficiosDoGoverno')?.value === "sim" && !formGroup.get('valorBeneficio')?.value) {
      formGroup.get('valorBeneficio')?.setErrors({ 'informeValorBeneficio': true });
      return { 'informeValorBeneficio': true }; // Indicate that an error was set
    } else {
      return null; // No error set
    }
  }


}
