import type { Pet, PetCompatibility, PetHealth, PetSource, Volunteer } from '@/types';

export const DEFAULT_PET_PHOTO = '/images/placeholder-pet.svg';

const PLACEHOLDER_PHOTO = /^\/images\/(placeholder-pet\.svg|test-pets\/)/;

export function isPlaceholderPetPhoto(path: string): boolean {
  return PLACEHOLDER_PHOTO.test(path);
}

/** Prefer uploaded photos over bundled test placeholders. */
export function resolvePetPhotos(photos: string[] | undefined): string[] {
  const list = photos ?? [];
  const realPhotos = list.filter((photo) => !isPlaceholderPetPhoto(photo));
  if (realPhotos.length > 0) return realPhotos;
  if (list.length > 0) return list;
  return [DEFAULT_PET_PHOTO];
}

const DEFAULT_COMPATIBILITY: PetCompatibility = {
  children: 'unknown',
  cats: 'unknown',
  dogs: 'unknown',
};

const DEFAULT_HEALTH: PetHealth = {
  sterilized: 'unknown',
  vaccinated: 'unknown',
  special_needs: { en: 'None known', uk: 'Невідомо' },
};

function normalizeCharacterTags(value: PetSource['character_tags']): string[] {
  if (Array.isArray(value)) {
    return value.map((tag) => tag.trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(/\r?\n/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizePet(pet: PetSource): Pet {
  return {
    ...pet,
    character_tags: normalizeCharacterTags(pet.character_tags),
    photos: pet.photos ?? [],
    videos: pet.videos ?? [],
    compatibility: pet.compatibility ?? DEFAULT_COMPATIBILITY,
    health: {
      ...DEFAULT_HEALTH,
      ...pet.health,
      special_needs: pet.health?.special_needs ?? DEFAULT_HEALTH.special_needs,
    },
    description_full: pet.description_full ?? pet.description_short,
    contact: pet.contact ?? { volunteer_slug: 'placeholder-volunteer' },
    featured: pet.featured ?? false,
    created_at: pet.created_at ?? '1970-01-01',
    updated_at: pet.updated_at ?? pet.created_at ?? '1970-01-01',
  };
}

const petModules = import.meta.glob<PetSource>('../content/pets/*.json', { eager: true, import: 'default' });
const volunteerModules = import.meta.glob<Volunteer>('../content/volunteers/*.json', { eager: true, import: 'default' });

function normalizeVolunteer(volunteer: Volunteer): Volunteer {
  return {
    ...volunteer,
    languages: volunteer.languages ?? [],
    contact_methods: volunteer.contact_methods ?? {},
    show_phone_publicly: volunteer.show_phone_publicly ?? false,
  };
}

export const pets = Object.values(petModules)
  .map(normalizePet)
  .sort((a, b) => b.created_at.localeCompare(a.created_at));
export const volunteers = Object.values(volunteerModules)
  .map(normalizeVolunteer)
  .sort((a, b) => a.name.localeCompare(b.name));

export function isAdoptablePet(pet: Pet): boolean {
  return pet.status !== 'adopted';
}

const adoptablePets = pets.filter(isAdoptablePet);

/** Picked once per build so all locales share the same hero pet until the next deploy. */
export const heroPet =
  adoptablePets.length > 0 ? adoptablePets[Math.floor(Math.random() * adoptablePets.length)] : undefined;

export function getPet(slug: string): Pet | undefined {
  return pets.find((pet) => pet.slug === slug);
}

export function getVolunteer(slug: string): Volunteer | undefined {
  return volunteers.find((volunteer) => volunteer.slug === slug);
}
