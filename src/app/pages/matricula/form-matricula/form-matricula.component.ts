import {Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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

  constructor(
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private securityService: SecurityService,
  ) {
    this._adapter.setLocale('pt-br');
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.createForm();
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
        cpfCrianca: [null, Validators.required],
        dataNascimento: [null, Validators.required],
        possuiNecessidadeEspecial: false,
        necessidadesEspeciais: this.formBuilder.array<NecessidadeEspecialDto>([]),
        cep: [null, Validators.required],
        cidade: [null, Validators.required],
        bairro: [null, Validators.required],
        logadouro: [null, Validators.required],
        complemento: [null, Validators.required],
        //Dados Tutor - Etapa2
        nomeTutor: [null, Validators.required],
        dataNascimentoTutor: [null, Validators.required],
        cpfTutor: [null, Validators.required],
        vinculo: [null, Validators.required],
        telefoneCelular: [null, Validators.required],
        telefoneFixo: [null],
        nomeEmpresa: [null, Validators.required],
        cnpj: [null, Validators.required],
        telefoneEmpresarial: [null, Validators.required],
        relacionamento: false,
        moraComConjuge: false,
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
      })

    }
  }



  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };




  onSubmit() {
    this.submitFormulario = true;
    if (this.codigo == null) {
      return;
    }

    if (this.codigo != null || this.formGroup.valid) {
      if(!this.codigo){
        this.realizarInclusao();
      }else{
        this.realizarEdicao();
      }
    }
  }

  private realizarInclusao(){
    console.log("Dados:",this.formGroup.value);
  }


  limparFormulario() {
    this.formGroup.reset(); // limpa os campos do formulario.
    this.formGroup.patchValue({
      usuarioId: this.securityService.getUserId()
    });
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = window.innerWidth;
  }

  getErrorClass(controlName: string): { [key: string]: any } | null {
    const control = this.formGroup.get(controlName);
    if (this.codigo == null) {
      if (this.submitFormulario && control && control.errors) {
        const qdErros = Object.keys(control.errors).length;

        return {
          'margin-top': 17 * qdErros + 'px'
        };
      }

      if (!this.submitFormulario && control && control.errors && control.touched) {
        const qdErros = Object.keys(control.errors).length;

        return {
          'margin-top': 17 * qdErros + 'px'
        };
      }
      this.submitFormulario = false;
      return {};
    } else {
      return {
        'margin-top': 17 * 1 + 'px'
      };
    }
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
      necessidadeEspecial: ''
    });
  }

  adicionarCampo(): void {
    const formArray = this.formGroup.get('necessidadesEspeciais') as FormArray;
    formArray.push(this.criarCampoNecessidadeEspecial());
  }

  removerCampo(index: number): void {
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


}
