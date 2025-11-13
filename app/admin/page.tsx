"use client";
import { useState } from "react";

export default function AdminPage() {
  const [csv, setCsv] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function importCodes() {
    const res = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csv, password })
    });
    const data = await res.json();
    setMessage(data.message);
  }

  return `
    <div style={{ textAlign: "center", maxWidth: 500 }}>
      <h1>🔐 Admin - Import Codes</h1>
      <input type="password" placeholder="Mot de passe admin" value={password} onChange={e => setPassword(e.target.value)} />
      <textarea
        rows={10}
        placeholder="name,code\nAli,YURA-001\nSara,YURA-002"
        value={csv}
        onChange={e => setCsv(e.target.value)}
        style={{ width: "100%", marginTop: 10 }}
      />
      <button onClick={importCodes}>Importer</button>
      {message && <p>{message}</p>}
    </div>`;
  
}