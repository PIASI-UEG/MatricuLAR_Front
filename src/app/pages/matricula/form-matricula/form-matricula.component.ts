import {Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MensagensUniversais} from "../../../../MensagensUniversais";
import {Validacoes} from "../../../../Validacoes";
import {DateAdapter} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {NecessidadeEspecialDto} from "../../../api/models/necessidade-especial-dto";
import {MatTabGroup} from "@angular/material/tabs";
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
    maxDate = new Date(2008, 0, 0);
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
    listaDocumentosEditareValidar: DocumentoMatriculaDto[] = [];
    show: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private formBuilderDocs : FormBuilder,
        private _adapter: DateAdapter<any>,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private securityService: SecurityService,
        private matriculaService: MatriculaControllerService,
        private sanitizer: DomSanitizer,
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

        this.validacoes.formGroupMatricula = this.formGroup;
        this.validacoes.formGroupDocsList = this.formDocumentos;
    }

    private createForm() {
        //Dados da Criança
        this.formGroup = this.formBuilder.group({
            aceiteInformacoes: [false, Validators.required],
            nomeCrianca: [null, Validators.required],
            cpfCrianca: [null, [Validators.required, this.validacoes.validarCpf, this.validacoes.validarIgualdadeCpf]],
            dataNascimento: [null, [Validators.required, this.validacoes.validarIdadeCrianca]],
            possuiNecessidadeEspecial: [false],
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
            possuiVeiculoProprio: [null, Validators.required],
            possuiCRAS: [null, Validators.required],
            valorBeneficio: [null],
            rendaFamiliar: [null, [Validators.required, this.validacoes.validarRenda]],
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
                this.validacoes.validarVeiculoMarcado,
                this.validacoes.validarCRASMarcado
            ]
        })
    }

    private createTutorFormGroup(conjugue: TutorDto | null): FormGroup {
        if(conjugue != null)
        {
            return this.formBuilder.group({
                nomeTutor: [conjugue.nomeTutor, Validators.required],
                //colocar
                dataNascimento: [conjugue.dataNascimento, Validators.required],
                cpf: [conjugue.cpf, [Validators.required, this.validacoes.validarCpf, this.validacoes.validarIgualdadeCpf]],
                vinculo: [conjugue.vinculo, Validators.required],
                pessoaTelefone: [conjugue.pessoaTelefone, [Validators.required, this.validacoes.validarTelefone]],
                telefoneReserva: [conjugue.telefoneReserva, this.validacoes.validarTelefone],
                profissao: [conjugue.profissao, Validators.required],
                empresaNome: [conjugue.empresaNome, Validators.required],
                empresaCnpj: [conjugue.empresaCnpj, this.validacoes.validarCnpj],
                telefoneCelularEmpresarial: [conjugue.telefoneCelularEmpresarial, this.validacoes.validarTelefone],
                //colocar
                telefoneFixoEmpresarial: [conjugue.telefoneFixoEmpresarial, this.validacoes.validarTelefoneFixo],
                casado: conjugue.casado,
                moraComConjuge: conjugue.moraComConjuge,
            }, {validator: this.validacoes.validarTelefonesEmpresariais})
        }else {
            return this.formBuilder.group({
                nomeTutor: [null, Validators.required],
                //colocar
                dataNascimento: [null, Validators.required],
                cpf: [null, [Validators.required, this.validacoes.validarCpf, this.validacoes.validarIgualdadeCpf]],
                vinculo: [null, Validators.required],
                pessoaTelefone: [null, [Validators.required, this.validacoes.validarTelefone]],
                telefoneReserva: [null, this.validacoes.validarTelefone],
                profissao: [null, Validators.required],
                empresaNome: [null, Validators.required],
                empresaCnpj: [null, this.validacoes.validarCnpj],
                telefoneCelularEmpresarial: [null, this.validacoes.validarTelefone],
                //colocar
                telefoneFixoEmpresarial: [null, this.validacoes.validarTelefoneFixo],
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

        if (this.codigo != null || (this.formGroup.valid && this.formDocumentos.valid)) {
            if (!this.codigo) {
                this.atribuirConjugueRelacionamento();
                this.realizarInclusao();
            } else {
                this.atribuirConjugueRelacionamento();
                this.realizarEdicao();
            }
        }
    }

    uploadFiles(dto: any, files: File[]) {
        const formData: FormData = new FormData();

        formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

        files.forEach(file => {
            formData.append('files', file, file.name);
        });

        const token = this.securityService.credential.accessToken;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.post<MatriculaDto>(`http://localhost:8080/api/v1/matricula/inclusao-com-docs`, formData, { headers }).subscribe(
            retorno => {
                if (this.securityService.isValid()) {
                    this.router.navigate(["/matricula"]);
                } else {
                    this.router.navigate(["/"]);
                }
                this.confirmarAcao(retorno, this.tipoDeFormulario);
                // console.log("as", retorno);
            },
            error => {
                this.mensagens.confirmarErro(this.tipoDeFormulario, error);
                // console.log("erro", error)
            }
        );
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

        this.matriculaService.matriculaControllerAlterar({id: this.codigo, body: matricula}).subscribe(retorno =>{
            if(this.tipoDeFormulario == 'Editar'){
                this.router.navigate(["/matricula"]);
            }
            else if(this.tipoDeFormulario == 'Validar'){
                this.router.navigate(["/validar"]);
            }
            this.confirmarAcao(retorno, this.tipoDeFormulario);
        }, error => {
            this.mensagens.confirmarErro(this.tipoDeFormulario, error);
            console.log("erro", error)
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
            this.matriculaService.matriculaControllerObterPorId({id: codigo}).subscribe(
                retorno => {
                    this.tipoDeFormulario = this.FORM_EDITAR;
                    this.codigo = retorno.id || -1;
                    this.colunasMostrar = ['Tipo'];
                    console.log(this.colunasMostrar);
                    console.log(retorno)

                    this.formGroup.patchValue({
                        nomeCrianca: retorno.nome,
                        cpfCrianca: retorno.cpf,
                        dataNascimento: retorno.nascimento,
                        possuiNecessidadeEspecial: !!retorno.necessidades?.length,
                        necessidadesEspeciais: retorno.necessidades,
                        cep: retorno.endereco?.cep,
                        cidade: retorno.endereco?.cidade,
                        bairro: retorno.endereco?.bairro,
                        logradouro: retorno.endereco?.logradouro,
                        complemento: retorno.endereco?.complemento,
                        //Dados Tutor - Etapa2
                        tutor: retorno.tutorDTOList,
                        //Perguntas culturais - Etapa 3
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

                    retorno.necessidades?.forEach((necessidadeEspecial: any, index:number) => {
                        this.adicionarCampoNecessidade(necessidadeEspecial)
                    });

                    // pega o vinculo em responsavel
                    retorno.tutorDTOList?.forEach((tutor: any, index: number) => {
                        if (index === 0 && retorno.responsaveis) {
                            tutor.vinculo = retorno.responsaveis[index].vinculo;
                            const tutorControl = this.getTutorForm(index);
                            tutorControl.patchValue(tutor);
                            console.log("TuTOR 1", tutor)
                        } else if (index === 1 && retorno.responsaveis) {
                            tutor.vinculo = retorno.responsaveis[index].vinculo;
                            this.conjugue = tutor;
                            this.adicionarConjugue(0, this.conjugue);
                        }
                    });
                    //ate aqui preencher dados das matriculas nos inputs

                    // criar lista com os documentos que existem na matricula mostrando os que não existem
                    if(retorno.documentoMatricula){
                        this.listaDocumentosEditareValidar = retorno.documentoMatricula;
                        this.ordenarLista();
                    }


                },error => {
                    this.mensagens.confirmarErro(this.FORM_EDITAR, error.message)
                    console.log("erro", error);
                }
            )
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

    alterarNomeTitulo(indice: number): void {
        if (this.tipoDeFormulario === 'Cadastrar') {
            // Mapeamento para o modo "Cadastrar"
            if (indice === 0) {
                this.nomeTitulo = "Informações Gerais";
            } else if (indice === 1) {
                this.nomeTitulo = "Dados da Criança";
            } else if (indice === 2) {
                this.nomeTitulo = "Dados do Tutor(a)";
            } else if (indice === 3) {
                this.nomeTitulo = "Perguntas Culturais";
            } else {
                this.nomeTitulo = "Anexar documentos";
            }
        } else {
            // Mapeamento para os modos "Editar" e "Validar"
            if (indice === 0) {
                this.nomeTitulo = "Dados da Criança";
            } else if (indice === 1) {
                this.nomeTitulo = "Dados do Tutor(a)";
            } else if (indice === 2) {
                this.nomeTitulo = "Perguntas Culturais";
            } else {
                this.nomeTitulo = "Anexar documentos";
            }
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
        //Exibe checkbox de informacoes gerais
        this.marcado = true;
        // Lógica para avançar para a próxima etapa
        if (indice >= 0 && indice < this.tabGroup._tabs.length) {
            if (this.tipoDeFormulario === 'Cadastrar' && !this.aceiteInformacoes.checked) {
                this.handleErrorForm('marqueLieConcordo');
                return;
            }
            this.tabGroup.selectedIndex = indice;
        }
        this.alterarNomeTitulo(indice);
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
            titulo: [null, this.validacoes.validarNecessidadeEspecial]
        });
    }

    adicionarNecessidadePreenchido(necessidade: NecessidadeEspecialDto): FormGroup {
        return this.formBuilder.group({
            titulo: [necessidade.titulo, this.validacoes.validarNecessidadeEspecial]
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
                    if(this.tipoDeFormulario == 'Validar' || this.tipoDeFormulario == 'Editar'){
                        this.atualizarTabela(EnumDoc.CPF_TUTOR2);
                        this.atualizarTabela(EnumDoc.DECLARACAO_ESCOLART2);
                        this.atualizarTabela(EnumDoc.COMPROVANTE_TRABALHO_T2);
                        this.atualizarTabela(EnumDoc.CONTRA_CHEQUE1T2);
                        this.atualizarTabela(EnumDoc.CONTRA_CHEQUE2T2);
                        this.atualizarTabela(EnumDoc.CONTRA_CHEQUE3T2);
                        console.log("TESTE", this.listaDocumentosEditareValidar)
                    }
                    this.temConjugue = true;
                }else{
                    if(this.tipoDeFormulario == 'Validar' || this.tipoDeFormulario == 'Editar'){
                        this.adicionarCampoTutor();
                        this.atualizarTabela(EnumDoc.CPF_TUTOR2);
                        this.atualizarTabela(EnumDoc.DECLARACAO_ESCOLART2);
                        this.atualizarTabela(EnumDoc.COMPROVANTE_TRABALHO_T2);
                        this.atualizarTabela(EnumDoc.CONTRA_CHEQUE1T2);
                        this.atualizarTabela(EnumDoc.CONTRA_CHEQUE2T2);
                        this.atualizarTabela(EnumDoc.CONTRA_CHEQUE3T2);
                        console.log("TESTE", this.listaDocumentosEditareValidar)
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
            console.log("TESTE", this.listaDocumentosEditareValidar)

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
            aceito: false,
            idMatricula: this.codigo,
            tipoDocumento: tipo
        };
        return documento;
    }

    atualizarTabela(tipo: EnumDoc) {
        this.show = false;
        const documento = this.criarDocumentoList(tipo);
        this.listaDocumentosEditareValidar.push(documento);
        const copia = this.listaDocumentosEditareValidar;
        this.listaDocumentosEditareValidar = [];
        setTimeout(() => {
            this.show = true;
            this.listaDocumentosEditareValidar = copia;
            this.ordenarLista();
        }, 150);

    }

    removerDaTabela(tipo: string) {
        this.show = false;
        this.listaDocumentosEditareValidar = this.listaDocumentosEditareValidar.filter(documento => documento.tipoDocumento !== tipo);
        const copia = this.listaDocumentosEditareValidar;
        this.listaDocumentosEditareValidar = [];
        setTimeout(() => {
            this.show = true;
            this.listaDocumentosEditareValidar = copia;
            this.ordenarLista();
        }, 150);
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
            console.log(param);
            this.tipoDeFormulario = this.FORM_VALIDACACAO;
            this.colunasMostrar = ['Aceite','Tipo'];
        }
    }

    openDialogPreviewExpanded(element: DocumentoMatriculaDto){
        const config: MatDialogConfig = {
            data: {
                documentoEditarValidar: element,
                matriculaService: this.matriculaService,
                tipoDeFormulario: this.tipoDeFormulario
            }
        };
        this.dialog.open(ViwerDocumetDialogComponent, config);
    }

    getEnumNames(docName: string): string | undefined {
        const enumKey = EnumDoc[docName as keyof typeof EnumDoc];
        return EnumDocDescriptions[enumKey];
    }

    ordenarLista(): void {
        this.listaDocumentosEditareValidar = this.listaDocumentosEditareValidar
            .filter(doc => doc.tipoDocumento !== undefined)
            .sort((a, b) => a.tipoDocumento!.localeCompare(b.tipoDocumento!));
    }

}