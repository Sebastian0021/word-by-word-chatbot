# <p align="center"> Word by Word - Chatbot 🤖</p> <p align="center">Cloudflare Worker ⚙️ </p>

## Descripción

Esta rama contiene el código del Cloudflare Worker que actúa como backend para la aplicación web "Word by Word". El worker se encarga de manejar las peticiones a la API de Gemini, permitiendo la comunicación entre la interfaz de usuario y los modelos de lenguaje de IA que impulsan el chatbot y la traducción contextual.

[Word by Word - Chatbot 🤖 (Página Web)](https://prompting-dy5.pages.dev/)

[Documentación del proyecto](https://docs.google.com/document/d/1ESBL2dXL67NWDc-PvoMXIfv_VOD1H1dkvOiEOUKysPE/edit?usp=sharing)

## Contenido

- `index.js`: Archivo principal del worker que contiene la lógica para manejar las solicitudes HTTP, interactuar con la API de Gemini y generar respuestas.
- `wrangler.toml`: Archivo de configuración para desplegar y gestionar el worker en Cloudflare.
- Otros archivos de configuración y dependencias (`.editorconfig`, `.gitignore`, `.prettierrc`, `package.json`, `package-lock.json`, `vitest.config.js`): Archivos necesarios para el desarrollo, pruebas y despliegue del worker.

## Funcionalidad principal

El worker realiza las siguientes tareas:

1. **Recibe solicitudes HTTP desde la aplicación web:** El worker escucha las solicitudes POST provenientes de la interfaz de usuario, que contienen el mensaje del usuario, el historial de la conversación y otros parámetros necesarios para interactuar con los modelos de lenguaje.
2. **Interactúa con la API de Gemini:** El worker utiliza la biblioteca `@google/generative-ai` para comunicarse con la API de Gemini, enviando las solicitudes del usuario y recibiendo las respuestas generadas por los modelos de lenguaje.
3. **Procesa las respuestas:** El worker puede realizar algún procesamiento adicional de las respuestas de la API antes de enviarlas de vuelta a la aplicación web.
4. **Envía respuestas a la aplicación web:** El worker devuelve las respuestas generadas por los modelos de lenguaje a la interfaz de usuario, permitiendo que el chatbot y la traducción contextual funcionen de manera fluida e interactiva.

## Configuración y Despliegue

Para desplegar y ejecutar este worker, necesitarás:

- Una cuenta de Cloudflare.
- La herramienta `wrangler` de Cloudflare instalada en tu máquina local.
- Una clave API de Gemini válida configurada como una variable de entorno llamada `GEMINI_API_KEY`.

Consulta la documentación oficial de Cloudflare Workers para obtener instrucciones detalladas sobre cómo configurar y desplegar el worker.

## 👨🏾‍💻 Autor

#### Sebastian Alejandro Peñaloza Fuentes

- [Linkedin](https://www.linkedin.com/in/sebastianpenalozafuentes/)
- [GitHub](https://github.com/Sebastian0021)

**¡Gracias por tu interés en Word by Word!**
