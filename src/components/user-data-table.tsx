import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import PersonService from "@/service/PersonService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import type { PersonPageable } from "@/model/PersonPageable";
import { useEffect, useMemo, useState } from "react";
import { UserDialogForm } from "./user-dialog-form";
import type { Person } from "@/model/Person";
import { Loader2Icon, Repeat1 } from "lucide-react";
import { Input } from "./ui/input";
import debounce from "lodash.debounce";
import Swal from "sweetalert2";
import { Button } from "./ui/button";

export default function UserDataTable() {
    const [field, setField] = useState('');
    const [loading, setLoading] = useState(true);
    const [personPageable, setlPersonPageable] = useState({ users: [], skip: 0, limit: 0, total: 0 } as PersonPageable);

    const personService = useMemo(() => new PersonService(), []);
    const length = useMemo(() => personPageable.users.length, [personPageable]);

    const getPersons = () => {
        personService.getPageable().then((it) => {
            setlPersonPageable(it);
        }).finally(() => setLoading(false))
    }

    const fetchQuery = (it: string) => {
        if (field.trim() == "") {
            Swal.fire({ icon: 'warning', title: "Aviso", text: "Informa o campo a pesquisar" });
            return;
        }
        setLoading(true);
        personService.getPageableFilter(field, it).then(i => {
            setlPersonPageable(i);
        }).finally(() => setLoading(false))
    }

    const debouncedChangeHandler = debounce((it) => fetchQuery(it), 1000);

    useEffect(() => { getPersons(); }, []);

    if (loading) return <LoaderUsers />

    return (
        <section className="mx-4">
            <div className="inline-flex gap-4 mb-5 justify-end w-full">
                <Button onClick={getPersons}>
                    <Repeat1 />
                </Button>
                <Select value={field} onValueChange={(e) => setField(e)}>
                    <SelectTrigger id="field" className="col-span-3">
                        <SelectValue placeholder="Campos" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="username">Nome de usuário</SelectItem>
                        <SelectItem value="firstName">Primeiro nome</SelectItem>
                        <SelectItem value="lastName">Último nome</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="birthDate">Nascimento</SelectItem>
                    </SelectContent>
                </Select>
                <Input className="md:w-[300px]" onChange={(e) => debouncedChangeHandler(e.target.value)} />
                <UserDialogForm person={
                    { id: -1, firstName: "", lastName: "", gender: "", email: "", image: "", birthDate: "", username: "", } as Person
                } action="CREATE" pageable={personPageable} onPageable={setlPersonPageable} />
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
                                        <UserDialogForm person={user} action="UPDATE" pageable={personPageable} onPageable={setlPersonPageable} />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <UserDialogForm person={user} action="DELETE" pageable={personPageable} onPageable={setlPersonPageable} />
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

