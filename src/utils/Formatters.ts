/**
 * Formata uma string de CPF para o padrão 999.999.999-99.
 * @param cpf A string de CPF contendo apenas números.
 * @returns O CPF formatado ou uma string vazia se a entrada for inválida.
 */
export const formatCPF = (cpf: string | undefined | null): string => {
  if (!cpf) return '';
  // Remove qualquer caractere que não seja dígito
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return cpf; // Retorna o original se não tiver 11 dígitos
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formata uma string de CEP para o padrão 99999-999.
 * @param cep A string de CEP contendo apenas números.
 * @returns O CEP formatado ou uma string vazia se a entrada for inválida.
 */
export const formatCEP = (cep: string | undefined | null): string => {
  if (!cep) return '';
  const cleaned = cep.replace(/\D/g, '');
  if (cleaned.length !== 8) return cep; // Retorna o original se não tiver 8 dígitos
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
};

/**
 * Formata uma string de telefone para os padrões (99)99999-9999 ou (99)9999-9999.
 * @param tel A string de telefone contendo apenas números.
 * @returns O telefone formatado ou uma string vazia se a entrada for inválida.
 */
export const formatTelefone = (tel: string | undefined | null): string => {
  if (!tel) return '';
  const cleaned = tel.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return tel; // Retorna o original se não for um telefone válido
};