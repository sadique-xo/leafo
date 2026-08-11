"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SiteLogo } from "@/components/site/site-logo";
import { AdminSignOut } from "./admin-sign-out";
import { ExternalLink, FolderKanban, LayoutDashboard, Layers, Mail } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 shrink-0 flex-row items-center gap-0 border-b border-sidebar-border p-0 px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
        <Link
          href="/admin"
          className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-0 leading-none outline-none ring-sidebar-ring focus-visible:ring-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-0"
        >
          <SiteLogo
            tone="current"
            className="h-5 w-auto max-w-full text-sidebar-foreground group-data-[collapsible=icon]:h-4"
          />
          <span className="truncate text-[10px] leading-snug text-sidebar-foreground/70 group-data-[collapsible=icon]:sr-only">
            Content admin
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/admin"}
                  tooltip="Overview"
                  render={<Link href="/admin" />}
                >
                  <LayoutDashboard />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname.startsWith("/admin/collections")}
                  tooltip="Collections"
                  render={<Link href="/admin/collections" />}
                >
                  <Layers />
                  <span>Collections</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname.startsWith("/admin/inquiries")}
                  tooltip="Inquiries"
                  render={<Link href="/admin/inquiries" />}
                >
                  <Mail />
                  <span>Inquiries</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname.startsWith("/admin/projects")}
                  tooltip="Projects"
                  render={<Link href="/admin/projects" />}
                >
                  <FolderKanban />
                  <span>Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Public site</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Open storefront"
                  render={<Link href="/" target="_blank" rel="noopener noreferrer" />}
                >
                  <ExternalLink />
                  <span>View live site</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <AdminSignOut variant="ghost" className="w-full justify-start text-sidebar-foreground" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
