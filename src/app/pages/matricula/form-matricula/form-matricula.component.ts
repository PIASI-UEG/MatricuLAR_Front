import {AfterViewInit, Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {Validacoes} from "../../../../Validacoes";
import {DateAdapter} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {NecessidadeEspecialDto} from "../../../api/models/necessidade-especial-dto";
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {TutorDto} from "../../../api/models/tutor-dto";
import {DocumentoMatriculaDto} from "../../../api/models/documento-matricula-dto";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatriculaDto} from "../../../api/models/matricula-dto";
import {EnumDoc} from "../../../arquitetura/arquivo-viwer/EnumDoc";
import {
  ViwerDocumetDialogComponent
} from "../../../arquitetura/arquivo-viwer/viewer-documet-dialog/viwer-documet-dialog.component";
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {AdvertenciaDto} from "../../../api/models/advertencia-dto";
import {InformacoesMatriculaDto} from "../../../api/models/informacoes-matricula-dto";
import {ResponsavelDto} from "../../../api/models/responsavel-dto";
import {TurmaDto} from "../../../api/models/turma-dto";
import {MatriculaListagemDto} from "../../../api/models/matricula-listagem-dto";
import {EnderecoDto} from "../../../api/models/endereco-dto";

@Component({
  selector: 'app-form-matricula',
  templateUrl: './form-matricula.component.html',
  styleUrls: ['./form-matricula.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FormMatriculaComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  formGroup!: FormGroup;
  formDocumentos!: FormGroup;
  currentStep: number = 1; // Controla a etapa atual
  public readonly ACAO_INCLUIR = "Cadastrar";
  public readonly ACAO_EDITAR = "Editar";
  acao: string = this.ACAO_INCLUIR;
  codigo!: number;
  mensagens: MensagensUniversais = new MensagensUniversais({
    dialog: this.dialog,
    router: this.router,
    telaAtual: 'matricula'
  })
  validacoes: Validacoes = new Validacoes();
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2008, 0, 0);
  flexDivAlinhar: string = 'row';
  flexDivAlinharElementosGrandes: string = 'row';
  innerWidth: number = window.innerWidth;
  hide = true;
  parentescos: string[] = ['PAI', 'MAE', 'AVO', 'TIO']; // Lista de opções de parentesco
  nomeTitulo: string = "Dados da Criança";
  guiaAtiva = 0;
  botaoNecessidadeClicado: boolean = false;
  enviado: boolean = false;
  // docs: File[] = [];
  temConjugue: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private formBuilderDocs : FormBuilder,
    private _adapter: DateAdapter<any>,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private securityService: SecurityService,
    private matriculaService: MatriculaControllerService,
    private sanitizer: DomSanitizer
  ) {
    this._adapter.setLocale('pt-br');
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.formDocumentos = this.createFormListaDocs();
    this.createForm();
    this.adicionarCampoTutor();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
  }

  private createForm() {
    if (this.acao == "Editar") {

    } else {
      //Dados da Criança
      this.formGroup = this.formBuilder.group({
        nomeCrianca: [null, Validators.required],
        cpfCrianca: [null, [Validators.required, this.validacoes.validarCpf]],
        dataNascimento: [null, Validators.required],
        possuiNecessidadeEspecial: false,
        necessidadesEspeciais: this.formBuilder.array<NecessidadeEspecialDto>([]),
        cep: [null, [Validators.required, this.validacoes.validarCep]],
        cidade: [null, Validators.required],
        bairro: [null, Validators.required],
        logradouro: [null, Validators.required],
        complemento: [null, Validators.required],
        //Dados Tutor - Etapa2
        tutor: this.formBuilder.array<TutorDto>([]),
        //Perguntas culturais - Etapa 3
        frequentouOutraCreche: [null, Validators.required],
        razaoSaida: [null],
        tipoResidencia: [null, Validators.required],
        valorAluguel: [null],
        possuiBeneficiosDoGoverno: [null, Validators.required],
        valorBeneficio: [null],
        rendaFamiliar: [null, Validators.required],
        //Documentos - Etapa 4
        // implementar anexar documentos no form
        // declaro que li e concordo
        declaroLieConcordo: false
      }, {
        validator: [this.validacoes.validarRazaoSaida,
          this.validacoes.validarAluguel,
          this.validacoes.validarBeneficio,
          this.validacoes.validarFrequentou,
          this.validacoes.validarBeneficioMarcado,
          this.validacoes.validarDeclaroLiConcordo,
        ]
      })
    }
  }

  private createTutorFormGroup(): FormGroup {
    return this.formBuilder.group({
      nomeTutor: [null, Validators.required],
      //colocar
      dataNascimento: [null, Validators.required],
      cpf: [null, [Validators.required, this.validacoes.validarCpf]],
      vinculo: [null, Validators.required],
      pessoaTelefone: [null, [Validators.required, this.validacoes.validarTelefone]],
      profissao: [null, Validators.required],
      empresaNome: [null, Validators.required],
      empresaCnpj: [null, [Validators.required, this.validacoes.validarCnpj]],
      telefoneCelularEmpresarial: [null, this.validacoes.validarTelefone],
      //colocar
      telefoneFixoEmpresarial: [null, this.validacoes.validarTelefoneFixo],
      casado: false,
      moraComConjuge: false,
    }, {validator: this.validacoes.validarTelefonesEmpresariais})
  }

  private createFormListaDocs(): FormGroup {

    return this.formBuilder.group({
      listaDocumentos: [[]], // Inicialize com uma lista vazia
      temconjugue: false,
      recebeBeneficio: null,
    },{validator:
        [this.validacoes.validarFotoCrianca,
          this.validacoes.validarCertidao,
          this.validacoes.validarCPFCrianca,
          this.validacoes.valdiarComprovanteEndereco,
          this.validacoes.valdiarComprovanteMoradia,
          this.validacoes.validarCPFTutor,
          this.validacoes.validarCPFConjugue,
          this.validacoes.validarCertidaoEstadoCivil,
          this.validacoes.validarCarteiraTrabalhoTutor,
          this.validacoes.validarCarteiraTrabalhoConjugue,
          this.validacoes.validarCarteiraContraChequeTutor,
          this.validacoes.validarCarteiraContraChequeConjugue,
          this.validacoes.validarDeclaracaoEscolarTutor,
          this.validacoes.validarDeclaracaoEscolarConjugue,
          this.validacoes.validarComprovanteBeneficio

          // mudar forma de implementação do validações para ficar mais felxivel
        ] })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
  public handleErrorForm = (errorName: string) => {
    const formGroup = this.formGroup;
    return formGroup.hasError(errorName);
  };

  public handleErrorFormDocs = (errorName: string) => {
    const formGroup = this.formDocumentos;
    return formGroup.hasError(errorName);
  };

  public handleErrorTutor = (controlName: string, errorName: string, index: number) => {
    const formGroupTutor = this.getTutorForm(index)
    return formGroupTutor.controls[controlName].hasError(errorName);
  };

  public handleErrorFormTutor = (errorName: string, index: number) => {
    const formGroupTutor = this.getTutorForm(index);
    return formGroupTutor.hasError(errorName);
  };


  onSubmit() {
    this.enviado = true;
    // if (this.codigo == null) {
    //   return;
    // }
    //depois de salvar a matricula e pegar o id vamos setar nos doc e salvando eles
    // console.log("Submit")

      // this.docs.forEach(doc => {
      //     if (doc.idMatricula && doc.tipoDocumento && doc.arquivo) {
      //       console.log(doc.arquivo)
      //       this.matriculaService.matriculaControllerUploadDocumento(
      //         {idMatricula: doc.idMatricula, tipoDocumento: doc.tipoDocumento, body: {multipartFile: doc.arquivo}})
      //         .subscribe(retorno => {
      //           console.log(retorno)
      //         })
      //     }
      //   }
      // )


    if (this.codigo != null || this.formGroup.valid) {
      if (!this.codigo) {
        this.atribuirConjugueRelacionamento();
        this.realizarInclusao();
      } else {
        this.realizarEdicao();
      }
    }
  }



private realizarInclusao() {
    const docs = this.formDocumentos.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    const matricula: MatriculaDto = this.makeDTOMatricula();
    console.log("Matricula:", matricula);
    console.log("Dados:",this.formGroup.value);

    this.matriculaService.matriculaControllerIncluir({body: matricula})
        .subscribe( retorno =>{
          console.log("Retorno:",retorno);

          // mandar documentos
          if(retorno.id)
          {
            const matriculaID: number = retorno.id
            this.matriculaService.matriculaControllerUploadDocumentos({idMatricula: matriculaID, body: {multipartFile: copiaDocs}})
                .subscribe(retorno =>{
                  this.confirmarAcao(retorno, this.ACAO_INCLUIR);
                  this.router.navigate(["/matricula"]);
                }, error => {
                  console.log("Erro:"+error);
                  this.mensagens.confirmarErro(this.ACAO_INCLUIR, error.message)
                })
          }

        }, erro =>{
          console.log("Erro:"+erro);
          this.mensagens.confirmarErro(this.ACAO_INCLUIR, erro.message)
        })
  }

  private makeDTOMatricula(): MatriculaDto{

    const necessidadesEspeciaisArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
    const valoresNecessidadesEspeciais: NecessidadeEspecialDto[] = necessidadesEspeciaisArray.value;

    const tutorArray = this.formGroup.get('tutor') as FormArray;
    const valoresTutor: TutorDto[] = tutorArray.value;

    const responsaveis: ResponsavelDto[] = [];

    valoresTutor.forEach((valorTutor) => {

      const responsavel: ResponsavelDto = {
        cpfResponsavel: valorTutor.cpf,
        nomeResponsavel: valorTutor.nomeTutor,
        tutor: true,
        vinculo: valorTutor.vinculo
      };

      responsaveis.push(responsavel);
    });

    const possuiBeneficiosDoGoverno = this.formGroup.get('possuiBeneficiosDoGoverno')?.value;
    const possuiEsteveOutraCreche = this.formGroup.get('frequentouOutraCreche')?.value;

    const infoMatricula: InformacoesMatriculaDto = {
      possuiBeneficiosDoGoverno: possuiBeneficiosDoGoverno === 'sim' ? true : false,
      frequentouOutraCreche: possuiEsteveOutraCreche === 'sim' ? true : false,
      razaoSaida: this.formGroup.get('razaoSaida')?.value,
      rendaFamiliar: this.formGroup.get('rendaFamiliar')?.value,
      tipoResidencia: this.formGroup.get('tipoResidencia')?.value,
      valorAluguel: this.formGroup.get('valorAluguel')?.value,
      valorBeneficio: this.formGroup.get('valorBeneficio')?.value
    }

    const endereco: EnderecoDto = {
      bairro: this.formGroup.get('bairro')?.value,
      cep: this.formGroup.get('cep')?.value,
      cidade: this.formGroup.get('cidade')?.value,
      complemento: this.formGroup.get('complemento')?.value,
      logradouro: this.formGroup.get('logradouro')?.value
    }

    const matriculaDtoPreenchido: MatriculaDto = {
      cpf: this.formGroup.get('cpfCrianca')?.value,
      endereco: endereco,
      informacoesMatricula: infoMatricula,
      nascimento:  this.formGroup.get('dataNascimento')?.value,
      necessidades: valoresNecessidadesEspeciais,
      nome: this.formGroup.get('nomeCrianca')?.value,
      responsaveis: responsaveis,
      status: 'ATIVO',
      tutorDTOList: valoresTutor
    };

    return matriculaDtoPreenchido;
  }

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      const codigo = parseInt(paramId);
      console.log("codigo pessoa", paramId);
    }
  }

  confirmarAcao(matricula: MatriculaDto, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Cadastro!',
        mensagem: `Ação de ${acao} Nome: ${matricula.nome} (ID: ${matricula.id}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'Confirmar',
        },
      },
    });
  }

  private realizarEdicao() {
    console.log("Dados:", this.formGroup.value);
    this.router.navigate(["/matricula"]);
  }

  mudarAlinhar() {

    if (innerWidth < 1000) {
      return this.flexDivAlinhar = "column";
    }
    if (innerWidth < 1400) {
      this.flexDivAlinharElementosGrandes = "column";
    }
    this.flexDivAlinharElementosGrandes = "row";
    return this.flexDivAlinhar = "row";

  }

  mudarAlinharElementosGrandes() {

    if (innerWidth < 1400) {
      return this.flexDivAlinharElementosGrandes = "column";
    }
    return this.flexDivAlinharElementosGrandes = "row";

  }

  verificarAlinhar() {
    if (this.flexDivAlinhar == "column") {
      return true;
    }
    return false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = window.innerWidth;
  }

  alterarNomeTitulo(indice: number): void {
    if (indice == 0) {
      this.nomeTitulo = "Dados da Criança"
    } else if (indice == 1) {
      this.nomeTitulo = "Dados do Tutor(a)"
    } else if (indice == 2) {
      this.nomeTitulo = "Perguntas Culturais"
    } else {
      this.nomeTitulo = "Anexar documentos"
    }
  }

  alterarGuiaAtiva(indice: number): void {
    this.guiaAtiva = indice;
  }

  goToStep(step: number) {
    // Método para navegar para uma etapa específica
    this.currentStep = step;
  }

  goToNextStep(indice: number) {
    // Lógica para avançar para a próxima etapa
    if (indice >= 0 && indice < this.tabGroup._tabs.length) {
      this.tabGroup.selectedIndex = indice;
    }
    this.alterarNomeTitulo(indice)
  }

  goToPreviousStep(indice: number) {
    // Lógica para voltar para a etapa anterior
    if (indice >= 0 && indice < this.tabGroup._tabs.length) {
      this.tabGroup.selectedIndex = indice;
    }
    this.alterarNomeTitulo(indice)
  }

  criarCampoNecessidadeEspecial(): FormGroup {
    return this.formBuilder.group({
      titulo: [null, Validators.required]
    });
  }

  firstClickNecessidades(): boolean {
    if (this.botaoNecessidadeClicado && this.formGroup.get('possuiNecessidadeEspecial')?.value) {
      return true;
    } else if (this.formGroup.get('possuiNecessidadeEspecial')?.value && !this.formGroup.get('necessidadesEspeciais')?.value.length) {
      this.adicionarCampoNecessidade();
      this.botaoNecessidadeClicado = true;
      return true;
    } else if (this.formGroup.get('possuiNecessidadeEspecial')?.value) {
      return true
    }
    this.botaoNecessidadeClicado = false;
    return false
  }

  adicionarCampoNecessidade(): void {
    const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
    formArray.push(this.criarCampoNecessidadeEspecial());
  }

  removerCampoNecessidade(index: number): void {
    const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
    formArray.removeAt(index);
  }

  getNecessidadesEspeciaisControls(): AbstractControl[] {
    const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
    return formArray.controls;
  }

  getNecessidadeEspecialControl(index: number): AbstractControl {
    const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
    return formArray.at(index)?.get('titulo') as AbstractControl;
  }

  adicionarCampoTutor(): void {
    const formArray = this.formGroup.get('tutor') as FormArray;
    formArray.push(this.createTutorFormGroup());
  }

  removerCampoTutor(index: number): void {
    const formArray = this.formGroup.get('tutor') as FormArray;
    formArray.removeAt(index);
  }

  getTutoresControls(): AbstractControl[] {
    const formArray = this.formGroup.get('tutor') as FormArray;
    return formArray.controls;
  }

  getTutorForm(index: number): FormGroup {
    const formArray = this.formGroup.get('tutor') as FormArray;
    return formArray.at(index) as FormGroup;
  }

  adicionarConjugue(index: number) {
    const formGroupTutor: FormGroup = this.getTutorForm(index);
    const tutorFormArray = this.formGroup.get('tutor') as FormArray;
    const tutorFormArrayLength = tutorFormArray.length;

    if (formGroupTutor.get('casado')?.value || formGroupTutor.get('moraComConjuge')?.value) {
      if (tutorFormArrayLength == 1) {
        this.adicionarCampoTutor();
        this.temConjugue = true;
      }
    } else {
      this.removerCampoTutor(1);
      this.temConjugue = false;
    }
    this.formDocumentos.patchValue({
      temconjugue: this.temConjugue
    });

  }

  atribuirRecebeBeneficioAoListDocsSim(){
    this.formDocumentos.patchValue({
      recebeBeneficio: "sim"
    });
  }
  atribuirRecebeBeneficioAoListDocsNao(){
    this.formDocumentos.patchValue({
      recebeBeneficio: "nao"
    });
  }

  atribuirConjugueRelacionamento() {
    const formGroupTutor: FormGroup = this.getTutorForm(0);
    const tutorFormArray = this.formGroup.get('tutor') as FormArray;
    const tutorFormArrayLength = tutorFormArray.length;
    if (tutorFormArrayLength > 1) {
      const formGroupConjugue: FormGroup = this.getTutorForm(1);
      formGroupConjugue.patchValue({
        relacionamento: formGroupTutor.get('casado')?.value,
        moraComConjuge: formGroupTutor.get('moraComConjuge')?.value,
      });
    }
  }

  receberDadosDoFilho(dados: { doc: File , tipoDocumento: EnumDoc}) {
    const docs = this.formDocumentos.get('listaDocumentos');
    if (dados.doc && docs) {
      const novosDocs = docs.value.slice();
      switch (dados.tipoDocumento) {
        case EnumDoc.FOTO_CRIANCA:
          novosDocs[0] = dados.doc;
          console.log("doc Filho: ", dados.doc);
          console.log("docs Lista: ", novosDocs);
          break;
        case EnumDoc.CERTIDAO_NASCIMENTO:
          novosDocs[1] = dados.doc;
          console.log("doc Filho: ", dados.doc);
          console.log("docs Lista: ", novosDocs);
          break;
        case EnumDoc.CPF_CRIANCA:
          novosDocs[2] = dados.doc;
          break;
        case EnumDoc.DOCUMENTO_VEICULO:
          novosDocs[3] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_ENDERECO:
          novosDocs[4] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_MORADIA:
          novosDocs[5] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_BOLSA_FAMILIA:
          novosDocs[6] = dados.doc;
          break;
        case EnumDoc.ENCAMINHAMENTO_CRAS:
          novosDocs[7] = dados.doc;
          break;
        case EnumDoc.CPF_TUTOR1:
          novosDocs[8] = dados.doc;
          break;
        case EnumDoc.CPF_TUTOR2:
          novosDocs[9] = dados.doc;
          break;
        case EnumDoc.CERTIDAO_ESTADO_CIVIL:
          novosDocs[10] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_TRABALHO_T1:
          novosDocs[11] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE1T1:
          novosDocs[12] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE2T1:
          novosDocs[13] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE3T1:
          novosDocs[14] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE1T2:
          novosDocs[15] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE2T2:
          novosDocs[16] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE3T2:
          novosDocs[17] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_TRABALHO_T2:
          novosDocs[18] = dados.doc;
          break;
        case EnumDoc.DECLARACAO_ESCOLART1:
          novosDocs[19] = dados.doc;
          break;
        case EnumDoc.DECLARACAO_ESCOLART2:
          novosDocs[20] = dados.doc;
          break;
        case EnumDoc.CERTIDAO_ESTADO_CIVIL2:
          novosDocs[21] = dados.doc;
          break;
        default:
      }
      this.formDocumentos.get('listaDocumentos')?.setValue(novosDocs);
    }
  }
  protected readonly EnumDoc = EnumDoc;


}
