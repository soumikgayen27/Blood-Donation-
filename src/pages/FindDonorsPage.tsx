import { useMemo, useState } from 'react';
import {
  Search,
  MapPin,
  Filter,
  X,
  Send,
  Droplet,
  Users,
  Clock,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import {
  BLOOD_GROUPS,
  AVAILABILITY_OPTIONS,
  INDIAN_STATES,
  CITIES_BY_STATE,
  type Donor,
  type BloodGroup,
  type AvailabilityPreference,
} from '@/types';
import { getDonors } from '@/lib/store';
import { BloodGroupBadge } from '@/components/Logo';
import { useToast } from '@/components/ToastProvider';
import { RequestModal } from '@/components/RequestModal';

const availabilityStyles: Record<AvailabilityPreference, string> = {
  Available: 'bg-success-100 text-success-700',
  'On Request': 'bg-warning-100 text-warning-700',
  'Emergency Only': 'bg-primary-100 text-primary-700',
};

export function FindDonorsPage() {
  const [donors] = useState<Donor[]>(() => getDonors());
  const toast = useToast();

  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [pincode, setPincode] = useState('');
  const [availability, setAvailability] = useState<AvailabilityPreference | ''>('');
  const [loading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [requestFor, setRequestFor] = useState<Donor | null>(null);

  const cities = state ? CITIES_BY_STATE[state] ?? [] : [];

  const filtered = useMemo(() => {
    return donors
      .filter((d) => d.status === 'approved')
      .filter((d) => (bloodGroup ? d.bloodGroup === bloodGroup : true))
      .filter((d) => (state ? d.state === state : true))
      .filter((d) => (city ? d.city === city : true))
      .filter((d) =>
        locality ? d.locality.toLowerCase().includes(locality.toLowerCase().trim()) : true,
      )
      .filter((d) => (pincode ? d.pincode.includes(pincode.trim()) : true))
      .filter((d) => (availability ? d.availability === availability : true));
  }, [donors, bloodGroup, state, city, locality, pincode, availability]);

  const activeFilterCount =
    (bloodGroup ? 1 : 0) +
    (state ? 1 : 0) +
    (city ? 1 : 0) +
    (locality ? 1 : 0) +
    (pincode ? 1 : 0) +
    (availability ? 1 : 0);

  function reset() {
    setBloodGroup('');
    setState('');
    setCity('');
    setLocality('');
    setPincode('');
    setAvailability('');
  }

  function handleSendRequest(donor: Donor) {
    setRequestFor(donor);
  }

  function confirmRequest() {
    if (!requestFor) return;
    toast.success(
      'Request sent (sample)',
      `A connection request has been queued for ${requestFor.displayName}. In the full version the donor would be notified privately.`,
    );
    setRequestFor(null);
  }

  return (
    <div className="bg-navy-50/40 min-h-screen">
      <PageHeader />

      <div className="container-px mx-auto max-w-7xl py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Filters */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center justify-between lg:hidden">
                <button
                  onClick={() => setShowFilters((v) => !v)}
                  className="btn-outline w-full"
                >
                  <Filter className="h-4 w-4" />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
              </div>
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="card p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-base font-bold text-navy-900">
                      Refine search
                    </h2>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={reset}
                        className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="label">Blood group</label>
                      <div className="grid grid-cols-4 gap-2">
                        {BLOOD_GROUPS.map((g) => (
                          <button
                            key={g}
                            onClick={() =>
                              setBloodGroup((cur) => (cur === g ? '' : g))
                            }
                            className={`rounded-lg py-2 text-sm font-bold transition-all ${
                              bloodGroup === g
                                ? 'bg-primary-600 text-white shadow-glow-sm'
                                : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="label">State</label>
                      <select
                        className="input"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          setCity('');
                        }}
                      >
                        <option value="">All states</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label">City</label>
                      <select
                        className="input"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={!state}
                      >
                        <option value="">All cities</option>
                        {cities.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label">Locality</label>
                      <input
                        className="input"
                        placeholder="e.g. Andheri West"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="label">PIN code</label>
                      <input
                        className="input"
                        placeholder="e.g. 400058"
                        inputMode="numeric"
                        value={pincode}
                        onChange={(e) =>
                          setPincode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))
                        }
                      />
                    </div>

                    <div>
                      <label className="label">Availability</label>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABILITY_OPTIONS.map((a) => (
                          <button
                            key={a}
                            onClick={() =>
                              setAvailability((cur) => (cur === a ? '' : a))
                            }
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                              availability === a
                                ? 'bg-navy-900 text-white'
                                : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-primary-50 p-4 ring-1 ring-primary-100">
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-primary-800">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                    Only verified, approved donor profiles appear in search results.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-navy-900">
                  Donor results
                </h1>
                <p className="text-sm text-navy-500">
                  {loading
                    ? 'Searching…'
                    : `${filtered.length} verified ${filtered.length === 1 ? 'donor' : 'donors'} found`}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeFilterCount > 0 &&
                  ([
                    bloodGroup ? { label: bloodGroup, clear: () => setBloodGroup('') } : null,
                    state ? { label: state, clear: () => setState('') } : null,
                    city ? { label: city, clear: () => setCity('') } : null,
                    locality ? { label: locality, clear: () => setLocality('') } : null,
                    pincode ? { label: pincode, clear: () => setPincode('') } : null,
                    availability ? { label: availability, clear: () => setAvailability('') } : null,
                  ] as { label: string; clear: () => void }[])
                    .filter((f): f is { label: string; clear: () => void } => f !== null)
                    .map((f) => (
                      <span
                        key={f.label}
                        className="badge bg-navy-900 text-white"
                      >
                        {f.label}
                        <button onClick={f.clear} className="hover:text-primary-300">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
              </div>
            </div>

            {loading ? (
              <SkeletonGrid />
            ) : filtered.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {filtered.map((d, i) => (
                  <DonorCard
                    key={d.id}
                    donor={d}
                    onSendRequest={handleSendRequest}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <RequestModal
        donor={requestFor}
        onClose={() => setRequestFor(null)}
        onConfirm={confirmRequest}
      />
    </div>
  );
}

function PageHeader() {
  return (
    <div className="bg-navy-950 text-white">
      <div className="container-px mx-auto max-w-7xl py-12">
        <span className="section-eyebrow bg-white/10 text-primary-200 ring-1 ring-white/15">
          <Search className="h-3.5 w-3.5" /> Find donors
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Find a compatible donor near you
        </h1>
        <p className="mt-3 max-w-2xl text-navy-300">
          Search our verified donor directory by blood group and location. When you
          find a match, send a private request — Life Link never exposes phone numbers
          or home addresses.
        </p>
      </div>
    </div>
  );
}

function DonorCard({
  donor,
  onSendRequest,
  index,
}: {
  donor: Donor;
  onSendRequest: (d: Donor) => void;
  index: number;
}) {
  return (
    <div
      className="card group flex flex-col p-5 hover:-translate-y-1 hover:shadow-glow-sm"
      style={{ animation: `fadeUp 0.45s ${Math.min(index, 8) * 50}ms both` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <BloodGroupBadge group={donor.bloodGroup} />
          <div>
            <h3 className="font-display text-lg font-bold text-navy-900">
              {donor.displayName}
            </h3>
            <p className="flex items-center gap-1 text-xs text-navy-500">
              <MapPin className="h-3.5 w-3.5" />
              {donor.city}, {donor.state}
            </p>
          </div>
        </div>
        <span className={`badge ${availabilityStyles[donor.availability]}`}>
          <Clock className="h-3 w-3" />
          {donor.availability}
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-navy-400">Locality</dt>
          <dd className="mt-0.5 font-semibold text-navy-800">{donor.locality}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-navy-400">PIN code</dt>
          <dd className="mt-0.5 font-semibold text-navy-800">{donor.pincode}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-navy-100 pt-4">
        <span className="flex items-center gap-1.5 text-xs font-medium text-navy-500">
          <ShieldCheck className="h-4 w-4 text-success-500" />
          Verified profile
        </span>
        <button
          onClick={() => onSendRequest(donor)}
          className="btn-primary px-4 py-2 text-sm"
        >
          <Send className="h-4 w-4" />
          Send Request
        </button>
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card h-56 animate-pulse p-5">
          <div className="flex gap-3">
            <div className="h-11 w-11 rounded-xl bg-navy-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 rounded bg-navy-100" />
              <div className="h-3 w-1/3 rounded bg-navy-100" />
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <div className="h-3 w-2/3 rounded bg-navy-100" />
            <div className="h-3 w-1/2 rounded bg-navy-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-6 card flex flex-col items-center justify-center p-12 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-navy-50 text-navy-300">
        <Users className="h-8 w-8" />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-navy-900">
        No matching donors found
      </h3>
      <p className="mt-2 max-w-md text-sm text-navy-600">
        We couldn't find any approved donor profiles matching your filters. Try widening
        your search — remove the city or locality filter, or choose a different blood group.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button onClick={onReset} className="btn-outline">
          <RotateCcw className="h-4 w-4" />
          Clear all filters
        </button>
        <a href="/register" className="btn-primary">
          <Droplet className="h-4 w-4" />
          Register as a donor
        </a>
      </div>
    </div>
  );
}
