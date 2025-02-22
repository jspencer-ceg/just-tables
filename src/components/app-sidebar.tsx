import { Home, HandCoins, Handshake } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Partners",
    url: "/payments",
    icon: HandCoins,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Handshake,
  },
]

export function AppSidebar() {
  return (
    <Sidebar 
        side="left"
        >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>WattTracker</SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
