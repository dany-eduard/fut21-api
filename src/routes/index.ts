import { Router } from 'express'
import { getPlayerById, getPlayers, getPlayersByClub } from '../controllers/index.controllers'

const router = Router()

router.post('/api/v1/team', getPlayersByClub)
router.get('/api/v1/players/:id', getPlayerById)
router.get('/api/v1/players', getPlayers)

export default router
