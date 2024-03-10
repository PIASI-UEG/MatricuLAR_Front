export class Mascaras {


   mascaraCpf(cpfNumero: string): string {
     let cpfUser = cpfNumero
     {
       let vetorCpf: string[] = cpfUser?.split('')
       let vetorCpfFormatado: string[] = [];
       for (let i = 0; i < vetorCpf.length; i++) {
         if (i == 2 || i == 5) {
           vetorCpfFormatado.push(vetorCpf[i]);
           vetorCpfFormatado.push('.');
         } else if (i == 8) {
           vetorCpfFormatado.push(vetorCpf[i]);
           vetorCpfFormatado.push('-');
         } else {
           vetorCpfFormatado.push(vetorCpf[i]);
         }
       }
       return vetorCpfFormatado.join('');
     }
   }

   mascaraTelefone(telefoneNumero : string): string {
     let telefoneUser: string = telefoneNumero
       let vetorTelefone: string[] = telefoneUser.split('');
       let vetorTelefoneFormatado: string[] = [];
       for (let i = 0; i < vetorTelefone.length; i++) {
         if (i == 0) {
           vetorTelefoneFormatado.push('(');
           vetorTelefoneFormatado.push(vetorTelefone[i]);
         } else if (i == 2) {
           vetorTelefoneFormatado.push(')');
           vetorTelefoneFormatado.push(' ');
           vetorTelefoneFormatado.push(vetorTelefone[i]);
           vetorTelefoneFormatado.push(' ');
         } else if (i == 6) {
           vetorTelefoneFormatado.push(vetorTelefone[i]);
           vetorTelefoneFormatado.push('-');
         } else {
           vetorTelefoneFormatado.push(vetorTelefone[i]);
         }
     }
      return vetorTelefoneFormatado.join('');
   }

}
