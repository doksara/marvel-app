import HTTP from './baseClient'
import { reactive, ref } from 'vue'
import { Comic, ComicDataWrapper } from '../interfaces'

const URL = '/comics'
const comicData = reactive<Array<Comic>>([])
const offset = ref(0)
//const limit = ref(20)

export const useComicsClient = () => {
  const isLoading = ref(false)
  const error = ref(null)

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
            comicData.push(item)
          })
          offset.value += 20
          //limit.value += 20
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