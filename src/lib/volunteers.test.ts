import { describe, expect, it } from 'vitest';
import { formatVolunteerLanguages, normalizeVolunteer } from './volunteers';
import type { VolunteerSource } from '../types';

const baseVolunteer: VolunteerSource = {
  slug: 'oleksandrakordyak',
  name: 'Oleksandra Kordyak',
  region: {
    en: 'Germany',
    uk: 'Німеччина',
  },
  languages: ['Ukrainian', 'English'],
  role: {
    en: 'Adoption questions and international coordination',
    uk: 'Питання щодо адопції та міжнародна координація',
  },
  public_contact_note: {
    en: 'Contact details will be added later.',
    uk: 'Контактні дані буде додано пізніше.',
  },
  show_phone_publicly: false,
};

describe('normalizeVolunteer', () => {
  it('normalizes legacy language labels and default editable media fields', () => {
    const volunteer = normalizeVolunteer(baseVolunteer);

    expect(volunteer.languages).toEqual(['ukrainian', 'english']);
    expect(volunteer.photos).toEqual([]);
    expect(volunteer.description).toEqual({ en: '', uk: '' });
  });
});

describe('formatVolunteerLanguages', () => {
  it('renders stored language keys as localized labels', () => {
    const volunteer = normalizeVolunteer(baseVolunteer);

    expect(formatVolunteerLanguages(volunteer.languages, 'en')).toBe('Ukrainian, English');
    expect(formatVolunteerLanguages(volunteer.languages, 'uk')).toBe('Українська, Англійська');
  });
});
