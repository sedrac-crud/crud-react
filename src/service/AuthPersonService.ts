import { UpdateError } from "@/error/UpdateError";
import type { AuthPerson } from "@/model/AuthPerson";

/**
 * Este é uma classe que faz a requisão para a API pública para manipulação das informações do utilizador
 * autenticado
 * 
 * API pública: https://dummyjson.com/users,
 * website: https://dummyjson.com
 */
export default class AuthPersonService {

    /**
     * Este endpoint serve para edição de um usuário, nesta caso será usado para actualizar a 
     * informação do utilizado autenticado
     * @param person 
     * @returns  O usuário actualizado com successo
     */
    async update(person: AuthPerson): Promise<AuthPerson> {
        const response = await fetch(`https://dummyjson.com/users/${person.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
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

}