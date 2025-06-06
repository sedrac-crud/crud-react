import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Users2, HomeIcon } from "lucide-react"
import { NavUser } from "./nav-user"
import { NavLink } from "react-router-dom"
import { AuthPersonDialogForm } from "./auth-dialog-form"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <NavUser />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            <NavLink to="/">
                                <SidebarMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <SidebarMenuButton
                                        tooltip="Quick Create"
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                                    >
                                        <HomeIcon />
                                        <span>Pagina inicial</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </NavLink>
                        </SidebarMenu>
                        <SidebarMenu>
                            <AuthPersonDialogForm/>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip={"Utilizadores"}>
                                    <Users2 />
                                    <span>Utilizadores</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>                            
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-center">
                {new Date().toDateString()}
            </SidebarFooter>
        </Sidebar>
    )
}
