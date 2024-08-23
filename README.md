# <p align="center">Word by Word - Chatbot 🤖<p align="center">Aplicación Web 🌐</p>

## Descripción

Esta rama contiene el código fuente de la aplicación web interactiva "Word by Word - Chatbot 🤖", que permite a los usuarios practicar su inglés a través de un chatbot impulsado por Inteligencia Artificial y obtener traducciones contextualizadas de palabras y frases en inglés.

[Word by Word - Chatbot 🤖 (Página Web)](https://prompting-dy5.pages.dev/)

[Documentación del proyecto](https://docs.google.com/document/d/1ESBL2dXL67NWDc-PvoMXIfv_VOD1H1dkvOiEOUKysPE/edit?usp=sharing)

## Características Principales

- **Chatbot interactivo:** Practica tu inglés escrito en un entorno seguro y estimulante. El chatbot te ayudará a:

  - Corregir errores gramaticales y ortográficos.
  - Ampliar tu vocabulario y expresiones idiomáticas.
  - Mantener conversaciones fluidas y naturales en inglés.
  - Adaptarse a tu nivel de inglés y ofrecerte sugerencias personalizadas.
  - Traducir tus mensajes del español al inglés si lo necesitas.
  - Proponer temas de conversación interesantes para practicar.

- **Traducción contextual:** Obtén traducciones precisas y ejemplos de uso de palabras y frases en inglés directamente en la página. Simplemente selecciona el texto que deseas traducir y aparecerá un recuadro con la información.

## Tecnologías Utilizadas

- **TypeScript:** Lenguaje de programación que añade tipado estático a JavaScript, mejorando la mantenibilidad y la detección temprana de errores.
- **React:** Biblioteca de JavaScript líder para construir interfaces de usuario interactivas y dinámicas.
- **Tailwind CSS:** Framework de CSS de utilidad que permite un diseño rápido y flexible de la interfaz de usuario.
- **Vite:** Herramienta de desarrollo frontend que ofrece una experiencia de desarrollo rápida y eficiente, con recarga en caliente y otras características útiles.
- **Gemini API:** Proporciona acceso a modelos de lenguaje avanzados de Google para impulsar el chatbot y la traducción contextual.
- **Cloudflare Workers:** Plataforma sin servidor que actúa como backend para manejar las peticiones a la API de Gemini y otras tareas de procesamiento.

## Estructura del Proyecto

- `src/components/Chat/Chat.tsx`: Componente principal del chatbot, responsable de la interfaz de usuario, la interacción con el usuario y la comunicación con el Cloudflare Worker para obtener respuestas del modelo de lenguaje.
- `src/components/Chat/SelectMenu.tsx`: Componente que maneja la funcionalidad de traducción contextual, detectando la selección de texto del usuario y mostrando la traducción y ejemplos de uso.
- `src/App.tsx`: Componente principal de la aplicación, que renderiza el chatbot y la funcionalidad de traducción contextual.
- Otros archivos de configuración y dependencias: Archivos necesarios para el desarrollo, pruebas y despliegue de la aplicación web.

## 👨🏾‍💻 Autor

#### Sebastian Alejandro Peñaloza Fuentes

- [Linkedin](https://www.linkedin.com/in/sebastianpenalozafuentes/)
- [GitHub](https://github.com/Sebastian0021)

**¡Gracias por tu interés en Word by Word!**
