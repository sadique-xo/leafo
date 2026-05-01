import { AdminSidebar } from "@/app/admin/admin-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s | LEAFO Admin", default: "Admin" },
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delay={0}>
      <SidebarProvider defaultOpen>
        <AdminSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4 md:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-muted-foreground">
                Edit catalogue copy, images, and published gallery projects. Changes appear on the public site after
                save.
              </p>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
