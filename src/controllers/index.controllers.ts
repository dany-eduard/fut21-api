require('dotenv').config()

import { pool } from '../database'
import { Request, Response } from 'express'
import { QueryResult } from 'pg'

const verifyApiKey = (req: Request, res: Response) => {
  const apiKey = req.headers.authorization
  console.log(apiKey,  process.env.API_KEY)
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
}

export const getPlayersByClub = async (req: Request, res: Response): Promise<Response> => {
  verifyApiKey(req, res)
  const { name, page } = req.body
  try {
    const count = await pool.query(
      `SELECT COUNT(*) FROM jugadores WHERE LOWER(equipo) LIKE LOWER('%${name}%')`
    )
    const result: QueryResult = await pool.query(
      `SELECT * FROM jugadores WHERE LOWER(equipo) LIKE LOWER('%${name}%') ORDER BY nombre ASC LIMIT 24 OFFSET ((${page} - 1) * 24)`
    )
    const totalResults = Number(count.rows[0].count)
    const totalPages = Math.ceil(totalResults / 24)

    if (totalPages < page)
      return res.status(404).json({
        message: 'Pagina proporcionada es mayor a las paginas disponibles',
        page: page,
        totalPages,
        data: result.rows
      })

    return res.status(200).json({
      message: `Jugadores de ${name}`,
      page: page,
      totalPages,
      totalResults,
      count: result.rowCount,
      data: result.rows
    })
  } catch (error) {
    return res.status(500).json({
      message: `Error al obtener los jugadores de ${name}`,
      data: [],
      error
    })
  }
}

export const getPlayers = async (req: Request, res: Response): Promise<Response> => {
  const { search, order, page } = req.query

  let query = 'SELECT * FROM jugadores'
  if (search) query += ` WHERE LOWER(nombre) LIKE LOWER('%${search}%') `
  if (order) query += ` ORDER BY nombre ${order} `
  else query += ' ORDER BY nombre ASC '
  if (page) query += ` LIMIT 24 OFFSET ((${page} - 1) * 24) `

  let queryCount = 'SELECT COUNT(*) FROM jugadores'
  if (search) queryCount += ` WHERE LOWER(nombre) LIKE LOWER('%${search}%')`

  try {
    const count = await pool.query(queryCount)

    const totalResults = Number(count?.rows[0].count)
    const totalPages = Math.ceil(totalResults / 24)

    const result: QueryResult = await pool.query(query)

    return res.status(200).json({
      message: 'Jugadores obtenidos',
      page: page ? Number(page) : undefined,
      totalPages,
      totalResults,
      count: result.rowCount,
      data: result.rows
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Error al obtener los jugadores',
      data: [],
      error
    })
  }
}

export const getPlayerById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const result: QueryResult = await pool.query(`SELECT * FROM jugadores WHERE id = ${id}`)
    if (result.rowCount > 0) {
      return res.status(200).json({
        message: 'Jugador obtenido',
        data: result.rows
      })
    }
    return res.status(200).json({
      message: `No existe jugador con el ID: ${id}`,
      data: []
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Error al obtener los jugadores',
      data: [],
      error
    })
  }
}
