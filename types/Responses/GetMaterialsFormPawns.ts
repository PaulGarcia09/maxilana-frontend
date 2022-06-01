interface ModeloKilataje {
  CodigoKilataje: number;
  DescripcionKilataje: string;
}

interface MaterialsForPawns {
  DescripcionMetal: string;
  Kilataje: ModeloKilataje[];
}

export type GetMaterialsForPawns = MaterialsForPawns[];
