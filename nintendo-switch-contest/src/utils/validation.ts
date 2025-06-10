// Utilità per validazione form e input
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateTwitterHandle = (handle: string): boolean => {
  // Twitter handle deve essere 1-15 caratteri, solo lettere, numeri e underscore
  const twitterRegex = /^[a-zA-Z0-9_]{1,15}$/
  return twitterRegex.test(handle)
}

export const validateName = (name: string): boolean => {
  // Nome deve essere almeno 2 caratteri, solo lettere e spazi
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/
  return nameRegex.test(name.trim())
}

export const formatTwitterHandle = (handle: string): string => {
  // Rimuove @ se presente e converte in lowercase
  return handle.replace(/^@/, '').toLowerCase()
}

export const sanitizeInput = (input: string): string => {
  // Rimuove spazi extra e caratteri pericolosi
  return input.trim().replace(/[<>]/g, '')
}
