import { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Let's speak in English and I will correct your mistakes! 🤖",
    },
  ]);

  interface Message {
    role: string;
    text: string;
  }

  interface History {
    role: string;
    parts: { text: string }[];
  }

  const [history, setHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // console.log(history);

  const systemInstruction = `
    Eres un profesional del inglés, y te van a utilizar personas hispanohablantes para mejorar sus habilidades en el idioma inglés. Intentarán mantener una conversación en inglés contigo y tu cada vez que tengan un error gramatical le dirás cual fue el error y cómo se corrije. Siempre hablarás en inglés, no podes hablar en español. Pero los usuarios si te pueden mezclar los idiomas inglés y español. Cada que te hablen en español les dirás como se escribe eso que dijo en español en inglés. Todo el tiempo mantendrás una conversación con el usuario y sacaras temas para que pueda practicar la escritura en inglés.

    Pasos:

    1. Entiende el texto y su contexto
    2. Evalua el historial del chat y si hay errores anteriores
    3. Evalua el nivel del usuario según los errores anteriores
    4. Ajusta tu respuesta al nivel del usuario y utiliza palabras con las que el usuario haya cometido errores
    5. Haz la corrección del texto del usuario si es necesario
    6. Sigue la conversación

    Formato de entrada:Texto del usuario

    Formato de Salida: Texto del modelo personalizado al nivel del usuario con correciones y siguiendo una conversación

    Ejemplos de salida (si se cometieron errores):

    Ejemplo 0

    User: "Hola, I want to learn English pero es dificil para me."

    Model: : "Hello! You said 'es dificil para me.' In English, it should be 'it is difficult for me.' What part of learning English do you find most challenging?"

    Ejemplo 1

    User: "Me gustaría aprender how to use phrasal verbs."

    Model: "You said 'Me gustaría aprender how to use phrasal verbs.' In English, that would be 'I would like to learn how to use phrasal verbs.' Are there any particular phrasal verbs you'd like to start with?"

    Ejemplo 2

    User: "My friend me dijo que no es tan difícil aprender inglés."

    Model: "You said 'My friend me dijo que no es tan difícil aprender inglés.' In English, that would be 'My friend told me that it's not so difficult to learn English.' How do you feel about learning English? Do you find it challenging?"

    Ejemplo 3

    User: "I want to mejorar my skills in writing."

    Model: "You said 'I want to mejorar my skills in writing.' In English, that would be 'I want to improve my skills in writing.' What kind of writing would you like to focus on—formal essays, creative writing, or something else?"

    Ejemplo 4

    User: "Mi objetivo es speak English fluently."

    Model: "You said 'Mi objetivo es speak English fluently.' In English, that would be 'My goal is to speak English fluently.' What steps are you currently taking to achieve fluency?"
    Ejemplos de salida (si no se cometieron errores):

    Ejemplo 0

    User: "I'm really excited to practice my English with you."

    Model: "That's great to hear! What specific areas of English would you like to focus on—speaking, writing, or maybe expanding your vocabulary?"

    Ejemplo 1

    User: "Yesterday, I watched a movie in English without subtitles."

    Model: "That’s impressive! How did you find the experience? Were you able to understand most of the dialogue, or did you find certain parts challenging?"
`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messagesElements = messages.map((message: Message) => {
    const margin = message.role === "bot" ? "mr-auto" : "ml-auto";
    return (
      <div key={crypto.randomUUID()} className={`my-2 ${margin} flex flex-col`}>
        <span className={`text-xs ${margin} text-slate-300`}>
          {`${message.role} ${message.role === "bot" ? "🤖" : ""}`}
        </span>
        <p
          className={`bg-slate-300 p-2 rounded-lg ${
            message.role === "bot" ? "rounded-tl-none" : "rounded-tr-none"
          } text-slate-900`}
        >
          {message.text}
        </p>
      </div>
    );
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;

    if (input.value === "" || loading) return;

    setLoading(true);
    const userMessage = {
      role: "user",
      text: input.value,
    };
    setMessages([...messages, userMessage]);

    fetch("https://gemini-worker.sebastianalefuentespe.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage: userMessage.text,
        history,
        systemInstruction,
        responseMimeType: "text/plain",
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

        // console.log(data);

        const botMessage = {
          role: "bot",
          text: modelText,
        };

        setHistory([
          ...history,
          { role: "user", parts: [{ text: userMessage.text }] },
          { role: "model", parts: [{ text: modelText }] },
        ]);

        setMessages([...messages, userMessage, botMessage]);
        setLoading(false);
      });

    input.value = "";
    input.blur();
  };

  return (
    <>
      <h1 className="text-white mb-1 md:text-3xl font-semibold text-2xl">
        Practice your english!
      </h1>
      <h2 className="text-gray-300 mb-1 md:text-lg text-sm text-center">
        If you don't understand a <strong>word</strong>, try to select it and
        translate it!
      </h2>
      <div className="flex flex-col bg-slate-400 h-4/5 w-10/12 md:w-1/2 text-white rounded-lg shadow-2xl">
        <div className=" flex flex-col overflow-y-auto p-2">
          {messagesElements}
          {loading && <p className="mr-auto text-xs">Bot typing...</p>}
          <div ref={messagesEndRef}></div>
        </div>
        <form
          action=""
          className="mt-auto bg-slate-300 text-black rounded-b-lg"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex">
            <input
              type="text"
              name=""
              id=""
              className="md:w-[95%] w-[90%] rounded-bl-lg px-2"
            />
            <button className="bg-white mx-auto md:w-[5%] w-[10%] flex justify-center items-center rounded-br-lg gap-1">
              {/* <span className="hidden md:block font-semibold">Send</span> */}
              <svg
                className="button__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                fill="#333"
              >
                <path
                  d="M14.2199 21.9352C13.0399 21.9352 11.3699 21.1052 10.0499 17.1352L9.32988 14.9752L7.16988 14.2552C3.20988 12.9352 2.37988 11.2652 2.37988 10.0852C2.37988 8.91525 3.20988 7.23525 7.16988 5.90525L15.6599 3.07525C17.7799 2.36525 19.5499 2.57525 20.6399 3.65525C21.7299 4.73525 21.9399 6.51525 21.2299 8.63525L18.3999 17.1252C17.0699 21.1052 15.3999 21.9352 14.2199 21.9352ZM7.63988 7.33525C4.85988 8.26525 3.86988 9.36525 3.86988 10.0852C3.86988 10.8052 4.85988 11.9052 7.63988 12.8252L10.1599 13.6652C10.3799 13.7352 10.5599 13.9152 10.6299 14.1352L11.4699 16.6552C12.3899 19.4352 13.4999 20.4252 14.2199 20.4252C14.9399 20.4252 16.0399 19.4352 16.9699 16.6552L19.7999 8.16525C20.3099 6.62525 20.2199 5.36525 19.5699 4.71525C18.9199 4.06525 17.6599 3.98525 16.1299 4.49525L7.63988 7.33525Z"
                  fill=""
                ></path>
                <path
                  d="M10.11 14.7052C9.92005 14.7052 9.73005 14.6352 9.58005 14.4852C9.29005 14.1952 9.29005 13.7152 9.58005 13.4252L13.16 9.83518C13.45 9.54518 13.93 9.54518 14.22 9.83518C14.51 10.1252 14.51 10.6052 14.22 10.8952L10.64 14.4852C10.5 14.6352 10.3 14.7052 10.11 14.7052Z"
                  fill=""
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
