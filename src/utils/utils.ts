import { Comic } from '../interfaces'

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Creates an URL to image by concatenating
// path and extension of thumbnail data
export const getImgPath = (comic: Comic) => {
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