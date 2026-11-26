import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Droplet,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  Home,
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
import { addDonor, genId } from '@/lib/store';
import { useToast } from '@/components/ToastProvider';

interface FormState {
  displayName: string;
  bloodGroup: BloodGroup | '';
  state: string;
  city: string;
  locality: string;
  pincode: string;
  availability: AvailabilityPreference | '';
  consent: boolean;
}

const initial: FormState = {
  displayName: '',
  bloodGroup: '',
  state: '',
  city: '',
  locality: '',
  pincode: '',
  availability: '',
  consent: false,
};

export function RegisterDonorPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<Donor | null>(null);
  const toast = useToast();

  const cities = form.state ? CITIES_BY_STATE[form.state] ?? [] : [];

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.displayName.trim()) e.displayName = 'Please enter your display name.';
    else if (form.displayName.trim().length < 2) e.displayName = 'Display name is too short.';
    if (!form.bloodGroup) e.bloodGroup = 'Select your blood group.';
    if (!form.state) e.state = 'Select your state.';
    if (!form.city) e.city = 'Select your city.';
    if (!form.locality.trim()) e.locality = 'Enter your locality or area.';
    if (!form.pincode.trim()) e.pincode = 'Enter your PIN code.';
    else if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = 'PIN code must be 6 digits.';
    if (!form.availability) e.availability = 'Choose an availability preference.';
    if (!form.consent) e.consent = 'You must agree to the privacy consent to continue.';
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
    // simulate small async to show loading state
    setTimeout(() => {
      const donor: Donor = {
        id: genId('d'),
        displayName: form.displayName.trim(),
        bloodGroup: form.bloodGroup as BloodGroup,
        state: form.state,
        city: form.city,
        locality: form.locality.trim(),
        pincode: form.pincode.trim(),
        availability: form.availability as AvailabilityPreference,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      addDonor(donor);
      setSubmitting(false);
      setSuccess(donor);
      toast.success('Registration received', 'Your profile is pending admin verification.');
    }, 700);
  }

  if (success) {
    return <SuccessConfirmation donor={success} onAnother={() => { setForm(initial); setSuccess(null); }} />;
  }

  return (
    <div className="bg-navy-50/40 min-h-screen">
      <div className="bg-navy-950 text-white">
        <div className="container-px mx-auto max-w-7xl py-12">
          <span className="section-eyebrow bg-white/10 text-primary-200 ring-1 ring-white/15">
            <Droplet className="h-3.5 w-3.5" /> Become a donor
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Register as a potential donor
          </h1>
          <p className="mt-3 max-w-2xl text-navy-300">
            Join the Life Link network. Your profile will be reviewed by our admin team
            and, once approved, will appear in search results for those who need your
            blood group.
          </p>
        </div>
      </div>

      <div className="container-px mx-auto max-w-3xl py-10">
        <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Display name" error={errors.displayName} required full>
              <input
                className="input"
                placeholder="e.g. Aarav Sharma"
                value={form.displayName}
                onChange={(e) => update('displayName', e.target.value)}
                maxLength={60}
              />
            </Field>

            <Field label="Blood group" error={errors.bloodGroup} required>
              <select
                className="input"
                value={form.bloodGroup}
                onChange={(e) => update('bloodGroup', e.target.value as BloodGroup)}
              >
                <option value="">Select blood group</option>
                {BLOOD_GROUPS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </Field>

            <Field label="Availability preference" error={errors.availability} required>
              <select
                className="input"
                value={form.availability}
                onChange={(e) => update('availability', e.target.value as AvailabilityPreference)}
              >
                <option value="">Select availability</option>
                {AVAILABILITY_OPTIONS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
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

            <Field label="Locality / area" error={errors.locality} required>
              <input
                className="input"
                placeholder="e.g. Andheri West"
                value={form.locality}
                onChange={(e) => update('locality', e.target.value)}
                maxLength={80}
              />
            </Field>

            <Field label="PIN code" error={errors.pincode} required>
              <input
                className="input"
                placeholder="6-digit PIN code"
                inputMode="numeric"
                value={form.pincode}
                onChange={(e) => update('pincode', e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              />
            </Field>
          </div>

          <label className={`mt-6 flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
            errors.consent ? 'border-primary-300 bg-primary-50/50' : 'border-navy-200 bg-navy-50/40 hover:bg-navy-50'
          }`}>
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 rounded border-navy-300 text-primary-600 focus:ring-primary-500"
              checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
            />
            <span className="text-sm leading-relaxed text-navy-700">
              I consent to Life Link storing my <strong>display name, blood group and
              general location</strong> for the purpose of donor matching. I understand
              that my phone number and exact residential address will never be published,
              and that my profile must be approved by an administrator before it appears
              publicly.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1.5 text-sm text-primary-600">{errors.consent}</p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-navy-500">
              <Lock className="h-4 w-4" />
              Your data stays on this device in the prototype.
            </p>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Submitting…
                </>
              ) : (
                <>
                  <Droplet className="h-4 w-4" />
                  Submit registration
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'Verified', text: 'Profiles are reviewed before going live.' },
            { icon: Lock, title: 'Private', text: 'No phone numbers or addresses published.' },
            { icon: CheckCircle2, title: 'No obligation', text: 'You choose when and whether to donate.' },
          ].map((b) => (
            <div key={b.title} className="card flex items-start gap-3 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-600">
                <b.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-navy-900">{b.title}</p>
                <p className="text-xs text-navy-600">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
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

function SuccessConfirmation({
  donor,
  onAnother,
}: {
  donor: Donor;
  onAnother: () => void;
}) {
  return (
    <div className="bg-navy-50/40 min-h-screen flex items-center justify-center px-4 py-16">
      <div className="card w-full max-w-lg p-8 text-center animate-scale-in">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-success-100 text-success-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-extrabold text-navy-900">
          Registration received
        </h2>
        <p className="mt-3 text-navy-600">
          Thank you, <strong className="text-navy-900">{donor.displayName}</strong>. Your
          donor profile for blood group{' '}
          <strong className="text-primary-700">{donor.bloodGroup}</strong> has been
          submitted and is now <strong>pending verification</strong> by our admin team.
        </p>

        <div className="mt-6 rounded-2xl bg-navy-50 p-5 text-left">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Summary label="Blood group" value={donor.bloodGroup} />
            <Summary label="Availability" value={donor.availability} />
            <Summary label="City" value={donor.city} />
            <Summary label="State" value={donor.state} />
            <Summary label="Locality" value={donor.locality} />
            <Summary label="PIN code" value={donor.pincode} />
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-primary-50 p-4 ring-1 ring-primary-100">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-primary-800">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
            Once approved, your profile will appear in search results. You can update or
            deactivate your listing at any time. Life Link never shares your phone number
            or exact address.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button onClick={onAnother} className="btn-outline">
            Register another donor
          </button>
          <Link to="/find" className="btn-primary">
            Browse donors
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/" className="btn-ghost">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>

        <p className="mt-6 text-xs text-navy-400">
          Reference ID: <span className="font-mono">{donor.id}</span>
        </p>
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-navy-400">{label}</p>
      <p className="mt-0.5 font-semibold text-navy-900">{value}</p>
    </div>
  );
}

