export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-cream py-16 border-b border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h1 className="font-display text-4xl font-light mb-2 text-charcoal">Return & Refund Policy</h1>
          <p className="text-warm-gray text-sm">Hassle-free returns, because your satisfaction matters.</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="prose prose-sm max-w-none space-y-8">
          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-border rounded-lg p-5 text-center">
              <p className="font-display text-2xl text-gold mb-1">30</p>
              <p className="text-sm text-warm-gray">Day Return Window</p>
            </div>
            <div className="bg-white border border-border rounded-lg p-5 text-center">
              <p className="font-display text-2xl text-gold mb-1">Free</p>
              <p className="text-sm text-warm-gray">Return Shipping</p>
            </div>
            <div className="bg-white border border-border rounded-lg p-5 text-center">
              <p className="font-display text-2xl text-gold mb-1">7-10</p>
              <p className="text-sm text-warm-gray">Days for Refund</p>
            </div>
          </div>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">Eligibility</h2>
            <p className="text-warm-gray text-sm leading-relaxed mb-2">
              Items are eligible for return if they meet the following criteria:
            </p>
            <ul className="text-warm-gray text-sm space-y-1 list-disc pl-5">
              <li>Returned within 30 days of delivery</li>
              <li>Item is unused, unworn, and in original condition</li>
              <li>All original packaging, tags, and certificates are included</li>
              <li>Gift cards, earrings (for hygiene reasons), and custom/personalized items are non-returnable</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">How to Return</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-display text-sm shrink-0">1</span>
                <div>
                  <p className="text-sm font-medium text-charcoal">Initiate Return</p>
                  <p className="text-sm text-warm-gray">Log in to your account, go to Orders, and select &ldquo;Return Item&rdquo; for the product you wish to return.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-display text-sm shrink-0">2</span>
                <div>
                  <p className="text-sm font-medium text-charcoal">Pack Securely</p>
                  <p className="text-sm text-warm-gray">Pack the item in its original box with all certificates and accessories. Use the prepaid shipping label provided.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-display text-sm shrink-0">3</span>
                <div>
                  <p className="text-sm font-medium text-charcoal">Ship It Back</p>
                  <p className="text-sm text-warm-gray">Drop off at your nearest courier partner or schedule a pickup. Return shipping is free for all standard returns.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-display text-sm shrink-0">4</span>
                <div>
                  <p className="text-sm font-medium text-charcoal">Get Refunded</p>
                  <p className="text-sm text-warm-gray">Once received and inspected, your refund will be processed within 7-10 business days to the original payment method.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">Exchanges</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              We offer free exchanges for different sizes within 30 days. Simply initiate a return and place a
              new order for the correct size. Alternatively, contact our customer care team and they will handle
              the exchange for you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">Damaged or Defective Items</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              If you receive a damaged or defective item, please contact us within 48 hours of delivery with
              photos of the damage. We will arrange a free return and send a replacement or full refund immediately.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">Refund Method</h2>
            <p className="text-warm-gray text-sm leading-relaxed">
              Refunds are issued to the original payment method. UPI and wallet refunds typically process within
              2-3 business days. Credit/debit card refunds may take 7-10 business days depending on your bank.
              COD orders are refunded via bank transfer.
            </p>
          </section>

          <div className="text-center p-6 bg-cream rounded-lg border border-border mt-8">
            <p className="text-sm text-warm-gray mb-3">Need help with a return?</p>
            <a href="/contact" className="btn-primary inline-block">Contact Customer Care</a>
          </div>
        </div>
      </div>
    </div>
  );
}
