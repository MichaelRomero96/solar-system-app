# Aplicación de Planetas en React Native

Esta es una aplicación móvil desarrollada en React Native utilizando Expo como framework de desarrollo. La aplicación permite explorar información sobre planetas del sistema solar, ver imágenes relacionadas y gestionar una lista de favoritos.

## Características Principales

- **Vistas Principales**:
  - **Planetas**: Muestra una lista de planetas con información básica.
  - **Favoritos**: Permite ver y gestionar los planetas marcados como favoritos.

- **APIs Utilizadas**:
  - **[api.le-systeme-solaire.net](https://api.le-systeme-solaire.net/)**: Para obtener datos detallados de los planetas (masa, volumen, gravedad, etc.).
  - **[Pixabay](https://pixabay.com/)**: Para descargar imágenes relacionadas con los planetas.

- **Base de Datos Local**:
  - Se utiliza un fichero `db` (`solarSystem.js` o similar) para almacenar una imagen de referencia y una descripción básica de cada planeta, ya que la API de planetas no proporciona estos datos.

- **Enrutado**:
  - Se utiliza **Expo Router** para el enrutado basado en carpetas, lo que facilita la navegación entre las vistas de la aplicación.

- **Gestión de Datos**:
  - Para el fetching de datos se utiliza **TanStack Query (React Query)**, que permite almacenar en caché los datos y evitar múltiples solicitudes a las APIs.
  - Se utiliza `fetch` para realizar las solicitudes a las APIs.

- **Interfaz de Usuario (UI)**:
  - Tema oscuro por defecto para coincidir con el estilo visual del espacio y los planetas.
  - En la vista de detalle de cada planeta, se implementa un **carousel** para mostrar las imágenes obtenidas de Pixabay.

---

## Estructura del Proyecto

/
├── assets/ # Recursos estáticos (imágenes, fuentes, etc.)
├── components/ # Componentes reutilizables
│ ├── PlanetListItem.tsx # Card del planeta
│ └── PlanetsView.tsx # Componente que renderiza el listado de planetas
├── db/ # Base de datos local con imágenes y descripciones de planetas
├── utils/ # Utilidades (almacenamiento local, helpers, etc.)
├── app/ # Configuración de Expo Router y punto de entrada de la aplicación
│ ├── (tabs)/ # Vistas principales (Planetas, Favoritos)
│ └── [id].tsx # Vista dinámica de detalle
├── api/ # Lógica para consumir APIs (SolarSystemAPI, PixabayAPI)
└── README.md # Este archivo

---

## Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/MichaelRomero96/solar-system-app.git
   cd solar-system-app

2. **Instalar dependencias**:
   ```bash
   npm install

2. **Ejecutar la aplicación**:
   ```bash
   npm start

4. Escanea el código QR con la aplicación de Expo Go (disponible en iOS y Android) o ejecuta en un emulador.

---

## Dependencias Principales
Expo: Framework para desarrollo móvil con React Native.
Expo Router: Enrutado basado en carpetas.
TanStack Query (React Query): Para gestión de datos y caching.
Pixabay API: Para obtener imágenes de planetas.
api.le-systeme-solaire.net: Para obtener datos de planetas.
React Native Elements: Para componentes UI (opcional, si se utiliza).