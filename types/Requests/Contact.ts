export interface Contact {
  nombre: string;
  email: string;
  ciudad: string;
  asunto: string;
  mensaje: string;
  tema: 'Información' | 'Recursos Humanos' | 'Empeño' | 'Prestamos' | 'Vales';
}
