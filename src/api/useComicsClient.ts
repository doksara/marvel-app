import HTTP from './baseClient'
import { reactive, ref } from 'vue'
import { Comic, ComicDataWrapper } from '../interfaces'

const URL = '/comics'
const comicData = reactive<Record<string, Comic>>({})
const offset = ref(0)

export const useComicsClient = () => {
  const isLoading = ref(false)
  const error = ref(null)

  const fetchSingleComic = async (comicId: string): Promise<Comic> => {
    isLoading.value = true
    let comic: Comic = {} as Comic

    await HTTP
      .get<ComicDataWrapper>(`${URL}/${comicId}`)
      .then((response) => {
        if (response.data.data?.results){
          [comic] = response.data.data?.results
        }
      })
      .catch(err => {
        error.value = err
      })
    
    isLoading.value = false
    return comic
  }

  const fetchComics = async () => {
    isLoading.value = true

    await HTTP
      .get<ComicDataWrapper>(URL, {
        params: {
          offset: offset.value
        }
      })
      .then((response) => {
        if (response.data.data?.results){
          response.data.data.results.forEach(item => {
            comicData[item.id] = item
          })
          offset.value += 20
        }
      })
      .catch(err => {
        error.value = err
      })
    
    isLoading.value = false
  }
  
  return {
    isLoading,
    error,
    comicData,
    fetchComics,
    fetchSingleComic
  }
}