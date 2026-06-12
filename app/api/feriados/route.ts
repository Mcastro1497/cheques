import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const KEY = "cheques:feriados";
const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Contraseña para editar feriados. Configurable por env, con default. */
function passwordOk(req: Request): boolean {
  const esperada = process.env.FERIADOS_PASSWORD ?? "trolazo123";
  return req.headers.get("x-feriados-password") === esperada;
}

/**
 * Construye el cliente Redis a partir de las variables que inyecte Upstash,
 * sin importar el prefijo (KV_REST_API_* o UPSTASH_REDIS_REST_*).
 * Devuelve null si todavía no hay store configurado.
 */
function getRedis(): Redis | null {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ feriados: [], configurado: false });
  }
  try {
    const items = await redis.smembers(KEY);
    const feriados = (items as string[]).slice().sort();
    return NextResponse.json({ feriados, configurado: true });
  } catch (e) {
    return NextResponse.json(
      { feriados: [], configurado: false, error: String(e) },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  if (!passwordOk(req)) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Redis no configurado" }, { status: 503 });
  }
  const { date } = await req.json().catch(() => ({}));
  if (typeof date !== "string" || !ISO_RE.test(date)) {
    return NextResponse.json({ error: "Fecha inválida" }, { status: 400 });
  }
  await redis.sadd(KEY, date);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!passwordOk(req)) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Redis no configurado" }, { status: 503 });
  }
  const { date } = await req.json().catch(() => ({}));
  if (typeof date !== "string" || !ISO_RE.test(date)) {
    return NextResponse.json({ error: "Fecha inválida" }, { status: 400 });
  }
  await redis.srem(KEY, date);
  return NextResponse.json({ ok: true });
}
