# Fut21 API

Este proyecto es una réplica de la [API](https://www.easports.com/fifa/ultimate-team/api/fut/item) del juego FIFA 21 Ultimate Team que permita hacer una búsqueda de jugadores y equipos. Fue construida usando Node.js y Express.

## Iniciando

1. Clone el repositorio `git clone https://github.com/dany-eduard/fut21-api.git`
2. Accede al directorio del proyecto `cd fut21-api`
3. Usa el archivo [scheme.sql](https://github.com/dany-eduard/fut21-api/blob/main/database/scheme.sql) para crear la base de datos en Postgres\*
4. Transpila el proyecto con `npm run build`
5. Ejecuta el archivo `node /build/script.js` para llenar la base de datos automáticamente, usando la data de [EA Sports](https://www.easports.com/fifa/ultimate-team/api/fut/item)

## Uso de la API

Para correr el servidor, use `npm run dev`. Este comando ejecutara _nodemon_ con los parámetros establecidos en [nodemon.json](https://github.com/dany-eduard/fut21-api/blob/main/nodemon.json) y lo tendrá en `localhost:3000`.

### Rutas

#### **`[POST] /api/v1/team`** 
Retorna los jugadores de un equipo sin importar si se escribe en minúscula o mayúscula.

**Ejemplo**

```json
// body request
{
  "name": "real madrid",
  "page": 4
}
```

**Ejemplo de response**

```json
{
  "message": "Jugadores de real madrid",
  "page": 4,
  "totalPages": 8,
  "totalResults": 181,
  "count": 24,
  "data": [
    {
      "id": 4147,
      "nombre": "Jesús Vallejo Lázaro",
      "posicion": "CB",
      "nacionalidad": "Spain",
      "equipo": "Real Madrid"
    },
    {
      "id": 3930,
      "nombre": "Jesús Vallejo Lázaro",
      "posicion": "CB",
      "nacionalidad": "Spain",
      "equipo": "Real Madrid"
    },
    ...
  ]
}
```

#### **`[GET] /api/v1/players/:id`** 
Retorna el jugador con el id enviado como params.

```js
/api/v1/players/324
```

**Ejemplo**

```nodejs
// url request
https://fut21-api.herokuapp.com/api/v1/players/15503
```

**Ejemplo de response**

```json
{
  "message": "Jugador obtenido",
  "data": [
    {
      "id": 15503,
      "nombre": "Aaron Cresswell",
      "posicion": "CB",
      "nacionalidad": "England",
      "equipo": "West Ham United"
    }
  ]
}
```

#### **`[GET] /api/v1/players`** 
Puede retornar una lista de jugadores o las coincidencias por el criterio de búsqueda. Además de ordenar y paginar.

```js
/api/v1/players
/api/v1/players?search=cristi
/api/v1/players?search=cristi&order=asc&page=1
/api/v1/players?order=asc&page=1
```

**Ejemplo**

```nodejs
// url request
https://fut21-api.herokuapp.com/api/v1/players?search=cristi&order=asc&page=1
```

**Ejemplo de response**

```json
{
  "message": "Jugadores obtenidos",
  "page": 1,
  "totalPages": 5,
  "totalResults": 98,
  "count": 24,
  "data": [
    {
      "id": 6023,
      "nombre": "Cristian Álvarez",
      "posicion": "GK",
      "nacionalidad": "Argentina",
      "equipo": "R. Zaragoza"
    },
    {
      "id": 15495,
      "nombre": "Cristian Álvarez",
      "posicion": "GK",
      "nacionalidad": "Argentina",
      "equipo": "R. Zaragoza"
    },
    ...
  ]
}
```

> Nota: Puedes usar [docker-compose up](https://github.com/dany-eduard/fut21-api/blob/main/docker-compose.yml) para instalar y configurar automáticamente Postgres en un contenedor de Docker.

## Tecnologias utilizadas

- TypeScript
- Node.js
- Express
- PostgreSQL
- Docker
- Linux
