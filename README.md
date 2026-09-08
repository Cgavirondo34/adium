# Regulatory Cases

Repositorio privado de casos de automatización, BI e IA aplicada a procesos de **Asuntos Regulatorios**.

## Stack

- **Node.js + Express** — servidor y routing
- **EJS** — templating server-side
- **CSS custom** — sin dependencias de UI
- **JSON** — base de casos editable sin base de datos

## Correr local

```bash
npm install
npm run dev       # con nodemon (watch)
# o
npm start         # producción
```

Abre en `http://localhost:3000`

## Agregar un caso

Editá `data/cases.json` y sumá un objeto con esta estructura:

```json
{
  "id": "RC-007",
  "title": "Nombre del caso",
  "description": "Descripción general (1-2 oraciones).",
  "problem": "Qué problema existía antes.",
  "solution": "Qué se implementó o propone.",
  "technologies": ["Power Automate", "SharePoint"],
  "category": "Automatización de procesos",
  "complexity": "Media",
  "impact": "Alto",
  "status": "Ejemplo",
  "timeEstimate": "4-6 semanas",
  "quickWin": true,
  "filial": "Regional",
  "tags": ["keyword1", "keyword2"]
}
```

### Valores válidos

| Campo        | Opciones                                                        |
|--------------|-----------------------------------------------------------------|
| `category`   | `Automatización de procesos`, `Alertas y monitoreo`, `Business Intelligence`, `Consultoría de procesos` |
| `complexity` | `Baja`, `Media`, `Alta`                                         |
| `impact`     | `Bajo`, `Medio`, `Alto`                                         |
| `status`     | `Ejemplo`, `En curso`, `Completado`, `Backlog`                  |
| `filial`     | `Regional`, `Multi-filial`, `Corporativo`, `Local`              |

## Deploy en Railway

1. Push a GitHub (repo privado)
2. En Railway: New Project → Deploy from GitHub repo
3. Railway detecta Node.js automáticamente
4. Variables de entorno: ninguna requerida (PORT lo asigna Railway)
5. Start command: `npm start`

## API

| Endpoint      | Descripción                     |
|---------------|---------------------------------|
| `GET /`       | Listado con filtros             |
| `GET /case/:id` | Detalle de un caso            |
| `GET /api/cases` | JSON de todos los casos      |
| `GET /api/stats` | Estadísticas resumidas       |
