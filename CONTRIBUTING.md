# Guía de Contribución - UAMOTORS

¡Bienvenidx al repositorio de la página oficial de **[UAMOTORS](https://uamotors.github.io/)**! 🏎️

### Tecnologías Principales

Para trabajar en este proyecto, necesitas nociones básicas de:

- **[Astro](https://astro.build/):** El framework principal que usamos. Sirve para crear sitios súper rápidos.
- **[Tailwind CSS](https://tailwindcss.com/):** Para darle estilos a la página fácilmente mediante clases (_utility-first_).
- **JSON y TypeScript:** Usamos archivos `.json` para gestionar los textos bilingües (`es` / `en`), logros e información del equipo, y TypeScript para utilidades y configuración.

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

- **Rutas por idioma (`src/pages/` y `src/pages/en/`):** Cada archivo `.astro` define una ruta en español (raíz) o en inglés (`/en/*`) e importa su plantilla correspondiente.
- **Plantillas de páginas (`src/components/pages/`):** Aquí vive el contenido y diseño real de cada sección (`indexTemplate.astro`, `nosotrosTemplate.astro`, `proyectoTemplate.astro`, `logrosTemplate.astro`, `nuestros-aliadosTemplate.astro`, `contactoTemplate.astro`, `privacyTemplate.astro`, `404Template.astro`). Si necesitas modificar la estructura visual de una página, edítala aquí para que el cambio aplique en ambos idiomas.
- **Traducciones y Textos (`src/i18n/`):**
  - `src/i18n/es/` y `src/i18n/en/`: Diccionarios JSON anidados por sección (`esNosotros.json`, `enNosotros.json`, etc.).
  - `src/i18n/utils.ts`: Une los diccionarios y expone la función `useTranslations(lang)` para obtener textos mediante rutas con puntos (ej. `t("nosotros.meta.description")`).
  - **Logros / Noticias (`esLogros.json` y `enLogros.json`):** Para publicar un nuevo logro, agrégalo al arreglo `"items"` en ambos archivos JSON y coloca su imagen en `src/assets/images/`.
- **Datos del Equipo y Frases (`src/data/`):** Contiene `team.json` (integrantes y departamentos) y `quotes.json` (frases de la página 404).
- **Componentes (`src/components/`):** Piezas reutilizables de la interfaz (barra de navegación, botones, carrusel y componentes de logos de patrocinadores en `src/components/logos/` divididos en `gold/`, `silver/` y `bronze/`).
- **Íconos (`src/icons/`):** Íconos en formato `.astro` organizados en `general/` y `social_media/`.
- **Imágenes y Archivos Estáticos (`src/assets/` y `public/`):** Fotografías del monoplaza y logos optimizables van en `src/assets/`; fotos de perfil del equipo (`public/profiles/pictures/`), favicons y `llms.txt` van en `public/`.
- **Configuración Global (`src/site.config.ts`):** Enlaces de navegación, redes sociales, metadatos base y configuración general del sitio.

### Plantillas de GitHub (Issues y Pull Requests)

Para mantener el orden en el proyecto, GitHub te pedirá que uses nuestros formatos predeterminados:

- **¿Encontraste un error visual o de código?** Ve a la pestaña de _Issues_, dale a _New Issue_ y selecciona **Reporte de Bug**. Llenarás un formato con los pasos para reproducir el error.
- **¿Tienes una idea para una nueva sección?** Selecciona **Nueva Función / Mejora** para proponerla.
- **Pull Requests:** Al proponer tus cambios de código, se pre-llenará automáticamente una lista de verificación (checklist). Asegúrate de marcar todas las casillas aplicables para que tu código sea revisado y aprobado más rápido.

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

### Comandos de Git Frecuentes y Guía de Commits

Si trabajas desde la terminal, estos son los comandos que más utilizamos en el día a día dentro del proyecto, junto con sus variaciones:

#### 1. Consultar estado y actualizar tu código

- **`git status`**
  Muestra en qué rama estás, qué archivos modificaste y cuáles ya están listos (_staged_) para guardarse en un commit. Úsalo constantemente antes de cualquier acción.
- **`git pull origin main`**
  Descarga y fusiona los cambios más recientes de la rama `main` de GitHub hacia tu computadora.
  - _Recomendación:_ Ejecútalo siempre estando en `main` **antes** de crear una rama nueva para asegurarte de no trabajar sobre una versión vieja del sitio.
- **`git diff`**
  Muestra línea por línea qué cambios exactos hiciste en tus archivos antes de prepararlos con `git add`.

#### 2. Manejo de ramas (_Branches_)

- **`git branch`**
  Lista todas las ramas que tienes en tu computadora y marca con un asterisco (`*`) la rama en la que te encuentras actualmente.
  - _Variación:_ `git branch -a` muestra también las ramas remotas que existen en GitHub.
- **`git checkout <nombre-rama>`** _(o su variación moderna: **`git switch <nombre-rama>`**)_
  Sirve para moverte de una rama existente a otra (por ejemplo, `git checkout main`).
- **`git checkout -b <prefijo/nombre-rama>`** _(o su variación moderna: **`git switch -c <prefijo/nombre-rama>`**)_
  Crea una rama nueva a partir de donde estás y te cambia a ella inmediatamente.
  ```bash
  git checkout -b feat/actualizar-aliados
  # Equivalente moderno:
  git switch -c feat/actualizar-aliados
  ```

#### 3. Preparar archivos (_Staging Area_)

Antes de tomar hacer _commit_, debes elegir qué archivos incluir:

- **`git add .`**
  Prepara **todos** los archivos modificados o nuevos de la carpeta actual para el siguiente commit.
- **`git add <ruta-del-archivo>`** _(Variación recomendada cuando editaste varias cosas distintas)_
  Prepara únicamente el archivo o carpeta que le indiques. Muy útil para separar tus cambios en commits ordenados:
  ```bash
  git add src/data/team.json public/profiles/pictures/
  ```
- **`git restore --staged <ruta-del-archivo>`**
  Si hiciste `git add` por error a un archivo que todavía no querías incluir en el commit, este comando lo saca de la zona de preparación sin borrar tus cambios del código.

#### 4. Guardar cambios (`git commit`) y cómo escribir buenos mensajes

Un **commit** guarda formalmente tus cambios en el historial de tu rama. En **UAMOTORS** seguimos el estándar de _Conventional Commits_ para que el historial sea fácil de leer por todo el equipo.

##### Estructura del mensaje de commit:

```text
<tipo>(<alcance opcional>): <descripción breve y clara de lo que se hizo>
```

- **Tipos más usados en este repositorio (con dos puntos `:` en lugar de diagonal `/`):**
  - `feat:` (o `feature:`) — Cuando agregas algo nuevo visible o funcional (una sección, un logro, un botón).
  - `fix:` — Cuando corriges un error visual, un enlace roto, ortografía o un bug.
  - `refactor:` — Cuando mejoras o reorganizas el código/JSON sin cambiar cómo se ve o funciona el sitio por fuera.
  - `chore:` — Tareas de mantenimiento rutinarias: agregar un integrante a `team.json`, subir un SVG/imagen, o actualizar dependencias (`pnpm`).
  - `docs:` — Cambios exclusivos en documentación (`README.md`, `CONTRIBUTING.md`).
- **Alcance opcional `(sección)`:** Puedes especificar entre paréntesis qué parte del proyecto tocaste, por ejemplo `feat(logros):`, `fix(i18n):`, `feat(404):`.

##### Reglas para redactar el mensaje:

1. **Sé específico sobre el "qué" y "dónde":** Evita mensajes vagos como `"cambios"`, `"arreglos"` o `"update"`.
   - ❌ Incorrecto: `git commit -m "cambios en json"`
   - ✅ Correcto: `git commit -m "fix(i18n): corregir ortografía y enlaces en esProyecto.json"`
   - ✅ Correcto: `git commit -m "chore: se agregó nuevo integrante a Project en team.json"`
   - ✅ Correcto: `git commit -m "feat(logros): actualizar títulos y descripciones de la sección Logros"`
2. **Un tema por commit:** Si actualizaste la lista de integrantes y además arreglaste un error en el menú de navegación, procura hacer dos commits separados en lugar de mezclar todo en uno solo.

##### Variaciones del comando `git commit`:

- **Mensaje estándar de una línea (`-m`):**
  ```bash
  git commit -m "feat(proyecto): actualizar línea de tiempo del monoplaza OP-26"
  ```
- **Mensaje con título y descripción detallada (múltiples `-m`):**
  Si el cambio es grande y requiere contexto adicional para quien revise tu Pull Request:
  ```bash
  git commit -m "refactor(i18n): estructurar diccionarios JSON de forma anidada" -m "Se actualizó utils.ts con getNestedValue para soportar llaves anidadas en es y en."
  ```
- **Corregir el último commit (`--amend`):**
  Si acabas de hacer un commit (y **aún no** has hecho `git push`) pero te equivocaste al escribir el mensaje o se te olvidó agregar un archivo:
  ```bash
  # Solo cambiar el texto del último mensaje:
  git commit --amend -m "fix(aliados): corregir escala del logo de patrocinador"
  ```

#### 5. Subir cambios y utilidades de emergencia

- **`git push origin <nombre-de-tu-rama>`**
  Sube los commits de tu rama local a GitHub.
  - _Variación:_ `git push -u origin <nombre-de-tu-rama>` vincula tu rama local con la de GitHub la primera vez que la subes; en los siguientes envíos de esa misma rama te bastará con escribir solo `git push`.
- **`git restore <ruta-del-archivo>`**
  Descarta los cambios que hayas hecho en un archivo (que aún no estén en `git add`) y lo regresa a como estaba en el último commit. **Úsalo con cuidado**, porque borra tus modificaciones locales en ese archivo.
- **`git stash`** y **`git stash pop`**
  Si estás a mitad de un cambio pero necesitas cambiarte urgentemente de rama sin hacer commit todavía, `git stash` guarda tus cambios en un "cajón temporal" dejando limpio tu espacio de trabajo, y `git stash pop` los recupera cuando regreses.

### Estilo de Código y Formato

Este proyecto incluye un archivo `prettier.config.js`. Si usas VS Code, te recomendamos fuertemente instalar la extensión de **Prettier** y configurarla para que formatee el código automáticamente al guardar (`Format on Save`). Esto asegura que todos escribamos el código ordenado, con los mismos espacios y limpieza visual.

---
