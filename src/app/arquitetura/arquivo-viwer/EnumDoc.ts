export enum EnumDoc {
  FOTO_CRIANCA = 'FOTO_CRIANCA',
  CERTIDAO_NASCIMENTO = 'CERTIDAO_NASCIMENTO',
  CPF_CRIANCA = 'CPF_CRIANCA',
  DOCUMENTO_VEICULO = 'DOCUMENTO_VEICULO',
  COMPROVANTE_ENDERECO = 'COMPROVANTE_ENDERECO',
  COMPROVANTE_MORADIA = 'COMPROVANTE_MORADIA',
  COMPROVANTE_BOLSA_FAMILIA = 'COMPROVANTE_BOLSA_FAMILIA',
  ENCAMINHAMENTO_CRAS = 'ENCAMINHAMENTO_CRAS',
  CPF_TUTOR1 = 'CPF_TUTOR1',
  CPF_TUTOR2 = 'CPF_TUTOR2',
  CERTIDAO_ESTADO_CIVIL = 'CERTIDAO_ESTADO_CIVIL',
  COMPROVANTE_TRABALHO_T1 = 'COMPROVANTE_TRABALHO_T1',
  CONTRA_CHEQUE1T1 = 'CONTRA_CHEQUE1T1',
  CONTRA_CHEQUE2T1 = 'CONTRA_CHEQUE2T1',
  CONTRA_CHEQUE3T1 = 'CONTRA_CHEQUE3T1',
  CONTRA_CHEQUE1T2 = 'CONTRA_CHEQUE1T2',
  CONTRA_CHEQUE2T2 = 'CONTRA_CHEQUE2T2',
  CONTRA_CHEQUE3T2 = 'CONTRA_CHEQUE3T2',
  COMPROVANTE_TRABALHO_T2 = 'COMPROVANTE_TRABALHO_T2',
  DECLARACAO_ESCOLART1 = 'DECLARACAO_ESCOLART1',
  DECLARACAO_ESCOLART2 = 'DECLARACAO_ESCOLART2',
}

export const EnumDocDescriptions: Record<EnumDoc, string> = {
  [EnumDoc.FOTO_CRIANCA]: 'Foto da criança',
  [EnumDoc.CERTIDAO_NASCIMENTO]: 'Certidão de nascimento da criança',
  [EnumDoc.CPF_CRIANCA]: 'CPF da criança',
  [EnumDoc.DOCUMENTO_VEICULO]: 'Documento do veículo',
  [EnumDoc.COMPROVANTE_ENDERECO]: 'Comprovante de endereço',
  [EnumDoc.COMPROVANTE_MORADIA]: 'Comprovante de estado da moradia',
  [EnumDoc.COMPROVANTE_BOLSA_FAMILIA]: 'Comprovante de beneficiário do programa Bolsa Família',
  [EnumDoc.ENCAMINHAMENTO_CRAS]: 'Declaração de encaminhamento do CRAS',
  [EnumDoc.CPF_TUTOR1]: 'CPF do tutor 1',
  [EnumDoc.CPF_TUTOR2]: 'CPF do tutor 2',
  [EnumDoc.CERTIDAO_ESTADO_CIVIL]: 'Certidão de estado civil dos tutores',
  [EnumDoc.COMPROVANTE_TRABALHO_T1]: 'Carteira de trabalho / Comprovante de trabalho do tutor 1',
  [EnumDoc.CONTRA_CHEQUE1T1]: 'Contra-cheque 1 do tutor 1',
  [EnumDoc.CONTRA_CHEQUE2T1]: 'Contra-cheque 2 do tutor 1',
  [EnumDoc.CONTRA_CHEQUE3T1]: 'Contra-cheque 3 do tutor 1',
  [EnumDoc.CONTRA_CHEQUE1T2]: 'Contra-cheque 1 do tutor 2',
  [EnumDoc.CONTRA_CHEQUE2T2]: 'Contra-cheque 2 do tutor 2',
  [EnumDoc.CONTRA_CHEQUE3T2]: 'Contra-cheque 3 do tutor 2',
  [EnumDoc.COMPROVANTE_TRABALHO_T2]: 'Carteira de trabalho / Comprovante de trabalho do tutor 2',
  [EnumDoc.DECLARACAO_ESCOLART1]: 'Declaração escolar do tutor 1',
  [EnumDoc.DECLARACAO_ESCOLART2]: 'Declaração escolar do tutor 2',
};
