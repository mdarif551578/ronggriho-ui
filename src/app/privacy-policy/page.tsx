
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-secondary/50">
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline">Privacy Policy</h1>
                <p className="text-lg text-muted-foreground mt-2">Your privacy is important to us.</p>
                <p className="text-sm text-muted-foreground mt-1">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>1. Introduction</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>Welcome to Rong Griho. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website.</p>
                </CardContent>

                <CardHeader>
                    <CardTitle>2. Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>We may collect personal information from you in a variety of ways, including, but not limited to, when you visit our site, register on the site, place an order, subscribe to the newsletter, and in connection with other activities, services, features or resources we make available on our Site.</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Personal Identification Information:</strong> Name, email address, mailing address, phone number, etc.</li>
                        <li><strong>Non-personal Identification Information:</strong> Browser name, type of computer, and technical information about your means of connection to our Site.</li>
                    </ul>
                </CardContent>

                 <CardHeader>
                    <CardTitle>3. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                     <p>We may use the information we collect from you to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
                        <li>Improve our website in order to better serve you.</li>
                        <li>Process your transactions quickly.</li>
                        <li>Send periodic emails regarding your order or other products and services.</li>
                    </ul>
                </CardContent>

                <CardHeader>
                    <CardTitle>4. How We Protect Your Information</CardTitle>
                </CardHeader>
                 <CardContent className="text-muted-foreground space-y-4">
                    <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>
                </CardContent>

                <CardHeader>
                    <CardTitle>5. Sharing Your Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.</p>
                </CardContent>

                 <CardHeader>
                    <CardTitle>6. Your Rights</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>You have the right to access, correct, or delete your personal information. You can do this by logging into your account or by contacting us directly.</p>
                </CardContent>

                 <CardHeader>
                    <CardTitle>7. Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>Rong Griho has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>
                </CardContent>

                <CardHeader>
                    <CardTitle>8. Contacting Us</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p>
                    <p>
                        Rong Griho<br/>
                        123 Gulshan Avenue, Dhaka, Bangladesh<br/>
                        support@ronggriho.com
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
