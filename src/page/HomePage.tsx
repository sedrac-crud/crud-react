import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserCheck, UserMinus, UserPen, UserPlus } from "lucide-react";

const features = [
  {
    icon: UserPlus,
    background: "bg-green-300",
    titulo: "Criação de Utilizadores (Create)",
    descricao: "Registe novos utilizadores no sistema, inserindo detalhes essenciais como nome, email, palavra-passe e outras informações relevantes."
  },
  {
    icon: UserCheck,
    background: "bg-orange-300",
    titulo: "Visualização de Utilizadores (Read)",
    descricao: "Acesse uma lista organizada de todos os utilizadores registados, com opções de pesquisa, filtro e paginação para facilitar a localização de informações específicas."
  },
  {
    icon: UserPen,
    background: "bg-yellow-300",
    titulo: "Edição de Utilizadores (Update)",
    descricao: "Modifique os dados de utilizadores existentes, garantindo que as informações estejam sempre atualizadas e precisas."
  },
  {
    icon: UserMinus,
    background: "bg-red-300",
    titulo: "Eliminação de Utilizadores (Delete)",
    descricao: "Remova registos de utilizadores de forma segura e permanente do sistema, quando necessário."
  }
];

export default function HomePage() {
  const btn = "rounded-full w-auto md:min-w-[200px] p-8 text-2xl cursor-pointer";

  return (
    <>
      <nav className="inline-flex w-full border-b top-0 justify-between items-center px-5 md:px-10 py-3">
        <div className="font-lexend text-xl">
          CRUDPERSON
        </div>
        <div>
          <NavLink to="/login">
            <Button className="rounded-full md:min-w-[200px] p-6 text-xl bg-black" size="lg" >Baixar o APK</Button>
          </NavLink>
        </div>
      </nav>
      <section className="flex flex-col h-screen items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-3 md:gap-8">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full fill-sky-400 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"><defs><pattern id=":S1:" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x="0" y="0"><circle id="pattern-circle" cx="1" cy="1" r="1"></circle></pattern></defs><rect width="100%" height="100%" stroke-width="0" fill="url(#:S1:)"></rect></svg>
          <div className="text-4xl md:text-6xl font-lexend">Crud de utilizadores</div>
          <div className="md:w-3/6 text-center text-lg">
            Este sistema é uma aplicação web completa projetada para gerenciar utilizadores de forma eficiente, permitindo operações CRUD (Create, Read, Update, Delete). Ele oferece uma interface intuitiva para a criação, visualização, edição e exclusão de registos de utilizadores, otimizando o fluxo de trabalho de administração e manutenção de dados
          </div>
          <div className="flex gap-3 md:gap-10 md:flex-row">
            <NavLink to="/login">
              <Button className={btn} size="lg">Login</Button>
            </NavLink>
            <NavLink to="/register">
              <Button className={btn} variant="outline" size="lg">Registro</Button>
            </NavLink>
          </div>
          <div className="my-5  px-5 md:px-15 lg:px-25">
            <div className="mb-8 font-lexend text-xl">Fucionalidades</div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map(it => (
                <Card className={`course-pointer ${it.background}`} key={it.titulo}>
                  <CardHeader>
                    <it.icon className="" />
                    <CardTitle className="mt-5">{it.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{it.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
