'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import {
  Building2,
  Users,
  Calendar,
  Scissors,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  User
} from 'lucide-react';

const adminRoutes = [
  {
    label: 'Dashboard',
    icon: BarChart3,
    href: '/Admin/dashboard',
  },
  {
    label: 'Salons',
    icon: Building2,
    href: '/Admin/salons',
  },
  {
    label: 'Employés',
    icon: Users,
    href: '/Admin/employes',
  },
  {
    label: 'Rendez-vous',
    icon: Calendar,
    href: '/Admin/rendez-vous',
  },
  {
    label: 'Services',
    icon: Scissors,
    href: '/Admin/service',
  },
];

const managerRoutes = [
  {
    label: 'Dashboard',
    icon: BarChart3,
    href: '/manager/dashboard',
  },
  {
    label: 'Employés',
    icon: Users,
    href: '/manager/employes',
  },
  {
    label: 'Rendez-vous',
    icon: Calendar,
    href: '/manager/rendez-vous',
  },
  {
    label: 'Services',
    icon: Scissors,
    href: '/manager/services',
  },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const routes = user?.role === 'admin' ? adminRoutes : managerRoutes;

  return (
    <div className={cn('pb-12 min-h-screen bg-gray-900 text-white', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-yellow-400" />
              {!isCollapsed && (
                <h1 className="text-xl font-bold">Moncap Barber</h1>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white hover:bg-gray-800"
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          {!isCollapsed && user && (
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-900" />
                </div>
                <div>
                  <p className="font-medium">{user.nom} {user.prenom}</p>
                  <p className="text-sm text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          )}

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                    pathname === route.href
                      ? 'bg-yellow-400 text-gray-900'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {!isCollapsed && <span>{route.label}</span>}
                </Link>
              ))}
            </div>
          </ScrollArea>

          <div className="absolute bottom-4 left-3 right-3">
            <div className="space-y-2">
              <Link
                href="/settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Settings className="h-5 w-5" />
                {!isCollapsed && <span>Paramètres</span>}
              </Link>
              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start text-gray-300 hover:bg-red-600 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">Déconnexion</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};