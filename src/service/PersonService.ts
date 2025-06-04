import type { PersonPageable } from "@/model/PersonPageable";

export default class PersonService {

    async getPageable(): Promise<PersonPageable> {
        const response = await fetch('https://dummyjson.com/users');
        if (response.ok) return response.json();
        throw new Error("Não foi possível a realização desta operação");
    }

}