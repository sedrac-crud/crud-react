/**
 * Este inteface representa resposta do usuário que obtido quando é realizado com successo o processo
 * de autentição na API pública "https://dummyjson.com/auth/login"
 */
export interface AuthPerson {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}