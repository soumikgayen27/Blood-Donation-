import { Link } from 'react-router-dom';
import { Droplet, Heart, Mail, MapPin, Phone, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-navy-100 bg-navy-950 text-navy-200">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-white p-3 inline-block">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-300">
              A community donor registry connecting people who need blood with
              verified volunteers. Every drop counts. Every connection matters.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-navy-300">
              <Heart className="h-4 w-4 text-primary-500" fill="currentColor" />
              Prototype for hackathon demonstration
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/find" className="hover:text-primary-400 transition-colors">Find Donors</Link></li>
              <li><Link to="/register" className="hover:text-primary-400 transition-colors">Become a Donor</Link></li>
              <li><Link to="/request" className="hover:text-primary-400 transition-colors">Blood Request</Link></li>
              <li><Link to="/admin" className="hover:text-primary-400 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About & Safety</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">Donation Process</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">Privacy Guidelines</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">Eligibility</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Contact (sample)
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <span className="text-navy-300">221B Sample Avenue, Mumbai, MH 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                <span className="text-navy-300">+91 90000 00000 (demo)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                <span className="text-navy-300">hello@lifelink.demo</span>
              </li>
            </ul>

            <div className="mt-5 rounded-xl bg-navy-900/60 p-4 ring-1 ring-navy-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-500" />
                <p className="text-xs leading-relaxed text-navy-300">
                  Life Link is a prototype and not a replacement for professional
                  medical services. Always verify arrangements through hospitals
                  and licensed blood banks.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-6 sm:flex-row">
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} LIFE LINK. All sample data is fictional.
          </p>
          <div className="flex items-center gap-4 text-xs text-navy-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-success-500" />
              Verified profiles only
            </span>
            <span className="flex items-center gap-1.5">
              <Droplet className="h-3.5 w-3.5 text-primary-500" fill="currentColor" />
              Community driven
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
