# JUST ROLL

Plataforma web de consulta y aprendizaje sobre **Teamfight Tactics (TFT)**, desarrollada con Angular y TypeScript. Reúne composiciones de equipo, posicionamiento de unidades, tutoriales interactivos y noticias en una misma aplicación.

**Sitio web:** [justroll-electiva.vercel.app](https://justroll-electiva.vercel.app)  
**Repositorio:** [Luciana-Cuenca/JustRoll-Electiva](https://github.com/Luciana-Cuenca/JustRoll-Electiva)

## Contenido

- [Descripción del proyecto](#descripción-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Comandos principales](#comandos-principales)
- [Arquitectura](#arquitectura)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Flujo de datos y estado](#flujo-de-datos-y-estado)
- [Rutas](#rutas)
- [Modelos de dominio](#modelos-de-dominio)
- [Estilos y recursos](#estilos-y-recursos)
- [Interacción y accesibilidad](#interacción-y-accesibilidad)
- [Pruebas y calidad](#pruebas-y-calidad)
- [Compilación de producción](#compilación-de-producción)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Guía de mantenimiento](#guía-de-mantenimiento)
- [Alcance y limitaciones](#alcance-y-limitaciones)
- [Solución de problemas](#solución-de-problemas)
- [Créditos y licencia](#créditos-y-licencia)

## Descripción del proyecto

JUST ROLL facilita la consulta de estrategias y contenido educativo de TFT. Su organización permite pasar de una visión general de las composiciones a sus unidades, objetos y distribución en el tablero, además de estudiar conceptos mediante tutoriales con preguntas de comprobación.

La aplicación se ejecuta en el navegador como una **Single Page Application (SPA)**. Se distribuye como un único sitio estático y consulta catálogos definidos en archivos TypeScript dentro del proyecto.

## Funcionalidades

### Inicio

- Presentación principal y accesos a las secciones.
- Composiciones destacadas.
- Sección de aprendizaje.
- Resumen de noticias.
- Navegación y pie de página compartidos.

### Composiciones

- Listado organizado por rangos **S, A, B, C y X**.
- Tarjetas con información de cada estrategia.
- Ventana de detalle con el contenido disponible para cada composición.
- Campeones, rasgos, objetos recomendados y roles de las unidades.
- Tablero hexagonal para representar posiciones y equipamiento.
- Apertura de una composición mediante el parámetro de URL `id`.

### Tutoriales

- Contenido agrupado por niveles de aprendizaje.
- Tarjetas con título, descripción y tiempo de lectura.
- Visor de lectura con navegación anterior y siguiente.
- Bloques de texto, títulos, listas, pasos, tablas, imágenes y glosarios.
- Consejos y errores frecuentes.
- Cuestionarios con selección de respuestas, confirmación y explicación.

### Noticias

- Artículos agrupados por set.
- Selector de set y artículo destacado.
- Tarjetas y visor de lectura.
- Navegación entre artículos del set seleccionado.
- Selección inicial de set mediante el fragmento de la URL.

## Tecnologías

Las versiones declaradas se pueden consultar en `package.json` y `package-lock.json`.

| Tecnología          | Versión declarada   | Uso                                           |
| ------------------- | ------------------- | --------------------------------------------- |
| Angular             | 22.1.4              | Componentes, servicios e interfaz             |
| Angular Router      | 22.1.4              | Navegación y carga diferida                   |
| Angular CLI / Build | 22.1.6              | Desarrollo y compilación                      |
| TypeScript          | ~6.0.2              | Tipado estático                               |
| RxJS                | ~7.8.0              | Flujos de eventos y suscripciones             |
| CSS                 | —                   | Diseño, distribución y adaptación a pantallas |
| Node.js Test Runner | Incluido en Node.js | Ejecución de pruebas                          |
| JSDOM               | ^28.1.0             | Entorno DOM para pruebas                      |
| esbuild             | ^0.28.2             | Preparación de código para pruebas            |
| Prettier            | ^3.8.1              | Formato del código y documentación            |
| Vercel              | —                   | Alojamiento y despliegue                      |

## Requisitos

- **Node.js:** una versión compatible con las dependencias Angular instaladas. Angular Core declara `^22.22.3`, `^24.15.0` o `>=26.0.0`; comprobar también los requisitos del CLI al cambiar de versión.
- **npm:** el proyecto declara `npm@11.16.0` como gestor de paquetes.
- **Git:** para clonar y actualizar el repositorio.
- Navegador moderno con JavaScript habilitado.
- Conexión a Internet para instalar dependencias y cargar los recursos externos utilizados por el sitio.

Comprobar las herramientas disponibles:

```bash
node --version
npm --version
git --version
```

## Instalación y ejecución

### 1. Obtener el proyecto

```bash
git clone https://github.com/Luciana-Cuenca/JustRoll-Electiva.git
cd JustRoll-Electiva
git switch main
```

### 2. Instalar dependencias

```bash
npm ci
```

`npm ci` instala las versiones resueltas en `package-lock.json`. Utilizar `npm install` cuando se necesite modificar las dependencias y actualizar el archivo de bloqueo.

### 3. Iniciar el servidor de desarrollo

```bash
npm start
```

Abrir [http://localhost:4200](http://localhost:4200).

También está disponible:

```bash
npm run dev
```

El servidor recompila la aplicación cuando se guardan cambios. Para detenerlo, presionar `Ctrl+C`.

## Comandos principales

| Comando                      | Descripción                                          |
| ---------------------------- | ---------------------------------------------------- |
| `npm ci`                     | Instala las dependencias según el archivo de bloqueo |
| `npm start`                  | Inicia el servidor de desarrollo                     |
| `npm run dev`                | Inicia el mismo servidor de desarrollo               |
| `npm run build`              | Genera la compilación de producción                  |
| `npm run watch`              | Compila en modo desarrollo y observa cambios         |
| `npm run typecheck`          | Comprueba los tipos sin generar archivos             |
| `npm test`                   | Compila y ejecuta las pruebas de interacción         |
| `npm run format`             | Aplica Prettier a TypeScript, pruebas y README       |
| `npm run format:check`       | Comprueba el formato sin modificar archivos          |
| `npm run ng -- <argumentos>` | Ejecuta comandos del CLI local de Angular            |

## Arquitectura

El proyecto utiliza una **arquitectura monolítica modular de frontend**: existe una sola aplicación y un único artefacto de despliegue, con responsabilidades distribuidas por funcionalidad.

Los componentes son **standalone**. La modularidad se expresa mediante carpetas, contratos e importaciones explícitas; no requiere organizar la aplicación con `NgModule`.

### Arranque y navegación

- `src/main.ts` inicia la aplicación.
- `app.config.ts` registra la configuración global y el router.
- `app.component.ts` compone la navegación, el área de rutas y el pie de página.
- `app.routes.ts` define las páginas y utiliza `loadComponent` para cargar sus componentes de forma diferida.

### Capa principal: `core`

Agrupa el layout compartido, los catálogos de datos y la página de ruta desconocida.

Los servicios `CompositionCatalog`, `TutorialCatalog` y `NewsCatalog` se registran con `providedIn: 'root'`. Centralizan la consulta de los datos, por ejemplo, la búsqueda por identificador o la agrupación por rango, nivel o set.

### Funcionalidades: `features`

Cada área contiene su página y sus componentes específicos:

| Funcionalidad  | Responsabilidad                                          |
| -------------- | -------------------------------------------------------- |
| `home`         | Composición de las secciones de inicio                   |
| `compositions` | Rangos, tarjetas, detalles, campeones, objetos y tablero |
| `tutorials`    | Niveles, lectura, bloques y cuestionarios                |
| `news`         | Sets, tarjetas, artículos y bloques de lectura           |

Las funcionalidades no importan componentes de otras funcionalidades. Comparten contratos y utilidades mediante `shared`, y obtienen datos a través de `core/data`.

### Elementos compartidos: `shared`

- `models`: interfaces y uniones de tipos que describen el contenido.
- `ui`: comportamiento reutilizable de las ventanas modales y funciones auxiliares de presentación.

Los modelos no dependen de componentes visuales. Esto permite utilizarlos en catálogos, servicios y componentes sin incorporar lógica de interfaz al dominio.

### Principios de organización

- Componentes con responsabilidades concretas.
- Datos tipados separados de las plantillas.
- Consultas de catálogo centralizadas en servicios.
- Comunicación explícita mediante entradas y salidas.
- Estado de selección gestionado por la página correspondiente.
- Estrategia `OnPush` para controlar la actualización de los componentes.
- Comportamiento común de los modales centralizado en una directiva.

## Estructura de carpetas

| Ruta                             | Contenido                                            |
| -------------------------------- | ---------------------------------------------------- |
| `src/main.ts`                    | Punto de entrada                                     |
| `src/index.html`                 | Documento HTML principal                             |
| `src/app/app.component.ts`       | Componente raíz                                      |
| `src/app/app.config.ts`          | Proveedores y configuración global                   |
| `src/app/app.routes.ts`          | Definición de rutas                                  |
| `src/app/core/layout/`           | Navbar y footer                                      |
| `src/app/core/data/`             | Servicios y catálogos tipados                        |
| `src/app/core/data/tutorial/`    | Contenido de tutoriales por nivel                    |
| `src/app/core/not-found/`        | Página de ruta desconocida                           |
| `src/app/features/home/`         | Página de inicio y sus secciones                     |
| `src/app/features/compositions/` | Interfaz de composiciones                            |
| `src/app/features/tutorials/`    | Interfaz de aprendizaje                              |
| `src/app/features/news/`         | Interfaz de noticias                                 |
| `src/app/shared/models/`         | Contratos de datos                                   |
| `src/app/shared/ui/`             | Directiva modal y utilidades                         |
| `src/styles.css`                 | Entrada global de estilos                            |
| `src/styles/`                    | Hojas CSS por área visual                            |
| `src/assets/`                    | Recursos referenciados desde el código y los estilos |
| `public/`                        | Recursos públicos copiados al directorio de salida   |
| `tests/`                         | Pruebas automatizadas                                |
| `angular.json`                   | Configuración del workspace y compilación            |
| `tsconfig.json`                  | Configuración base de TypeScript                     |
| `tsconfig.app.json`              | Configuración TypeScript de la aplicación            |
| `package.json`                   | Dependencias y scripts                               |
| `package-lock.json`              | Versiones resueltas de dependencias                  |

## Flujo de datos y estado

Una interacción de consulta sigue esta secuencia:

1. El router carga la página solicitada.
2. La página obtiene el catálogo mediante inyección de dependencias.
3. El servicio expone o filtra los datos tipados.
4. La página envía los datos a tarjetas, listas o visores mediante entradas.
5. Los componentes de presentación emiten eventos de interacción.
6. La página actualiza su selección y muestra el detalle correspondiente.

El estado es local y se conserva en memoria mientras los componentes permanecen activos. Por ejemplo, la composición seleccionada pertenece a la página de composiciones y las respuestas del cuestionario pertenecen a su componente.

Los parámetros de ruta que utilizan suscripciones se gestionan con `takeUntilDestroyed` para finalizar la suscripción cuando se destruye el componente.

## Rutas

| URL                        | Comportamiento                                                  |
| -------------------------- | --------------------------------------------------------------- |
| `/`                        | Página de inicio                                                |
| `/composiciones`           | Catálogo por rangos                                             |
| `/composiciones?id=1`      | Abre el detalle si existe una composición con ese identificador |
| `/tutoriales`              | Tutoriales y cuestionarios                                      |
| `/noticias`                | Noticias del set predeterminado                                 |
| `/noticias#set-19`         | Selecciona el set identificado como `set-19` al abrir la página |
| `/guias`                   | Redirige a `/noticias`                                          |
| Cualquier ruta no definida | Muestra la página de ruta desconocida                           |

El alojamiento debe devolver `index.html` para las rutas de la SPA. Esto permite recargar una página interna o abrirla desde un enlace externo.

La página de ruta desconocida se resuelve en el navegador. Con la configuración estática de la SPA, el servidor puede responder HTTP 200 aunque la interfaz muestre una página 404.

## Modelos de dominio

Los contratos se encuentran en `src/app/shared/models/content.models.ts`.

| Modelo          | Representa                                                  |
| --------------- | ----------------------------------------------------------- |
| `Composition`   | Estrategia, rango, unidades, objetos y contenido de detalle |
| `Champion`      | Campeón, coste, imagen y rasgos                             |
| `Trait`         | Rasgo y datos de activación                                 |
| `Item`          | Identificador, nombre e imagen de un objeto                 |
| `BoardPosition` | Campeón, fila, columna y objetos asignados                  |
| `BoardUnit`     | Información del campeón junto con su posición               |
| `ChampionRole`  | Rol y equipamiento de una unidad                            |
| `Tier`          | Rango y descripción                                         |
| `Tutorial`      | Nivel, orden, contenido y cuestionario                      |
| `TutorialLevel` | Metadatos de un nivel de aprendizaje                        |
| `QuizQuestion`  | Enunciado, opciones, índice de respuesta y explicación      |
| `ContentBlock`  | Unión de los bloques admitidos en el contenido              |
| `NewsSet`       | Información de un set                                       |
| `NewsArticle`   | Artículo, categoría, set y bloques de contenido             |

`ContentBlock` utiliza un discriminante `type`. Cada variante define sus campos, lo que permite renderizar títulos, texto, listas, pasos, glosarios, imágenes y tablas con contratos explícitos.

## Estilos y recursos

La entrada global `src/styles.css` importa las hojas de estilo en este orden:

1. `global.css`.
2. `navbar.css`.
3. `home.css`.
4. `Compositions.css`.
5. `tutorials.css`.
6. `news.css`.

El orden forma parte de la cascada CSS y debe revisarse al modificar estilos compartidos.

Los componentes utilizan hosts con `display: contents` donde corresponde para integrar sus elementos en la distribución de la página. Conviene comprobar sus efectos al introducir contenedores o reglas de layout.

Los archivos de `public/` se sirven desde la raíz del sitio: por ejemplo, `public/favicon.svg` se solicita como `/favicon.svg`.

La aplicación también utiliza fuentes e imágenes externas. Su disponibilidad depende de la conexión del usuario y de los servidores que las alojan.

## Interacción y accesibilidad

La directiva `jrModal`, definida en `shared/ui/modal.directive.ts`, concentra el ciclo de vida de los diálogos:

- Bloquea el desplazamiento del documento al abrir el modal.
- Coloca el foco inicial en un botón disponible.
- Emite una solicitud de cierre al presionar `Escape`.
- Gestiona el recorrido con `Tab` y `Shift+Tab` entre los elementos enfocables contemplados por la directiva.
- Restaura el desplazamiento y el foco previo al destruirse.

Al modificar un diálogo, comprobar el orden de foco, los nombres accesibles de los controles y la navegación por teclado. La existencia de estas medidas no sustituye una auditoría completa de accesibilidad.

## Pruebas y calidad

### Comprobar tipos

```bash
npm run typecheck
```

### Ejecutar las pruebas de interacción

```bash
npm test
```

Este comando compila la aplicación y ejecuta `tests/app.test.mjs` mediante Node.js Test Runner. Las pruebas utilizan JSDOM y comprueban:

- Renderizado de las secciones de inicio y navegación.
- Tarjetas de composiciones, enlaces directos y tablero.
- Apertura y cierre de detalles, teclado y restauración del scroll.
- Lectura de tutoriales, confirmación de respuestas y navegación.
- Selección de sets y navegación entre artículos.
- Redirecciones y rutas desconocidas.

### Comprobar formato

```bash
npm run format:check
```

Para aplicar el formato:

```bash
npm run format
```

### Comprobación recomendada antes de integrar cambios

```bash
npm ci
npm run typecheck
npm test
npm run format:check
```

Las pruebas de DOM verifican comportamiento y estructura. La revisión de distribución, tamaños de pantalla, imágenes y contraste debe complementarse en un navegador.

## Compilación de producción

```bash
npm run build
```

Los archivos que se publican se generan en:

```text
dist/justroll-angular/browser
```

La compilación produce el HTML principal, JavaScript, CSS y recursos estáticos. Las páginas utilizan carga diferida para distribuir su código en fragmentos independientes.

La configuración de producción optimiza scripts y estilos. La incrustación de CSS crítico y fuentes está desactivada en la configuración incluida. La caché persistente del CLI también se encuentra desactivada.

Para probar la salida compilada, utilizar un servidor estático con fallback de SPA. Abrir `index.html` mediante `file://` no equivale a servir el sitio por HTTP.

## Despliegue en Vercel

El sitio está disponible en [https://justroll-electiva.vercel.app](https://justroll-electiva.vercel.app).

### Configuración

| Ajuste                       | Valor                           |
| ---------------------------- | ------------------------------- |
| Framework                    | Angular                         |
| Instalación                  | `npm ci`                        |
| Compilación                  | `npm run build`                 |
| Directorio público de salida | `dist/justroll-angular/browser` |
| Entorno                      | Producción                      |

Para configurar las rutas en un nuevo despliegue, incluir este archivo `vercel.json` en la raíz si todavía no existe:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "angular",
  "buildCommand": "npm run build",
  "outputDirectory": "dist/justroll-angular/browser",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Publicar mediante CLI

Ejecutar desde una copia de trabajo de `main` actualizada y sin cambios pendientes que deban conservarse:

```bash
git switch main
git pull --ff-only origin main
npm ci
npm test
npx --yes vercel@latest login
npx --yes vercel@latest link --project justroll-electiva
npx --yes vercel@latest deploy --prod
```

Seleccionar la cuenta o equipo propietario del proyecto durante la vinculación. La CLI publica los archivos de la carpeta local desde la que se ejecuta, por lo que hay que comprobar la rama y el estado de los cambios antes de desplegar.

Un despliegue manual mediante CLI no configura por sí mismo el despliegue automático desde GitHub. Esa integración se administra por separado en Vercel.

### Verificación posterior

- Abrir la URL de producción.
- Entrar directamente a `/composiciones`, `/tutoriales` y `/noticias`.
- Recargar cada página interna.
- Abrir detalles y comprobar navegación y cuestionarios.
- Verificar imágenes, fuentes, estilos y consola del navegador.
- Revisar la visualización en escritorio y móvil.

## Guía de mantenimiento

### Añadir o actualizar composiciones

1. Revisar el contrato `Composition`.
2. Actualizar el catálogo correspondiente en `core/data/compositionsTierList.ts`.
3. Incorporar campeones u objetos faltantes a sus catálogos.
4. Utilizar identificadores coherentes para unidades, objetos y posiciones del tablero.
5. Actualizar `core/data/compositions.ts` si la composición debe aparecer entre las destacadas.
6. Comprobar tarjeta, detalle, tablero y enlace por `id`.

### Añadir tutoriales

1. Revisar los tipos `Tutorial`, `ContentBlock` y `QuizQuestion`.
2. Incorporar el contenido al archivo de nivel en `core/data/tutorial/`.
3. Revisar su exportación y agrupación en `core/data/tutorials.ts`.
4. Asignar un identificador único y un orden dentro del nivel.
5. Verificar que `answer` corresponda al índice de la opción correcta, comenzando en cero.
6. Probar lectura, cuestionario y navegación anterior/siguiente.

### Añadir noticias

1. Revisar `NewsArticle` y `NewsSet`.
2. Actualizar `core/data/news.ts`.
3. Asociar cada artículo al identificador de un set existente.
4. Revisar el marcado `featured` para obtener el artículo destacado esperado.
5. Comprobar tarjetas, detalle y navegación entre artículos.

### Añadir una página

1. Crear su carpeta dentro de `features/`.
2. Definir un componente standalone de página y separar sus componentes de presentación cuando resulte útil.
3. Registrar la ruta con `loadComponent` en `app.routes.ts`.
4. Añadir un enlace en el layout si la página debe estar en la navegación principal.
5. Reutilizar contratos y utilidades compartidas sin importar componentes de otra funcionalidad.
6. Añadir verificaciones acordes con el comportamiento incorporado.

### Convenciones de trabajo

- Mantener los contratos tipados y las responsabilidades separadas.
- Evitar duplicar catálogos o lógica de consulta en componentes.
- Mantener nombres descriptivos para clases, métodos y archivos.
- Revisar la cascada global al introducir selectores CSS.
- Utilizar commits centrados en una funcionalidad o corrección concreta.
- Ejecutar las comprobaciones de tipos, pruebas y formato antes de abrir un pull request.
- No incorporar credenciales, tokens ni archivos privados al repositorio.

## Alcance y limitaciones

- La solución actual es un frontend estático con datos incluidos en el código.
- No incorpora API propia, base de datos, autenticación ni panel de administración.
- Los cambios de catálogo requieren actualizar el código y generar un nuevo despliegue.
- Las respuestas de los cuestionarios y las selecciones de interfaz no tienen persistencia duradera.
- Los rangos y recomendaciones son contenido del catálogo; no se calculan a partir de estadísticas en tiempo real.
- Los recursos externos requieren conectividad.
- No se necesitan variables de entorno para el funcionamiento básico de la aplicación.

## Solución de problemas

| Problema                                      | Acción recomendada                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `vercel: command not found`                   | Utilizar `npx --yes vercel@latest` en lugar del comando global                             |
| El puerto 4200 está ocupado                   | Ejecutar `npm start -- --port 4300`                                                        |
| Node.js no es compatible                      | Revisar los requisitos declarados por Angular y el CLI e instalar una versión compatible   |
| Fallan las dependencias con `npm ci`          | Comprobar que `package.json` y `package-lock.json` pertenecen al mismo estado del proyecto |
| Una ruta interna devuelve 404 al recargar     | Revisar el fallback hacia `index.html` en el alojamiento                                   |
| Vercel publica una carpeta incorrecta         | Configurar `dist/justroll-angular/browser` como directorio de salida                       |
| No carga una imagen                           | Comprobar la ruta pública, las mayúsculas y la disponibilidad del recurso remoto           |
| Cambios de estilo afectan varias páginas      | Revisar los selectores globales y el orden de importación de CSS                           |
| Una composición no se abre mediante `id`      | Verificar que su identificador exista en el catálogo consultado                            |
| Las pruebas no encuentran la salida compilada | Ejecutar `npm test`, que incluye la compilación previa                                     |

## Créditos y licencia

JUST ROLL es un proyecto de consulta y aprendizaje sobre TFT. Los nombres, marcas e imágenes del juego pertenecen a sus respectivos titulares. Su uso en la interfaz no implica afiliación oficial.

Este documento no concede una licencia sobre el código ni sobre los recursos de terceros. Consultar el archivo `LICENSE` si está disponible y las condiciones de los titulares antes de redistribuir contenido.
