import Link from 'next/link';

export default function FooterLinks() {
  const quickLinks = [
    { label: 'Add Your Business', href: '/add-business' },
    { label: 'Advertise', href: '/advertise' },
    { label: 'Submit News', href: '/submit-news' },
    { label: 'Contact', href: '/contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' }
  ];

  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Waterlooville.co is your local directory and news source, connecting residents 
              with trusted businesses and keeping you informed about community events and stories.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 hello@waterlooville.co</p>
              <p>📞 023 9225 1234</p>
              <p>📍 Waterlooville, Hampshire</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm">
              © 2025 Waterlooville.co. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="/sitemap" className="text-gray-500 hover:text-blue-600 text-sm">
                Sitemap
              </Link>
              <Link href="/rss" className="text-gray-500 hover:text-blue-600 text-sm">
                RSS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
