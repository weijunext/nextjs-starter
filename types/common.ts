export interface HeaderLink {
  id?: string;
  name: string;
  href: string;
  target?: string;
  rel?: string;
};

export interface FooterLink {
  title: string;
  links: Link[];
};

interface Link {
  id?: string;
  href: string;
  name: string;
  target?: string;
  rel?: string;
  useA?: boolean;
};