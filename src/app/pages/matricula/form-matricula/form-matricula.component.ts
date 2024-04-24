import {AfterViewInit, Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MensagensUniversais} from "../../../../MensagensUniversais";
import {Validacoes} from "../../../../Validacoes";
import {DateAdapter} from "@angular/material/core";
import {UsuarioControllerService} from "../../../api/services/usuario-controller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {NecessidadeEspecialDto} from "../../../api/models/necessidade-especial-dto";
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {TutorDto} from "../../../api/models/tutor-dto";
import {DocumentoMatriculaDto} from "../../../api/models/documento-matricula-dto";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatriculaDto} from "../../../api/models/matricula-dto";
import {EnumDoc} from "../../../arquitetura/arquivo-viwer/EnumDoc";

@Component({
  selector: 'app-form-matricula',
  templateUrl: './form-matricula.component.html',
  styleUrls: ['./form-matricula.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FormMatriculaComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;


  formGroup!: FormGroup;
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
  admin!: boolean
  innerWidth: number = window.innerWidth;
  hide = true;
  submitFormulario!: boolean;
  parentescos: string[] = ['Mãe', 'Pai', 'Tio', 'Padrasto', 'Madrasta']; // Lista de opções de parentesco
  nomeTitulo: string = "Dados da Criança";
  guiaAtiva = 0;
  botaoNecessidadeClicado: boolean = false;
  enviado: boolean = false;
  docs: DocumentoMatriculaDto[] = []
  temConjugue: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
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
        documentoMatricula: this.docs,
        // declaro que li e concordo
        declaroLieConcordo: false
      }, {
        validator: [this.validacoes.validarRazaoSaida,
          this.validacoes.validarAluguel,
          this.validacoes.validarBeneficio,
          this.validacoes.validarFrequentou,
          this.validacoes.validarBeneficioMarcado,
          this.validacoes.validarDeclaroLiConcordo
        ]
      })
    }
  }

  private createTutorFormGroup(): FormGroup {
    return this.formBuilder.group({
      nomeTutor: [null, Validators.required],
      dataNascimentoTutor: [null, Validators.required],
      cpfTutor: [null, [Validators.required, this.validacoes.validarCpf]],
      vinculo: [null, Validators.required],
      telefoneCelular: [null, [Validators.required, this.validacoes.validarTelefone]],
      telefoneFixo: [null, this.validacoes.validarTelefoneFixo],
      nomeEmpresa: [null, Validators.required],
      cnpj: [null, [Validators.required, this.validacoes.validarCnpj]],
      telefoneCelularEmpresarial: [null, this.validacoes.validarTelefone],
      telefoneFixoEmpresarial: [null, this.validacoes.validarTelefoneFixo],
      relacionamento: false,
      moraComConjuge: false,
    }, {validator: this.validacoes.validarTelefonesEmpresariais})
  }


  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
  public handleErrorForm = (errorName: string) => {
    const formGroup = this.formGroup;
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
    if (this.codigo == null) {
      return;
    }
    //depois de salvar a matricula e pegar o id vamos setar nos doc e salvando eles
    console.log("Submit")

      this.docs.forEach(doc => {
          if (doc.idMatricula && doc.tipoDocumento && doc.arquivo) {
            console.log(doc.arquivo)
            this.matriculaService.matriculaControllerUploadDocumento(
              {idMatricula: doc.idMatricula, tipoDocumento: doc.tipoDocumento, body: {multipartFile: doc.arquivo}})
              .subscribe(retorno => {
                console.log(retorno)
              })
          }
        }
      )


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
    console.log("Dados:", this.formGroup.value);
    const matricula: MatriculaDto = this.formGroup.value;
    console.log("Matricula:", matricula);
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
      necessidadeEspecial: [null, Validators.required]
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
    return formArray.at(index)?.get('necessidadeEspecial') as AbstractControl;
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

    if (formGroupTutor.get('relacionamento')?.value || formGroupTutor.get('moraComConjuge')?.value) {
      if (tutorFormArrayLength == 1) {
        this.adicionarCampoTutor();
        this.temConjugue = true;
      }

    } else {
      this.removerCampoTutor(1);
      this.temConjugue = false;
    }
  }

  atribuirConjugueRelacionamento() {
    const formGroupTutor: FormGroup = this.getTutorForm(0);
    const tutorFormArray = this.formGroup.get('tutor') as FormArray;
    const tutorFormArrayLength = tutorFormArray.length;
    if (tutorFormArrayLength > 1) {
      const formGroupConjugue: FormGroup = this.getTutorForm(1);
      formGroupConjugue.patchValue({
        relacionamento: formGroupTutor.get('relacionamento')?.value,
        moraComConjuge: formGroupTutor.get('moraComConjuge')?.value,
      });
      // console.log(formGroupConjugue.value)
      // console.log(formGroupTutor.value)
      // console.log("tutor quantidade",tutorFormArrayLength)
    }
  }

  receberDadosDoFilho(dados: { doc: DocumentoMatriculaDto }) {
    if (dados.doc && this.docs) {
      switch (dados.doc.tipoDocumento) {
        case EnumDoc.FOTO_CRIANCA:
          this.docs[0] = dados.doc;
          console.log("doc Filho: ", dados.doc);
          console.log("docs Lista: ", this.docs);
          break;
        case EnumDoc.CERTIDAO_NASCIMENTO:
          this.docs[1] = dados.doc;
          console.log("doc Filho: ", dados.doc);
          console.log("docs Lista: ", this.docs);
          break;
        case EnumDoc.CPF_CRIANCA:
          this.docs[2] = dados.doc;
          break;
        case EnumDoc.DOCUMENTO_VEICULO:
          this.docs[3] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_ENDERECO:
          this.docs[4] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_MORADIA:
          this.docs[5] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_BOLSA_FAMILIA:
          this.docs[6] = dados.doc;
          break;
        case EnumDoc.ENCAMINHAMENTO_CRAS:
          this.docs[7] = dados.doc;
          break;
        case EnumDoc.CPF_TUTOR1:
          this.docs[8] = dados.doc;
          break;
        case EnumDoc.CPF_TUTOR2:
          this.docs[9] = dados.doc;
          break;
        case EnumDoc.CERTIDAO_ESTADO_CIVIL:
          this.docs[10] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_TRABALHO_T1:
          this.docs[11] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE1T1:
          this.docs[12] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE2T1:
          this.docs[13] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE3T1:
          this.docs[14] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE1T2:
          this.docs[15] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE2T2:
          this.docs[16] = dados.doc;
          break;
        case EnumDoc.CONTRA_CHEQUE3T2:
          this.docs[17] = dados.doc;
          break;
        case EnumDoc.COMPROVANTE_TRABALHO_T2:
          this.docs[18] = dados.doc;
          break;
        case EnumDoc.DECLARACAO_ESCOLART1:
          this.docs[19] = dados.doc;
          break;
        case EnumDoc.DECLARACAO_ESCOLART2:
          this.docs[20] = dados.doc;
          break;
        case EnumDoc.CERTIDAO_ESTADO_CIVIL2:
          this.docs[21] = dados.doc;
          break;
        default:

      }
    }
  }



  protected readonly EnumDoc = EnumDoc;
}
