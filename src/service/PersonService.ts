import { DeleteError } from "@/error/DeleteError";
import { UpdateError } from "@/error/UpdateError";
import type { Person } from "@/model/Person";
import type { PersonPageable } from "@/model/PersonPageable";

/**
 * Este é uma classe que faz a requisão para a API pública para trazer os usuários
 * aqui esta todas as operações de crud, ou seja o endpoint para criar, editar e eliminar
 * os usuários.
 * 
 * API pública: https://dummyjson.com/users,
 * website: https://dummyjson.com
 */
export default class PersonService {

    /**
     * Esta rota traz todos os usuários 
     * @returns Os resultados em uma paginação onde o atríbuto users é uma lista de usuários
     */
    async getPageable(): Promise<PersonPageable> {
        const response = await fetch('https://dummyjson.com/users');
        if (response.ok) return response.json();
        throw new Error("Não foi possível a realização desta operação");
    }

    /**
     * Esta rota traz todos os usuários 
     * @returns Os resultados em uma paginação onde o atríbuto users é uma lista de usuários
     */
    async getPageableFilter(field: string, value: string): Promise<PersonPageable> {
        const response = await fetch(`https://dummyjson.com/users/filter?key=${field}&value=${value}`);
        if (response.ok) return response.json();
        throw new Error("Não foi possível a realização desta operação");
    }    

    /**
     * Este endpoint serve para criação de um usuário, ou criado uma classe (Person) que representa
     * as informações que devem ser atríbuidas a um utilizador segundo a API pública
     * @param person 
     * @returns O usuário criado com successo
     */
    async store(person: Person): Promise<Person> {
        const response = await fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                birthDate: person.birthDate,
                firstName: person.firstName,
                lastName: person.lastName,
                username: person.username,
                gender: person.gender,
                image: person.image
            })
        });
        if (response.ok) return response.json();
        throw new Error("Não foi possível a realização desta operação de criação");
    }

    /**
     * Este endpoint serve para edição de um usuário
     * @param person 
     * @returns  O usuário actualizado com successo
     */
    async update(person: Person): Promise<Person> {
        const response = await fetch(`https://dummyjson.com/users/${person.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                birthDate: person.birthDate,
                firstName: person.firstName,
                lastName: person.lastName,
                username: person.username,
                gender: person.gender,
                image: person.image
            })
        });
        if (response.ok) return response.json();
        throw new UpdateError("Não foi possível a realização desta operação de edição");
    }

    /**
     * Este endpoint serve para eliminação de um usuário
     * @param person 
     * @returns  O usuário eliminação com successo
     */    
    async delete(person: Person): Promise<Person> {
        const response = await fetch(`https://dummyjson.com/users/${person.id}`, {
            method: 'DELETE',
        });
        if (response.ok) return response.json();
        throw new DeleteError("Não foi possível a realização desta operação de eliminação");
    }

   /**
     * Este é um método que serve para acessar os outros métodos consuante o parametro de acção
     * que indica qual acção para realizar para manipulação das informações
     * @param person 
     * @returns  O usuário que sofreu acção
     */       
    async action(person: Person, action: 'CREATE' | 'DELETE' | 'UPDATE'): Promise<Person> {
        switch(action){
            case "CREATE":
                return await this.store(person);
            case "UPDATE":
                return await this.update(person);
            default:
                return await this.delete(person);
        }
    }

}