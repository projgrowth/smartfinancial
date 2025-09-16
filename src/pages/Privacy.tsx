import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      
      <SEO 
        title="Privacy Policy | Smart Financial Planning"
        description="Learn how Smart Financial Planning collects, uses, and protects your information."
        canonicalUrl={typeof window !== 'undefined' ? `${window.location.origin}/privacy` : undefined}
      />
      
      <main id="main-content" className="section-lg">
        <div className="container-narrow">
          <div className="text-center space-component-lg">
            <h1 className="heading-xl space-component-sm">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card>
            <CardContent className="space-component-lg space-component-lg">
              <section>
                <h2 className="heading-md space-component-sm">Information We Collect</h2>
                <p className="text-body space-component-sm">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 space-component-xs text-body">
                  <li>Schedule a consultation or meeting</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us through our website</li>
                  <li>Use our financial calculators</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">How We Use Your Information</h2>
                <p className="text-body space-component-sm">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-component-xs text-body">
                  <li>Provide financial planning and advisory services</li>
                  <li>Schedule and conduct meetings</li>
                  <li>Send you newsletters and educational content</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Improve our website and services</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">Information Sharing</h2>
                <p className="text-body">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy. We may share information with 
                  trusted service providers who assist us in operating our website and conducting business.
                </p>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">Data Security</h2>
                <p className="text-body">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">Cookies</h2>
                <p className="text-body">
                  Our website uses cookies to enhance your browsing experience and analyze website traffic. 
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="heading-md space-component-sm">Contact Us</h2>
                <p className="text-body">
                  If you have questions about this Privacy Policy, please contact us at 
                  info@thesmartfinancialplan.com or (706) 627-5729.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      
    </div>
  );
};

export default Privacy;