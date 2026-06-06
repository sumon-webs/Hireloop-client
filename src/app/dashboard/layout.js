import { DashBaordLayouHome } from "@/components/dashboard/DashBoard";

const DashBoardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navbar */}
      <div className="md:hidden sticky top-0 z-50 border-b border-default-200 bg-background px-4 py-3">
        <DashBaordLayouHome mobile />
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex h-screen w-72 shrink-0 border-r border-default-200 bg-content1">
          <DashBaordLayouHome />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;