
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Find answers to common questions about payment methods, return policy, delivery times, sizing, and more at Rong Griho.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Rong Griho',
    description: 'Find answers to common questions about our products and services.',
    url: '/faq',
  },
};

const faqItems = [
    {
        question: "What payment methods do you accept?",
        answer: "We accept Cash on Delivery (COD), credit/debit cards (Visa, Mastercard), and major mobile banking services in Bangladesh like bKash and Nagad."
    },
    {
        question: "What is your return policy?",
        answer: "We have a 7-day return policy for unused and unworn items with original tags attached. Please visit our 'Return Policy' page for more details on how to initiate a return."
    },
    {
        question: "How long does delivery take?",
        answer: "Standard delivery within Dhaka takes 2-3 business days. For addresses outside Dhaka, it may take 3-5 business days. You can track your order from your account page."
    },
    {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within Bangladesh. We are working on expanding our services to international customers in the future."
    },
    {
        question: "How do I know what size to order?",
        answer: "Each product page has a 'Size Guide' with detailed measurements. If you're still unsure, feel free to contact our customer support for assistance."
    }
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-headline text-center mb-4">Frequently Asked Questions</h1>
      <p className="text-lg text-muted-foreground text-center mb-12">Find answers to common questions about our products and services.</p>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                       {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
