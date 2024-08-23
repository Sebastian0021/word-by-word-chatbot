import { useEffect, useState } from "react";

const SelectMenu = () => {
  const [selection, setSelection] = useState<string>();
  const [position, setPosition] = useState<Record<string, number>>();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState<string>();
  const [translatedExample, setTranslatedExample] = useState<string>();

  function onSelectStart() {
    setSelection(undefined);
  }

  function onSelectEnd() {
    const activeSelection = document.getSelection();
    const text = activeSelection?.toString();

    if (!activeSelection || !text) {
      setSelection(undefined);
      return;
    }

    setSelection(text);

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setPosition({
      x: rect.left + rect.width / 2 - 80 / 2,
      y: rect.top + window.scrollY + 30,
      width: rect.width,
      height: rect.height,
    });

    setShow(false);
  }

  function handleClick() {
    const activeSelection = document.getSelection();
    if (!activeSelection) return;

    setShow(true);
    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setPosition({
      x: rect.left + rect.width / 2 - 400 / 2,
      y: rect.top + window.scrollY + 30,
      width: rect.width,
      height: rect.height,
    });

    setLoading(true);

    const userMessage = `${
      activeSelection.focusNode?.textContent
    }{${activeSelection.toString()}}`;

    // console.log("userMessage", userMessage);

    const systemInstruction = `
      Full context: 
      Eres un traductor de inglés a español, te daré un texto y una o varias palabras, tu en base al contexto del texto me dirás la traducción de la palabra. Y luego me mencionarás un ejemplo de uso de esa misma palabra en un contexto diferente.

      Pasos:
      1. Entiende el contexto del texto
      2. Traduce la palabra que se encuentra rodiada al final del texto rediada entre corchetes con este formato = {palabra}
      3. Da un ejemplo del uso de esa misma palabra pero en un contexto cotidiano en inglés y luego la traducción del ejemplo

      Formato de entrada:

      Texto que contiene una palabra rodiada con corchetes al final del mismo para a traducir

      Formato de Salida:
      Texto plano en el que se mencione la traducción y el significado de la palabra y el ejemplo de uso en un contexto cotidiano diferente al texto

      Ejemplo de salida: 

      User: 
      In programming, a well-written function can make your code more modular and easier to understand.{function}

      Model: 
      {"translate": "La palabra 'function' en este contexto se traduce como 'función'. Aquí se refiere a un bloque de código que realiza una tarea específica y puede ser reutilizado.",

      "otherContext" : "En un contexto diferente, 'function' también puede referirse a un evento o actividad social, como una reunión o ceremonia. Por ejemplo, Inglés: 'The charity function was attended by many local celebrities." En español: "El evento benéfico fue atendido por muchas celebridades locales.' "}
      `;

    fetch("https://gemini-worker.sebastianalefuentespe.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage,
        systemInstruction,
        responseMimeType: "application/json",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Worker Error");
        }
        return response.json();
      })
      .then((data) => {
        const modelText = data.candidates[0].content.parts[0].text;
        const translations = JSON.parse(modelText);
        setTranslatedText(translations.translate);
        setTranslatedExample(translations.otherContext);
        setLoading(false);
      });
  }

  useEffect(() => {
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("mouseup", onSelectEnd);
  }, []);

  return (
    <div role="dialog" aria-labelledby="translate" aria-haspopup="dialog">
      {selection && position && (
        <div
          className={`
            absolute -top-2 left-0 ${
              show ? "w-[400px] h-[150px]" : "w-[80px] h-[30px]"
            } bg-slate-800 text-white rounded m-0
            before:absolute before:bottom-full before:left-1/2 before:-translate-x-2 before:h-0 before:w-0 before:border-x-[6px] before:border-x-transparent before:border-b-[8px] before:border-b-black
          `}
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          }}
        >
          {!show ? (
            <button
              className="flex w-full h-full justify-between items-center px-2"
              onClick={handleClick}
            >
              <span id="translate" className="text-xs">
                Translate
              </span>
              🤖
            </button>
          ) : (
            <div className="flex flex-col w-full h-full justify-between items-center p-2 overflow-auto gap-3 scroll-smooth">
              {loading ? (
                <span className="font-bold m-auto">Translating...</span>
              ) : (
                <>
                  <span className="font-bold mx-auto">Traducción</span>
                  <p>{translatedText}</p>
                  <span className="font-bold mx-auto">
                    Ejemplo en de uso en otro contexto
                  </span>
                  <p>{translatedExample}</p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectMenu;
