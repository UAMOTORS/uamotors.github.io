# Guía de Contribución - UAMOTORS

¡Bienvenidx al repositorio de la página oficial de **[UAMOTORS](https://uamotors.github.io/)**! 🏎️

### Tecnologías Principales

Para trabajar en este proyecto, necesitas nociones básicas de:

- **[Astro](https://astro.build/):** El framework principal que usamos. Sirve para crear sitios súper rápidos.
- **[Tailwind CSS](https://tailwindcss.com/):** Para darle estilos a la página fácilmente mediante clases (_utility-first_).
- **Markdown (`.md`):** Usamos Markdown para redactar los artículos del blog de manera sencilla.

### Instalación y Desarrollo Local

1. **Requisitos previos:** Asegúrate de tener instalado [Node.js](https://nodejs.org/) (v18 o superior) y el gestor de paquetes `pnpm`. Si no tienes `pnpm`, instálalo con:

   ```bash
   npm install -g pnpm
   ```

2. **Clonar el proyecto:**

   ```bash
   git clone https://github.com/UAMOTORS/uamotors.github.io.git
   cd uamotors.github.io
   ```

3. **Instalar dependencias:**

   ```bash
   pnpm install
   ```

4. **Correr en modo desarrollo:**
   ```bash
   pnpm run dev
   ```
   _Esto levantará un servidor local (usualmente en `http://localhost:4321`) que se actualizará automáticamente cada que guardes un archivo._

### ¿Dónde encuentro cada cosa?

- **Páginas principales (`src/pages/`):** Si necesitas modificar el inicio, nosotros, nuestros aliados o contacto. Cada archivo `.astro` corresponde a una ruta de la página.
- **Componentes (`src/components/`):** Aquí viven pedazos de código reutilizables, como los botones, la barra de navegación o los logos individuales de cada patrocinador.
- **Artículos del Blog (`src/content/blogs/`):** Si te pidieron publicar una nueva noticia, aquí es donde creas el archivo `.md`.
- **Imágenes e Íconos (`src/assets/` y `public/`):** Las fotografías, fondos (Canvas/SVGs) y logos van en estas carpetas.

### Flujo de Trabajo (Cómo subir tus cambios)

Para mantener el código limpio y sin errores en la rama principal (`main`), sigue este proceso:

#### Pasos a seguir:

1. **Nunca trabajes directamente en `main`.** Crea una rama nueva para la tarea que vayas a realizar usando uno de los prefijos de nomenclatura:

   ```bash
   git checkout -b feature/nuevo-patrocinador
   # o si es para arreglar un error:
   git checkout -b fix/error-imagenes
   ```

   > [!WARNING]
   > Este sitio web se despliega automáticamente en GitHub Pages.
   > Cualquier cambio que se fusione (merge) a la rama `main` activará un flujo de trabajo de GitHub Actions (`.github/workflows/deploy.yml`) que compila el sitio y lo publica en vivo en cuestión de minutos. No es necesario subir la carpeta `dist/` al repositorio.

   > **Nomenclatura de Ramas y Commits**
   > Utilizamos los siguientes prefijos para estandarizar las ramas y los mensajes de los _commits_:
   >
   > | **Prefijo**   | **Uso**                                                 | **Ejemplo**                       |
   > | ------------- | ------------------------------------------------------- | --------------------------------- |
   > | `feature/`    | Nueva funcionalidad                                     | `feature/dark-mode-toggle`        |
   > | `fix/`        | Solución de errores (_bugs_)                            | `fix/login-button-error`          |
   > | `hotfix/`     | Soluciones críticas en producción                       | `hotfix/payment-processing-issue` |
   > | `refactor/`   | Reestructuración de código (sin nuevas funciones)       | `refactor/auth-module`            |
   > | `docs/`       | Actualizaciones en documentación                        | `docs/api-v2-update`              |
   > | `test/`       | Cambios relacionados a pruebas                          | `test/unit-coverage-improvement`  |
   > | `perf/`       | Optimizaciones de rendimiento                           | `perf/db-query-optimization`      |
   > | `chore/`      | Tareas de mantenimiento (dependencias, configuraciones) | `chore/update-deps-2025`          |
   > | `experiment/` | Trabajo experimental o pruebas                          | `experiment/ai-code-assist`       |
   > | `release/`    | Preparación para lanzamiento (Pipelines CI/CD)          | `release/v2.5.0`                  |
   >
   > <br>

2. **Haz tus cambios y guárdalos (commit):** Usa mensajes claros explicando qué hiciste. (En los commits suele usarse el prefijo sin la diagonal, ej: `feat:`, `fix:`, `chore:`).
   ```bash
   git add .
   git commit -m "feature: agregar logo de nuevo patrocinador nivel oro"
   ```
3. **Sube tu rama a GitHub:**
   ```bash
   git push origin nombre-de-tu-rama
   ```
4. **Crea un Pull Request (PR):** Ve a GitHub y abre un Pull Request. Pídele a otro administrador o compañero del equipo que revise tu código antes de fusionarlo (_merge_) a `main`.
   <br>

   > **Alternativa: Usar la interfaz de VS Code (Source Control)**
   >
   > Si prefieres no usar la terminal, puedes hacer todo esto de forma visual usando la pestaña de **Source Control** integrada en VS Code (el ícono con tres ramitas en la barra lateral izquierda).
   >
   > _(Para que esta herramienta funcione, debes tener **Git** instalado en tu sistema)_:
   >
   > - **Windows:** Descarga e instala el instalador oficial desde [git-scm.com](https://git-scm.com/download/win).
   > - **Mac:** Abre la terminal y ejecuta `xcode-select --install` (o descárgalo en [git-scm.com](https://git-scm.com/download/mac)).
   >
   > <br>Pasos en VS Code:
   >
   > - **Crear rama:** Da clic en el nombre de la rama actual (`main`) en la barra azul de hasta abajo a la izquierda y selecciona _Create new branch_.
   > - **Hacer Commit:** Ve a la pestaña **Source Control**. Pasa el mouse sobre tus archivos modificados y dale al **`+`** para prepararlos. Luego, escribe tu mensaje (ej. `feat: agregar logo`) en la caja de texto y presiona el botón azul **Commit**.
   >   > [!WARNING]
   >   > No hagas commit sin agregar un mensaje, te dará error.
   > - **Subir cambios:** Una vez hecho el commit, el botón azul cambiará a **Publish Branch** (o Sync Changes). Dale clic para subir tu rama a GitHub.
   >   <br>

### Estilo de Código y Formato

Este proyecto incluye un archivo `prettier.config.js`. Si usas VS Code, te recomendamos fuertemente instalar la extensión de **Prettier** y configurarla para que formatee el código automáticamente al guardar (`Format on Save`). Esto asegura que todos escribamos el código ordenado, con los mismos espacios y limpieza visual.

---
