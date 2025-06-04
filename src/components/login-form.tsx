import { AuthenticationError } from "@/error/AuthenticationError"
import { useMemo, useState, type FormEvent } from "react"
import { useAuthStore } from "@/store/auth-person.store"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import LoginService from "@/service/LoginService"
import Swal from 'sweetalert2';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const [parm, setParam] = useState({
    username: "", password: ""
  })

  const updateAuth = useAuthStore(state => state.updateAuth);

  const loginService = useMemo(() => new LoginService(), []);

  const onSubmit = async (evt: FormEvent)  => {
    evt.preventDefault();
    try{
      const person = await loginService.auth(parm.username, parm.password);

      updateAuth(person);
      
      navigate('/profile');
    }catch(error){
      if (error instanceof AuthenticationError) {
         Swal.fire("Falha o realizar o processo de autenticação");
         return;
      }
      Swal.fire("Error a realizar operação");
    }
  }


  return (
    <form className={cn("flex flex-col gap-6 md:min-w-[400px]", className)} {...props} onSubmit={onSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl md:text-4xl font-bold font-lexend">Faça autenticação</h1>
        <p className="text-muted-foreground text-lg text-balance">
          Informa o seu nome de usuário e senha
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label className="text-lg" htmlFor="username">Nome de usuário</Label>
          <Input className="text-lg py-7" id="username" type="text" placeholder="sedrac-slc" required 
           onChange={(e) => setParam({...parm, username: e.target.value}) }
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label className="text-lg" htmlFor="password">Senha</Label>
          </div>
          <Input className="text-lg py-7" id="password" type="password" required 
           onChange={(e) => setParam({...parm, password: e.target.value}) }
          />
        </div>
        <Button type="submit" className="w-full text-2xl py-5">
          Entrar
        </Button>
      </div>
      <div className="text-center text-sm">
        Não tenho uma conta?{" "}
        <a href="#" className="underline underline-offset-4 font-bold">
          Registra-se
        </a>
      </div>
    </form>
  )
}
