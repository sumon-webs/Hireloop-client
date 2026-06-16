import { userSession } from "@/lib/core/session";
import {
  Bars,
  CircleLetterJ,
  CirclePlus,
  Gear,
  House,
  Person,
  PersonGear,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Bookmark, Briefcase, Building, CreditCard, FileText, Settings, Wallet } from "lucide-react";
import Link from "next/link";

export async function DashBaordLayouHome({ mobile = false }) {
  const user = await userSession();
  const adminNavLinks = [
    {
      icon: Person,
      label: "Users",
      href: "/dashboard/admin/users",
    },
    {
      icon: Building,
      label: "Companies",
      href: "/dashboard/admin/companies",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/dashboard/admin/jobs",
    },
    {
      icon: Wallet,
      label: "Payments",
      href: "/dashboard/admin/payments",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/admin/settings",
    },
  ];
  const seekerNavsLinks = [
    {
      icon: House,
      label: "Home",
      href: "/dashboard/seeker",
    },
    {
      icon: CircleLetterJ,
      label: "Jobs",
      href: "/dashboard/seeker/jobs",
    },
    {
      icon: Bookmark, // Assuming you have a bookmark/saved icon available
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: FileText, // Assuming you have an icon for applications
      label: "Applications",
      href: "/dashboard/seeker/applications",
    },
    {
      icon: CreditCard, // Assuming you have a billing/payment icon
      label: "Billing",
      href: "/dashboard/seeker/billing",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/seeker/settings",
    },
  ];
  const recruiterNavLinks = [
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

  const navLinksMap = {
    seeker: seekerNavsLinks,
    recruiter: recruiterNavLinks,
    admin: adminNavLinks
  };

  const navItems = navLinksMap[user?.role];

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
