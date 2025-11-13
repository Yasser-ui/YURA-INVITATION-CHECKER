import { NextResponse } from "next/server";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

export async function POST(req: Request) {
  const { csv, password } = await req.json();
  if (password !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 403 });

  const lines = csv.trim().split("\n");
  for (const line of lines.slice(1)) {
    const [name, code] = line.split(",");
    await db.collection("invitations").doc(code.trim()).set({ name, used: false });
  }
  return NextResponse.json({ message: "Codes importés avec succès" });
}