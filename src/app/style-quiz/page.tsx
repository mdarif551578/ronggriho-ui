import StyleFinder from "@/components/style-finder";

export default function StyleQuizPage() {
  return (
    <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-headline text-center mb-4">Find Your Perfect Style</h1>
            <p className="text-lg text-muted-foreground text-center mb-12">Take our quick quiz to get personalized recommendations.</p>
            <StyleFinder />
        </div>
    </div>
  );
}
