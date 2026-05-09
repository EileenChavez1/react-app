import { useState } from "react";
import BookItem from "./BookItem";

const DARK_KEY = "darkMode";
const BOOKS_KEY = "books";

function load<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  return raw !== null ? JSON.parse(raw) : fallback;
}

export default function App() {
  const [dark, setDark] = useState<boolean>(() => load(DARK_KEY, false));
  const [books, setBooks] = useState<string[]>(() => load(BOOKS_KEY, []));
  const [input, setInput] = useState("");

  function toggleDark() {
    setDark((prev) => {
      localStorage.setItem(DARK_KEY, JSON.stringify(!prev));
      return !prev;
    });
  }

  function addBook() {
    if (!input.trim()) return;
    const next = [...books, input.trim()];
    setBooks(next);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(next));
    setInput("");
  }

  function removeBook(i: number) {
    const next = books.filter((_, idx) => idx !== i);
    setBooks(next);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(next));
  }

  const bg = dark ? "#111" : "#fff";
  const color = dark ? "#eee" : "#111";

  return (
    <div style={{ background: bg, color, minHeight: "100vh", padding: "2rem" }}>
      <button onClick={toggleDark}>{dark ? "Light mode" : "Dark mode"}</button>
      <h1>Book List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addBook()}
        placeholder="Book title"
      />
      <button onClick={addBook}>Add</button>
      <ul>
        {books.map((b, i) => (
          <BookItem key={i} title={b} onRemove={() => removeBook(i)} />
        ))}
      </ul>
    </div>
  );
}