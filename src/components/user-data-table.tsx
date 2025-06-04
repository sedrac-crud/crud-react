import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { PersonPageable } from "@/model/PersonPageable";
import PersonService from "@/service/PersonService";
import { Loader2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { UserDialogForm } from "./user-dialog-form";
import type { Person } from "@/model/Person";

export default function UserDataTable() {
    const [loading, setLoading] = useState(true);
    const [personPageable, setlPersonPageable] = useState({ users: [], skip: 0, limit: 0, total: 0 } as PersonPageable);

    const personService = useMemo(() => new PersonService(), []);
    const length = useMemo(() => personPageable.users.length, [personPageable]);

    const getPersons = () => {
        personService.getPageable().then((it) => {
            setlPersonPageable(it);
        }).finally(() => setLoading(false))
    }

    useEffect(() => { getPersons(); }, []);

    if (loading) return <LoaderUsers />

    return (
        <section className="mx-4">
            <div className="inline-flex gap-4 mb-5 justify-end w-full">
                <Input className="md:w-[300px]" />
                <UserDialogForm person={
                    { id: -1, firstName: "", lastName: "", gender: "", email: "", image: "", birthDate: "", username: "", } as Person
                } action="CREATE" />
            </div>
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableCaption>Uma lista dos utilizadores registados no sistema.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Nome Completo</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Género</TableHead>
                            <TableHead className="text-right">Data de Nascimento</TableHead>
                            <TableHead colSpan={2} className="text-center">Editar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    Nenhum utilizador encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            personPageable.users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>
                                        <img
                                            src={user.image}
                                            alt={`${user.firstName} ${user.lastName}`}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </TableCell>
                                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell className="text-right">{user.birthDate}</TableCell>
                                    <TableCell className="text-center">
                                        <UserDialogForm person={user} action="UPDATE"/>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <UserDialogForm person={user} action="DELETE"/>
                                    </TableCell>                                    
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}

function LoaderUsers() {
    return (
        <div className="flex w-full h-[900px] justify-center items-center">
            <Loader2Icon className="animate-spin size-60" />
        </div>
    );
}

