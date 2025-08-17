
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose max-w-4xl mx-auto">
        <h1>Privacy Policy</h1>
        <p><em>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        
        <h2>1. Introduction</h2>
        <p>Welcome to Dhakai Threads. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website.</p>

        <h2>2. Information We Collect</h2>
        <p>We may collect personal information from you in a variety of ways, including, but not limited to, when you visit our site, register on the site, place an order, subscribe to the newsletter, and in connection with other activities, services, features or resources we make available on our Site.</p>
        <ul>
            <li><strong>Personal Identification Information:</strong> Name, email address, mailing address, phone number, etc.</li>
            <li><strong>Non-personal Identification Information:</strong> Browser name, type of computer, and technical information about your means of connection to our Site.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We may use the information we collect from you to:</p>
        <ul>
            <li>Personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
            <li>Improve our website in order to better serve you.</li>
            <li>Process your transactions quickly.</li>
            <li>Send periodic emails regarding your order or other products and services.</li>
        </ul>

        <h2>4. How We Protect Your Information</h2>
        <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>

        <h2>5. Sharing Your Personal Information</h2>
        <p>We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. You can do this by logging into your account or by contacting us directly.</p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>Dhakai Threads has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>
        
        <h2>8. Contacting Us</h2>
        <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p>
        <p>
            Dhakai Threads<br/>
            123 Gulshan Avenue, Dhaka, Bangladesh<br/>
            support@dhakaithreads.com
        </p>
      </div>
    </div>
  );
}
