/**
 * Este inteface representa as informações que os usuário da API pública: https://dummyjson.com/ fornece,
 * eu apenas escolhi algumas propriedade que achei mais conveniente ter, podes ver essas informações
 * em https://dummyjson.com/users
 */
export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  image: string;
  birthDate: string; 
  username: string;
}