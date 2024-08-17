import { useState, useRef, useEffect } from "react";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "What are you interested in talking about? ",
    },
  ]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemInstruction =
    "Eres un profecional del inglés, y te van  a utilizar personas hispanohablantes para mejorar sus habilidades en el idioma inglés contigo. Intentarán mantener una conversación en inglés contigo y tu cada vez que tengan un error gramatical le recomendarás que lo corrija. Siempre hablaras en inglés, no podes hablar en español. Pero los usuarios si te pueden mezclar los idiomas inglés y español. Cada que te hablen  en español les diras como se escribe eso que dijo en español en inglés. Todo el tiempo mantendrás una conversación con el usuario y sacaras temas para que pueda practicar la escritura en inglés.";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  interface Message {
    role: string;
    text: string;
  }

  const messagesElements = messages.map((message: Message) => {
    const margin = message.role === "bot" ? "mr-auto" : "ml-auto";
    return (
      <div className={`my-2 ${margin} flex flex-col`}>
        <span className={`text-xs ${margin} text-slate-300`}>
          {message.role}
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

    if (e.target[0].value === "") return;

    setLoading(true);
    const userMessage = {
      role: "user",
      text: e.target[0].value,
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
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Worker Error");
        }
        return response.json();
      })
      .then((data) => {
        const botMessage = {
          role: "bot",
          text: data.text,
        };

        setHistory([
          ...history,
          { role: "user", parts: [{ text: userMessage.text }] },
          { role: "model", parts: [{ text: data.text }] },
        ]);

        setMessages([...messages, userMessage, botMessage]);
        setLoading(false);
      });

    e.target[0].value = "";
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-slate-950">
      <h1 className="text-white mb-1 text-lg font-semibold">
        Practice your english!
      </h1>
      <div className="flex flex-col bg-slate-400 h-4/5 w-1/2 text-white rounded-lg shadow-2xl">
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
          <div>
            <input
              type="text"
              name=""
              id=""
              className="w-[90%] rounded-bl-lg px-2"
            />
            <button className="mx-auto w-[10%]">Send</button>
          </div>
        </form>
      </div>
    </main>
  );
}
