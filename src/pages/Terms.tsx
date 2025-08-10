import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container-unified max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-charcoal mb-4">Terms of Service</h1>
            <p className="text-charcoal/70">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Acceptance of Terms</h2>
                <p className="text-charcoal/80">
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Services</h2>
                <p className="text-charcoal/80 mb-4">
                  Smart Financial Planning provides financial advisory services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                  <li>Financial planning and wealth management</li>
                  <li>Retirement planning strategies</li>
                  <li>Investment advisory services</li>
                  <li>Business owner financial solutions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Disclaimers</h2>
                <p className="text-charcoal/80 mb-4">
                  The information on this website is for general informational purposes only and does not 
                  constitute financial advice. All financial decisions should be made in consultation with 
                  qualified financial professionals.
                </p>
                <p className="text-charcoal/80">
                  Past performance does not guarantee future results. All investments carry risk of loss.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Use License</h2>
                <p className="text-charcoal/80">
                  Permission is granted to temporarily download one copy of the materials on this website 
                  for personal, non-commercial transitory viewing only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Limitations</h2>
                <p className="text-charcoal/80">
                  In no event shall Smart Financial Planning be liable for any damages arising out of 
                  the use or inability to use the materials on this website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-charcoal mb-4">Contact Information</h2>
                <p className="text-charcoal/80">
                  For questions regarding these terms, contact us at info@thesmartfinancialplan.com 
                  or (706) 627-5729.
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

export default Terms;