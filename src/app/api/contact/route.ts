import { NextResponse } from "next/server";
import { ServerClient } from "postmark";

const token = process.env.POSTMARK_API_TOKEN || "";
const client = new ServerClient(token);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const to = process.env.EMAIL_TO || "semikaanusara3@gmail.com";
    const from = process.env.EMAIL_FROM || to;

    await client.sendEmail({
      From: from,
      To: to,
      Subject: `Website message from ${name || "Visitor"}`,
      TextBody: `${message}\n\nFrom: ${name || ""} <${email || ""}>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
