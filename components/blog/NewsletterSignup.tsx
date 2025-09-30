'use client'

export function NewsletterSignup() {
  const handleSubscribeClick = () => {
    // Redirect to Google Forms
    window.location.href =
      'https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform'
  }

  return (
    <section className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white my-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Get Travel Tips & Exclusive Deals</h2>
        <p className="text-lg mb-6 text-white/90">
          Join thousands of Essex County families who receive our weekly travel newsletter with
          insider tips, destination guides, and exclusive flight deals from Newark Airport.
        </p>

        <div className="max-w-md mx-auto">
          <button
            onClick={handleSubscribeClick}
            className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
          >
            Subscribe to Newsletter
          </button>
        </div>

        <p className="text-sm mt-4 text-white/75">
          Click to sign up for our newsletter. We respect your privacy.
        </p>
      </div>
    </section>
  )
}
