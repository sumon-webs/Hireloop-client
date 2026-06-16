import {
  Bars,
  CircleLetterJ,
  CirclePlus,
  Gear,
  House,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashBaordLayouHome({ mobile = false }) {
  const navItems = [
    {
      icon: House,
      label: "Home",
      href: "/dashboard/recruiter",
    },
    {
      icon: CircleLetterJ,
      label: "Jobs",
      href: "/dashboard/recruiter/job",
    },
    {
      icon: CirclePlus,
      label: "Add Job",
      href: "/dashboard/recruiter/new",
    },
    {
      icon: Person,
      label: "Company Profile",
      href: "/dashboard/recruiter/profile",
    },
    {
      icon: Gear,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col p-4">
      <Link href="/dashboard/recruiter">
        <h2 className="mb-8 text-xl font-bold">Dashboard</h2>
      </Link>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-default-100"
          >
            <item.icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );

  if (mobile) {
    return (
      <Drawer>
        <Button isIconOnly variant="light">
          <Bars />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Body className="p-0">
                <SidebarContent />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    );
  }

  return <SidebarContent />;
}