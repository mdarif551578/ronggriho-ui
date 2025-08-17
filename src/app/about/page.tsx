
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Eye } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1600x600.png"
          alt="Dhakai Threads Team"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="team business"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="z-20 p-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            About Dhakai Threads
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Weaving tradition with contemporary style.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center font-headline mb-8">Our Story</h2>
          <Card>
            <CardContent className="p-8 text-center text-lg text-muted-foreground">
              <p>
                Founded in the heart of Dhaka, Dhakai Threads was born from a passion for Bangladesh's rich textile heritage and a vision to bring it to the modern wardrobe. We believe that fashion is a form of storytelling, and our collections are a testament to the intricate artistry of local craftsmen, reimagined for the global citizen. We partner with skilled artisans to create pieces that are not only beautiful but also sustainable and ethical.
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
                To empower local artisans by creating a global platform for their craft, while providing our customers with high-quality, unique, and culturally rich fashion that they can cherish.
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
                To be a leading global brand for Bangladeshi fashion, celebrated for our commitment to authenticity, craftsmanship, sustainability, and contemporary design.
              </p>
            </CardContent>
          </Card>
        </section>
        
      </div>
    </div>
  );
}
