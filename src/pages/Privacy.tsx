import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container-unified max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-charcoal mb-4">Privacy Policy</h1>
            <p className="text-charcoal/70">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Information We Collect</h2>
                <p className="text-charcoal/80 mb-4">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                  <li>Schedule a consultation or meeting</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us through our website</li>
                  <li>Use our financial calculators</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">How We Use Your Information</h2>
                <p className="text-charcoal/80 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                  <li>Provide financial planning and advisory services</li>
                  <li>Schedule and conduct meetings</li>
                  <li>Send you newsletters and educational content</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Improve our website and services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Information Sharing</h2>
                <p className="text-charcoal/80">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy. We may share information with 
                  trusted service providers who assist us in operating our website and conducting business.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Data Security</h2>
                <p className="text-charcoal/80">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Cookies</h2>
                <p className="text-charcoal/80">
                  Our website uses cookies to enhance your browsing experience and analyze website traffic. 
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Contact Us</h2>
                <p className="text-charcoal/80">
                  If you have questions about this Privacy Policy, please contact us at 
                  info@thesmartfinancialplan.com or (706) 627-5729.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;