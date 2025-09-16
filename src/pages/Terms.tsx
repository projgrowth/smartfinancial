import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      
      <SEO 
        title="Terms of Service | Smart Financial Planning"
        description="Read the Terms of Service for Smart Financial Planning in Orlando, FL."
        canonicalUrl={typeof window !== 'undefined' ? `${window.location.origin}/terms` : undefined}
      />
      
      <main id="main-content" className="section-lg">
        <div className="container-narrow">
          <div className="text-center space-component-lg">
            <h1 className="heading-xl space-component-sm">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card>
            <CardContent className="space-component-lg space-component-lg">
              <section>
                <h2 className="heading-md space-component-sm">Acceptance of Terms</h2>
                <p className="text-body">
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">Services</h2>
                <p className="text-body space-component-sm">
                  Smart Financial Planning provides financial advisory services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-component-xs text-body">
                  <li>Financial planning and wealth management</li>
                  <li>Retirement planning strategies</li>
                  <li>Investment advisory services</li>
                  <li>Business owner financial solutions</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">Disclaimers</h2>
                <p className="text-body space-component-sm">
                  The information on this website is for general informational purposes only and does not 
                  constitute financial advice. All financial decisions should be made in consultation with 
                  qualified financial professionals.
                </p>
                <p className="text-body">
                  Past performance does not guarantee future results. All investments carry risk of loss.
                </p>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">Use License</h2>
                <p className="text-body">
                  Permission is granted to temporarily download one copy of the materials on this website 
                  for personal, non-commercial transitory viewing only.
                </p>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">Limitations</h2>
                <p className="text-body">
                  In no event shall Smart Financial Planning be liable for any damages arising out of 
                  the use or inability to use the materials on this website.
                </p>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">Contact Information</h2>
                <p className="text-body">
                  For questions regarding these terms, contact us at info@thesmartfinancialplan.com 
                  or (706) 627-5729.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      
    </div>
  );
};

export default Terms;