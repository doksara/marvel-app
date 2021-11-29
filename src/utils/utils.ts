import { Character, Comic } from '../interfaces'

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Creates an URL to image by concatenating
// path and extension of thumbnail data
export const getImgPath = (comic: Comic | Character) => {
  if (comic.thumbnail) {
    const { path, extension } = comic.thumbnail

    return path?.concat('.').concat(extension ? extension : '')
  }

  return ''
}

// Formats the base comic price
export const getBasePrice = (comic: Comic) => {
  const { prices } = comic

  if (prices && prices[0]) {
    return `${Number(prices[0].price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })}`
  }
}

// Checks whether the passed object is empty, meaning it has
// no keys. Useful for Record types.
export const isObjectEmpty = (obj: Object) => {
  return Object.keys(obj).length == 0
}

// Generates a random ID
export const generateId = () => {
  return Math.floor(Math.random() * 1000)
}

// Creates a date in YYYY-MM-DD format 
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0]
}