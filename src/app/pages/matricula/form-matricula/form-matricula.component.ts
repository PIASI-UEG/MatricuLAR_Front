import {AfterViewInit, Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {Matricula} from "../../../custom_models/matricula";
import {NecessidadeEspecialDto} from "../../../api/models/necessidade-especial-dto";
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {TutorDto} from "../../../api/models/tutor-dto";
import {DocumentoMatriculaDto} from "../../../api/models/documento-matricula-dto";
import {MatriculaControllerService} from "../../../api/services/matricula-controller.service";

@Component({
  selector: 'app-form-matricula',
  templateUrl: './form-matricula.component.html',
  styleUrls: ['./form-matricula.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormMatriculaComponent implements OnInit{
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;


  formGroup!: FormGroup;
  currentStep: number = 1; // Controla a etapa atual
  public readonly ACAO_INCLUIR = "Cadastrar";
  public readonly ACAO_EDITAR = "Editar";
  acao: string = this.ACAO_INCLUIR;
  codigo!: number;
  mensagens: MensagensUniversais = new MensagensUniversais({dialog: this.dialog, router: this.router, telaAtual: 'matricula'})
  validacoes: Validacoes = new Validacoes();
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2008,0,0);
  flexDivAlinhar: string = 'row';
  admin!: boolean
  innerWidth: number = window.innerWidth;
  hide = true;
  submitFormulario!: boolean;
  parentescos: string[] = ['Mãe', 'Pai', 'Tio', 'Padrasto', 'Madrasta']; // Lista de opções de parentesco
  nomeTitulo : string = "Dados da Criança";
  guiaAtiva = 0;
  botaoNecessidadeClicado: boolean = false;
  enviado: boolean = false;
  docCertidaoNascNome: string = 'Escolha um arquivo';
  docs :DocumentoMatriculaDto[] = []
  enumDoc: String = ''


  constructor(
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private securityService: SecurityService,
    private matriculaService: MatriculaControllerService
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
    if(this.acao == "Editar"){

    }
    else{
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
        fotoCrianca: [null, Validators.required],
        certidaoNascimento: [null, Validators.required],
        cpfCriancaImage: [null, Validators.required],
        documentoVeiculo: [null],
        comprovanteEndereco: [null, Validators.required],
        comprovanteMoradia: [null, Validators.required],
        comprovanteBolsaFamilia: [null, Validators.required],
        comprovanteTrabalho: [null, Validators.required],
        comprovanteContracheque: [null, Validators.required],
        rgTutorImage: [null, Validators.required],
        cpfTutorImage: [null, Validators.required],
        comprovanteDeEstadoCivil: [null, Validators.required],
        encaminhamentoCras: [null, Validators.required],
        encaminhamentoConselhoTutelar: [null, Validators.required],
        declaracaoEscolar: [null, Validators.required]
      }, { validator: [this.validacoes.validarRazaoSaida,
                              this.validacoes.validarAluguel,
                              this.validacoes.validarBeneficio] })
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
    }, { validator: this.validacoes.validarTelefonesEmpresariais })
  }


  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
  public handleErrorForm = (errorName: string) => {
    const formGroup = this.formGroup;
    return formGroup.hasError(errorName);
  };

  public handleErrorTutor = (controlName: string, errorName: string, index: number) => {
    const formGroupTutor =this.getTutorForm(index)
    return formGroupTutor.controls[controlName].hasError(errorName);
  };

  public handleErrorFormTutor = (errorName: string, index: number) => {
    const formGroupTutor =this.getTutorForm(index);
    return formGroupTutor.hasError(errorName);
  };


  onSubmit() {
    this.enviado = true;

    this.submitFormulario = true;
    if (this.codigo == null) {
      return;
    }
    //depois de salvar a matricula e pegar o id vamos setar nos doc e salvando eles
    console.log("Submit")
    if (this.docs.length >= 0){
      this.docs.forEach(doc =>{
          if(doc.idMatricula && doc.tipoDocumento && doc.arquivo) {
            console.log(doc.arquivo)
            this.matriculaService.matriculaControllerUploadDocumento(
              {idMatricula: doc.idMatricula, tipoDocumento:doc.tipoDocumento, body:{multipartFile:doc.arquivo}})
              .subscribe(retorno =>{
                console.log(retorno)
              })
          }
        }
      )

    }

    if (this.codigo != null || this.formGroup.valid) {
      if(!this.codigo){
        this.atribuirConjugueRelacionamento();
        this.realizarInclusao();
      }else{
        this.realizarEdicao();
      }
    }
  }

  private realizarInclusao(){
    console.log("Dados:",this.formGroup.value);
  }


  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId){
      const codigo = parseInt(paramId);
      console.log("codigo pessoa",paramId);
    }
  }

  confirmarAcao(matricula: Matricula, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Cadastro!',
        mensagem: `Ação de ${acao} Nome: ${matricula.nome} (ID: ${matricula.numeroMatricula}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'Confirmar',
        },
      },
    });
  }

  private realizarEdicao(){
    console.log("Dados:", this.formGroup.value);
    this.router.navigate(["/matricula"]);
  }

  mudarAlinhar() {

    if(innerWidth < 1000)
    {
      return this.flexDivAlinhar = "column";
    }
    return this.flexDivAlinhar = "row";

  }

  verificarAlinhar(){
    if(this.flexDivAlinhar == "column"){
      return true;
    }
    return false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = window.innerWidth;
  }

  alterarNomeTitulo(indice:number): void{
    if (indice == 0) {
      this.nomeTitulo = "Dados da Criança"
    }
    else if (indice == 1){
      this.nomeTitulo = "Dados do Tutor(a)"
    }
    else if (indice == 2){
      this.nomeTitulo = "Perguntas Culturais"
    }
    else{
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
    }
    else if (this.formGroup.get('possuiNecessidadeEspecial')?.value && !this.formGroup.get('necessidadesEspeciais')?.value.length){
      this.adicionarCampoNecessidade();
      this.botaoNecessidadeClicado = true;
      return true;
    }
    else if (this.formGroup.get('possuiNecessidadeEspecial')?.value){
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

  onCheckboxChange(index: number) {
    const formGroupTutor: FormGroup = this.getTutorForm(index);
    const tutorFormArray = this.formGroup.get('tutor') as FormArray;
    const tutorFormArrayLength = tutorFormArray.length;

    if (formGroupTutor.get('relacionamento')?.value || formGroupTutor.get('moraComConjuge')?.value){
      if(tutorFormArrayLength == 1){
        this.adicionarCampoTutor();

      }
    }
    else {

        this.removerCampoTutor(1);
      }
  }

  atribuirConjugueRelacionamento(){
    const formGroupTutor: FormGroup = this.getTutorForm(0);
    const tutorFormArray = this.formGroup.get('tutor') as FormArray;
    const tutorFormArrayLength = tutorFormArray.length;
    if(tutorFormArrayLength > 1){
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




  // sempre que alguem adicionar um novo documento ele vai ser adicionado ao array de docs
  // esse idMatricula é so pra testes ele vai ser vazio
  onFilechange(event: any, enumDoc: 'FOTO_CRIANCA' | 'CERTIDAO_NASCIMENTO' | 'CPF_CRIANCA' | 'DOCUMENTO_VEICULO' | 'COMPROVANTE_ENDERECO' | 'COMPROVANTE_MORADIA' | 'COMPROVANTE_BOLSA_FAMILIA' | 'ENCAMINHAMENTO_CRAS' | 'CPF_TUTOR1' | 'CPF_TUTOR2' | 'CERTIDAO_ESTADO_CIVIL' | 'COMPROVANTE_TRABALHO_T1' | 'CONTRA_CHEQUE1T1' | 'CONTRA_CHEQUE2T1' | 'CONTRA_CHEQUE3T1' | 'CONTRA_CHEQUE1T2' | 'CONTRA_CHEQUE2T2' | 'CONTRA_CHEQUE3T2' | 'COMPROVANTE_TRABALHO_T2' | 'DECLARACAO_ESCOLART1' | 'DECLARACAO_ESCOLART2' | 'CERTIDAO_ESTADO_CIVIL2') {
    const file = event.target.files[0]
    const fileName = file.name
    console.log(file)
    let blob: Blob
    blob = file

    function diminuirTamanhoNomeArquivo() {
      if (fileName.length > 20) {
        const docCertidaoNascNome = fileName.substring(0, 20 - 3) + '...';
      }
    }

    diminuirTamanhoNomeArquivo();
    if(enumDoc ===  'CERTIDAO_NASCIMENTO'){
      this.docCertidaoNascNome = file.name;
    }


    let doc: DocumentoMatriculaDto = {
      aceito: false,
      idMatricula:1,
      tipoDocumento: enumDoc,
      caminhoDocumento: file.name,
      arquivo:blob
    }
    if (doc && this.docs){
      this.docs.push(doc)
      console.log("docs: ", this.docs)
    }

  }

  pegaDoc(){

    this.matriculaService.matriculaControllerGetDocumentoMatricula({caminhodoc:"FC1.pdf"})
      .subscribe(response =>{
        let blob:Blob = response
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'FC1.pdf';
        downloadLink.click()
      })

  }


}
