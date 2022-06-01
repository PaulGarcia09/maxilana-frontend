export interface User {
  isLoggedIn: boolean;
  userCode: string;
  name: string;
  lastname: string; // Apellido paterno
  surname: string; // Apellido materno (?)
  cellphone: string;
  email: string;
}
