export interface CalcInputs {
  /** Plazo en días (entero). */
  plazoDias: number;
  /** Monto nominal del eCheq, en pesos. */
  monto: number;
  /** Tasa de descuento, TNA en porcentaje (ej. 22 = 22%). */
  tasaTNA: number;
  /** Comisión, TNA en porcentaje (ej. 4 = 4%). */
  comisionTNA: number;
  /** El comprador es exento de IVA. */
  exento: boolean;
}

export interface CalcResult {
  montoDescontado: number;
  interes: number;
  comisionCobrada: number;
  iva: number;
  clienteRecibe: number;
}

const IVA_ALICUOTA = 0.21;
const BASE_DIAS = 365;

/**
 * Calcula el descuento de un eCheq sobre base 365 días.
 *
 * El IVA (cuando el comprador NO es exento) aplica únicamente sobre el
 * interés, nunca sobre la comisión.
 */
export function calcular({
  plazoDias,
  monto,
  tasaTNA,
  comisionTNA,
  exento,
}: CalcInputs): CalcResult {
  const tasaProrrateada = (tasaTNA / 100) * (plazoDias / BASE_DIAS);
  const comisionProrrateada = (comisionTNA / 100) * (plazoDias / BASE_DIAS);

  const montoDescontado = monto / (1 + tasaProrrateada);
  const interes = monto - montoDescontado;
  const comisionCobrada = monto - monto / (1 + comisionProrrateada);

  const iva = exento ? 0 : IVA_ALICUOTA * interes;
  const clienteRecibe = montoDescontado - comisionCobrada - iva;

  return { montoDescontado, interes, comisionCobrada, iva, clienteRecibe };
}
