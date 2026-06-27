export type SocialLinkId = 'facebook' | 'instagram' | 'messenger' | 'whatsapp';

export interface SocialLink {
  id: SocialLinkId;
  label: string;
  iconPath: string;
  href: string;
}

// Fill these with approved public shelter links before publishing social links.
// Empty links are not rendered.
export const socialLinks: SocialLink[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    iconPath: '/icons/social/facebook.svg',
    href: ''
  },
  {
    id: 'instagram',
    label: 'Instagram',
    iconPath: '/icons/social/instagram.svg',
    href: ''
  },
  {
    id: 'messenger',
    label: 'Messenger',
    iconPath: '/icons/social/messenger.svg',
    href: ''
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    iconPath: '/icons/social/whatsapp.svg',
    href: ''
  }
];

export function getActiveSocialLinks(links: SocialLink[] = socialLinks): SocialLink[] {
  return links.filter((link) => link.href.trim().length > 0);
}
