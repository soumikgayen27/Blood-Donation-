import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Siren,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Home,
  Search,
  AlertTriangle,
} from 'lucide-react';
import {
  BLOOD_GROUPS,
  URGENCY_OPTIONS,
  INDIAN_STATES,
  CITIES_BY_STATE,
  type BloodRequest,
  type BloodGroup,
  type UrgencyLevel,
} from '@/types';
import { addRequest, getRequests, genId } from '@/lib/store';
import { useToast } from '@/components/ToastProvider';
import { BloodGroupBadge } from '@/components/Logo';

interface FormState {
  requesterName: string;
  bloodGroup: BloodGroup | '';
  state: string;
  city: string;
  location: string;
  urgency: UrgencyLevel | '';
  message: string;
}

const initial: FormState = {
  requesterName: '',
  bloodGroup: '',
  state: '',
  city: '',
  location: '',
  urgency: '',
  message: '',
};

const urgencyStyles: Record<UrgencyLevel, string> = {
  Critical: 'bg-primary-100 text-primary-700 ring-primary-200',
  Urgent: 'bg-warning-100 text-warning-700 ring-warning-200',
  Moderate: 'bg-navy-100 text-navy-700 ring-navy-200',
};

export function BloodRequestPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<BloodRequest | null>(null);
  const [recent, setRecent] = useState<BloodRequest[]>([]);
  const toast = useToast();

  const cities = form.state ? CITIES_BY_STATE[form.state] ?? [] : [];

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.requesterName.trim()) e.requesterName = 'Please enter the requester name.';
    else if (form.requesterName.trim().length < 2) e.requesterName = 'Name is too short.';
    if (!form.bloodGroup) e.bloodGroup = 'Select the required blood group.';
    if (!form.state) e.state = 'Select a state.';
    if (!form.city) e.city = 'Select a city.';
    if (!form.location.trim()) e.location = 'Enter a general location (e.g. hospital name).';
    if (!form.urgency) e.urgency = 'Choose an urgency level.';
    if (form.message.trim().length > 300) e.message = 'Message must be 300 characters or fewer.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      toast.error('Please review the form', 'Some required fields need your attention.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const req: BloodRequest = {
        id: genId('r'),
        requesterName: form.requesterName.trim(),
        bloodGroup: form.bloodGroup as BloodGroup,
        state: form.state,
        city: form.city,
        location: form.location.trim(),
        urgency: form.urgency as UrgencyLevel,
        message: form.message.trim(),
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      addRequest(req);
      setRecent(getRequests().slice(0, 4));
      setSubmitting(false);
      setSuccess(req);
      toast.success('Request submitted', 'Your blood request has been recorded.');
    }, 700);
  }

  if (success) {
    return <RequestConfirmation request={success} recent={recent} onAnother={() => { setForm(initial); setSuccess(null); }} />;
  }

  return (
    <div className="bg-navy-50/40 min-h-screen">
      <div className="bg-navy-950 text-white">
        <div className="container-px mx-auto max-w-7xl py-12">
          <span className="section-eyebrow bg-white/10 text-primary-200 ring-1 ring-white/15">
            <Siren className="h-3.5 w-3.5" /> Blood request
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Submit a blood request
          </h1>
          <p className="mt-3 max-w-2xl text-navy-300">
            Need blood urgently? Share your requirement so nearby donors can respond.
            Requests are visible to administrators who help coordinate safe connections
            through hospitals and licensed blood banks.
          </p>
        </div>
      </div>

      <div className="container-px mx-auto max-w-3xl py-10">
        <div className="mb-6 rounded-2xl bg-warning-50 p-4 ring-1 ring-warning-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning-600" />
            <p className="text-sm leading-relaxed text-warning-800">
              <strong>Medical emergency?</strong> Life Link is a prototype and cannot
              dispatch blood. If this is a life-threatening emergency, contact your local
              hospital or blood bank directly. This platform helps find volunteer donors —
              it is not a replacement for professional medical services.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Requester display name" error={errors.requesterName} required full>
              <input
                className="input"
                placeholder="e.g. Priya Malhotra"
                value={form.requesterName}
                onChange={(e) => update('requesterName', e.target.value)}
                maxLength={60}
              />
            </Field>

            <Field label="Required blood group" error={errors.bloodGroup} required>
              <div className="grid grid-cols-4 gap-2">
                {BLOOD_GROUPS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => update('bloodGroup', form.bloodGroup === g ? '' : g)}
                    className={`rounded-lg py-2 text-sm font-bold transition-all ${
                      form.bloodGroup === g
                        ? 'bg-primary-600 text-white shadow-glow-sm'
                        : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Urgency level" error={errors.urgency} required>
              <div className="flex flex-wrap gap-2">
                {URGENCY_OPTIONS.map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => update('urgency', form.urgency === u ? '' : u)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-all ${
                      form.urgency === u
                        ? urgencyStyles[u]
                        : 'bg-white text-navy-600 ring-navy-200 hover:bg-navy-50'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="State" error={errors.state} required>
              <select
                className="input"
                value={form.state}
                onChange={(e) => { update('state', e.target.value); update('city', ''); }}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="City" error={errors.city} required>
              <select
                className="input"
                value={form.city}
                onChange={(e) => update('city', e.target.value)}
                disabled={!form.state}
              >
                <option value="">Select city</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="General location" error={errors.location} required full>
              <input
                className="input"
                placeholder="e.g. Lilavati Hospital, Bandra West"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                maxLength={120}
              />
              <p className="mt-1.5 text-xs text-navy-500">
                Use a hospital or landmark — never a full residential address.
              </p>
            </Field>

            <Field label="Additional message" error={errors.message} full>
              <textarea
                className="input min-h-[110px] resize-y"
                placeholder="Add any context that helps donors respond (units needed, deadline, etc.). Keep it concise."
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                maxLength={300}
              />
              <p className="mt-1.5 text-right text-xs text-navy-400">
                {form.message.length}/300
              </p>
            </Field>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-navy-500">
              <ShieldCheck className="h-4 w-4" />
              Requests are reviewed by admins before coordination.
            </p>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Submitting…
                </>
              ) : (
                <>
                  <Siren className="h-4 w-4" />
                  Submit request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  required,
  full,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="label">
        {label}
        {required && <span className="text-primary-600"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-primary-600">{error}</p>}
    </div>
  );
}

function RequestConfirmation({
  request,
  recent,
  onAnother,
}: {
  request: BloodRequest;
  recent: BloodRequest[];
  onAnother: () => void;
}) {
  return (
    <div className="bg-navy-50/40 min-h-screen px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="card p-8 text-center animate-scale-in">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-success-100 text-success-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-extrabold text-navy-900">
            Request submitted
          </h2>
          <p className="mt-3 text-navy-600">
            Thank you, <strong className="text-navy-900">{request.requesterName}</strong>.
            Your request for blood group{' '}
            <strong className="text-primary-700">{request.bloodGroup}</strong> has been
            recorded and is now visible to our admin coordination team.
          </p>

          <div className="mt-6 rounded-2xl bg-navy-50 p-5 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BloodGroupBadge group={request.bloodGroup} size="sm" />
                <div>
                  <p className="font-display font-bold text-navy-900">{request.location}</p>
                  <p className="text-xs text-navy-500">{request.city}, {request.state}</p>
                </div>
              </div>
              <span className={`badge ring-1 ${urgencyStyles[request.urgency]}`}>
                {request.urgency}
              </span>
            </div>
            {request.message && (
              <p className="mt-4 border-t border-navy-200 pt-4 text-sm text-navy-700">
                {request.message}
              </p>
            )}
          </div>

          <div className="mt-6 rounded-xl bg-primary-50 p-4 ring-1 ring-primary-100">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-primary-800">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              Life Link will help surface compatible donors. Final arrangements must be
              verified through a hospital or licensed blood bank. This platform is not a
              replacement for professional medical services.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button onClick={onAnother} className="btn-outline">
              Submit another request
            </button>
            <Link to="/find" className="btn-primary">
              <Search className="h-4 w-4" />
              Find donors now
            </Link>
            <Link to="/" className="btn-ghost">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </div>

          <p className="mt-6 text-xs text-navy-400">
            Reference ID: <span className="font-mono">{request.id}</span>
          </p>
        </div>

        {recent.length > 1 && (
          <div className="mt-8">
            <h3 className="font-display text-lg font-bold text-navy-900">Recent requests</h3>
            <div className="mt-4 space-y-3">
              {recent.filter((r) => r.id !== request.id).slice(0, 3).map((r) => (
                <div key={r.id} className="card flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <BloodGroupBadge group={r.bloodGroup} size="sm" />
                    <div>
                      <p className="font-display text-sm font-bold text-navy-900">{r.requesterName}</p>
                      <p className="text-xs text-navy-500">{r.location}, {r.city}</p>
                    </div>
                  </div>
                  <span className={`badge ring-1 ${urgencyStyles[r.urgency]}`}>{r.urgency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
