export type PlanTier = 'free' | 'verified' | 'featured'
export type ListingStatus = 'pending' | 'active' | 'suspended'

export interface Listing {
  id: string
  slug: string
  name: string
  full_name: string | null
  credentials: string[] | null
  bio: string | null
  photo_url: string | null
  phone: string | null
  email: string | null
  website: string | null
  city: string
  state: string
  zip: string | null
  lat: number | null
  lng: number | null
  latitude: number | null
  longitude: number | null
  accepting_new_clients: boolean
  telehealth: boolean
  visit_types: string[] | null
  insurance_accepted: string[] | null
  specialties: string | null
  languages: string[] | null
  plan_tier: PlanTier
  credential_verified: boolean | null
  claimed: boolean | null
  claimed_at: string | null
  stripe_customer_id: string | null
  plan_expires_at: string | null
  status: ListingStatus
  is_active: boolean | null
  listing_tier: string | null
  created_at: string
  updated_at: string
}

export interface Claim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  created_at: string
  expires_at: string
}

export const SLP_SPECIALTIES = [
  'Childhood Apraxia of Speech (CAS)',
  'Autism / AAC',
  'Pediatric Feeding & Swallowing',
  'Aphasia',
  'Stuttering & Fluency Disorders',
  'Voice Disorders',
  'Dysphagia (Adult)',
  'Accent Modification',
  'Selective Mutism',
  'Late Talkers / Language Delays',
  'Cleft Palate / Craniofacial',
  'Traumatic Brain Injury (TBI)',
  "Parkinson's Disease (LSVT)",
  'Pediatric Language Disorders',
  'Social Communication / Pragmatics',
  'Dementia / Cognitive Communication',
] as const

export const INSURANCE_OPTIONS = [
  'Aetna',
  'Blue Cross Blue Shield',
  'Cigna',
  'UnitedHealthcare',
  'Humana',
  'Tricare',
  'Medicaid',
  'Medicare',
  'Kaiser Permanente',
  'Anthem',
  'Self-pay',
] as const

export const US_STATES: { abbr: string; name: string }[] = [
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'AK', name: 'Alaska' }, { abbr: 'AZ', name: 'Arizona' },
  { abbr: 'AR', name: 'Arkansas' }, { abbr: 'CA', name: 'California' }, { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' }, { abbr: 'DE', name: 'Delaware' }, { abbr: 'FL', name: 'Florida' },
  { abbr: 'GA', name: 'Georgia' }, { abbr: 'HI', name: 'Hawaii' }, { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' }, { abbr: 'IN', name: 'Indiana' }, { abbr: 'IA', name: 'Iowa' },
  { abbr: 'KS', name: 'Kansas' }, { abbr: 'KY', name: 'Kentucky' }, { abbr: 'LA', name: 'Louisiana' },
  { abbr: 'ME', name: 'Maine' }, { abbr: 'MD', name: 'Maryland' }, { abbr: 'MA', name: 'Massachusetts' },
  { abbr: 'MI', name: 'Michigan' }, { abbr: 'MN', name: 'Minnesota' }, { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' }, { abbr: 'MT', name: 'Montana' }, { abbr: 'NE', name: 'Nebraska' },
  { abbr: 'NV', name: 'Nevada' }, { abbr: 'NH', name: 'New Hampshire' }, { abbr: 'NJ', name: 'New Jersey' },
  { abbr: 'NM', name: 'New Mexico' }, { abbr: 'NY', name: 'New York' }, { abbr: 'NC', name: 'North Carolina' },
  { abbr: 'ND', name: 'North Dakota' }, { abbr: 'OH', name: 'Ohio' }, { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' }, { abbr: 'PA', name: 'Pennsylvania' }, { abbr: 'RI', name: 'Rhode Island' },
  { abbr: 'SC', name: 'South Carolina' }, { abbr: 'SD', name: 'South Dakota' }, { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'TX', name: 'Texas' }, { abbr: 'UT', name: 'Utah' }, { abbr: 'VT', name: 'Vermont' },
  { abbr: 'VA', name: 'Virginia' }, { abbr: 'WA', name: 'Washington' }, { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' }, { abbr: 'WY', name: 'Wyoming' }, { abbr: 'DC', name: 'District of Columbia' },
]

export const PLAN_PRICES = {
  verified: { amount: 7900, label: '$79/year', display: '$79', period: 'year' },
  featured: { amount: 14900, label: '$149/year', display: '$149', period: 'year' },
} as const
