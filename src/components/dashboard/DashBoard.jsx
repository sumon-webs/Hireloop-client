import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashBaordLayouHome({ mobile = false }) {
  const navItems = [
    { icon: House, label: "Home" },
    { icon: Magnifier, label: "Search" },
    { icon: Bell, label: "Notifications" },
    { icon: Envelope, label: "Messages" },
    { icon: Person, label: "Profile" },
    { icon: Gear, label: "Settings" },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col p-4">
      <Link href={'/dashboard'}>
        <h2 className="mb-8 text-xl font-bold">Dashboard</h2>
      </Link>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm hover:bg-default-100"
          >
            <item.icon className="size-5" />
            {item.label}
          </button>
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
