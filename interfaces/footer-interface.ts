import { StaticImageData } from 'next/image';

export interface FooterData {
  socialLinks: {
      href: string;
      icon: JSX.Element;
  }[];
  categories: string[];
  information: string[];
  usefulLinks: string[];
  bottomLinks: string[];
  securityLogos: {
      src: string | StaticImageData;
      alt: string;
  }[];
}