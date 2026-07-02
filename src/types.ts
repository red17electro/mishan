export type Language = 'en' | 'uk';
export type Species = 'dog' | 'cat' | 'other';
export type Sex = 'female' | 'male' | 'unknown';
export type AgeGroup = 'baby' | 'young' | 'adult' | 'senior';
export type PetSize = 'small' | 'medium' | 'large';
export type AdoptionStatus = 'available' | 'reserved' | 'adopted';
export type VolunteerLanguage = 'ukrainian' | 'english' | 'german' | 'polish' | 'russian';

export interface LocalizedString {
  en: string;
  uk: string;
  ru?: string;
}

export interface PetVideo {
  type: 'youtube' | 'vimeo' | 'external';
  url: string;
  title?: LocalizedString;
}

export interface PetHealth {
  sterilized: 'yes' | 'no' | 'unknown';
  vaccinated: 'yes' | 'no' | 'unknown';
  special_needs: LocalizedString;
}

export interface PetCompatibility {
  children: 'yes' | 'no' | 'unknown';
  cats: 'yes' | 'no' | 'unknown';
  dogs: 'yes' | 'no' | 'unknown';
}

export interface Pet {
  slug: string;
  name: LocalizedString;
  species: Species;
  sex: Sex;
  age_group: AgeGroup;
  age_value: number;
  age_unit: 'months' | 'years';
  size: PetSize;
  status: AdoptionStatus;
  location_note: LocalizedString;
  character_tags: string[];
  description_short: LocalizedString;
  description_full: LocalizedString;
  health: PetHealth;
  compatibility: PetCompatibility;
  photos: string[];
  videos: PetVideo[];
  contact: {
    volunteer_slug: string;
  };
  featured: boolean;
  created_at: string;
  updated_at: string;
}

/** Raw pet JSON from CMS may store character_tags as a newline-separated string. */
export type PetSource = Omit<Pet, 'character_tags'> & {
  character_tags?: string | string[];
};

export interface Volunteer {
  slug: string;
  name: string;
  region: LocalizedString;
  languages: VolunteerLanguage[];
  role: LocalizedString;
  description: LocalizedString;
  photos: string[];
  contact_methods?: {
    whatsapp?: string;
    telegram?: string;
    phone?: string;
    email?: string;
  };
  public_contact_note: LocalizedString;
  show_phone_publicly: boolean;
}

export type VolunteerSource = Omit<Volunteer, 'languages' | 'description' | 'photos'> & {
  languages?: string[];
  description?: LocalizedString;
  photos?: string[];
};
