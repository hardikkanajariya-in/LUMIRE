export default function PrivacyPage() {
  const sections = [
    { id: 'info', title: 'Information We Collect' },
    { id: 'use', title: 'How We Use Your Information' },
    { id: 'sharing', title: 'Information Sharing' },
    { id: 'security', title: 'Data Security' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'rights', title: 'Your Rights' },
    { id: 'contact', title: 'Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-cream py-12 sm:py-14 md:py-16 border-b border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-light mb-2 text-charcoal">Privacy Policy</h1>
          <p className="text-warm-gray text-sm">Last updated: January 1, 2025</p>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 flex gap-8 lg:gap-12">
        {/* Sidebar TOC */}
        <nav className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
          <p className="text-xs uppercase tracking-wider text-warm-gray mb-3">On this page</p>
          <ul className="space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-warm-gray hover:text-gold transition-colors">{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Content */}
        <div className="flex-1 max-w-3xl">
          <div className="prose prose-sm max-w-none space-y-6 sm:space-y-8">
            <p className="text-warm-gray leading-relaxed">
              At Lumière, we respect your privacy and are committed to protecting your personal data.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or make a purchase.
            </p>

            <section id="info">
              <h2 className="font-display text-xl text-charcoal mb-3">Information We Collect</h2>
              <p className="text-warm-gray text-sm leading-relaxed mb-2">We collect the following types of information:</p>
              <ul className="text-warm-gray text-sm space-y-1 list-disc pl-5">
                <li>Personal identification (name, email address, phone number)</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Order history and preferences</li>
                <li>Device and browser information for analytics</li>
                <li>Communication preferences and correspondence</li>
              </ul>
            </section>

            <section id="use">
              <h2 className="font-display text-xl text-charcoal mb-3">How We Use Your Information</h2>
              <ul className="text-warm-gray text-sm space-y-1 list-disc pl-5">
                <li>Processing and fulfilling your orders</li>
                <li>Sending order updates, shipping notifications</li>
                <li>Providing customer support</li>
                <li>Personalizing your shopping experience</li>
                <li>Sending promotional communications (with your consent)</li>
                <li>Improving our website and services</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </section>

            <section id="sharing">
              <h2 className="font-display text-xl text-charcoal mb-3">Information Sharing</h2>
              <p className="text-warm-gray text-sm leading-relaxed">
                We do not sell your personal information. We share data only with trusted service providers
                who assist us in operating our business, including payment processors, shipping partners,
                and analytics services. All partners are bound by strict data protection agreements.
              </p>
            </section>

            <section id="security">
              <h2 className="font-display text-xl text-charcoal mb-3">Data Security</h2>
              <p className="text-warm-gray text-sm leading-relaxed">
                We implement industry-standard security measures including SSL encryption, secure payment
                gateways, and regular security audits. However, no method of electronic transmission is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section id="cookies">
              <h2 className="font-display text-xl text-charcoal mb-3">Cookies & Tracking</h2>
              <p className="text-warm-gray text-sm leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience,
                remember your preferences, and analyze site traffic. You can control cookie settings
                through your browser preferences.
              </p>
            </section>

            <section id="rights">
              <h2 className="font-display text-xl text-charcoal mb-3">Your Rights</h2>
              <p className="text-warm-gray text-sm leading-relaxed mb-2">You have the right to:</p>
              <ul className="text-warm-gray text-sm space-y-1 list-disc pl-5">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section id="contact">
              <h2 className="font-display text-xl text-charcoal mb-3">Contact Us</h2>
              <p className="text-warm-gray text-sm leading-relaxed">
                If you have any questions about this Privacy Policy, please contact our Data Protection Officer
                at <a href="mailto:privacy@lumiere.com" className="text-gold hover:underline">privacy@lumiere.com</a> or
                call us at +91 98765 43210.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
