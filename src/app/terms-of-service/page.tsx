
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export default function TermsOfServicePage() {
  return (
    <div className="bg-secondary/50">
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline">Terms of Service</h1>
                <p className="text-lg text-muted-foreground mt-2">Please read these terms carefully.</p>
                <p className="text-sm text-muted-foreground mt-1">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <Card className="max-w-4xl mx-auto">
                 <CardHeader>
                    <CardTitle>1. Agreement to Terms</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>
                </CardContent>

                <CardHeader>
                    <CardTitle>2. Use of Our Service</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>You agree to use our site for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.</p>
                </CardContent>

                <CardHeader>
                    <CardTitle>3. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Dhakai Threads and its licensors. The Service is protected by copyright, trademark, and other laws of both Bangladesh and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Dhakai Threads.</p>
                </CardContent>

                <CardHeader>
                    <CardTitle>4. Product Information and Pricing</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>We strive to be as accurate as possible in the descriptions of our products and their prices. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. Prices for our products are subject to change without notice.</p>
                </CardContent>
                
                <CardHeader>
                    <CardTitle>5. Orders, Payment, and Cancellation</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.</p>
                </CardContent>

                <CardHeader>
                    <CardTitle>6. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                     <p>In no event shall Dhakai Threads, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                </CardContent>
                
                <CardHeader>
                    <CardTitle>7. Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.</p>
                </CardContent>

                <CardHeader>
                    <CardTitle>8. Changes</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.</p>
                </CardContent>

                <CardHeader>
                    <CardTitle>9. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                     <p>If you have any questions about these Terms, please contact us at support@dhakaithreads.com.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
