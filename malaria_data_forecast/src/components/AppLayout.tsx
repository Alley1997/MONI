import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Dashboard from './Dashboard';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  const SidebarContent = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">MO</span>
        </div>
        <div>
          <h2 className="font-semibold text-sm">MOMI Platform</h2>
          <p className="text-xs text-muted-foreground">One Health Observatory</p>
        </div>
      </div>
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="sm">
          Analytics
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="sm">
          Reports
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="sm">
          Settings
        </Button>
      </nav>
    </div>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MO</span>
            </div>
            <h1 className="font-semibold">MOMI Platform</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>
        <main>
          <Dashboard />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <aside className="w-64 border-r bg-card">
          <SidebarContent />
        </aside>
      )}
      <div className="flex-1">
        <header className="border-b px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MO</span>
              </div>
              <h1 className="font-semibold">MOMI Platform</h1>
            </div>
          </div>
        </header>
        <main>
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;