# UAMOTORS | Sitio Web Oficial

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="src/assets/logos/tira-uamotors-white.svg">
  <source media="(prefers-color-scheme: light)" srcset="src/assets/logos/tira-uamotors.svg">
  <img alt="UAMOTORS Logo" src="src/assets/logos/tira-uamotors.svg" width="100%">
</picture>

<br />

[**UAMOTORS**](https://uamotors.github.io/) es el equipo oficial de Formula SAE de la [**Universidad Autónoma Metropolitana**](https://www.uam.mx/). 
Este repositorio contiene el código fuente de nuestra página web oficial, donde compartimos nuestra historia, el desarrollo de nuestro monoplaza **OP01**, y nuestra colaboración con aliados estratégicos.

## Tecnologías (Tech Stack)

Este proyecto está construido con herramientas modernas de desarrollo web, enfocadas en máximo rendimiento, tiempos de carga mínimos y animaciones fluidas:

- **[Astro](https://astro.build/)** - Framework web enfocado en la generación de sitios estáticos (SSG) súper rápidos.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utilidades de estilos para el diseño visual, soporte nativo de modo oscuro (Dark Mode) y *Glassmorphism*.
- **Vanilla JS & HTML5 Canvas** - Lógica nativa para animaciones avanzadas, *Easter Eggs* interactivos (Harness Design, Dewesoft) y soporte de pantallas Retina/High-DPI.
- **[Swup](https://swup.js.org/) / Astro View Transitions** - Integración para una navegación ultra-rápida tipo *Single Page Application* (SPA) sin recargar la página.

## Desarrollo Local

El mantenimiento de este sitio web está a cargo del equipo [**UAMOTORS**](https://uamotors.github.io/).

Para ejecutar o probar este proyecto de forma local, sigue estos pasos:

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/UAMOTORS/uamotors.github.io.git
   cd uamotors.github.io
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:4321` para ver los cambios en tiempo real.

4. **Compilar para producción (Opcional)**
   ```bash
   npm run build
   ```
   Esto generará el sitio estático optimizado en la carpeta `dist/`.

## Licencia y Uso

El código fuente (scripts y estructura base) de este sitio está inspirado en la plantilla [Space Ahead](https://github.com/christian-luntok/astro-space-ahead), por lo que su estructura subyacente se rige bajo la licencia [GNU GPL v3](/LICENSE).

> **Aviso de Propiedad Intelectual:**
> A pesar de la licencia de código abierto de la plantilla, el contenido textual, artículos, diseño final, fotografías, logotipos (incluyendo la identidad gráfica de [**UAMOTORS**](https://uamotors.github.io/) y de la [**Universidad Autónoma Metropolitana**](https://www.uam.mx/)) y el material de ingeniería presentes en este repositorio son **propiedad intelectual exclusiva de la [Universidad Autónoma Metropolitana](https://www.uam.mx/), del equipo [UAMOTORS](https://uamotors.github.io/) y sus aliados/patrocinadores**. 
> **Queda estrictamente prohibida** su redistribución, copia, plagio o uso (comercial o académico) por parte de terceros sin autorización explícita por escrito de la dirección del equipo.

## Desarrollo

Desarrollado por [**Alejandro Ramírez**](https://github.com/lexrammart), integrante del Departamento de Electrónica de [**UAMOTORS**](https://uamotors.github.io/).