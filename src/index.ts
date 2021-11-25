import express from 'express'
import indexRoutes from './routes'

const app = express()

// midelwares
app.use(express.json()) // para que los datos que lleguen en formato json se puedan leer
app.use(express.urlencoded({ extended: false })) // para que datos enviados desde unformulario se puedan leer
app.use(indexRoutes) // para que las rutas sean leidas

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
