import type { Metadata } from 'next'
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/lib/locale-context'
import { AuthProvider } from '@/lib/providers'
import { Toaster } from 'sonner'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mobilyamarketplace.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mobilya Pazar Yeri - Türkiye\'nin Mobilya B2B Platformu',
    template: '%s | Mobilya Pazar Yeri',
  },
  description:
    'Türkiye\'nin lider mobilya B2B pazar yeri. Üreticiler, toptancılar ve perakendeciler için mobilya tedarik platformu. En kaliteli mobilya ürünlerini keşfedin.',
  keywords: [
    'mobilya',
    'mobilya pazar yeri',
    'mobilya toptan',
    'mobilya üreticisi',
    'b2b mobilya',
    'türk mobilya',
    'mobilya tedarik',
    'furniture marketplace',
    'furniture supplier turkey',
    'home furniture',
    'office furniture',
    'furniture manufacturer',
  ],
  authors: [{ name: 'Mobilya Pazar Yeri' }],
  creator: 'Mobilya Pazar Yeri',
  publisher: 'Mobilya Pazar Yeri',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      tr: `${siteUrl}/`,
      en: `${siteUrl}/?lang=en`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Mobilya Pazar Yeri',
    title: 'Mobilya Pazar Yeri - Türkiye\'nin Mobilya B2B Platformu',
    description:
      'Türkiye\'nin lider mobilya B2B pazar yeri. Üreticiler, toptancılar ve perakendeciler için mobilya tedarik platformu.',
    url: siteUrl,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mobilya Pazar Yeri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobilya Pazar Yeri - B2B Platformu',
    description:
      'Türkiye\'nin lider mobilya B2B pazar yeri.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  category: 'business',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Mobilya Pazar Yeri',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/og-image.png`,
      description:
        'Türkiye mobilya sektörü B2B pazar yeri platformu.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TR',
      },
      sameAs: [
        'https://facebook.com/mobilyapazaryeri',
        'https://instagram.com/mobilyapazaryeri',
        'https://x.com/mobilyapazaryeri',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Mobilya Pazar Yeri',
      description:
        'Türkiye mobilya sektörü B2B pazar yeri platformu.',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: ['tr', 'en'],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Ürünler', item: `${siteUrl}/urunler` },
        { '@type': 'ListItem', position: 3, name: 'Tedarikçiler', item: `${siteUrl}/tedarikciler` },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" hrefLang="tr" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/?lang=en`} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AuthProvider>
          <LocaleProvider>
            {children}
            <Toaster richColors position="top-right" />
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
