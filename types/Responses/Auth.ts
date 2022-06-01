interface MaxilanaAuthResponse {
  CodigoUsuario: string;
  NombreCompleto: string;
  PrimerApellido: string;
  SegundoApellido: string;
}

export interface MaxilanaLoginResponse extends MaxilanaAuthResponse {
  error?: string;
}

export interface MaxilanaEditResponse extends MaxilanaAuthResponse {
  error?: string;
  CorreoElectronico: string;
  Celular: string;
}
