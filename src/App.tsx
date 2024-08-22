import Chat from "./components/Chat/Chat";
import SelectMenu from "./components/Chat/SelectMenu";

export default function App() {
  return (
    <main className="flex flex-col justify-center items-center h-screen bg-slate-950">
      <SelectMenu />
      <Chat />
    </main>
  );
}
