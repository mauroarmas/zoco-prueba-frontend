# 🍸 ZOCO Bares - Frontend Dashboard

![ZOCO Bares Preview](https://img.shields.io/badge/Status-En%20Desarrollo-green)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?logo=framer&logoColor=white)

Un dashboard moderno y dinámico diseñado para la gestión de locales gastronómicos (bares y eventos) en la provincia de Tucumán. Cuenta con una estética "glassmorphism", animaciones fluidas y una interfaz altamente responsiva.

---

## ✨ Características Principales

- **Visualización Atractiva**: Tarjetas estilizadas que muestran el estado, ubicación e identificadores de cada bar.
- **Filtros Inteligentes**: Búsqueda por nombre, ubicación o categoría en tiempo real. Menú desplegable para filtrado estricto por categoría.
- **Gestión Completa (CRUD)**:
  - ✏️ **Edición**: Modal con diseño unificado para editar nombre, ubicación y categorías.
  - 🗑️ **Desactivación**: Función de "Soft-delete" visualmente indicada mediante filtros en escala de grises y badges de estado.
- **Scraping Automatizado**: Integración con un flujo de N8N a través del backend para recopilar información dinámica bajo demanda mediante un solo botón ("Realizar Scrapping").
- **UX/UI Moderna**: Efectos de desenfoque de fondo, paletas de colores neón, modo oscuro nativo, micro-interacciones al pasar el cursor y animaciones progresivas impulsadas por Framer Motion.

## 🛠️ Tecnologías Utilizadas

- **Core**: React.js
- **Build Tool**: Vite (rápido y optimizado)
- **Estilos**: Tailwind CSS + CSS puro (`index.css`)
- **Animaciones**: Framer Motion
- **Iconografía**: Lucide React
- **Peticiones HTTP**: Axios

## 🚀 Cómo Empezar

### Prerrequisitos

- **Node.js** (v16 o superior)
- **Backend ZOCO** en ejecución (habitualmente en `http://localhost:4000`)

### Instalación

1. Clona el repositorio e ingresa a la carpeta del frontend:
   ```bash
   cd zoco-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación.

## 📁 Estructura del Proyecto

```text
src/
├── components/
│   ├── BarCard.jsx        # Tarjeta individual para visualizar un bar
│   ├── Dashboard.jsx      # Vista principal, filtros, grid y estado
│   └── EditBarModal.jsx   # Formulario flotante para editar los datos
├── services/
│   └── api.js             # Configuración de Axios e interacciones con NestJS
├── index.css              # Utilidades base, diseño "glassmorphism" y custom scroll
├── main.jsx               # Punto de entrada de la aplicación
└── App.jsx                # Componente raíz
```

## 🔌 Integración API

El frontend interactúa exclusivamente con los siguientes endpoints del backend:
- `GET /api/bars` - Obtener el listado de bares.
- `PUT /api/bars/:id` - Actualizar información.
- `DELETE /api/bars/:id` - Desactivar un bar lógicamente.
- `POST /api/bars/trigger-scraping` - Ejecutar la recolección de datos desde n8n.
