"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    disabled?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const navigate = useNavigate();
  const handleRedirect = (url: string) => {
    navigate(url);
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        <Accordion
          type="multiple"
          defaultValue={items.filter((i) => i.isActive).map((i) => i.title)}
          className="w-full"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.title}
              value={item.title}
              className="border-none"
            >
              <SidebarMenuItem>
                <AccordionTrigger
                  className="w-full px-3 py-2 text-sm hover:bg-muted/50 flex items-center rounded-md transition-colors"
                  disabled={item.disabled}
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span className="w-full justify-baseline">{item.title}</span>
                </AccordionTrigger>

                {item.items && (
                  <AccordionContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <span onClick={() => handleRedirect(subItem.url)}>
                              <span>{subItem.title}</span>
                            </span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </AccordionContent>
                )}
              </SidebarMenuItem>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarMenu>
    </SidebarGroup>
  );
}
