import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, ShieldCheck, MapPin, Droplet } from 'lucide-react';
import type { Donor } from '@/types';
import { BloodGroupBadge } from '@/components/Logo';

export function RequestModal({
  donor,
  onClose,
  onConfirm,
}: {
  donor: Donor | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    if (!donor) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [donor, onClose]);

  if (!donor) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md card p-6 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="section-eyebrow">
          <Send className="h-3.5 w-3.5" /> Send request
        </span>
        <h3 className="mt-3 font-display text-xl font-bold text-navy-900">
          Confirm connection request
        </h3>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-navy-50 p-4">
          <BloodGroupBadge group={donor.bloodGroup} />
          <div>
            <p className="font-display font-bold text-navy-900">{donor.displayName}</p>
            <p className="flex items-center gap-1 text-xs text-navy-500">
              <MapPin className="h-3.5 w-3.5" />
              {donor.locality}, {donor.city}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-primary-50 p-4 ring-1 ring-primary-100">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-primary-800">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
            Life Link never shares phone numbers or addresses. The donor will be notified
            privately and can choose to respond. All final arrangements must be verified
            through a hospital or licensed blood bank.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-primary flex-1">
            <Droplet className="h-4 w-4" />
            Send request
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
