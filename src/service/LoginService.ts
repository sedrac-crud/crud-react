import { AuthenticationError } from "@/error/AuthenticationError";
import type { AuthPerson } from "@/model/AuthPerson";

export default class LoginService {

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