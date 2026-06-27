import type { UiKey } from '@/i18n/ui';

export type SocialLinkId =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'whatsapp'
  | 'phone';

export interface SocialLink {
  id: SocialLinkId;
  label: string;
  labelKey?: UiKey;
  iconPath: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    iconPath: '/icons/social/facebook.svg',
    href: 'https://www.facebook.com/profile.php?id=61555984647054'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    iconPath: '/icons/social/instagram.svg',
    href: 'https://www.instagram.com/mishan.animal_shelter/'
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    iconPath: '/icons/social/tiktok.svg',
    href: 'https://www.tiktok.com/@mishan.animal_shelter'
  },
  {
    id: 'youtube',
    label: 'YouTube',
    iconPath: '/icons/social/youtube.svg',
    href: 'https://www.youtube.com/@markiza300'
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    iconPath: '/icons/social/whatsapp.svg',
    href: 'https://wa.me/380995353559'
  },
  {
    id: 'phone',
    label: 'Phone',
    labelKey: 'socialPhoneLabel',
    iconPath: '/icons/social/phone.svg',
    href: 'tel:+380995353559'
  }
];

export function getActiveSocialLinks(links: SocialLink[] = socialLinks): SocialLink[] {
  return links.filter((link) => link.href.trim().length > 0);
}

export function isExternalSocialHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
