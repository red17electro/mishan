import type { Pet, Volunteer } from '@/types';

export const DEFAULT_PET_PHOTO = '/images/placeholder-pet.svg';

const PLACEHOLDER_PHOTO = /^\/images\/(placeholder-pet\.svg|test-pets\/)/;

export function isPlaceholderPetPhoto(path: string): boolean {
  return PLACEHOLDER_PHOTO.test(path);
}

/** Prefer uploaded photos over bundled test placeholders. */
export function resolvePetPhotos(photos: string[]): string[] {
  const realPhotos = photos.filter((photo) => !isPlaceholderPetPhoto(photo));
  if (realPhotos.length > 0) return realPhotos;
  if (photos.length > 0) return photos;
  return [DEFAULT_PET_PHOTO];
}

const petModules = import.meta.glob<Pet>('../content/pets/*.json', { eager: true, import: 'default' });
const volunteerModules = import.meta.glob<Volunteer>('../content/volunteers/*.json', { eager: true, import: 'default' });

function normalizeVolunteer(volunteer: Volunteer): Volunteer {
  return {
    ...volunteer,
    languages: volunteer.languages ?? [],
    contact_methods: volunteer.contact_methods ?? {},
    show_phone_publicly: volunteer.show_phone_publicly ?? false,
  };
}

export const pets = Object.values(petModules).sort((a, b) => b.created_at.localeCompare(a.created_at));
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
