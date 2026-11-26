export type BloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type AvailabilityPreference = 'Available' | 'On Request' | 'Emergency Only';

export type DonorStatus = 'pending' | 'approved' | 'deactivated' | 'rejected';

export interface Donor {
  id: string;
  displayName: string;
  bloodGroup: BloodGroup;
  state: string;
  city: string;
  locality: string;
  pincode: string;
  availability: AvailabilityPreference;
  status: DonorStatus;
  createdAt: string;
}

export type UrgencyLevel = 'Critical' | 'Urgent' | 'Moderate';

export interface BloodRequest {
  id: string;
  requesterName: string;
  bloodGroup: BloodGroup;
  state: string;
  city: string;
  location: string;
  urgency: UrgencyLevel;
  message: string;
  status: 'new' | 'fulfilled' | 'archived';
  createdAt: string;
}

export const BLOOD_GROUPS: BloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const AVAILABILITY_OPTIONS: AvailabilityPreference[] = [
  'Available',
  'On Request',
  'Emergency Only',
];

export const URGENCY_OPTIONS: UrgencyLevel[] = ['Critical', 'Urgent', 'Moderate'];

export const INDIAN_STATES = [
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Delhi',
  'Telangana',
  'Gujarat',
  'West Bengal',
  'Uttar Pradesh',
  'Rajasthan',
  'Kerala',
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  Delhi: ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Noida', 'Varanasi'],
  Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
  Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
};
