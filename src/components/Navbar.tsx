import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, ShieldCheck, Droplet, Search, Info } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { isAdmin, logoutAdmin } from '@/lib/auth';

const navItems = [
  { to: '/', label: 'Home', icon: Heart },
  { to: '/find', label: 'Find Donors', icon: Search },
  { to: '/register', label: 'Become a Donor', icon: Droplet },
  { to: '/request', label: 'Blood Request', icon: Droplet },
  { to: '/about', label: 'About & Safety', icon: Info },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const admin = isAdmin();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 shadow-soft ring-1 ring-navy-100 backdrop-blur-md'
          : 'bg-white/0'
      }`}
    >
      <nav className="container-px mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between lg:h-18">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-primary-700'
                      : 'text-navy-700 hover:text-primary-600 hover:bg-primary-50/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="flex items-center gap-1.5">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary-600" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {admin ? (
              <>
                <Link to="/admin" className="btn-navy px-4 py-2 text-sm">
                  <ShieldCheck className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logoutAdmin();
                    navigate('/');
                  }}
                  className="btn-ghost text-sm"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/admin" className="btn-outline px-4 py-2 text-sm">
                <ShieldCheck className="h-4 w-4" />
                Admin
              </Link>
            )}
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-navy-800 hover:bg-navy-50 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden">
          <div className="container-px mx-auto max-w-7xl pb-4">
            <div className="card animate-fade-up overflow-hidden">
              <div className="flex flex-col p-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-navy-700 hover:bg-navy-50'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                ))}
                <div className="my-2 h-px bg-navy-100" />
                <Link
                  to="/admin"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-navy-700 hover:bg-navy-50"
                >
                  <ShieldCheck className="h-5 w-5" />
                  {admin ? 'Admin Dashboard' : 'Admin Access'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
