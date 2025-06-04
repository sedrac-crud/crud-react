import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import type { PersonPageable } from "@/model/PersonPageable"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Person } from "@/model/Person"
import { Loader2Icon } from "lucide-react"
import { useMemo, useState } from "react"

import PersonService from "@/service/PersonService"
import Swal from "sweetalert2"
import { DeleteError } from "@/error/DeleteError"
import { UpdateError } from "@/error/UpdateError"

interface UserDialogFormProps {
    person: Person,
    action: 'CREATE' | 'DELETE' | 'UPDATE',
    pageable: PersonPageable,
    onPageable: (it: PersonPageable) => void
}

export function UserDialogForm({ person, action, pageable, onPageable }: UserDialogFormProps) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(person);
    const isReadOnly = action == "DELETE";

    const style = useMemo(() => {
        if (action == "CREATE") return "border-blue-500";
        if (action == "UPDATE") return "border-yellow-500";
        return "border-red-500";
    }, [action]);

    const background = useMemo(() => {
        if (action == "CREATE") return "bg-blue-500";
        if (action == "UPDATE") return "bg-yellow-500";
        return "bg-red-500";
    }, [action]);    

    const text = useMemo(() => {
        if (action == "CREATE") return "Adicionar";
        if (action == "UPDATE") return "Editar";
        return "Eliminar";
    }, [action]);

    const title = useMemo(() => {
        if (action == "CREATE") return "Adicionar utilizador";
        if (action == "UPDATE") return "Editar utilizador";
        return "Eliminar utilizador";
    }, [action]);

    const personService = useMemo(() => new PersonService(), []);

    const onSubmit = () => {
        if (loading) return;

        setLoading(true);
        personService.action(user, action).then((it) => {
            if (action == "CREATE") _onCreate(it);
            if (action == "UPDATE") _onUpdate(it);
            if (action == "DELETE") _onDelete(it);
        }).catch((error) => {

            if (error instanceof UpdateError) {
                _onUpdate(user);
                return;
            }

            if (error instanceof DeleteError) {
                _onDelete(user);
                return;
            }

            Swal.fire({
                icon: 'error', title: 'Oops...', text: error.message || 'Ocorreu um erro desconhecido.',
            });
        }).finally(() => {
            setLoading(false);
        })
    }

    function _onCreate(it: Person) {
        onPageable({ ...pageable, users: [it, ...pageable.users], total: pageable.total + 1 });
    }

    function _onUpdate(it: Person) {
        onPageable({ ...pageable, users: pageable.users.map(i => i.id == it.id ? it : i) });
    }

    function _onDelete(it: Person) {
        onPageable({ ...pageable, users: pageable.users.filter(i => i.id != it.id), total: pageable.total - 1 });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={style} variant="outline">{text}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>Verifica sempre as informações antes de qualquer acção</DialogDescription>
                </DialogHeader>
                <form action="#">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstName" className="text-right">Primeiro Nome</Label>
                            <Input id="firstName" name="firstName" className="col-span-3" disabled={isReadOnly} required
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })} value={user.firstName}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastName" className="text-right">Último Nome</Label>
                            <Input id="lastName" name="lastName" className="col-span-3" disabled={isReadOnly} required
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })} value={user.lastName}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">Username</Label>
                            <Input id="username" name="username" className="col-span-3" disabled={isReadOnly} required
                                onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" className="col-span-3" disabled={isReadOnly} required
                                onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="gender" className="text-right"> Género</Label>
                            <Select disabled={isReadOnly} value={user.gender} onValueChange={(e) => setUser({ ...user, gender: e })}>
                                <SelectTrigger id="gender" className="col-span-3">
                                    <SelectValue placeholder="Selecione o género" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Masculino</SelectItem>
                                    <SelectItem value="female">Feminino</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="birthDate" className="text-right">Data de Nascimento</Label>
                            <Input id="birthDate" name="birthDate" type="date" className="col-span-3" disabled={isReadOnly} required
                                onChange={(e) => setUser({ ...user, birthDate: e.target.value })} value={user.birthDate}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">URL Imagem</Label>
                            <Input id="image" name="image" type="url" className="col-span-3" disabled={isReadOnly}
                                onChange={(e) => setUser({ ...user, image: e.target.value })} value={user.image}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="button" className={background} onClick={onSubmit} disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2Icon className="animate-spin" />
                                    <span>Aguarda ...</span>
                                </>
                            ) : <span>Confirmo</span>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
