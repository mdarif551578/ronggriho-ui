
export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose max-w-4xl mx-auto">
        <h1>Terms of Service</h1>
        <p><em>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        
        <h2>1. Agreement to Terms</h2>
        <p>By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>

        <h2>2. Use of Our Service</h2>
        <p>You agree to use our site for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.</p>
        
        <h2>3. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Dhakai Threads and its licensors. The Service is protected by copyright, trademark, and other laws of both Bangladesh and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Dhakai Threads.</p>

        <h2>4. Product Information and Pricing</h2>
        <p>We strive to be as accurate as possible in the descriptions of our products and their prices. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. Prices for our products are subject to change without notice.</p>
        
        <h2>5. Orders, Payment, and Cancellation</h2>
        <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.</p>

        <h2>6. Limitation of Liability</h2>
        <p>In no event shall Dhakai Threads, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
        
        <h2>7. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.</p>

        <h2>8. Changes</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.</p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at support@dhakaithreads.com.</p>
      </div>
    </div>
  );
}
