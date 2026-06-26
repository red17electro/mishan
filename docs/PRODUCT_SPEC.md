# Mishan Product Spec

## Goal

Create a simple, maintainable website for Mishan, a Kherson animal shelter, so visitors can browse adoptable pets, scan QR-code pet cards, donate, and contact approved volunteers.

## MVP principles

- Mobile-first
- Free or near-free hosting
- Admin-only content editing
- No custom backend for MVP
- Stable URLs for QR codes
- English and Ukrainian first
- Russian may be added later without flags
- No sensitive shelter location details
- No raw volunteer phone numbers unless explicitly approved

## MVP pages

| Route | Purpose |
|---|---|
| `/en`, `/uk` | Home page |
| `/en/pets`, `/uk/pets` | Pet catalog |
| `/en/pets/:slug`, `/uk/pets/:slug` | Pet profile pages |
| `/en/donate`, `/uk/donate` | Donation page |
| `/en/volunteers`, `/uk/volunteers` | Volunteer contacts |
| `/en/about`, `/uk/about` | Shelter story |

## MVP features

- Pet cards and profile pages
- Filters: species, size, age group, status
- Sorting: newest, name, age, size
- Donation CTA with placeholder PayPal link
- Volunteer placeholder contacts
- Admin CMS configuration
- Test data and placeholder media

## Deferred features

- Custom paid domain
- Cloudinary media pipeline
- Adoption application workflow
- Visitor accounts
- Public phone numbers by default
- Automatic QR-code generator
- Russian localization
- Analytics
- Success stories/news pages
