import { AuthenticationError } from "@/error/AuthenticationError";
import type { AuthPerson } from "@/model/AuthPerson";

/**
 * Este é uma classe que faz a requisão para a API pública para o processo de 
 * autenticação
 * 
 * API pública: https://dummyjson.com/auth/login,
 * website: https://dummyjson.com
 */
export default class LoginService {

    /**
     * Este endpoint da API pública permite fazer o processo de autentição com o username e password
     * para isso deves escolher uns dos utilizadores neste endpoinst "https://dummyjson.com/users"
     * @param username 
     * @param password 
     * @returns 
     */
    async auth(username: string, password: string): Promise<AuthPerson> {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if(response.ok){
            return response.json();
        }
        
        throw new AuthenticationError();
    }

}