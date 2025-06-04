import type { Person } from "./Person";

export interface PersonPageable {
  users: Person[];
  total: number;
  skip: number;
  limit: number;
}