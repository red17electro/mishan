import type { Pet, Volunteer } from '@/types';

const petModules = import.meta.glob<Pet>('../content/pets/*.json', { eager: true, import: 'default' });
const volunteerModules = import.meta.glob<Volunteer>('../content/volunteers/*.json', { eager: true, import: 'default' });

export const pets = Object.values(petModules).sort((a, b) => b.created_at.localeCompare(a.created_at));
export const volunteers = Object.values(volunteerModules).sort((a, b) => a.name.localeCompare(b.name));

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
