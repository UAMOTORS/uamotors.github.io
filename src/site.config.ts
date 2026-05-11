import { withBase } from "./utils/helpers";

export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    eyebrowText?: string;
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type About = {
    title?: string;
    text?: string;
};

export type Blog = {
    description?: string;
};

export type ContactInfo = {
    title?: string;
    text?: string;
    email?: {
        text?: string;
        href?: string;
        email?: string;
    };
    socialProfiles?: {
        text?: string;
        href?: string;
    }[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    website: string;
    logo?: Image;
    title: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    about?: About;
    contactInfo?: ContactInfo;
    subscribe?: Subscribe;
    blog?: Blog;
    postsPerPage?: number;
    recentPostLimit: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    website: 'https://uamotors.github.io',
    title: 'UAMOTORS',
    description: 'Llevando la ingeniería mexicana al límite. Escudería Formula SAE de la UAM Azcapotzalco dedicada al diseño, manufactura y validación de un vehículo tipo Fórmula.',
    image: {
        src: '/tira-uamotors.svg',
        alt: 'UAMOTORS - Escudería Formula SAE de la UAM Azcapotzalco'
    },
    headerNavLinks: [
        {
            text: 'Nosotros',
            href: withBase('nosotros')
        },
        {
            text: 'Proyecto',
            href: withBase('proyecto')
        },
        {
            text: 'Nuestros Aliados',
            href: withBase('nuestros-aliados')
        },
        {
            text: 'Contacto',
            href: withBase('contacto')
        }
    ],
    footerNavLinks: [
        {
            text: 'Nosotros',
            href: withBase('/nosotros')
        },
        {
            text: 'Contacto',
            href: withBase('/contacto')
        },
        {
            text: 'RSS Feed',
            href: withBase('/rss.xml')
        },
        {
            text: 'Sitemap',
            href: withBase('/sitemap-index.xml')
        }
    ],
    socialLinks: [
        {
            text: 'Dribbble',
            href: 'https://dribbble.com/'
        },
        {
            text: 'Instagram',
            href: 'https://instagram.com/'
        },
        {
            text: 'X/Twitter',
            href: 'https://twitter.com/'
        }
    ],
    hero: {
        eyebrowText: 'UAM Azcapotzalco | Formula SAE',
        title: 'Diseña con ingenio, crea con pasión.',
        // En site.config.ts
        text: `Más que una escudería, somos un centro de innovación y talento. Únete a nuestro proyecto y ayúdanos a llevar la ingeniería mexicana a la competencia internacional <a href="${withBase('/proyecto#formula-sae')}" class="text-space-red font-medium hover:font-bold transition-all">Formula SAE</a>.`,
        image: {
            src: '/assets/images/pixeltrue-space-discovery.svg',
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [
            {
                text: 'Ver proyecto',
                href: withBase('/proyecto')
            },
            {
                text: 'Impulsar equipo',
                href: withBase('/nuestros-aliados')
            }
        ]
    }
};

export default siteConfig;
