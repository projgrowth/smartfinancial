import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

const Privacy = () => {
  return (
    <div className="min-h-screen section-bg-subtle">
      
      <SEO 
        title="Privacy Policy | Smart Financial Planning"
        description="Learn how Smart Financial Planning collects, uses, and protects your information."
      />
      
      <main id="main-content" className="section-lg">
        <div className="container-unified max-w-4xl">
          <div className="text-center space-component-lg">
            <h1 className="heading-xl text-balance">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="heading-md mb-4">Information We Collect</h2>
                <p className="text-body text-muted-foreground mb-4">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Schedule a consultation or meeting</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us through our website</li>
                  <li>Use our financial calculators</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-md mb-4">How We Use Your Information</h2>
                <p className="text-body text-muted-foreground mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide financial planning and advisory services</li>
                  <li>Schedule and conduct meetings</li>
                  <li>Send you newsletters and educational content</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Improve our website and services</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-md mb-4">Information Sharing</h2>
                <p className="text-body text-muted-foreground">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy. We may share information with 
                  trusted service providers who assist us in operating our website and conducting business.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">Data Security</h2>
                <p className="text-body text-muted-foreground">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">Cookies</h2>
                <p className="text-body text-muted-foreground">
                  Our website uses cookies to enhance your browsing experience and analyze website traffic. 
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="heading-md mb-4">Contact Us</h2>
                <p className="text-body text-muted-foreground">
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