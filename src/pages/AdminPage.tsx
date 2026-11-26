import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
  Siren,
  Droplet,
  Lock,
  ArrowRight,
  Search,
  Inbox,
  Archive,
  CheckCheck,
} from 'lucide-react';
import {
  type Donor,
  type BloodRequest,
  type DonorStatus,
  type BloodGroup,
} from '@/types';
import {
  getDonors,
  updateDonorStatus,
  removeDonor,
  getRequests,
  updateRequestStatus,
} from '@/lib/store';
import { isAdmin, loginAdmin, logoutAdmin } from '@/lib/auth';
import { useToast } from '@/components/ToastProvider';
import { BloodGroupBadge } from '@/components/Logo';

type Tab = 'overview' | 'donors' | 'requests';

const statusStyles: Record<DonorStatus, string> = {
  pending: 'bg-warning-100 text-warning-700',
  approved: 'bg-success-100 text-success-700',
  deactivated: 'bg-navy-100 text-navy-700',
  rejected: 'bg-primary-100 text-primary-700',
};

export function AdminPage() {
  const [authed, setAuthed] = useState(() => isAdmin());

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => { logoutAdmin(); setAuthed(false); }} />;
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Prototype-only gate. A Supabase version would use real auth + RLS.
    if (code === 'admin') {
      loginAdmin();
      toast.success('Signed in', 'Welcome to the Life Link admin dashboard.');
      onLogin();
    } else {
      setError('Incorrect access code. Hint: use "admin" for the prototype.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-600 text-white shadow-glow">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-extrabold text-white">
            Administrator access
          </h1>
          <p className="mt-2 text-sm text-navy-300">
            This area is restricted to verified Life Link administrators.
          </p>
        </div>

        <form onSubmit={submit} className="card mt-8 p-6">
          <label className="label">Access code</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
            <input
              type="password"
              className="input pl-11"
              placeholder="Enter access code"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(''); }}
              autoFocus
            />
          </div>
          {error && <p className="mt-2 text-sm text-primary-600">{error}</p>}
          <button type="submit" className="btn-primary mt-5 w-full">
            <ShieldCheck className="h-4 w-4" />
            Sign in to dashboard
          </button>
          <p className="mt-4 rounded-lg bg-navy-50 p-3 text-center text-xs text-navy-500">
            Prototype access code: <span className="font-mono font-bold text-navy-700">admin</span>
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-navy-400 hover:text-white">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [donors, setDonors] = useState<Donor[]>(() => getDonors());
  const [requests, setRequests] = useState<BloodRequest[]>(() => getRequests());
  const [tab, setTab] = useState<Tab>('overview');
  const [donorQuery, setDonorQuery] = useState('');
  const [donorStatusFilter, setDonorStatusFilter] = useState<DonorStatus | 'all'>('all');
  const [requestFilter, setRequestFilter] = useState<BloodRequest['status'] | 'all'>('all');
  const toast = useToast();

  const counts = useMemo(() => ({
    total: donors.length,
    pending: donors.filter((d) => d.status === 'pending').length,
    approved: donors.filter((d) => d.status === 'approved').length,
    deactivated: donors.filter((d) => d.status === 'deactivated').length,
    rejected: donors.filter((d) => d.status === 'rejected').length,
    requests: requests.length,
    newRequests: requests.filter((r) => r.status === 'new').length,
  }), [donors, requests]);

  const filteredDonors = useMemo(() => {
    return donors
      .filter((d) => (donorStatusFilter === 'all' ? true : d.status === donorStatusFilter))
      .filter((d) => {
        if (!donorQuery.trim()) return true;
        const q = donorQuery.toLowerCase();
        return (
          d.displayName.toLowerCase().includes(q) ||
          d.bloodGroup.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.locality.toLowerCase().includes(q) ||
          d.pincode.includes(q)
        );
      });
  }, [donors, donorStatusFilter, donorQuery]);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) =>
      requestFilter === 'all' ? true : r.status === requestFilter,
    );
  }, [requests, requestFilter]);

  function setDonorStatus(id: string, status: DonorStatus) {
    const updated = updateDonorStatus(id, status);
    setDonors(updated);
    toast.success(`Donor ${status}`, 'The listing status has been updated.');
  }
  function deleteDonor(id: string) {
    const updated = removeDonor(id);
    setDonors(updated);
    toast.info('Donor removed', 'The listing has been deleted from the registry.');
  }
  function setRequestStatus(id: string, status: BloodRequest['status']) {
    const updated = updateRequestStatus(id, status);
    setRequests(updated);
    toast.success(`Request ${status}`, 'The request status has been updated.');
  }

  return (
    <div className="min-h-screen bg-navy-50/40">
      <div className="bg-navy-950 text-white">
        <div className="container-px mx-auto max-w-7xl py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="section-eyebrow bg-white/10 text-primary-200 ring-1 ring-white/15">
                <ShieldCheck className="h-3.5 w-3.5" /> Admin dashboard
              </span>
              <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
                Registry control center
              </h1>
            </div>
            <button onClick={onLogout} className="btn bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/20 hover:bg-white/20">
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl py-8">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Total donors" value={counts.total} tone="navy" />
          <StatCard icon={Clock} label="Pending approvals" value={counts.pending} tone="warning" />
          <StatCard icon={CheckCircle2} label="Approved listings" value={counts.approved} tone="success" />
          <StatCard icon={Ban} label="Deactivated" value={counts.deactivated} tone="muted" />
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-navy-200">
          <TabButton active={tab === 'overview'} onClick={() => setTab('overview')} icon={ShieldCheck} label="Overview" />
          <TabButton active={tab === 'donors'} onClick={() => setTab('donors')} icon={Users} label={`Donor management (${counts.total})`} />
          <TabButton active={tab === 'requests'} onClick={() => setTab('requests')} icon={Siren} label={`Blood requests (${counts.newRequests} new)`} />
        </div>

        <div className="mt-6">
          {tab === 'overview' && (
            <Overview counts={counts} donors={donors} requests={requests} onJump={setTab} />
          )}
          {tab === 'donors' && (
            <DonorManagement
              donors={filteredDonors}
              query={donorQuery}
              setQuery={setDonorQuery}
              statusFilter={donorStatusFilter}
              setStatusFilter={setDonorStatusFilter}
              onStatus={setDonorStatus}
              onDelete={deleteDonor}
            />
          )}
          {tab === 'requests' && (
            <RequestManagement
              requests={filteredRequests}
              filter={requestFilter}
              setFilter={setRequestFilter}
              onStatus={setRequestStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  tone: 'navy' | 'warning' | 'success' | 'muted' | 'primary';
}) {
  const tones = {
    navy: 'bg-navy-900 text-white',
    warning: 'bg-warning-500 text-white',
    success: 'bg-success-500 text-white',
    muted: 'bg-navy-200 text-navy-800',
    primary: 'bg-primary-600 text-white',
  };
  return (
    <div className="card flex items-center gap-4 p-5">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tones[tone]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="font-display text-3xl font-extrabold text-navy-900">{value}</p>
        <p className="text-xs font-medium text-navy-500">{label}</p>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
        active
          ? 'border-primary-600 text-primary-700'
          : 'border-transparent text-navy-600 hover:text-navy-900'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function Overview({
  counts,
  donors,
  requests,
  onJump,
}: {
  counts: { total: number; pending: number; approved: number; deactivated: number; rejected: number; requests: number; newRequests: number };
  donors: Donor[];
  requests: BloodRequest[];
  onJump: (t: Tab) => void;
}) {
  const pendingDonors = donors.filter((d) => d.status === 'pending');
  const newRequests = requests.filter((r) => r.status === 'new');
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-navy-900">Pending donor approvals</h3>
          <button onClick={() => onJump('donors')} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all
          </button>
        </div>
        {pendingDonors.length === 0 ? (
          <EmptyRow icon={CheckCircle2} text="No pending approvals. You're all caught up." />
        ) : (
          <div className="mt-4 space-y-3">
            {pendingDonors.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-xl bg-navy-50 p-3">
                <BloodGroupBadge group={d.bloodGroup} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold text-navy-900">{d.displayName}</p>
                  <p className="truncate text-xs text-navy-500">{d.locality}, {d.city}</p>
                </div>
                <span className="badge bg-warning-100 text-warning-700">Pending</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-navy-900">New blood requests</h3>
          <button onClick={() => onJump('requests')} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all
          </button>
        </div>
        {newRequests.length === 0 ? (
          <EmptyRow icon={Inbox} text="No new requests awaiting coordination." />
        ) : (
          <div className="mt-4 space-y-3">
            {newRequests.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-xl bg-navy-50 p-3">
                <BloodGroupBadge group={r.bloodGroup} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold text-navy-900">{r.requesterName}</p>
                  <p className="truncate text-xs text-navy-500">{r.location}, {r.city}</p>
                </div>
                <span className="badge bg-primary-100 text-primary-700">{r.urgency}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card p-6 lg:col-span-2">
        <h3 className="font-display text-lg font-bold text-navy-900">Registry at a glance</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat icon={Users} label="Total donors" value={counts.total} />
          <MiniStat icon={CheckCircle2} label="Approved" value={counts.approved} />
          <MiniStat icon={Clock} label="Pending" value={counts.pending} />
          <MiniStat icon={Siren} label="Total requests" value={counts.requests} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={() => onJump('donors')} className="btn-outline">
            <Users className="h-4 w-4" />
            Manage donors
            <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => onJump('requests')} className="btn-outline">
            <Siren className="h-4 w-4" />
            Manage requests
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  return (
    <div className="rounded-xl bg-navy-50 p-4">
      <div className="flex items-center gap-2 text-navy-500">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-1 font-display text-2xl font-extrabold text-navy-900">{value}</p>
    </div>
  );
}

function EmptyRow({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-navy-50 py-8 text-center">
      <Icon className="h-8 w-8 text-navy-300" />
      <p className="mt-2 text-sm text-navy-500">{text}</p>
    </div>
  );
}

function DonorManagement({
  donors,
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
  onStatus,
  onDelete,
}: {
  donors: Donor[];
  query: string;
  setQuery: (v: string) => void;
  statusFilter: DonorStatus | 'all';
  setStatusFilter: (v: DonorStatus | 'all') => void;
  onStatus: (id: string, s: DonorStatus) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-navy-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            className="input pl-10 py-2.5 text-sm"
            placeholder="Search name, blood group, city, PIN…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'pending', 'approved', 'deactivated', 'rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                statusFilter === s ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {donors.length === 0 ? (
        <EmptyRow icon={Users} text="No donors match this filter." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase tracking-wide text-navy-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Donor</th>
                <th className="px-4 py-3 font-semibold">Blood</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Availability</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {donors.map((d) => (
                <tr key={d.id} className="hover:bg-navy-50/50">
                  <td className="px-4 py-3">
                    <p className="font-display font-bold text-navy-900">{d.displayName}</p>
                    <p className="text-xs text-navy-400">{d.locality} · {d.pincode}</p>
                  </td>
                  <td className="px-4 py-3">
                    <BloodGroupBadge group={d.bloodGroup as BloodGroup} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-navy-700">{d.city}<br /><span className="text-xs text-navy-400">{d.state}</span></td>
                  <td className="px-4 py-3 text-navy-700">{d.availability}</td>
                  <td className="px-4 py-3">
                    <span className={`badge capitalize ${statusStyles[d.status]}`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {d.status !== 'approved' && (
                        <ActionBtn onClick={() => onStatus(d.id, 'approved')} icon={CheckCircle2} label="Approve" tone="success" />
                      )}
                      {d.status !== 'rejected' && (
                        <ActionBtn onClick={() => onStatus(d.id, 'rejected')} icon={XCircle} label="Reject" tone="primary" />
                      )}
                      {d.status !== 'deactivated' && (
                        <ActionBtn onClick={() => onStatus(d.id, 'deactivated')} icon={Ban} label="Deactivate" tone="muted" />
                      )}
                      <ActionBtn onClick={() => onDelete(d.id)} icon={Droplet} label="Delete" tone="ghost" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RequestManagement({
  requests,
  filter,
  setFilter,
  onStatus,
}: {
  requests: BloodRequest[];
  filter: BloodRequest['status'] | 'all';
  setFilter: (v: BloodRequest['status'] | 'all') => void;
  onStatus: (id: string, s: BloodRequest['status']) => void;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap gap-2 border-b border-navy-100 p-4">
        {(['all', 'new', 'fulfilled', 'archived'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
              filter === s ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {requests.length === 0 ? (
        <EmptyRow icon={Inbox} text="No requests match this filter." />
      ) : (
        <div className="divide-y divide-navy-100">
          {requests.map((r) => (
            <div key={r.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <BloodGroupBadge group={r.bloodGroup} size="sm" />
                  <div>
                    <p className="font-display font-bold text-navy-900">{r.requesterName}</p>
                    <p className="text-xs text-navy-500">{r.location}, {r.city}, {r.state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ring-1 ${
                    r.urgency === 'Critical' ? 'bg-primary-100 text-primary-700 ring-primary-200'
                    : r.urgency === 'Urgent' ? 'bg-warning-100 text-warning-700 ring-warning-200'
                    : 'bg-navy-100 text-navy-700 ring-navy-200'
                  }`}>{r.urgency}</span>
                  <span className={`badge capitalize ${
                    r.status === 'new' ? 'bg-primary-50 text-primary-700'
                    : r.status === 'fulfilled' ? 'bg-success-100 text-success-700'
                    : 'bg-navy-100 text-navy-700'
                  }`}>{r.status}</span>
                </div>
              </div>
              {r.message && (
                <p className="mt-3 rounded-xl bg-navy-50 p-3 text-sm text-navy-700">{r.message}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {r.status !== 'fulfilled' && (
                  <ActionBtn onClick={() => onStatus(r.id, 'fulfilled')} icon={CheckCheck} label="Mark fulfilled" tone="success" />
                )}
                {r.status !== 'archived' && (
                  <ActionBtn onClick={() => onStatus(r.id, 'archived')} icon={Archive} label="Archive" tone="muted" />
                )}
                {r.status !== 'new' && (
                  <ActionBtn onClick={() => onStatus(r.id, 'new')} icon={Inbox} label="Reopen" tone="primary" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionBtn({
  onClick,
  icon: Icon,
  label,
  tone,
}: {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: 'success' | 'primary' | 'muted' | 'ghost';
}) {
  const tones = {
    success: 'bg-success-100 text-success-700 hover:bg-success-200',
    primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
    muted: 'bg-navy-100 text-navy-700 hover:bg-navy-200',
    ghost: 'bg-transparent text-navy-500 ring-1 ring-navy-200 hover:bg-navy-50',
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${tones[tone]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
