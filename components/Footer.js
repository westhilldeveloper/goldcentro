import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  const footerLinks = {
    'Services': ['Buy Gold', 'Sell Gold', 'Release Gold', 'Gold Loan', 'Gold Investment'],
    'Company': ['About Us', 'Careers', 'Blog', 'Press', 'Partners'],
    'Support': ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'FAQ'],
    'Legal': ['Privacy Policy', 'Terms of Use', 'Disclaimer', 'Compliance', 'KYC Policy']
  }

  return (
    <footer className="bg-secondary text-accent">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-primary text-secondary font-bold text-2xl px-3 py-1 rounded">
                GC
              </div>
              <span className="ml-2 text-2xl font-bold">Gold Centro</span>
            </div>
            <p className="text-gray-300 mb-6">
              Your trusted partner for gold transactions. We provide transparent pricing, secure transactions, and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <FaPhone className="text-primary" />
              <div>
                <p className="text-sm text-gray-400">Call Us</p>
                <a href="tel:+919590704444" className="hover:text-primary transition-colors">
                  +91 95907 04444
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              <div>
                <p className="text-sm text-gray-400">Email Us</p>
                <a href="mailto:info@goldcentro.com" className="hover:text-primary transition-colors">
                  info@goldcentro.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary" />
              <div>
                <p className="text-sm text-gray-400">Visit Us</p>
                <span>123 Business District, Mumbai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Gold Centro. All rights reserved.</p>
          <p className="text-sm mt-2">BIS Certified • ISO 9001:2015 • Registered with RBI</p>
        </div>
      </div>
    </footer>
  )
}