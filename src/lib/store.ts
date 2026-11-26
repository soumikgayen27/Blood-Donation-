import type { Donor, BloodRequest } from '@/types';
import { seedDonors, seedRequests } from '@/data/sampleData';

const DONORS_KEY = 'lifelink.donors';
const REQUESTS_KEY = 'lifelink.requests';
const SEEDED_KEY = 'lifelink.seeded';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / privacy mode errors
  }
}

export function ensureSeed(): void {
  if (!localStorage.getItem(SEEDED_KEY)) {
    write(DONORS_KEY, seedDonors);
    write(REQUESTS_KEY, seedRequests);
    localStorage.setItem(SEEDED_KEY, '1');
  }
}

export function getDonors(): Donor[] {
  return read<Donor[]>(DONORS_KEY, []);
}

export function saveDonors(donors: Donor[]): void {
  write(DONORS_KEY, donors);
}

export function addDonor(donor: Donor): Donor[] {
  const donors = [donor, ...getDonors()];
  saveDonors(donors);
  return donors;
}

export function updateDonorStatus(id: string, status: Donor['status']): Donor[] {
  const donors = getDonors().map((d) => (d.id === id ? { ...d, status } : d));
  saveDonors(donors);
  return donors;
}

export function removeDonor(id: string): Donor[] {
  const donors = getDonors().filter((d) => d.id !== id);
  saveDonors(donors);
  return donors;
}

export function getRequests(): BloodRequest[] {
  return read<BloodRequest[]>(REQUESTS_KEY, []);
}

export function saveRequests(requests: BloodRequest[]): void {
  write(REQUESTS_KEY, requests);
}

export function addRequest(request: BloodRequest): BloodRequest[] {
  const requests = [request, ...getRequests()];
  saveRequests(requests);
  return requests;
}

export function updateRequestStatus(
  id: string,
  status: BloodRequest['status'],
): BloodRequest[] {
  const requests = getRequests().map((r) =>
    r.id === id ? { ...r, status } : r,
  );
  saveRequests(requests);
  return requests;
}

export function genId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}
