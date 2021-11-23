import HTTP from './baseClient'
import { ref } from 'vue'
import { Comic, ComicDataWrapper } from '../interfaces'

const URL = '/comics'
const comicData = ref<Array<Comic>>()

export const useComicsClient = () => {
  const isLoading = ref(false)
  const error = ref(null)

  const fetchComics = async () => {
    isLoading.value = true

    await HTTP
      .get<ComicDataWrapper>(URL)
      .then((response) => {
        if (response.data.data?.results){
          comicData.value = response.data.data.results
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
    fetchComics
  }
}