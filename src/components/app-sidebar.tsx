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
import { Users2, CirclePlus, Info, } from "lucide-react"
import { NavUser } from "./nav-user"
import { Button } from "./ui/button"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <Users2 className="!size-5" />
                                <span className="text-base font-semibold">CrudPersons.</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            <SidebarMenuItem className="flex items-center gap-2">
                                <SidebarMenuButton
                                    tooltip="Quick Create"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                                >
                                    <CirclePlus />
                                    <span>Quick Create</span>
                                </SidebarMenuButton>
                                <Button
                                    size="icon"
                                    className="size-8 group-data-[collapsible=icon]:opacity-0"
                                    variant="outline"
                                >
                                    <Info />
                                    <span className="sr-only">Dados</span>
                                </Button>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
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
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
