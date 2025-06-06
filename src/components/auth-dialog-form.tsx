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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2Icon, UserCircle } from "lucide-react"
import { useMemo, useState } from "react"

import Swal from "sweetalert2"
import AuthPersonService from "@/service/AuthPersonService"
import { useAuthStore } from "@/store/auth-person.store"

export function AuthPersonDialogForm() {
    const [loading, setLoading] = useState(false);

    const auth = useAuthStore(state => state.auth);
    const updateAuth = useAuthStore(state => state.updateAuth);
    const personService = useMemo(() => new AuthPersonService(), []);

    const [user, setUser] = useState(auth);

    const onSubmit = () => {
        if (loading) return;
        setLoading(true);
        personService.update(user).then((it) => {
            updateAuth({...it, refreshToken: auth.refreshToken, accessToken: auth.accessToken});
            Swal.fire({text: "Conta actualizada com successo",  timer: 2000, timerProgressBar: true,});            
        }).catch((error) => {
            Swal.fire({
                icon: 'error', title: 'Oops...', text: error.message || 'Ocorreu um erro desconhecido.', timer: 2000, timerProgressBar: true
            });
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <Dialog>
            <DialogTrigger className="w-full pl-0 border-none" asChild>
                <Button className="border-none bg-transparent w-full flex ga-1  justify-start pl-0" variant="outline">
                    <UserCircle/> 
                    <span>Conta</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Dados da conta</DialogTitle>
                    <DialogDescription>Verifica sempre as informações antes de qualquer acção</DialogDescription>
                </DialogHeader>
                <form action="#">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstName" className="text-right">Primeiro Nome</Label>
                            <Input id="firstName" name="firstName" className="col-span-3" required
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })} value={user.firstName}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastName" className="text-right">Último Nome</Label>
                            <Input id="lastName" name="lastName" className="col-span-3" required
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })} value={user.lastName}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">Username</Label>
                            <Input id="username" name="username" className="col-span-3" required
                                onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" className="col-span-3" required
                                onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="gender" className="text-right"> Género</Label>
                            <Select  value={user.gender} onValueChange={(e) => setUser({ ...user, gender: e })}>
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
                            <Label htmlFor="image" className="text-right">URL Imagem</Label>
                            <Input id="image" name="image" type="url" className="col-span-3"
                                onChange={(e) => setUser({ ...user, image: e.target.value })} value={user.image}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="button" className="bg-yellow-500" onClick={onSubmit} disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2Icon className="animate-spin" />
                                    <span>Aguarda ...</span>
                                </>
                            ) : <span>Editar</span>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
