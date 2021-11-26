require('dotenv').config({ path: '../.env' })
import { pool } from './database'
import got from 'got'
import { ItemsEntity, ItemsResponse, Player, ResEASportsAPI } from './interfaces/apiea.interface'

/**
 * Run this script to feed your database with EA Sports player information.
 * Ejecute este script para alimentar su base de datos con información de jugadores de EA Sports.
 */

const removeDuplicates = (players: Player[]) => {
  const uniquePayers: Player[] = []
  players.forEach((player) => {
    if (!uniquePayers.find((item) => item.name === player.name)) uniquePayers.push(player)
  })
  return uniquePayers
}

const getRequiredInfoPlayers = (players: ItemsEntity[]) => {
  return players.map((player: ItemsEntity) => {
    return {
      id: parseInt(player.id),
      name: `${player.firstName} ${player.lastName}`,
      nation: player.nation.name,
      club: player.club.name,
      position: player.position
    }
  })
}

const getItemsApi = async (numberPage = 1, calls = 0): Promise<ItemsResponse> => {
  let response!: ItemsResponse

  try {
    const res = await got(`${process.env.API_URL_EASPORTS}?page=${numberPage}`)
    const body: ResEASportsAPI = JSON.parse(res.body)

    response = {
      page: body.page,
      totalPages: body.totalPages,
      items: removeDuplicates(getRequiredInfoPlayers(body.items))
    }
  } catch (error) {
    if (calls < 3) getItemsApi(numberPage, calls + 1)
    console.debug(error)
    return response
  }

  return response
}

const main = async () => {
  console.time('Total run time')
  const initialPage = 1
  let totalPages = 0
  const consults = []
  const records = []

  // First API query to get the total number of pages
  console.time('Time of first consultation')
  const data = await getItemsApi(initialPage)
  totalPages = data.totalPages
  console.timeEnd('Time of first consultation')

  console.time('Total time to perform all API queries')
  for (let i = initialPage; i < totalPages; i++) {
    consults.push(getItemsApi(i))
  }
  const dataPages = await Promise.all(consults)
  console.timeEnd('Total time to perform all API queries')

  console.log('Data pages => ', dataPages.length)

  console.time('Insert timer')
  for (let i = 0; i <= dataPages.length; i++) {
    const dataPage = dataPages[i]
    // Create array with the records to insert.
    const recordPromise = dataPage.items.map((player: Player) => {
      const query = `INSERT INTO jugadores (nombre, nacionalidad, equipo, posicion) VALUES ($1, $2, $3, $4)`
      // Return a Promise type of QueryResult.
      return pool.query(query, [player.name, player.nation, player.club, player.position])
    })

    // It stores temporaly in the records variable the
    // records that will be inserted very 5 executions.
    records.push(...recordPromise)
  }

  // Execute al Promise type of QueryResult
  const result = await Promise.all(records)
  console.timeEnd('Insert timer')

  console.debug('Total number of records => ', records.length)
  console.debug('Total number of records inserted => ', result.length)
  console.debug('Process completed')

  console.timeEnd('Total run time')
  process.exit(1)
}

export default main
