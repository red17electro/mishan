# Content Guide

## Localization model

Mishan uses two localization layers:

1. UI labels in `src/i18n/ui.ts`
2. Content fields inside JSON files, for example:

```json
{
  "name": {
    "en": "Luna",
    "uk": "Луна"
  }
}
```

Do not use live automatic translation for public content. AI-assisted drafts are fine, but a human should review Ukrainian/English copy before publishing.

## Pet content rules

Each pet needs:

- stable `slug`
- English and Ukrainian name
- species, sex, age, size, status
- short and full descriptions
- health status
- compatibility status
- at least one photo
- volunteer slug

### QR-code rule

Once a pet slug is used publicly or printed on a QR card, do not change it. If the pet is adopted, change `status` to `adopted`; do not delete the page.

## Safety rules

Do not publish:

- exact shelter address or coordinates
- evacuation routes or logistics details
- private volunteer phone numbers without consent
- identifiable sensitive background details in images
- EXIF metadata from real photos, if avoidable

## Media rules

For MVP, placeholder SVG media lives in:

```text
public/images/test-pets/
```

For real photos later:

- compress before upload
- remove EXIF metadata where possible (also run automatically: `npm run strip-uploads`, checked in CI)
- avoid sensitive backgrounds
- consider Cloudinary if media volume grows

## Contacts in Europe rules

Default to placeholders until contacts are approved.

Prefer:

- Telegram username/link
- WhatsApp link
- shared email/contact form

Avoid raw phone numbers unless the volunteer explicitly approves public publication.

Each public contact can include:

- a short English and Ukrainian description
- one or more approved photos
- languages spoken, selected from the CMS list
