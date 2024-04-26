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

  // form de pereguntas validacao de razao saida
  validarRazaoSaida(formGroup: FormGroup): { [key: string]: any } | null {
    if (formGroup.get('frequentouOutraCreche')?.value === "sim" && !formGroup.get('razaoSaida')?.value) {
      formGroup.get('razaoSaida')?.setErrors({ 'informeRazaoSaida': true });
      return { 'informeRazaoSaida': true };
    } else {
      return null;
    }
  }

  // form de perguntas validacao de preco aluguel
  validarAluguel(formGroup: FormGroup): { [key: string]: any } | null {
    if (formGroup.get('tipoResidencia')?.value === "alugado" && !formGroup.get('valorAluguel')?.value) {
      formGroup.get('valorAluguel')?.setErrors({ 'informeValorAluguel': true });
      return { 'informeValorAluguel': true };
    } else {
      return null;
    }
  }

  // form de perguntas validacao de beneficio
  validarBeneficio(formGroup: FormGroup): { [key: string]: any } | null {
    if (formGroup.get('possuiBeneficiosDoGoverno')?.value === "sim" && !formGroup.get('valorBeneficio')?.value) {
      formGroup.get('valorBeneficio')?.setErrors({ 'informeValorBeneficio': true });
      return { 'informeValorBeneficio': true };
    } else {
      return null;
    }
  }

  // form de perguntas validacao se marcou frequentou outra creche
  validarFrequentou(formGroup: FormGroup): { [key: string]: any } | null {
    if (formGroup.get('frequentouOutraCreche')?.value === null) {
      formGroup.get('frequentouOutraCreche')?.setErrors({ 'informeValorFrequentou': true });
      return { 'informeValorFrequentou': true };
    } else {
      return null;
    }
  }

  // form de perguntas validacao se marcou beneficio governo
  validarBeneficioMarcado(formGroup: FormGroup): { [key: string]: any } | null {
    if (formGroup.get('possuiBeneficiosDoGoverno')?.value === null) {
      formGroup.get('possuiBeneficiosDoGoverno')?.setErrors({ 'informeValorBeneficioGoverno': true });
      return { 'informeValorBeneficioGoverno': true };
    } else {
      return null;
    }
  }

  // form de perguntas validacao se marcou beneficio governo
  validarDeclaroLiConcordo(formGroup: FormGroup): { [key: string]: any } | null {
    if (formGroup.get('declaroLieConcordo')?.value === false) {
      formGroup.get('declaroLieConcordo')?.setErrors({ 'marqueLieConcordo': true });
      return { 'marqueLieConcordo': true };
    } else {
      return null;
    }
  }

  //validar se inseriu foto criança
  validarFotoCrianca(formGroup: FormGroup ): { [key: string]: any } | null {
    const docs = formGroup.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    if (!copiaDocs[0]) {
      formGroup.get('listaDocumentos')?.setErrors({ 'insiraODocFoto': true });
      return { 'insiraODocFoto': true };
    } else {
      return null;
    }
  }

  //validar se inseriu certidão
  validarCertidao(formGroup: FormGroup ): { [key: string]: any } | null {
    const docs = formGroup.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    if (!copiaDocs[1]) {
      formGroup.get('listaDocumentos')?.setErrors({ 'insiraODocCertidao': true });
      return { 'insiraODocCertidao': true };
    } else {
      return null;
    }
  }

  //validar se inseriu CPF criança
  validarCPFCrianca(formGroup: FormGroup ): { [key: string]: any } | null {
    const docs = formGroup.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    if (!copiaDocs[2]) {
      formGroup.get('listaDocumentos')?.setErrors({ 'insiraODocCPFCrianca': true });
      return { 'insiraODocCPFCrianca': true };
    } else {
      return null;
    }
  }

  //validar se inseriu comprovante de endereço
  valdiarComprovanteEndereco(formGroup: FormGroup ): { [key: string]: any } | null {
    const docs = formGroup.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    if (!copiaDocs[4]) {
      formGroup.get('listaDocumentos')?.setErrors({ 'insiraODocCompEnd': true });
      return { 'insiraODocCompEnd': true };
    } else {
      return null;
    }
  }

  //validar se inseriu comprovante de moradia
  valdiarComprovanteMoradia(formGroup: FormGroup ): { [key: string]: any } | null {
    const docs = formGroup.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    if (!copiaDocs[5]) {
      formGroup.get('listaDocumentos')?.setErrors({ 'insiraODocCompMora': true });
      return { 'insiraODocCompMora': true };
    } else {
      return null;
    }
  }

  //validar se inseriu CPF tutor
  validarCPFTutor(formGroup: FormGroup): { [key: string]: any } | null {
    const docs = formGroup.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    if (!copiaDocs[8]) {
      formGroup.get('listaDocumentos')?.setErrors({ 'insiraODocCPFTutor': true });
      return { 'insiraODocCPFTutor': true };
    } else {
      return null;
    }
  }

  //validar se inseriu CPF conjugue
  validarCPFConjugue(formGroup: FormGroup): { [key: string]: any } | null {
    const docs = formGroup.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    if (!copiaDocs[9] && formGroup.get('temconjugue')?.value) {
      formGroup.get('listaDocumentos')?.setErrors({ 'insiraODocCPFConjugue': true });
      return { 'insiraODocCPFConjugue': true };
    } else {
      return null;
    }
  }

  //validar se inseriu Certidão Estado Civil
  validarCertidaoEstadoCivil(formGroup: FormGroup): { [key: string]: any } | null {
    const docs = formGroup.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    if (!copiaDocs[10]) {
      formGroup.get('listaDocumentos')?.setErrors({ 'insiraODocEstadoCivil': true });
      return { 'insiraODocEstadoCivil': true };
    } else {
      return null;
    }
  }

  //validar se inseriu CarteiraTrabalhoTutor
  validarCarteiraTrabalhoTutor(formGroup: FormGroup): { [key: string]: any } | null {
    const docs = formGroup.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    if (!copiaDocs[11]) {
      formGroup.get('listaDocumentos')?.setErrors({ 'insiraODocContraCheque1T': true });
      return { 'insiraODocContraCheque1T': true };
    } else {
      return null;
    }
  }
}
