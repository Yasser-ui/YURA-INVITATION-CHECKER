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
  const { code } = await req.json();
  if (!code) return NextResponse.json({ message: "Code manquant" }, { status: 400 });

  const doc = await db.collection("invitations").doc(code).get();
  if (!doc.exists)
    return NextResponse.json({ message: "❌ Code invalide" });

  const data = doc.data();
  if (data?.used)
    return NextResponse.json({ message: "⚠️ Ce code a déjà été utilisé" });

  await db.collection("invitations").doc(code).update({ used: true });
  return NextResponse.json({ message: `✅ Bienvenue ${data?.name || "Invité"} !` });
}