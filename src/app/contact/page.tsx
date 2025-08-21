import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-headline text-center mb-4">Contact Us</h1>
      <p className="text-lg text-muted-foreground text-center mb-12">Got a question or just want to say hi? Drop us a line.</p>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Your Name" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Your Email" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="What's this about?" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Your message..." rows={5} />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
        <div>
            <h2 className="text-2xl font-semibold mb-6">Our Info</h2>
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <Mail className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="text-lg">Email</CardTitle>
                            <p className="text-muted-foreground">support@ronggriho.com</p>
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <Phone className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="text-lg">Phone</CardTitle>
                            <p className="text-muted-foreground">+880 123 456 7890</p>
                        </div>
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <MapPin className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="text-lg">Address</CardTitle>
                            <p className="text-muted-foreground">123 Gulshan Avenue, Dhaka, Bangladesh</p>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
