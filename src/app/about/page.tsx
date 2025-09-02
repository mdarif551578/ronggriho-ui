
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Eye } from "lucide-react";
import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn the story behind Rong Griho, our mission to provide contemporary fashion, and our vision for the future of Bangladeshi style.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Rong Griho',
    description: 'Learn the story behind our brand and our mission to redefine Bangladeshi fashion.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://picsum.photos/1600/600"
          alt="Modern fashion shoot"
          fill
          objectFit="cover"
          className="z-0"
          data-ai-hint="youth fashion"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="z-20 p-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            About Rong Griho
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Defining the new wave of Bangladeshi style.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center font-headline mb-8 text-primary">Our Story</h2>
          <Card>
            <CardContent className="p-8 text-center text-lg text-muted-foreground">
              <p>
                Rong Griho started as a conversation among friends in a Dhaka cafe, talking about the styles we saw online versus what we could actually find at home. We wanted clothes that reflected our identity—a blend of global trends and our unique urban desi culture. So, we decided to build it ourselves. Rong Griho is for the young, the bold, and the fashion-forward individuals shaping the future of Bangladeshi style.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Mission and Vision */}
        <section className="grid md:grid-cols-2 gap-8 text-center mb-16">
          <Card>
            <CardHeader>
              <Target className="h-12 w-12 mx-auto text-primary" />
              <CardTitle className="mt-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide young Bangladeshis with access to high-quality, contemporary fashion that is both trendy and accessible. We aim to curate a collection that empowers self-expression and confidence.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Eye className="h-12 w-12 mx-auto text-primary" />
              <CardTitle className="mt-4">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the go-to fashion destination for the modern Bangladeshi youth, known for our on-trend styles, quality products, and connection to the local urban culture.
              </p>
            </CardContent>
          </Card>
        </section>
        
      </div>
    </div>
  );
}
