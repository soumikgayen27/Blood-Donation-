import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  ShieldCheck,
  Lock,
  Stethoscope,
  Droplet,
  CheckCircle2,
  AlertTriangle,
  Ban,
  ArrowRight,
  Building2,
  UserCheck,
  FileCheck2,
  Clock,
  Siren,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

export function AboutPage() {
  return (
    <div>
      <Hero />
      <Purpose />
      <DonationProcess />
      <PrivacyGuidelines />
      <SafetyPrecautions />
      <Faqs />
      <Cta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-black" />
      <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-30" />
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="container-px relative mx-auto max-w-7xl py-20">
        <div className="max-w-2xl">
          <span className="section-eyebrow bg-white/10 text-primary-200 ring-1 ring-white/15">
            <ShieldCheck className="h-3.5 w-3.5" /> About & safety
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            A safer way to connect donors and those in need
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-navy-200">
            Life Link is a community-driven donor registry built on three principles:
            verification, privacy and medical authority. Learn how the platform works,
            how donations are coordinated, and the safety measures that protect everyone.
          </p>
        </div>
      </div>
      <svg viewBox="0 0 1440 60" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,30 C360,60 720,0 1440,30 L1440,60 L0,60 Z" fill="white" />
      </svg>
    </section>
  );
}

function Purpose() {
  const values = [
    {
      icon: HeartHandshake,
      title: 'Our purpose',
      text: 'To bridge the gap between people who urgently need blood and verified volunteer donors in their area — reducing the time from need to connection.',
    },
    {
      icon: ShieldCheck,
      title: 'Our promise',
      text: 'Every profile is reviewed before it is visible. We never publish phone numbers or residential addresses, and we never certify medical eligibility.',
    },
    {
      icon: Building2,
      title: 'Our boundary',
      text: 'Life Link is a matching platform, not a medical service. Final arrangements are always made through hospitals and licensed blood banks.',
    },
  ];
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <SectionHeader
        eyebrow="Why Life Link exists"
        title="Connecting compassion with trust"
        description="Blood availability should never depend on luck or who you know. Life Link makes the search transparent, fast and safe."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="card p-6 hover:-translate-y-1 hover:shadow-glow-sm transition-all">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary-600">
              <v.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">{v.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DonationProcess() {
  const steps = [
    { icon: UserCheck, title: 'Register as a donor', text: 'Provide your display name, blood group and general location. Your profile enters pending review.' },
    { icon: FileCheck2, title: 'Admin verification', text: 'Our team reviews each registration. Only approved profiles appear in public search results.' },
    { icon: Droplet, title: 'Receive a request', text: 'When someone needs your blood group, a request is routed to you privately through the platform.' },
    { icon: Building2, title: 'Coordinate with hospital', text: 'You and the recipient coordinate through a hospital or licensed blood bank — never privately.' },
    { icon: CheckCircle2, title: 'Complete donation', text: 'A licensed medical professional confirms your eligibility and conducts the donation safely.' },
  ];
  return (
    <section className="bg-navy-50/70 py-20">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The donation process"
          title="From registration to donation"
          description="A clear, medically responsible path — no private arrangements, no shortcuts."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="card h-full p-5">
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy-900 text-primary-400">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-extrabold text-navy-100">{i + 1}</span>
                </div>
                <h3 className="mt-3 font-display text-sm font-bold text-navy-900">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-navy-600">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivacyGuidelines() {
  const points = [
    { icon: Lock, title: 'No phone numbers published', text: 'Contact details are never shown in search results. Communication is routed through the platform until both parties consent.' },
    { icon: Lock, title: 'No residential addresses', text: 'We only store locality, city and PIN code — enough to match geographically, never enough to locate a home.' },
    { icon: ShieldCheck, title: 'Admin-reviewed profiles', text: 'Every donor registration is manually reviewed before becoming visible. Suspicious or incomplete entries are rejected.' },
    { icon: Ban, title: 'You control your listing', text: 'Donors can update their availability preference or request deactivation at any time. There is no obligation to donate.' },
    { icon: UserCheck, title: 'Consent required', text: 'No donor is ever contacted without having explicitly registered and consented to the privacy terms.' },
    { icon: FileCheck2, title: 'Data stays on-device (prototype)', text: 'In this prototype all data is stored locally in your browser. A production version would use Supabase with row-level security.' },
  ];
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <SectionHeader
        eyebrow="Privacy guidelines"
        title="Your privacy is engineered in, not bolted on"
        description="We collect the minimum needed to match donors with recipients — and protect the rest."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy-100">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
              <p.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-navy-900">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SafetyPrecautions() {
  const allowed = [
    'Use Life Link to find compatible donors by blood group and location',
    'Coordinate the actual donation through a hospital or licensed blood bank',
    'Confirm donor eligibility with a qualified medical professional',
    'Update your availability preference honestly and regularly',
  ];
  const notAllowed = [
    'Do not arrange donations privately outside a medical facility',
    'Do not share or request real phone numbers or home addresses on the platform',
    'Do not assume a listed donor is medically eligible or currently available',
    'Do not use Life Link as a replacement for emergency medical services',
    'Do not make medical compatibility decisions based on blood group alone',
  ];
  return (
    <section className="bg-gradient-to-br from-navy-900 to-navy-950 py-20 text-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Safety precautions"
          title={<span className="text-white">What Life Link is — and isn't</span>}
          description={<span className="text-navy-300">Clear boundaries keep everyone safe. Here is exactly what the platform should and should not be used for.</span>}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-success-500/20 text-success-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold">Do</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {allowed.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-navy-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-400" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-500/20 text-primary-400">
                <Ban className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold">Don't</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {notAllowed.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-navy-200">
                  <Ban className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-warning-500/10 p-5 ring-1 ring-warning-500/20">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning-400" />
          <p className="text-sm text-navy-100">
            <strong className="text-white">Medical disclaimer:</strong> Life Link is a
            prototype and not a replacement for professional medical services. We do not
            certify that any listed donor is medically eligible or available right now,
            and we do not provide medical compatibility decisions. Always verify
            arrangements through hospitals and licensed blood banks.
          </p>
        </div>
      </div>
    </section>
  );
}

function Faqs() {
  const faqs = [
    {
      q: 'Is Life Link a medical service?',
      a: 'No. Life Link is a donor-matching platform. All medical decisions, eligibility checks and the donation itself must happen at a hospital or licensed blood bank under professional supervision.',
      icon: Stethoscope,
    },
    {
      q: 'Are the donor profiles real?',
      a: 'In this prototype all data is fictional sample data. No real people, phone numbers or addresses are represented. A production deployment would verify identities before approval.',
      icon: UserCheck,
    },
    {
      q: 'Will my phone number be visible?',
      a: 'Never. We do not publish phone numbers or residential addresses. Matching happens by blood group and general location only.',
      icon: Lock,
    },
    {
      q: 'How urgent can a request be?',
      a: 'You can mark a request as Critical, Urgent or Moderate. Critical requests are surfaced first to administrators — but Life Link cannot dispatch blood, so for true emergencies contact a hospital directly.',
      icon: Siren,
    },
    {
      q: 'Can I stop being a donor?',
      a: 'Yes, at any time. Donors can request deactivation and their profile will no longer appear in search results. There is never any obligation to donate.',
      icon: Clock,
    },
  ];
  return (
    <section className="container-px mx-auto max-w-4xl py-20">
      <SectionHeader eyebrow="FAQ" title="Questions, answered" />
      <div className="mt-10 space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="group card overflow-hidden">
            <summary className="flex cursor-pointer items-center gap-4 p-5 list-none">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
                <f.icon className="h-5 w-5" />
              </div>
              <span className="flex-1 font-display text-base font-bold text-navy-900">{f.q}</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-navy-100 text-navy-600 transition-transform group-open:rotate-45">
                <ArrowRight className="h-4 w-4 rotate-90" />
              </span>
            </summary>
            <div className="px-5 pb-5 pl-[4.5rem] text-sm leading-relaxed text-navy-600">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="container-px mx-auto max-w-7xl pb-20">
      <div className="rounded-3xl bg-navy-950 p-10 text-center text-white sm:p-14">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Every drop counts. Every connection matters.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-navy-300">
          Join a community built on trust. Register as a donor or find the blood you need today.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/register" className="btn-primary">
            <Droplet className="h-5 w-5" />
            Become a donor
          </Link>
          <Link to="/find" className="btn bg-white/10 px-5 py-3 text-white ring-1 ring-white/20 hover:bg-white/20">
            <ArrowRight className="h-5 w-5" />
            Find blood
          </Link>
        </div>
      </div>
    </section>
  );
}
