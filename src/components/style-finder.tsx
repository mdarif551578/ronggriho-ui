'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const styles = [
  { 
    name: 'Classic & Timeless', 
    description: 'Elegant pieces that never go out of style.',
    tags: ['classic', 'ethnic-wear'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'woman traditional dress'
  },
  { 
    name: 'Modern & Chic', 
    description: 'Contemporary designs for a sharp, urban look.',
    tags: ['western', 'new-arrival'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'woman modern fashion'
  },
   { 
    name: 'Bold & Vibrant', 
    description: 'Eye-catching colors and patterns that make a statement.',
    tags: ['best-seller', 't-shirts'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'colorful fashion'
  },
   { 
    name: 'Casual & Comfy', 
    description: 'Relaxed and comfortable for your everyday adventures.',
    tags: ['t-shirts', 'accessories'],
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'woman casual outfit'
  },
];

export default function StyleFinder() {
  const router = useRouter();

  const handleStyleSelect = (tags: string[]) => {
    // For this simple version, we'll just use the category from the first tag.
    // A more complex implementation could filter by multiple tags.
    const categoryQuery = tags.find(tag => ['ethnic-wear', 'western', 't-shirts', 'accessories'].includes(tag)) || 'all';
    router.push(`/products?category=${categoryQuery}`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold font-headline text-center mb-2">What's Your Style?</h2>
        <p className="text-muted-foreground text-center mb-6">Choose a style to get started.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {styles.map((style) => (
            <div key={style.name} className="group cursor-pointer" onClick={() => handleStyleSelect(style.tags)}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative aspect-square">
                   <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="w-full h-full object-cover"
                    data-ai-hint={style.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <p className="text-white text-lg font-semibold text-center p-4">Shop Now</p>
                  </div>
                </div>
                 <div className="p-4 text-center">
                    <h3 className="font-semibold">{style.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{style.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
