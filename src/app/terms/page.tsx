export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl font-light mb-2">Terms & Conditions</h1>
          <p className="text-gray-400 text-sm">Last updated: January 1, 2025</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-sm max-w-none space-y-8">
          <p className="text-warm-gray leading-relaxed">
            Welcome to Lumière. By accessing and using our website, you agree to be bound by these Terms
            and Conditions. Please read them carefully before making a purchase.
          </p>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">1. General</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              These terms govern your use of the Lumière website and all related services. We reserve the
              right to modify these terms at any time. Changes will be effective upon posting. Your continued
              use of the site constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">2. Products & Pricing</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              All product descriptions and images are for illustrative purposes. While we strive for accuracy,
              slight variations in color and appearance may occur due to screen settings and the handcrafted
              nature of our jewelry. Prices are listed in Indian Rupees (INR) and include applicable taxes
              unless otherwise stated. We reserve the right to change prices without notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">3. Orders & Payment</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              An order is confirmed only after successful payment processing. We reserve the right to cancel
              any order due to pricing errors, stock unavailability, or suspected fraud. Payment is accepted
              via UPI, credit/debit cards, net banking, and Cash on Delivery for eligible orders.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">4. Shipping & Delivery</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              Estimated delivery times are indicative and not guaranteed. Lumière is not responsible for delays
              caused by shipping carriers, customs, weather, or other unforeseen circumstances. Risk of loss
              passes to you upon delivery to the shipping carrier.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">5. Returns & Refunds</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              Returns are accepted within 30 days of delivery for items in original, unworn condition with
              all packaging and certificates. Custom and personalized items are non-returnable. Refunds are
              processed within 7-10 business days of receiving the returned item. See our
              <a href="/returns" className="text-gold hover:underline ml-1">Return Policy</a> for full details.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">6. Intellectual Property</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              All content on this website, including text, images, logos, designs, and software, is the
              property of Lumière and protected by applicable intellectual property laws. Unauthorized use,
              reproduction, or distribution is prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">7. Limitation of Liability</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              Lumière shall not be liable for any indirect, incidental, special, or consequential damages
              arising from your use of the website or purchase of products. Our total liability shall not
              exceed the amount paid for the specific product in question.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">8. Governing Law</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive
              jurisdiction of the courts in Mumbai, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">9. Contact</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              For questions about these Terms & Conditions, please contact us at
              <a href="mailto:legal@lumiere.com" className="text-gold hover:underline ml-1">legal@lumiere.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
