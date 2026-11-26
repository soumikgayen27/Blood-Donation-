import { Link } from 'react-router-dom';
import {
  Search,
  Droplet,
  ShieldCheck,
  HeartHandshake,
  Activity,
  MapPin,
  Clock,
  UserCheck,
  BadgeCheck,
  Lock,
  Stethoscope,
  ArrowRight,
  HandHeart,
  Building2,
  Users,
  Siren,
  Sparkles,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { BloodGroupBadge } from '@/components/Logo';
import { bloodGroupStats } from '@/data/sampleData';

export function HomePage() {
  return (
    <div>
      <Hero />
      <StatsBar />
      <BloodGroupDistribution />
      <HowItWorks />
      <WhyChooseUs />
      <SafetyVerification />
      <CtaBand />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-black" />
      <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-40" />
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-primary-700/20 blur-3xl" />

      <div className="container-px relative mx-auto max-w-7xl py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-200 ring-1 ring-white/15 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
              </span>
              Live donor network · sample data
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Someone Needs Blood.
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-300 bg-clip-text text-transparent">
                You Could Be Their Hope.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-200">
              Life Link connects people searching for blood with verified volunteer
              donors across India. Search by blood group and location, register as a
              donor, or raise an emergency request — all in one trusted place.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/find" className="btn-primary text-base">
                <Search className="h-5 w-5" />
                Find Blood
              </Link>
              <Link
                to="/register"
                className="btn bg-white/10 px-5 py-3 text-base text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15 focus-visible:ring-white/40 active:scale-[0.98]"
              >
                <Droplet className="h-5 w-5" />
                Become a Donor
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy-300">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success-500" />
                Verified profiles
              </span>
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-navy-400" />
                Privacy first
              </span>
              <span className="flex items-center gap-2">
                <Siren className="h-4 w-4 text-primary-400" />
                Emergency support
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroCard />
          </div>
        </div>
      </div>

      {/* wave divider */}
      <div className="relative">
        <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,80 480,0 720,24 C960,48 1200,80 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="relative animate-scale-in">
      <div className="absolute -right-3 -top-3 z-10 rounded-2xl bg-primary-600 px-4 py-3 text-white shadow-glow">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Critical need</p>
        <p className="font-display text-2xl font-extrabold leading-none">O-</p>
      </div>

      <div className="rounded-3xl bg-white/95 p-6 text-navy-900 shadow-2xl ring-1 ring-white/20 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              Active request
            </p>
            <p className="mt-1 font-display text-lg font-bold">Lilavati Hospital, Bandra</p>
          </div>
          <span className="badge bg-primary-50 text-primary-700">
            <Siren className="h-3.5 w-3.5" /> Critical
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {[
            { name: 'Aarav Sharma', group: 'O+', area: 'Andheri West, Mumbai', avail: 'Available' },
            { name: 'Navya Desai', group: 'O+', area: 'Kothrud, Pune', avail: 'On Request' },
            { name: 'Aditya Joshi', group: 'O+', area: 'Malviya Nagar, Jaipur', avail: 'Available' },
          ].map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-3 rounded-2xl bg-navy-50 p-3 transition-colors hover:bg-primary-50/60"
            >
              <BloodGroupBadge group={d.group} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold text-navy-900">{d.name}</p>
                <p className="truncate text-xs text-navy-500">{d.area}</p>
              </div>
              <span className="badge bg-success-100 text-success-700">{d.avail}</span>
            </div>
          ))}
        </div>

        <Link
          to="/find"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          See all matching donors
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { label: 'Active donors', value: '32,950+', icon: Users },
    { label: 'Cities covered', value: '120+', icon: Building2 },
    { label: 'Requests fulfilled', value: '8,140', icon: HandHeart },
    { label: 'Avg. response time', value: '24 min', icon: Clock },
  ];
  return (
    <section className="container-px mx-auto max-w-7xl -mt-8 relative z-10">
      <div className="card grid grid-cols-2 divide-navy-100 rounded-2xl lg:grid-cols-4 lg:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-4 p-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-navy-900">{s.value}</p>
              <p className="text-xs font-medium text-navy-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BloodGroupDistribution() {
  const max = Math.max(...bloodGroupStats.map((s) => s.percentage));
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <SectionHeader
        eyebrow="Blood group distribution"
        title="Know the rarity. Understand the need."
        description="Some blood groups are far rarer than others. Life Link helps surface donors for every group — especially the ones that are hardest to find."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bloodGroupStats.map((s, i) => (
          <div
            key={s.group}
            className="card group p-5 hover:-translate-y-1 hover:shadow-glow-sm"
            style={{ animation: `fadeUp 0.5s ${i * 60}ms both` }}
          >
            <div className="flex items-center justify-between">
              <BloodGroupBadge group={s.group} />
              <span className="font-display text-2xl font-extrabold text-navy-900">
                {s.percentage}%
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-navy-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-700"
                style={{ width: `${(s.percentage / max) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-navy-500">
              ~{s.donors.toLocaleString()} registered donors
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-navy-400">
        Figures are fictional sample data for prototype demonstration.
      </p>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Search for donors',
      text: 'Filter by blood group, state, city, locality and PIN code to find nearby volunteers.',
    },
    {
      icon: HandHeart,
      title: 'Send a request',
      text: 'Reach out through the platform with your requirement and urgency level.',
    },
    {
      icon: UserCheck,
      title: 'Get verified',
      text: 'Each donor profile is reviewed and verified before it appears in search results.',
    },
    {
      icon: Building2,
      title: 'Coordinate safely',
      text: 'Final arrangements are made through hospitals and licensed blood banks — never privately.',
    },
  ];
  return (
    <section className="bg-navy-50/70 py-20">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="How it works"
          title="Four steps from need to connection"
          description="A simple, transparent flow built around safety and speed."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="card h-full p-6 hover:-translate-y-1 hover:shadow-glow-sm">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-600 text-white shadow-glow-sm">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-4xl font-extrabold text-navy-100">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{s.text}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute right-[-12px] top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                  <ArrowRight className="h-5 w-5 text-navy-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    {
      icon: ShieldCheck,
      title: 'Verified donor profiles',
      text: 'Every listing is reviewed by our admin team before going live. No unverified contacts ever appear in search.',
    },
    {
      icon: Lock,
      title: 'Privacy by design',
      text: 'We never publish real phone numbers or residential addresses. Contact is routed through the platform.',
    },
    {
      icon: Activity,
      title: 'Real-time matching',
      text: 'Find donors filtered by blood group and precise geography — down to locality and PIN code.',
    },
    {
      icon: Siren,
      title: 'Emergency requests',
      text: 'Raise a critical request and surface every compatible donor in your area in seconds.',
    },
    {
      icon: HeartHandshake,
      title: 'Community driven',
      text: 'Built by volunteers for volunteers. Life Link is a non-commercial donor network prototype.',
    },
    {
      icon: Sparkles,
      title: 'Clean, modern experience',
      text: 'A focused interface that gets you from search to connection without friction.',
    },
  ];
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <SectionHeader
        eyebrow="Why Life Link"
        title="Built around trust, privacy and speed"
        description="We obsess over the details that matter when minutes count."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="group card p-6 transition-all hover:-translate-y-1 hover:shadow-glow-sm"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-primary-400 transition-colors group-hover:bg-primary-600 group-hover:text-white">
              <it.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SafetyVerification() {
  const points = [
    {
      icon: BadgeCheck,
      title: 'Profile verification',
      text: 'Admins review each registration. Only approved profiles appear in public search results.',
    },
    {
      icon: Stethoscope,
      title: 'Hospital coordination',
      text: 'Actual donation arrangements must always be verified through hospitals and licensed blood banks.',
    },
    {
      icon: Lock,
      title: 'No sensitive data exposed',
      text: 'Phone numbers and exact residential addresses are never published on the platform.',
    },
  ];
  return (
    <section className="bg-gradient-to-br from-navy-900 to-navy-950 py-20 text-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-200 ring-1 ring-white/15">
              Safety & verification
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Trust is not a feature. It is the foundation.
            </h2>
            <p className="mt-4 text-navy-300">
              Life Link is designed so that no one is ever asked to trust a stranger
              blindly. Verification, privacy and medical authority sit at the core of
              every interaction.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300"
            >
              Read our full safety guidelines
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {points.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/10"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-600/20 text-primary-400">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-300">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-warning-500/10 p-4 ring-1 ring-warning-500/20">
              <Siren className="mt-0.5 h-5 w-5 shrink-0 text-warning-400" />
              <p className="text-sm text-navy-200">
                <strong className="text-white">Important:</strong> Life Link is a
                prototype and not a replacement for professional medical services. We do
                not certify that any listed donor is medically eligible or currently
                available to donate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-10 text-white shadow-glow sm:p-14">
        <div className="absolute inset-0 bg-grid-faint [background-size:32px_32px] opacity-20" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to be someone's hope?
            </h2>
            <p className="mt-3 max-w-xl text-primary-100">
              Join the Life Link donor network today. Registration takes less than two
              minutes and could help save a life.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="btn bg-white px-6 py-3 text-base text-primary-700 shadow-lg hover:bg-primary-50 active:scale-[0.98]"
            >
              <Droplet className="h-5 w-5" />
              Become a Donor
            </Link>
            <Link
              to="/request"
              className="btn bg-white/10 px-6 py-3 text-base text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20 active:scale-[0.98]"
            >
              <Siren className="h-5 w-5" />
              Raise a Request
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
