import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Droplet } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 px-4 text-center text-white">
      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary-600 text-white shadow-glow">
        <Droplet className="h-10 w-10" fill="currentColor" strokeWidth={1.5} />
      </div>
      <p className="mt-8 font-display text-6xl font-extrabold text-primary-500">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-sm text-navy-300">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn-primary">
          <Home className="h-4 w-4" />
          Back home
        </Link>
        <Link to="/find" className="btn bg-white/10 px-5 py-3 text-white ring-1 ring-white/20 hover:bg-white/20">
          <ArrowLeft className="h-4 w-4" />
          Find donors
        </Link>
      </div>
    </div>
  );
}
