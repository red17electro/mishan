import type { Language, LocalizedString, Volunteer, VolunteerLanguage, VolunteerSource } from '../types';

const DEFAULT_LOCALIZED_TEXT: LocalizedString = {
  en: '',
  uk: '',
};

const VOLUNTEER_LANGUAGE_LABELS: Record<VolunteerLanguage, LocalizedString> = {
  ukrainian: {
    en: 'Ukrainian',
    uk: 'Українська',
  },
  english: {
    en: 'English',
    uk: 'Англійська',
  },
  german: {
    en: 'German',
    uk: 'Німецька',
  },
  polish: {
    en: 'Polish',
    uk: 'Польська',
  },
  russian: {
    en: 'Russian',
    uk: 'Російська',
  },
};

const VOLUNTEER_LANGUAGE_ALIASES: Record<string, VolunteerLanguage> = {
  ukrainian: 'ukrainian',
  english: 'english',
  german: 'german',
  deutsch: 'german',
  polish: 'polish',
  russian: 'russian',
};

function normalizeVolunteerLanguage(value: string): VolunteerLanguage | undefined {
  return VOLUNTEER_LANGUAGE_ALIASES[value.trim().toLowerCase()];
}

function normalizeVolunteerLanguages(languages: string[] | undefined): VolunteerLanguage[] {
  return (languages ?? []).map(normalizeVolunteerLanguage).filter((language): language is VolunteerLanguage => Boolean(language));
}

export function formatVolunteerLanguages(languages: VolunteerLanguage[], lang: Language): string {
  return languages.map((language) => VOLUNTEER_LANGUAGE_LABELS[language][lang]).join(', ');
}

export function normalizeVolunteer(volunteer: VolunteerSource): Volunteer {
  return {
    ...volunteer,
    languages: normalizeVolunteerLanguages(volunteer.languages),
    description: volunteer.description ?? DEFAULT_LOCALIZED_TEXT,
    photos: volunteer.photos ?? [],
    contact_methods: volunteer.contact_methods ?? {},
    show_phone_publicly: volunteer.show_phone_publicly ?? false,
  };
}
