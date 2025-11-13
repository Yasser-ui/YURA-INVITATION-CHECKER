"use client";
import { useState } from "react";

export default function HomePage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);

  async function verifyCode() {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    setResult(data.message);
  }

  return `
    <div style={{ textAlign: "center", maxWidth: 400 }}>
      <h1>🎉 Yura CORPORATION</h1>
      <h2>Cérémonie du 22 novembre - Kairouan</h2>
      <p>Entrez votre code d'invitation :</p>
      <input 
         value={code} 
         onChange={e => setCode(e.target.value)} 
         placeholder="Ex: YURA-1234" 
       />

      <button onClick={verifyCode}>Vérifier</button>
      
      {result && <p style={{ marginTop: 20 }}>{result}</p>}
    </div>`;
}