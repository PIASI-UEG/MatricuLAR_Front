import {Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MensagensUniversais} from "../../../../MensagensUniversais";
import {Validacoes} from "../../../../Validacoes";
import {DateAdapter} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {NecessidadeEspecialDto} from "../../../api/models/necessidade-especial-dto";
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {TutorDto} from "../../../api/models/tutor-dto";
import {DocumentoMatriculaDto} from "../../../api/models/documento-matricula-dto";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatriculaDto} from "../../../api/models/matricula-dto";
import {EnumDoc, EnumDocDescriptions} from "../../../arquitetura/arquivo-viwer/EnumDoc";
import {
    ViwerDocumetDialogComponent
} from "../../../arquitetura/arquivo-viwer/viewer-documet-dialog/viwer-documet-dialog.component";
import {InformacoesMatriculaDto} from "../../../api/models/informacoes-matricula-dto";
import {ResponsavelDto} from "../../../api/models/responsavel-dto";
import {EnderecoDto} from "../../../api/models/endereco-dto";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatCheckbox} from "@angular/material/checkbox";
import {Subscription} from "rxjs";
import {DocumentoMatricula} from "./DocumentoMatricula";

import {ErrosDialogComponent} from "../../../core/erros-dialog/erros-dialog.component";
import {
    necessidadeEspecialControllerAlterar
} from "../../../api/fn/necessidade-especial-controller/necessidade-especial-controller-alterar";
import {TranslationField} from "../../../core/erros-dialog/TranslationFields";
import {TranslationError} from "../../../core/erros-dialog/TranslationErros";
import {ErrosForm} from "../../../core/erros-dialog/ErrosForm";
import {ErrosControl} from "../../../core/erros-dialog/ErrosControls";
import {AddAlunoTurmaDialogComponent} from "../../turma/add-aluno-turma-dialog/add-aluno-turma-dialog.component";

@Component({
    selector: 'app-form-matricula',
    templateUrl: './form-matricula.component.html',
    styleUrls: ['./form-matricula.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormMatriculaComponent implements OnInit {
    @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
    @ViewChild('aceiteInformacoes') aceiteInformacoes!: MatCheckbox;

    formGroup!: FormGroup;
    formDocumentos!: FormGroup;
    currentStep: number = 1; // Controla a etapa atual
    codigo!: number;
    mensagens: MensagensUniversais = new MensagensUniversais({
        dialog: this.dialog,
        router: this.router,
        telaAtual: 'matricula',
        securityService: this.securityService
    })
    validacoes: Validacoes = new Validacoes();
    minDate = new Date(1900, 0, 1);
    today = new Date();
    maxDate = new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate());
    minDateCrianca = new Date(this.today.getFullYear() - 5, this.today.getMonth(), this.today.getDate());
    maxDateCrianca = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());
    flexDivAlinhar: string = 'row';
    flexDivAlinharElementosGrandes: string = 'row';
    innerWidth: number = window.innerWidth;
    hide = true;
    parentescos: string[] = ['PAI', 'MAE', 'AVO', 'BISAVO', 'TIO', 'TIA']; // Lista de opções de parentesco
    nomeTitulo: string = "";
    guiaAtiva = 0;
    botaoNecessidadeClicado: boolean = false;
    enviado: boolean = false;
    marcado: boolean = false;
    // docs: File[] = [];
    temConjugue: boolean = false;
    conjugue: TutorDto | null = null;
    public readonly FORM_INCLUIR = "Cadastrar";
    public readonly FORM_VALIDACACAO = "Validar";
    public readonly FORM_EDITAR = "Editar";
    tipoDeFormulario: string = this.FORM_INCLUIR;
    colunasMostrar!: string[];
    protected readonly EnumDoc = EnumDoc;
    recebeBeneficio: string = "nao";
    listaDocumentosEditareValidar: DocumentoMatricula[] = [];
    show: boolean = true;
    documentosSelecionados: DocumentoMatriculaDto[] = [];
    mudouForm: boolean = true;
    formChangesSubscription!: Subscription;
    verificarClickDocs: boolean = false;
    public readonly NOME_GUIA_TAB_INFORMACOES = "Informações Gerais";
    public readonly NOME_GUIA_TAB_CRIANCA = "Dados da Criança";
    public readonly NOME_GUIA_TAB_TUTOR = "Dados dos Responsáveis Legais";
    public readonly NOME_GUIA_TAB_PERGUNTAS = "Perguntas Culturais";
    public readonly NOME_GUIA_TAB_DOCUMENTOS = "Anexar documentos";

    trnaslationFields: TranslationField[] = [
      {
        formName: this.NOME_GUIA_TAB_CRIANCA,
        aceiteInformacoes: "Aceitar as condições",
        nomeCrianca: "Nome da criança",
        cpfCrianca: "CPF da criança",
        dataNascimento: "Data de nascimento da criança",
        cep:"CEP",
        cidade: "Cidade",
        bairro: "Bairro",
        logradouro: "Logradouro",
        complemento: "Complemento do endereço",
        titulo: "Nome necessidade especial",
      },
      {
        formName: this.NOME_GUIA_TAB_TUTOR,
        nomeTutor: "Nome do responsável legal",
        dataNascimento: "Data de nascimento do responsável legal",
        cpf: "CPF do responsável legal",
        vinculo: "Vínculo do responsável legal",
        pessoaTelefone: "Telefone do responsável legal",
        telefoneReserva: "Telefone reserva do responsável legal",
        profissao: "Profissão do responsável legal",
        empresaNome: "Nome da empresa do responsável legal",
        empresaCnpj: "CNPJ da empresa do responsável legal",
        telefoneCelularEmpresarial: "Celular da empresa do responsável legal",
        telefoneFixoEmpresarial: "Telefone fixo da empresa do responsável legal",
        "tutor[0].0.nomeTutor": "Nome do responsável legal",
        "tutor[0].0.cpf": "CPF do responsável legal",
        "tutor[0].0.dataNascimento":"Data de nascimento do responsável legal",
        "tutor[0].0.vinculo": "Vínculo do responsável legal",
        "tutor[0].0.pessoaTelefone": "Telefone do responsável legal",
        "tutor[0].0.telefoneReserva": "Telefone reserva do responsável legal",
        "tutor[0].0.profissao": "Profissão do responsável legal",
        "tutor[0].0.empresaNome": "Nome da empresa do responsável legal",
        "tutor[0].0.empresaCnpj": "CNPJ da empresa do responsável legal",
        "tutor[0].0.telefoneCelularEmpresarial": "Celular da empresa do responsável legal",
        "tutor[0].0.telefoneFixoEmpresarial": "Telefone fixo da empresa do responsável legal",
        "tutor[1].1.nomeTutor": "Nome do cônjuge",
        "tutor[1].1.cpf": "CPF do cônjuge",
        "tutor[1].1.dataNascimento":"Data de nascimento do cônjuge",
        "tutor[1].1.vinculo": "Vínculo do cônjuge",
        "tutor[1].1.pessoaTelefone": "Telefone do cônjuge",
        "tutor[1].1.telefoneReserva": "Telefone reserva do cônjuge",
        "tutor[1].1.profissao": "Profissão do cônjuge",
        "tutor[1].1.empresaNome": "Nome da empresa do cônjuge",
        "tutor[1].1.empresaCnpj": "CNPJ da empresa do cônjuge",
        "tutor[1].1.telefoneCelularEmpresarial": "Celular da empresa do cônjuge",
        "tutor[1].1.telefoneFixoEmpresarial": "Telefone fixo da empresa do cônjuge",
      },
      {
        formName: this.NOME_GUIA_TAB_PERGUNTAS,
        frequentouOutraCreche: "Frequentou outra associação ou creche",
        razaoSaida: "Informe o motivo da criança sair",
        tipoResidencia: "Tipo de residência",
        valorAluguel: "Valor do aluguel",
        possuiBeneficiosDoGoverno: "Possui benefício",
        valorBeneficio: "Valor do benefício",
        possuiVeiculoProprio: "Possui veículo próprio",
        possuiCRAS: "Possui encaminhamento do CRAS",
        rendaFamiliar: "Renda familiar",
      },
      {
        formName: this.NOME_GUIA_TAB_DOCUMENTOS,
        declaroLieConcordo: "Aceitar as condições"
      }
    ]

  translationErros : TranslationError[] = [
    {
      formName: this.NOME_GUIA_TAB_INFORMACOES,
      aceiteAsInformacoes: "Marque que leu as informações iniciais."
    },
    {
      formName: this.NOME_GUIA_TAB_CRIANCA,
      required: "Campo obrigatório.",
      maxlength: "Quantidade máxima de caracteres ultrapassada.",
      cpfInvalido: "O CPF da criança é inválido",
      cpfsIguais: "O CPF da criança já foi utilizado em responsável legal ou cônjuge.",
      idadeInvalida: "A criança precisa ter entre 1 e 5 anos.",
      cepInvalido: "O CEP é inválido.",
      campoNaoPreenchido: "Desmarque a opção possui necessidades especiais ou preencha o campo para continuar.",
    },{
      formName: this.NOME_GUIA_TAB_TUTOR,
      required: "Campo obrigatório.",
      maxlength: "Quantidade máxima de caracteres ultrapassada.",
      cpfInvalido: "O CPF é inválido.",
      cpfsIguais: "O CPF já foi utilizado.",
      telefoneInvalido: "O telefone informado é inválido.",
      cnpjInvalido: "O CNPJ da empresa informado é inválido.",
      informeUmTelefoneEmpresarial: "Informe pelo menos um número de contato empresarial em responsável legal e(ou) cônjuge"
    },{
      formName: this.NOME_GUIA_TAB_PERGUNTAS,
      required: "Campo obrigatório.",
      informeRazaoSaida: "Escreva o motivo pelo qual a criança saiu da associação ou creche anterior.",
      informeValorAluguel: "Escreva o valor do aluguel pago atualmente.",
      informeValorBeneficio: "Escreva o valor do benefício recebido do governo.",
      informeValorFrequentou: "Marque uma opção em frequentou outra creche.",
      informeValorBeneficioGoverno: "Marque uma opção em recebe benefício do governo.",
      informePossuiVeiculoProprio: "Marque uma opção em possui veículo próprio.",
      informePossuiCRAS: "Marque uma opção em possui encaminhamento do CRAS.",
      maxlength: "Valor máximo de R$ 999.999,00"
    },{
      formName: this.NOME_GUIA_TAB_DOCUMENTOS,
      marqueLieConcordo: "Aceite os termos para finalizar.",
      insiraODocFoto: "Insira a foto da criança.",
      insiraODocCertidao: "Insira a certidão de nascimento da criança.",
      insiraODocCPFCrianca: "Insira o CPF da criança.",
      insiraODocCompEnd: "Insira o comprovante de endereço.",
      insiraODocCompMora: "Insira o comprovante de moradia.",
      insiraODocCPFTutor: "Insira o CPF do tutor.",
      insiraODocCPFConjugue: "Insira o CPF do cônjuge.",
      insiraODocEstadoCivil: "Insira a certidão de estado civil.",
      insiraCarteiraDeTrabalhoTutor: "Insira o certificado de trabalho do tutor.",
      insiraCarteiraDeTrabalhoConjugue: "Insira o certificado de trabalho do cônjuge.",
      insiraContraChequesTutor: "Informar os três últimos contracheques do tutor.",
      insiraContraChequesConjugue: "Informar os três últimos contracheques do cônjuge.",
      insiraDeclaracaoEscolarTutor: "Informar a declaração escolar do tutor.",
      insiraDeclaracaoEscolarConjugue: "Informar a declaração escolar do cônjuge.",
      recebeBeneficioGoverno: "Informar o comrpovante de benefício do governo.",
      possuiVeiculoProprio: "Informar o documento do veículo.",
      possuiCRAS: "Informar o encaminhamento do CRAS.",
    }
  ]

  constructor(
        private formBuilder: FormBuilder,
        private formBuilderDocs : FormBuilder,
        private _adapter: DateAdapter<any>,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private securityService: SecurityService,
        private matriculaService: MatriculaControllerService,
        private http:HttpClient
    ) {
        this._adapter.setLocale('pt-br');
    }

    ngOnInit() {
        this.innerWidth = window.innerWidth;
        this._adapter.setLocale('pt-br');


        this.createFormListaDocs();
        this.createForm();
        this.adicionarCampoTutor();
        this.tipoFormulario();
        this.prepararEdicao();
        this.alterarNomeTitulo(0);


        this.validacoes.formGroupMatricula = this.formGroup;
        this.validacoes.formGroupDocsList = this.formDocumentos;
        this.validacoes.tipoform = this.tipoDeFormulario;
        this.validacoes.securityservice = this.securityService;

      setTimeout(() => {
        this.monitorarMudancas()
      }, 500);
    }

    private createForm() {
        //Dados da Criança
        this.formGroup = this.formBuilder.group({
            aceiteInformacoes: [false, Validators.required],
            nomeCrianca: [null, [Validators.required, Validators.maxLength(200)]],
            cpfCrianca: [null, [Validators.required, this.validacoes.validarCpf, this.validacoes.validarIgualdadeCpf, Validators.maxLength(11)]],
            dataNascimento: [null, [Validators.required, this.validacoes.validarIdadeCrianca]],
            possuiNecessidadeEspecial: [false],
            necessidadesEspeciais: this.formBuilder.array<NecessidadeEspecialDto>([]),
            cep: [null, [Validators.required, this.validacoes.validarCep, Validators.maxLength(8)]],
            cidade: [null, [Validators.required, Validators.maxLength(250)]],
            bairro: [null, [Validators.required, Validators.maxLength(250)]],
            logradouro: [null, [Validators.required, Validators.maxLength(250)]],
            complemento: [null, [Validators.required, Validators.maxLength(250)]],
            //Dados Tutor - Etapa2
            tutor: this.formBuilder.array<TutorDto>([]),
            //Perguntas culturais - Etapa 3
            frequentouOutraCreche: [null],
            razaoSaida: [null,[Validators.maxLength(200)]],
            tipoResidencia: [null, Validators.required],
            valorAluguel: [null, Validators.maxLength(8)],
            possuiBeneficiosDoGoverno: [null],
            possuiVeiculoProprio: [null],
            possuiCRAS: [null],
            valorBeneficio: [null, Validators.maxLength(8)],
            rendaFamiliar: [null, [Validators.required, Validators.maxLength(8)]],
            //Documentos - Etapa 4
            // implementar anexar documentos no form
            // declaro que li e concordo
            declaroLieConcordo: false
        }, {
            validator: [
                this.validacoes.validarRazaoSaida,
                this.validacoes.validarAluguel,
                this.validacoes.validarBeneficio,
                this.validacoes.validarFrequentou,
                this.validacoes.validarBeneficioMarcado,
                this.validacoes.validarDeclaroLiConcordo,
                this.validacoes.validarVeiculoMarcado,
                this.validacoes.validarCRASMarcado,
                this.validacoes.validarInformacoesIniciais
            ]
        })
    }

    private createTutorFormGroup(conjugue: TutorDto | null): FormGroup {
        if(conjugue != null)
        {
            return this.formBuilder.group({
                nomeTutor: [conjugue.nomeTutor, [Validators.required, Validators.maxLength(200)]],
                //colocar
                dataNascimento: [conjugue.dataNascimento, Validators.required],
                cpf: [conjugue.cpf, [Validators.required, this.validacoes.validarCpf, this.validacoes.validarIgualdadeCpf, Validators.maxLength(11)]],
                vinculo: [conjugue.vinculo, Validators.required],
                pessoaTelefone: [conjugue.pessoaTelefone, [Validators.required, this.validacoes.validarTelefone, Validators.maxLength(11)]],
                telefoneReserva: [conjugue.telefoneReserva, [this.validacoes.validarTelefone, Validators.maxLength(11)]],
                profissao: [conjugue.profissao, [Validators.required, Validators.maxLength(50)]],
                empresaNome: [conjugue.empresaNome, [Validators.required, Validators.maxLength(100)]],
                empresaCnpj: [conjugue.empresaCnpj, [this.validacoes.validarCnpj, Validators.maxLength(14)]],
                telefoneCelularEmpresarial: [conjugue.telefoneCelularEmpresarial, [this.validacoes.validarTelefone, Validators.maxLength(11)]],
                //colocar
                telefoneFixoEmpresarial: [conjugue.telefoneFixoEmpresarial, [this.validacoes.validarTelefoneFixo, Validators.maxLength(10)]],
                casado: conjugue.casado,
                moraComConjuge: conjugue.moraComConjuge,
            }, {validator: this.validacoes.validarTelefonesEmpresariais})
        }else {
            return this.formBuilder.group({
                nomeTutor: [null, [Validators.required, Validators.maxLength(200)]],
                //colocar
                dataNascimento: [null, Validators.required],
                cpf: [null, [Validators.required, this.validacoes.validarCpf, this.validacoes.validarIgualdadeCpf, Validators.maxLength(11)]],
                vinculo: [null, Validators.required],
                pessoaTelefone: [null, [Validators.required, this.validacoes.validarTelefone, Validators.maxLength(11)]],
                telefoneReserva: [null, [this.validacoes.validarTelefone, Validators.maxLength(11)]],
                profissao: [null, [Validators.required, Validators.maxLength(50)]],
                empresaNome: [null, [Validators.required, Validators.maxLength(100)]],
                empresaCnpj: [null, [this.validacoes.validarCnpj, Validators.maxLength(14)]],
                telefoneCelularEmpresarial: [null, [this.validacoes.validarTelefone, Validators.maxLength(11)]],
                //colocar
                telefoneFixoEmpresarial: [null, [this.validacoes.validarTelefoneFixo, Validators.maxLength(10)]],
                casado: false,
                moraComConjuge: false,
            }, {validator: this.validacoes.validarTelefonesEmpresariais})
        }
  }

  private createFormListaDocs() {

    this.formDocumentos = this.formBuilder.group({
      listaDocumentos: [[],[]],
      temconjugue: false,
      recebeBeneficio: null,
      veiculoProprio: null,
      CRAS: null
    },{validator:
        [this.validacoes.validarFotoCrianca,
          this.validacoes.validarCertidao,
          this.validacoes.validarCPFTutor,
          this.validacoes.validarCPFConjugue,
          this.validacoes.valdiarComprovanteEndereco,
          this.validacoes.valdiarComprovanteMoradia,
          this.validacoes.validarCertidaoEstadoCivil,
          this.validacoes.validarCarteiraTrabalhoTutor,
          this.validacoes.validarCarteiraTrabalhoConjugue,
          this.validacoes.validarCarteiraContraChequeTutor,
          this.validacoes.validarCarteiraContraChequeConjugue,
          this.validacoes.validarDeclaracaoEscolarTutor,
          this.validacoes.validarDeclaracaoEscolarConjugue,
          this.validacoes.validarComprovanteBeneficio,
          this.validacoes.validarVeiculoDocs,
          this.validacoes.validarCRASDocs
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

    if (this.formGroup.valid && this.formDocumentos.valid) {
      this.atribuirConjugueRelacionamento();
      this.realizarInclusao();
    } else if (this.codigo){
      if (this.formGroup.valid) {
        this.atribuirConjugueRelacionamento();
        this.realizarEdicao();
      }
      else {
        const errosControls = this.getAllErrorsInControls();
        const errosFormsAll = this.getAllErrosInForms();

        const config: MatDialogConfig = {
          data: {
            errosControls: errosControls,
            errosForms: errosFormsAll,
            trnaslationfield: this.trnaslationFields,
            trnaslationerror: this.translationErros,
          }
        };
        const dialogRef = this.dialog.open(ErrosDialogComponent, config);

      }
    }
    else {
      const errosControls = this.getAllErrorsInControls();
      const errosFormsAll = this.getAllErrosInForms();

      const config: MatDialogConfig = {
        data: {
          errosControls: errosControls,
          errosForms: errosFormsAll,
          trnaslationfield: this.trnaslationFields,
          trnaslationerror: this.translationErros,
        }
      };
      const dialogRef = this.dialog.open(ErrosDialogComponent, config);

     }
  }

    private getAllErrosInForms() {
        let errosFormsDocumentos: ErrosForm[] = [];
        const errosFormsGeral = this.getFormFieldValidationErrors(this.formGroup);
        const errosFormsTutor = this.getFormFieldValidationErrors(this.getTutorForm(0));

        if (this.tipoDeFormulario === "Cadastrar") {
          errosFormsDocumentos = this.getFormFieldValidationErrors(this.formDocumentos);
        }

        let errosFormsAll = [...errosFormsGeral, ...errosFormsTutor, ...errosFormsDocumentos];

        if (this.temConjugue) {
            const errosFormsConjuge = this.getFormFieldValidationErrors(this.getTutorForm(1));
            errosFormsAll = [...errosFormsAll, ...errosFormsConjuge];
        }
        return errosFormsAll;
    }

    private getAllErrorsInControls() {
        const errosControls = this.getControlValidationErrors(this.formGroup);
        return errosControls;
    }

    uploadFiles(dto: any, files: File[]) {
        const formData: FormData = new FormData();

        formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

        files.forEach(file => {
            formData.append('files', file, file.name);
        });

        const token = this.securityService.credential.accessToken;
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return this.http.post<MatriculaDto>(`${this.matriculaService.rootUrl}/api/v1/matricula/inclusao-com-docs`, formData, { headers })
            .subscribe(retorno => {
                if (this.securityService.isValid()) {
                    this.router.navigate(['/matricula']);
                } else {
                    this.router.navigate(['/']);
                }
                this.confirmarAcao(retorno, this.tipoDeFormulario);
            }, error => {
                this.mensagens.confirmarErro(this.tipoDeFormulario, error);
            });
    }

  private realizarInclusao() {
    const docs = this.formDocumentos.get('listaDocumentos');
    const copiaDocs = docs?.value.slice();
    const matricula: MatriculaDto = this.makeDTOMatricula();

    for (let i = 0; i < copiaDocs.length; i++) {
      if (typeof copiaDocs[i] === 'undefined') {
        copiaDocs[i] = new File(["a"],"vazio.txt",{type: 'text/txt'});
      }
    }

    // console.log("Matricula:", matricula);
    // console.log("Dados:",this.formGroup.value);
    // console.log("doc", copiaDocs)

    this.uploadFiles(matricula, copiaDocs);
  }

  private realizarEdicao() {
    const matricula: MatriculaDto = this.makeDTOMatricula();
    console.log(matricula)
    this.matriculaService.matriculaControllerAlterar({id: this.codigo, body: matricula}).subscribe(retorno =>{
      if(this.verificarClickDocs) {
        this.verificarClickDocs = false;
      }
      else if (this.tipoDeFormulario == 'Editar'){
        this.router.navigate(["/matricula"]);
      }
      else if(this.tipoDeFormulario == 'Validar'){
        this.router.navigate(["/matricula/validar"]);
      }
      this.confirmarAcao(retorno, this.FORM_EDITAR);
    }, error => {
      this.mensagens.confirmarErro(this.tipoDeFormulario, error);
      console.log("erro", error)
      this.mudouForm = false
    });

  }

  private makeDTOMatricula(): MatriculaDto{

    const necessidadesEspeciaisArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
    let valoresNecessidadesEspeciais: NecessidadeEspecialDto[] = [];

    if (this.formGroup.get('possuiNecessidadeEspecial')?.value) {
      valoresNecessidadesEspeciais = necessidadesEspeciaisArray.value;
    } else {
      necessidadesEspeciaisArray.clear();
      valoresNecessidadesEspeciais = necessidadesEspeciaisArray.value;
    }

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
    const possuiCRAS = this.formGroup.get('possuiCRAS')?.value;
    const possuiVeiculoProprio = this.formGroup.get('possuiVeiculoProprio')?.value;
    const possuiEsteveOutraCreche = this.formGroup.get('frequentouOutraCreche')?.value;
    const tipoResidencia = this.formGroup.get('tipoResidencia')?.value;

    const infoMatricula: InformacoesMatriculaDto = {
      possuiBeneficiosDoGoverno: possuiBeneficiosDoGoverno === 'sim' ? true : false,
      frequentouOutraCreche: possuiEsteveOutraCreche === 'sim' ? true : false,
      razaoSaida: possuiEsteveOutraCreche === 'sim' ? this.formGroup.get('razaoSaida')?.value : null,
      rendaFamiliar: this.formGroup.get('rendaFamiliar')?.value,
      tipoResidencia: tipoResidencia,
      valorAluguel: tipoResidencia === 'alugado' ? this.formGroup.get('valorAluguel')?.value : null,
      valorBeneficio: possuiBeneficiosDoGoverno === 'sim' ? this.formGroup.get('valorBeneficio')?.value : null,
      possuiEcaminhamentoCRAS: possuiCRAS === 'sim' ? true : false,
      possuiVeiculoProprio: possuiVeiculoProprio === 'sim' ? true : false,
    }

    const endereco: EnderecoDto = {
      bairro: this.formGroup.get('bairro')?.value,
      cep: this.formGroup.get('cep')?.value,
      cidade: this.formGroup.get('cidade')?.value,
      complemento: this.formGroup.get('complemento')?.value,
      logradouro: this.formGroup.get('logradouro')?.value
    }

    let matriculaDtoPreenchido!: MatriculaDto;

    if(this.tipoDeFormulario === "Validar")
    {
      matriculaDtoPreenchido = {
        id: this.codigo,
        cpf: this.formGroup.get('cpfCrianca')?.value,
        endereco: endereco,
        informacoesMatricula: infoMatricula,
        nascimento:  this.formGroup.get('dataNascimento')?.value,
        necessidades: valoresNecessidadesEspeciais,
        nome: this.formGroup.get('nomeCrianca')?.value,
        responsaveis: responsaveis,
        tutorDTOList: valoresTutor
      };
    }
    else {
      matriculaDtoPreenchido = {
        cpf: this.formGroup.get('cpfCrianca')?.value,
        endereco: endereco,
        informacoesMatricula: infoMatricula,
        nascimento:  this.formGroup.get('dataNascimento')?.value,
        necessidades: valoresNecessidadesEspeciais,
        nome: this.formGroup.get('nomeCrianca')?.value,
        responsaveis: responsaveis,
        tutorDTOList: valoresTutor
      };
    }

    if(this.tipoDeFormulario === "Editar" || this.tipoDeFormulario === "Validar"){
      const listaDocumentos: DocumentoMatriculaDto[] = [];

      this.listaDocumentosEditareValidar.forEach(item => {
        if (!item.oculto) {
          listaDocumentos.push(item.documentoMatricula);
        }
      });



      matriculaDtoPreenchido.documentoMatricula = listaDocumentos;
    }

    return matriculaDtoPreenchido;
  }

    private prepararEdicao() {
        const paramId = this.route.snapshot.paramMap.get('id');
        if (paramId) {
            const codigo = parseInt(paramId);
            this.matriculaService.matriculaControllerObterPorId({ id: codigo }).subscribe(
                retorno => {
                    if (this.tipoDeFormulario != 'Validar') {
                        this.tipoDeFormulario = this.FORM_EDITAR;
                        this.colunasMostrar = ['Tipo'];
                    }

                    this.codigo = retorno.id || -1;

                    this.formGroup.patchValue({
                        nomeCrianca: retorno.nome,
                        cpfCrianca: retorno.cpf,
                        dataNascimento: new Date(retorno.nascimento+"T00:00"),
                        possuiNecessidadeEspecial: !!retorno.necessidades?.length,
                        necessidadesEspeciais: retorno.necessidades,
                        cep: retorno.endereco?.cep,
                        cidade: retorno.endereco?.cidade,
                        bairro: retorno.endereco?.bairro,
                        logradouro: retorno.endereco?.logradouro,
                        complemento: retorno.endereco?.complemento,
                        // Dados Tutor - Etapa 2
                        tutor: retorno.tutorDTOList,
                        // Perguntas culturais - Etapa 3
                        frequentouOutraCreche: retorno.informacoesMatricula?.frequentouOutraCreche === true ? 'sim' : 'nao',
                        razaoSaida: retorno.informacoesMatricula?.razaoSaida,
                        tipoResidencia: retorno.informacoesMatricula?.tipoResidencia,
                        valorAluguel: retorno.informacoesMatricula?.valorAluguel,
                        possuiBeneficiosDoGoverno: retorno.informacoesMatricula?.possuiBeneficiosDoGoverno === true ? 'sim' : 'nao',
                        possuiVeiculoProprio: retorno.informacoesMatricula?.possuiVeiculoProprio === true ? 'sim' : 'nao',
                        possuiCRAS: retorno.informacoesMatricula?.possuiEcaminhamentoCRAS === true ? 'sim' : 'nao',
                        valorBeneficio: retorno.informacoesMatricula?.valorBeneficio,
                        rendaFamiliar: retorno.informacoesMatricula?.rendaFamiliar,
                    });

                    retorno.necessidades?.forEach((necessidadeEspecial: any, index: number) => {
                        this.adicionarCampoNecessidade(necessidadeEspecial);
                    });

                    retorno.tutorDTOList?.forEach((tutor: any, index: number) => {
                        if (index === 0 && retorno.responsaveis) {
                            tutor.vinculo = retorno.responsaveis[index].vinculo;
                            tutor.dataNascimento = new Date(tutor.dataNascimento+"T00:00")
                            const tutorControl = this.getTutorForm(index);
                            tutorControl.patchValue(tutor);
                            console.log("TuTOR 1", tutor);
                        } else if (index === 1 && retorno.responsaveis) {
                            tutor.vinculo = retorno.responsaveis[index].vinculo;
                            this.conjugue = tutor;
                            this.adicionarConjugue(0, this.conjugue);
                        }
                    });

                    if (retorno.documentoMatricula) {
                        this.listaDocumentosEditareValidar = retorno.documentoMatricula.map((documento: DocumentoMatriculaDto) => ({
                            documentoMatricula: documento,
                            oculto: false
                        }));
                        this.ordenarLista();
                        console.log(this.listaDocumentosEditareValidar);
                    }
                },
                error => {
                    this.mensagens.confirmarErro(this.FORM_EDITAR, error.message);
                    console.log("erro", error);
                }
            );
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

  securityServiceisValid(){
    return this.securityService.isValid()
  }

  alterarNomeTitulo(indice: number): void {
    if (this.tipoDeFormulario === 'Cadastrar' && !this.securityService.isValid()) {
      // Mapeamento para o modo "Cadastrar"
      if (indice === 0) {
        this.nomeTitulo = this.NOME_GUIA_TAB_INFORMACOES;
      } else if (indice === 1) {
        this.nomeTitulo = this.NOME_GUIA_TAB_CRIANCA;
      } else if (indice === 2) {
        this.nomeTitulo = this.NOME_GUIA_TAB_TUTOR;
      } else if (indice === 3) {
        this.nomeTitulo = this.NOME_GUIA_TAB_PERGUNTAS;
      } else {
        this.nomeTitulo = this.NOME_GUIA_TAB_DOCUMENTOS;
      }
    } else {
      // Mapeamento para os modos "Editar" e "Validar"
      if (indice === 0) {
        this.nomeTitulo = this.NOME_GUIA_TAB_CRIANCA;
      } else if (indice === 1) {
        this.nomeTitulo = this.NOME_GUIA_TAB_TUTOR;
      } else if (indice === 2) {
        this.nomeTitulo = this.NOME_GUIA_TAB_PERGUNTAS;
      } else {
        this.nomeTitulo = this.NOME_GUIA_TAB_DOCUMENTOS;
      }
    }
  }

  alterarGuiaAtiva(indice: number): void {
    this.guiaAtiva = indice;
  }

  onTabClick(event: MatTabChangeEvent): void {
    if ((event.index === 3 && this.mudouForm) && (this.tipoDeFormulario === "Editar" || this.tipoDeFormulario === "Validar")) {
      this.confirmarMudancas();
    }
    this.alterarNomeTitulo(event.index);
  }

  goToStep(step: number) {
    // Método para navegar para uma etapa específica
    this.currentStep = step;
  }

  goToNextStep(indice: number) {


    if(this.nomeTitulo == this.NOME_GUIA_TAB_INFORMACOES && this.formGroup.get("aceiteInformacoes")?.value === false  && !this.securityService.isValid())
    {
        const errosControls = this.getAllErrorsInControls();
        const errosFormsAll = this.getAllErrosInForms();

        const config: MatDialogConfig = {
            data: {
                errosControls: errosControls,
                errosForms: errosFormsAll,
                trnaslationfield: this.trnaslationFields,
                trnaslationerror: this.translationErros,
                formName: this.NOME_GUIA_TAB_INFORMACOES
            }
        };
        const dialogRef = this.dialog.open(ErrosDialogComponent, config);

      return;
    } else if ((this.verificaErroNecessidadeEspecial() ||
              this.formGroup.get("nomeCrianca")?.invalid ||
              this.formGroup.get("cpfCrianca")?.invalid ||
              this.formGroup.get("dataNascimento")?.invalid ||
              this.formGroup.get("cep")?.invalid ||
              this.formGroup.get("cidade")?.invalid ||
              this.formGroup.get("bairro")?.invalid ||
              this.formGroup.get("logradouro")?.invalid ||
              this.formGroup.get("complemento")?.invalid) &&
              (this.nomeTitulo == this.NOME_GUIA_TAB_CRIANCA  && !this.securityService.isValid()))
    {
        const errosControls = this.getAllErrorsInControls();
        const errosFormsAll = this.getAllErrosInForms();

        const config: MatDialogConfig = {
            data: {
                errosControls: errosControls,
                errosForms: errosFormsAll,
                trnaslationfield: this.trnaslationFields,
                trnaslationerror: this.translationErros,
                formName: this.NOME_GUIA_TAB_CRIANCA
            }
        };
        const dialogRef = this.dialog.open(ErrosDialogComponent, config);

        return;
    } else if(this.verificarErrosEmFormArrayTutor() &&
              this.nomeTitulo == this.NOME_GUIA_TAB_TUTOR  && !this.securityService.isValid()) {
          const errosControls = this.getAllErrorsInControls();
          const errosFormsAll = this.getAllErrosInForms();

          const config: MatDialogConfig = {
              data: {
                  errosControls: errosControls,
                  errosForms: errosFormsAll,
                  trnaslationfield: this.trnaslationFields,
                  trnaslationerror: this.translationErros,
                  formName: this.NOME_GUIA_TAB_TUTOR
              }
          };
          const dialogRef = this.dialog.open(ErrosDialogComponent, config);

          return;

      } else  if ((this.formGroup.get("tipoResidencia")?.invalid ||
            this.formGroup.get("razaoSaida")?.invalid ||
            this.formGroup.get("rendaFamiliar")?.invalid ||
            this.formGroup.hasError("informeRazaoSaida") ||
            this.formGroup.hasError("informeValorAluguel") ||
            this.formGroup.hasError("informeValorBeneficio") ||
            this.formGroup.hasError("informePossuiVeiculoProprio") ||
            this.formGroup.hasError("informeValorFrequentou") ||
            this.formGroup.hasError("informeValorBeneficioGoverno") ||
            this.formGroup.hasError("informePossuiCRAS") ) &&
            (this.nomeTitulo == this.NOME_GUIA_TAB_PERGUNTAS  && !this.securityService.isValid())) {

        const errosControls = this.getAllErrorsInControls();
        const errosFormsAll = this.getAllErrosInForms();

        const config: MatDialogConfig = {
            data: {
                errosControls: errosControls,
                errosForms: errosFormsAll,
                trnaslationfield: this.trnaslationFields,
                trnaslationerror: this.translationErros,
                formName: this.NOME_GUIA_TAB_PERGUNTAS
            }
        };
        const dialogRef = this.dialog.open(ErrosDialogComponent, config);

        return;
    }
    console.log("TIPO FORM", this.tipoDeFormulario);
    console.log("MUDOU FORM", this.mudouForm);
    if ((indice === 3 && this.mudouForm) && (this.tipoDeFormulario === "Editar" || this.tipoDeFormulario === "Validar")) {
      this.confirmarMudancas();
    }
    else{
      if (indice >= 0 && indice < this.tabGroup._tabs.length) {
        this.tabGroup.selectedIndex = indice;
      }
    }

    this.alterarNomeTitulo(indice)
  }

    private verificarErrosEmFormArrayTutor() {
        const formGroup = this.getTutorForm(0);
        let temErro = false;
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);

            if (control && control.invalid) {
                temErro = true
            }
        });

        if(formGroup.invalid)
        {
            temErro = true
        }

        if (this.temConjugue) {
            const formGroup = this.getTutorForm(1);
            Object.keys(formGroup.controls).forEach(key => {
                const control = formGroup.get(key);

                if (control && control.invalid) {
                    temErro = true
                }
            });

            if(formGroup.invalid)
            {
                temErro = true
            }
        }

        return temErro;
    }

    private verificaErroNecessidadeEspecial() {
        const controls = this.getNecessidadesEspeciaisControls();
        let temErrosNecessidade = false;
        controls.forEach(control => {
            if (control.errors && Object.keys(control.errors).length > 0) {
                temErrosNecessidade = true;
            }
        });
        return temErrosNecessidade;
    }

    goToPreviousStep(indice: number) {

    if (indice >= 0 && indice < this.tabGroup._tabs.length) {
      this.tabGroup.selectedIndex = indice;
    }
    this.alterarNomeTitulo(indice)
  }

  monitorarMudancas(): void {

    if (this.tipoDeFormulario === "Editar" || this.tipoDeFormulario === "Validar") {

      if (this.formChangesSubscription) {
        this.formChangesSubscription.unsubscribe();
      }

      setTimeout(() => {
        const initialFormValue = this.formGroup.getRawValue();

        this.formChangesSubscription = this.formGroup.valueChanges.subscribe(() => {
          const currentFormValue = this.formGroup.getRawValue();
          this.mudouForm = !this.areFormsEqual(initialFormValue, currentFormValue);
        });
      }, 1000);
    }
    this.mudouForm = false;
  }

  areFormsEqual(form1: any, form2: any): boolean {
    return JSON.stringify(form1) === JSON.stringify(form2);
  }

  confirmarMudancas(){
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar Alterações',
        mensagem: 'Para editar os documentos\né necessário salvar\nas alterações feitas\nnos formulários.\nDeseja salvar agora?',
        textoBotoes: {
          ok: 'Sim',
          cancel: 'Não',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        if(this.formGroup.valid){
          this.verificarClickDocs = true;
          this.realizarEdicao();
          this.monitorarMudancas();
        } else {
          const errosControls = this.getAllErrorsInControls();
          const errosFormsAll = this.getAllErrosInForms();

          const config: MatDialogConfig = {
            data: {
              errosControls: errosControls,
              errosForms: errosFormsAll,
              trnaslationfield: this.trnaslationFields,
              trnaslationerror: this.translationErros,
            }
          };
          const dialogRef = this.dialog.open(ErrosDialogComponent, config);
          this.tabGroup.selectedIndex = 2;

        }
      }else {
        this.tabGroup.selectedIndex = 2;
      }
    });
  }

  criarCampoNecessidadeEspecial(): FormGroup {
    return this.formBuilder.group({
      titulo: [null, [this.validacoes.validarNecessidadeEspecial, Validators.maxLength(50)]]
    });
  }

  adicionarNecessidadePreenchido(necessidade: NecessidadeEspecialDto): FormGroup {
    return this.formBuilder.group({
      titulo: [necessidade.titulo, [this.validacoes.validarNecessidadeEspecial, Validators.maxLength(50)]]
    });
  }

  firstClickNecessidades(): boolean {
    const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
    const possuiNecessidadeEspecial = this.formGroup.get('possuiNecessidadeEspecial')?.value;

    if (possuiNecessidadeEspecial) {
      if (formArray.length === 0) {
        this.adicionarCampoNecessidade(null);
        this.botaoNecessidadeClicado = true;
        return true;
      } else {
        return true;
      }
    } else {
      formArray.controls.forEach((control, index) => {
        this.clearNecessidadeEspecialError(index);
      });
      this.botaoNecessidadeClicado = false;
      formArray.updateValueAndValidity();
      return false;
    }

  }

  clearNecessidadeEspecialError(index: number): void {
    const control = this.getNecessidadeEspecialControl(index);
    if (control) {
      control.setErrors(null);
    }
  }


  adicionarCampoNecessidade(necessidade: NecessidadeEspecialDto | null): void {
    const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
    if(necessidade != null)
    {
      formArray.push(this.adicionarNecessidadePreenchido(necessidade))
    } else {
      formArray.push(this.criarCampoNecessidadeEspecial());
    }
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
    formArray.push(this.createTutorFormGroup(null));
  }

  adicionarCampoTutorPreenchido(tutor: TutorDto): void {
    const formArray = this.formGroup.get('tutor') as FormArray;
    formArray.push(this.createTutorFormGroup(tutor));
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

  adicionarConjugue(index: number, conjugue: TutorDto | null) {
    const formGroupTutor: FormGroup = this.getTutorForm(index);
    const tutorFormArray = this.formGroup.get('tutor') as FormArray;
    const tutorFormArrayLength = tutorFormArray.length;

    if (formGroupTutor.get('casado')?.value || formGroupTutor.get('moraComConjuge')?.value) {

      if (tutorFormArrayLength == 1) {
        if(conjugue!= null)
        {
          this.adicionarCampoTutorPreenchido(conjugue);
          this.temConjugue = true;
          this.atualizarTabela(EnumDoc.CPF_TUTOR2);
          this.atualizarTabela(EnumDoc.DECLARACAO_ESCOLART2);
          this.atualizarTabela(EnumDoc.COMPROVANTE_TRABALHO_T2);
          this.atualizarTabela(EnumDoc.CONTRA_CHEQUE1T2);
          this.atualizarTabela(EnumDoc.CONTRA_CHEQUE2T2);
          this.atualizarTabela(EnumDoc.CONTRA_CHEQUE3T2);
        }else{
          this.adicionarCampoTutor();
          if(this.tipoDeFormulario == 'Validar' || this.tipoDeFormulario == 'Editar'){
            this.atualizarTabela(EnumDoc.CPF_TUTOR2);
            this.atualizarTabela(EnumDoc.DECLARACAO_ESCOLART2);
            this.atualizarTabela(EnumDoc.COMPROVANTE_TRABALHO_T2);
            this.atualizarTabela(EnumDoc.CONTRA_CHEQUE1T2);
            this.atualizarTabela(EnumDoc.CONTRA_CHEQUE2T2);
            this.atualizarTabela(EnumDoc.CONTRA_CHEQUE3T2);
          }
          this.temConjugue = true;
        }
      }
    } else {
      this.removerCampoTutor(1);
      this.removerDaTabela(EnumDoc.CPF_TUTOR2);
      this.removerDaTabela(EnumDoc.DECLARACAO_ESCOLART2);
      this.removerDaTabela(EnumDoc.COMPROVANTE_TRABALHO_T2);
      this.removerDaTabela(EnumDoc.CONTRA_CHEQUE1T2);
      this.removerDaTabela(EnumDoc.CONTRA_CHEQUE2T2);
      this.removerDaTabela(EnumDoc.CONTRA_CHEQUE3T2);

      this.temConjugue = false;
    }
    this.formDocumentos.patchValue({
      temconjugue: this.temConjugue
    });

  }

  atribuirRecebeBeneficioAoListDocsSim(){
    this.recebeBeneficio = "sim";
    if(this.tipoDeFormulario == "Cadastrar")
    {
      this.formDocumentos.patchValue({
        recebeBeneficio: "sim"
      });
    }
    else{
      this.atualizarTabela(EnumDoc.COMPROVANTE_BOLSA_FAMILIA);
    }
  }

  atribuirRecebeBeneficioAoListDocsNao(){
    this.recebeBeneficio = "nao";
    if(this.tipoDeFormulario == "Cadastrar") {
      this.formDocumentos.patchValue({
        recebeBeneficio: "nao"
      });
    }else {
      this.removerDaTabela(EnumDoc.COMPROVANTE_BOLSA_FAMILIA);
    }
  }

  atribuirVeiculoAoListDocsSim(){
    if(this.tipoDeFormulario == "Cadastrar") {
      this.formDocumentos.patchValue({
        veiculoProprio: "sim"
      });
    }else {
      this.atualizarTabela(EnumDoc.DOCUMENTO_VEICULO);
    }
  }
  atribuirVeiculoAoListDocsNao(){
    if(this.tipoDeFormulario == "Cadastrar") {
      this.formDocumentos.patchValue({
        veiculoProprio: "nao"
      });
    }else {
      this.removerDaTabela(EnumDoc.DOCUMENTO_VEICULO);
    }
  }

  atribuirCRASAoListDocsSim(){
    if(this.tipoDeFormulario == "Cadastrar") {
      this.formDocumentos.patchValue({
        CRAS: "sim"
      });
    }else {
      this.atualizarTabela(EnumDoc.ENCAMINHAMENTO_CRAS);
    }
  }
  atribuirCRASAoListDocsNao(){
    if(this.tipoDeFormulario == "Cadastrar") {
      this.formDocumentos.patchValue({
        CRAS: "nao"
      });
    }else {
      this.removerDaTabela(EnumDoc.ENCAMINHAMENTO_CRAS);
    }
  }

  private criarDocumentoList(tipo: EnumDoc) {
    const documento: DocumentoMatriculaDto = {
      tipoDocumento: tipo,
      idMatricula: this.codigo,
      aceito: false,
    };

    const documentoMatricula: DocumentoMatricula = {
      documentoMatricula: documento,
      oculto: false
    }

    return documentoMatricula;
  }

  atualizarTabela(tipo: EnumDoc) {
    this.show = false;

    const documentoExistenteIndex = this.listaDocumentosEditareValidar.findIndex(documento => documento.documentoMatricula.tipoDocumento === tipo);

    if (documentoExistenteIndex !== -1) {
      this.listaDocumentosEditareValidar[documentoExistenteIndex].oculto = false;
    } else {
      const novoDocumento = this.criarDocumentoList(tipo);
      this.listaDocumentosEditareValidar.push(novoDocumento);
    }
    console.log(this.listaDocumentosEditareValidar)
    setTimeout(() => {
      this.ordenarLista();
      this.show = true;
    }, 150);
  }

  removerDaTabela(tipo: string) {
    this.show = false;

    this.listaDocumentosEditareValidar.forEach(documento => {
      if (documento.documentoMatricula.tipoDocumento === tipo) {
        documento.oculto = true;
      }
    });

    console.log(this.listaDocumentosEditareValidar)

    setTimeout(() => {
      this.ordenarLista();
      this.show = true;
    }, 150);
  }

  atribuirConjugueRelacionamento() {
    const formGroupTutor: FormGroup = this.getTutorForm(0);
    const tutorFormArray = this.formGroup.get('tutor') as FormArray;
    const tutorFormArrayLength = tutorFormArray.length;
    if (tutorFormArrayLength > 1) {
      const formGroupConjugue: FormGroup = this.getTutorForm(1);
      formGroupConjugue.patchValue({
        casado: formGroupTutor.get('casado')?.value,
        moraComConjuge: formGroupTutor.get('moraComConjuge')?.value,
      });
    }
  }

  //lista de documentos que vem do outro componente
  receberDadosDoFilho(dados: { doc: File , tipoDocumento: EnumDoc}) {
    const docs = this.formDocumentos.get('listaDocumentos');
    if (dados.doc && docs) {
      const novosDocs = docs.value.slice();
      switch (dados.tipoDocumento) {
        case EnumDoc.FOTO_CRIANCA:
          novosDocs[0] = dados.doc;
          break;
        case EnumDoc.CERTIDAO_NASCIMENTO:
          novosDocs[1] = dados.doc;
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
        default:
      }
      console.log(novosDocs)
      this.formDocumentos.get('listaDocumentos')?.setValue(novosDocs);
    }
  }


  private tipoFormulario() {
    const param = this.route.snapshot.url.at(0)?.path;
    if(param == "validar"){
      this.tipoDeFormulario = this.FORM_VALIDACACAO;
      this.colunasMostrar = ['Aceite','Tipo'];
    }
  }

  openDialogPreviewExpanded(element: DocumentoMatriculaDto){
    const config: MatDialogConfig = {
      data: {
        documentoEditarValidar: element,
        matriculaService: this.matriculaService,
        tipoDeFormulario: this.tipoDeFormulario,
        listaDocumentos: this.listaDocumentosEditareValidar
      }
    };
    const dialogRef = this.dialog.open(ViwerDocumetDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.documentosSelecionados.push(element)
      }
    });
  }

  isSelected(element: any): boolean {
    return this.documentosSelecionados.includes(element);
  }

  getEnumNames(docName: string): string | undefined {
    const enumKey = EnumDoc[docName as keyof typeof EnumDoc];
    return EnumDocDescriptions[enumKey];
  }

  ordenarLista(): void {
        this.listaDocumentosEditareValidar = this.listaDocumentosEditareValidar
            .filter(doc => doc.documentoMatricula.tipoDocumento !== undefined)
            .sort((a, b) => a.documentoMatricula.tipoDocumento!.localeCompare(b.documentoMatricula.tipoDocumento!));
  }

  onAceitoChange(element: any) {
    const documento = this.listaDocumentosEditareValidar.find(doc => doc.documentoMatricula.tipoDocumento === element.documentoMatricula.tipoDocumento);
    if (documento) {
      documento.documentoMatricula.aceito = !documento.documentoMatricula.aceito;
    }
  }

    buscarCEP(cep: string) {
        this.http.get<any>(`https://brasilapi.com.br/api/cep/v1/${cep}`)
            .subscribe(
                (data) => {
                    const cidadeControl = this.formGroup.get('cidade');
                    const bairroControl = this.formGroup.get('bairro');
                    const logradouroControl = this.formGroup.get('logradouro');

                    if (cidadeControl && bairroControl && logradouroControl) {
                        cidadeControl.setValue(data.city);
                        bairroControl.setValue(data.neighborhood);
                        logradouroControl.setValue(data.street);
                    } else {
                        console.error('Um ou mais controles do formulário são nulos.');
                    }
                },
                (error) => {
                    console.error('Erro ao buscar CEP:', error);
                }
            );
    }

    getControlValidationErrors(form: FormGroup): ErrosControl[] {
        const result: ErrosControl[] = [];

        const recursiveGetErrors = (controls: { [key: string]: AbstractControl }, parentKey: string = '') => {
            Object.keys(controls).forEach(key => {
                const control = controls[key];
                let fullKey: string;
                if(key == "titulo")
                {
                  fullKey = parentKey ? `${key}` : key; // Constrói a chave completa
                }
                else{
                  fullKey = parentKey ? `${parentKey}.${key}` : key; // Constrói a chave completa
                }


                if (control instanceof FormGroup) {
                    recursiveGetErrors(control.controls, fullKey);
                } else if (control instanceof FormArray) {
                    if (key === 'necessidadesEspeciais') {
                        control.controls.forEach((ctrl, index) => {
                            // Para o FormArray 'necessidadesEspeciais', utilize uma lógica especial
                            recursiveGetErrors({ [index]: ctrl });
                        });
                    } else {
                        control.controls.forEach((ctrl, index) => {
                            recursiveGetErrors({ [index]: ctrl }, `${fullKey}[${index}]`);
                        });
                    }
                } else if (control.errors) {
                    Object.keys(control.errors).forEach(errorKey => {
                        result.push({ fieldName: fullKey, erros: errorKey });
                    });
                }
            });
        };

        recursiveGetErrors(form.controls);
        return result;
    }


  getFormFieldValidationErrors(form: FormGroup): ErrosForm[] {
    const result: ErrosForm[] = [];
    const formErrors = form.errors;

    if (formErrors) {
      Object.keys(formErrors).forEach(errorKey => {
        result.push({ erros: errorKey });
      });
    }

    return result;
  }

  validar(){
    const matriculaDTO = this.makeDTOMatricula();
    console.log("COMPLETO", matriculaDTO)
    console.log(matriculaDTO.documentoMatricula)
    this.matriculaService.matriculaControllerValidaMatricula({body: matriculaDTO}).subscribe(retorno => {
      const dialogRef = this.dialog.open(AddAlunoTurmaDialogComponent,
        {
          data:
            {
              id: retorno.id,
            }
        })
      dialogRef.afterClosed().subscribe((confirmed: AddAlunoTurmaDialogComponent) => {
          if(confirmed){
            this.confirmarAcao(retorno, "Incluir na turma e validar")
          }
          else{
            this.confirmarAcao(retorno, this.tipoDeFormulario)
          }
          this.router.navigate(['/matricula/validar']);
      }
      )
    }, error => {
      this.mensagens.confirmarErro(this.tipoDeFormulario, error);
    });

  }

}
