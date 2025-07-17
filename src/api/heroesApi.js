import apiConfig from './config'
import { useHeroesStore } from '@/stores/heroes'

const getHeroes = async () => {
  const heroStore = useHeroesStore()
  const response = await apiConfig.get('/marvelHeroes')

  const {
    data: { marvelHeroes },
  } = response.data
  console.log(marvelHeroes)
  heroStore.heroes = marvelHeroes
}

const getHero = async (id) => {
  const response = await apiConfig.get(`/marvelHeroes/${id}`)
  const {
    data: { marvelHero },
  } = response.data

  return marvelHero
}

const createHero = async (data) => {
  const heroStore = useHeroesStore()
  const response = await apiConfig.post('/marvelHeroes', data)
  const {
    data: { marvelhero },
  } = response.data
  console.log('Hero created:', marvelhero)
  heroStore.heroes.push(marvelhero)
}

const editHero = async (id, data) => {
  const response = await apiConfig.patch(`/marvelHeroes/${id}`, data)
  const {
    data: { marvelHero },
  } = response.data
  console.log('Hero edited:', marvelHero)
  getHeroes()
}
const deleteHero = async (id) => {
  await apiConfig.delete(`/marvelHeroes/${id}`)

  getHeroes()
}

const heroesApi = { getHeroes, getHero, createHero, editHero, deleteHero }
export default heroesApi
