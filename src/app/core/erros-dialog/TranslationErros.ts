export interface TranslationError {
  formName: string;
  [error: string]: string; // Chave dinâmica para erros específicos
}
