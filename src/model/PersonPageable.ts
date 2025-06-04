import type { Person } from "./Person";

/**
 * Este inteface representa a resposta paginada que obtida em requisitar a API pública da https://dummyjson.com/users
 */
export interface PersonPageable {
  users: Person[];
  total: number;
  skip: number;
  limit: number;
}