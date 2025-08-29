// src/utils/formatters.ts

/**
 * Formatea una fecha para mostrar en formato legible en español
 * @param dateString - Fecha en formato ISO string
 * @param locale - Locale a usar (por defecto es-CA para español canadiense)
 * @returns Fecha formateada
 */
export function formatDate(
  dateString: string, 
  locale: string = 'es-CA'
): string {
  try {
    const date = new Date(dateString)
    
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string provided:', dateString)
      return 'Fecha no válida'
    }

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Error en fecha'
  }
}

/**
 * Formatea una fecha para mostrar de forma más compacta
 * @param dateString - Fecha en formato ISO string
 * @param locale - Locale a usar
 * @returns Fecha formateada de forma compacta
 */
export function formatDateShort(
  dateString: string, 
  locale: string = 'es-CA'
): string {
  try {
    const date = new Date(dateString)
    
    if (isNaN(date.getTime())) {
      return 'Fecha no válida'
    }

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting short date:', error)
    return 'Error en fecha'
  }
}

/**
 * Formatea una fecha en formato ISO para usar en atributos datetime
 * @param dateString - Fecha en formato ISO string
 * @returns Fecha en formato ISO válido o fecha original si ya es válida
 */
export function formatDateISO(dateString: string): string {
  try {
    const date = new Date(dateString)
    
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string provided:', dateString)
      return dateString // Devolver original si no es válida
    }

    return date.toISOString()
  } catch (error) {
    console.error('Error formatting ISO date:', error)
    return dateString
  }
}

/**
 * Calcula cuánto tiempo hace que se publicó algo
 * @param dateString - Fecha en formato ISO string
 * @param locale - Locale a usar
 * @returns Tiempo relativo (ej: "hace 2 días")
 */
export function formatRelativeTime(
  dateString: string, 
  locale: string = 'es-CA'
): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    
    if (isNaN(date.getTime())) {
      return 'Fecha no válida'
    }

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    // Menos de un minuto
    if (diffInSeconds < 60) {
      return 'Hace un momento'
    }
    
    // Menos de una hora
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`
    }
    
    // Menos de un día
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`
    }
    
    // Menos de una semana
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `Hace ${days} ${days === 1 ? 'día' : 'días'}`
    }
    
    // Menos de un mes (30 días)
    if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800)
      return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`
    }
    
    // Menos de un año
    if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000)
      return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`
    }
    
    // Más de un año
    const years = Math.floor(diffInSeconds / 31536000)
    return `Hace ${years} ${years === 1 ? 'año' : 'años'}`
    
  } catch (error) {
    console.error('Error formatting relative time:', error)
    return 'Error en fecha'
  }
}

/**
 * Formatea un número como precio en CAD
 * @param amount - Cantidad numérica
 * @param locale - Locale a usar (por defecto en-CA para formato canadiense)
 * @returns Precio formateado
 */
export function formatPrice(
  amount: number, 
  locale: string = 'en-CA'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  } catch (error) {
    console.error('Error formatting price:', error)
    return `$${amount.toFixed(2)} CAD`
  }
}

/**
 * Formatea un número con separadores de miles
 * @param number - Número a formatear
 * @param locale - Locale a usar
 * @returns Número formateado
 */
export function formatNumber(
  number: number, 
  locale: string = 'en-CA'
): string {
  try {
    return new Intl.NumberFormat(locale).format(number)
  } catch (error) {
    console.error('Error formatting number:', error)
    return number.toString()
  }
}

/**
 * Convierte un texto a slug URL-friendly
 * @param text - Texto a convertir
 * @returns Slug limpio
 */
export function textToSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Descompone caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remueve acentos
    .replace(/[^\w\s-]/g, '') // Remueve caracteres especiales
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/-+/g, '-') // Remueve guiones duplicados
    .replace(/^-|-$/g, '') // Remueve guiones al inicio/final
}

/**
 * Trunca un texto a cierto número de palabras
 * @param text - Texto a truncar
 * @param maxWords - Número máximo de palabras
 * @param suffix - Sufijo a agregar (por defecto "...")
 * @returns Texto truncado
 */
export function truncateWords(
  text: string, 
  maxWords: number, 
  suffix: string = '...'
): string {
  if (!text) return ''
  
  const words = text.split(' ')
  
  if (words.length <= maxWords) {
    return text
  }
  
  return words.slice(0, maxWords).join(' ') + suffix
}

/**
 * Trunca un texto a cierto número de caracteres
 * @param text - Texto a truncar
 * @param maxChars - Número máximo de caracteres
 * @param suffix - Sufijo a agregar (por defecto "...")
 * @returns Texto truncado
 */
export function truncateChars(
  text: string, 
  maxChars: number, 
  suffix: string = '...'
): string {
  if (!text) return ''
  
  if (text.length <= maxChars) {
    return text
  }
  
  return text.substring(0, maxChars - suffix.length) + suffix
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param text - Texto a capitalizar
 * @returns Texto con primera letra de cada palabra en mayúscula
 */
export function capitalizeWords(text: string): string {
  if (!text) return ''
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Capitaliza solo la primera letra del texto
 * @param text - Texto a capitalizar
 * @returns Texto con primera letra en mayúscula
 */
export function capitalizeFirst(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Calcula el tiempo estimado de lectura
 * @param text - Texto completo
 * @param wordsPerMinute - Palabras por minuto promedio (por defecto 200)
 * @returns Tiempo estimado en minutos
 */
export function calculateReadingTime(
  text: string, 
  wordsPerMinute: number = 200
): number {
  if (!text) return 0
  
  // Remover HTML tags si existen
  const plainText = text.replace(/<[^>]*>/g, '')
  
  // Contar palabras
  const words = plainText.trim().split(/\s+/).length
  
  // Calcular tiempo y redondear hacia arriba
  const minutes = Math.ceil(words / wordsPerMinute)
  
  return Math.max(1, minutes) // Mínimo 1 minuto
}

/**
 * Formatea bytes a formato legible
 * @param bytes - Cantidad de bytes
 * @param decimals - Número de decimales (por defecto 2)
 * @returns Tamaño formateado (ej: "1.5 MB")
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Extrae el primer párrafo de un texto para usar como excerpt
 * @param text - Texto completo
 * @param maxLength - Longitud máxima del excerpt
 * @returns Primer párrafo o texto truncado
 */
export function extractExcerpt(text: string, maxLength: number = 160): string {
  if (!text) return ''
  
  // Remover HTML tags
  const plainText = text.replace(/<[^>]*>/g, '')
  
  // Buscar el primer salto de párrafo
  const firstParagraph = plainText.split('\n')[0].trim()
  
  // Si el primer párrafo es muy largo, truncar
  if (firstParagraph.length > maxLength) {
    return truncateChars(firstParagraph, maxLength)
  }
  
  return firstParagraph
}

/**
 * Valida si una fecha está en el futuro
 * @param dateString - Fecha en formato ISO string
 * @returns True si la fecha es futura
 */
export function isFutureDate(dateString: string): boolean {
  try {
    const date = new Date(dateString)
    const now = new Date()
    return date > now
  } catch (error) {
    console.error('Error validating future date:', error)
    return false
  }
}

/**
 * Valida si una fecha es de hoy
 * @param dateString - Fecha en formato ISO string
 * @returns True si la fecha es de hoy
 */
export function isToday(dateString: string): boolean {
  try {
    const date = new Date(dateString)
    const today = new Date()
    
    return date.toDateString() === today.toDateString()
  } catch (error) {
    console.error('Error validating today date:', error)
    return false
  }
}

/**
 * Formatea una fecha para meta tags (Open Graph, etc.)
 * @param dateString - Fecha en formato ISO string
 * @returns Fecha en formato RFC 2822
 */
export function formatDateForMeta(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toUTCString()
  } catch (error) {
    console.error('Error formatting meta date:', error)
    return new Date().toUTCString()
  }
}