export function maskCEP(value: string): string {
  if (!value) return ""
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{5})(\d)/, '$1-$2') // Coloca hífen entre o quinto e o sexto dígitos
    .substring(0, 9) // Limita ao tamanho máximo da máscara (9 caracteres)
}

export function maskTelefone(value: string): string {
  if (!value) return ""
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, '$1-$2') // Coloca hífen depois do quinto dígito
    .substring(0, 15)
}

export function maskCPF(value: string): string {
  if (!value) return ""
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco)
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca um hífen entre o terceiro e o quarto dígitos
    .substring(0, 14)
}