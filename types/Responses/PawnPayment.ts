interface PawnAccountResponse {
  error?: string;
  BoletaActual: string;
  EstadoBoleta: 'Activa' | 'Extraviada' | 'Vencida';
  TipoEmpeno: string;
  FechaEmpeno: string;
  FechaVencimiento: string;
  Prestamo: string; // number
  DiasNormales: string; // number
  TasaNormal: string; // float
  TasaVencida: string; // float
  TasaIVA: string; // float
  InteresDiarioNormal: string; // float
  InteresNormal: string; // float,
  DiasVencidos: string; // number
  DiasSinCargo: string; // number
  DiasCobrados: string; // number
  InteresDiarioVencido: string; // float
  InteresVencido: string; // float
  DiasVencidosPermitidos: string; // number
  Cliente: string;
  DiasCobroMinimo: string; // number
  FechaDeConsulta: string;
  CodigoSucursal: string; // number
  DiasPagados: string; // number
  SaldoPorAplicar: string; // float
  RefrendoPendienteAplicar: string; // number
  BoletaBloqueada: string; //boolean
  ImportePagoMinimo: string; //float
  FechaConsulta: string;
  DiasVencidosPendientes: string; // number
  DiasPagoMinimo: string; //number
  comision: string; // number
  Mensaje?: string; // Solo aparece cuando la boleta está bloqueada
}

export type { PawnAccountResponse };
