import { Outlet, useLocation } from 'react-router';
import { AppHeader } from '@/components/layouts/app-header';
import { useCurrentAuthUser } from '@/features/auth-users/hooks';

function getHeaderTitle(pathname: string) {
  if (pathname === '/launchpad') {
    return 'Home';
  }

  if (pathname.startsWith('/attachments')) {
    return 'Attachments';
  }

  if (pathname.startsWith('/business-objects')) {
    return 'Business Objects';
  }

  if (pathname.startsWith('/dashboard')) {
    return 'Dashboard';
  }

  if (pathname.startsWith('/users')) {
    return 'Users Management';
  }

  if (pathname.startsWith('/configurations')) {
    return 'Configurations Management';
  }

  if (pathname.startsWith('/admin')) {
    return 'Administration';
  }

  return 'Corporate Portal';
}

export function AppLayout() {
  const location = useLocation();
  const { data } = useCurrentAuthUser();

  return (
    <div className="min-h-screen bg-background">
      <AppHeader primaryTitle={getHeaderTitle(location.pathname)} username={data?.username} />
      <Outlet />
    </div>
  );
}
