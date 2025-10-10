import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What kind of projects do you take on?",
      answer: "I work on a wide range of projects including brand identity design, web design, mobile app interfaces, design systems, and creative direction. I'm particularly passionate about projects that combine strategic thinking with beautiful visual execution."
    },
    {
      question: "Do you offer freelance or consulting services?",
      answer: "Yes, I offer both freelance project work and consulting services. Whether you need a complete brand overhaul, design system development, or strategic design guidance, I'm available for both short-term and long-term collaborations."
    },
    {
      question: "Can we work remotely?",
      answer: "Absolutely! I work with clients globally and am fully equipped for remote collaboration. I use modern tools and processes to ensure seamless communication and project delivery regardless of location."
    },
    {
      question: "What's your typical design process?",
      answer: "My process typically involves discovery and research, concept development, design exploration, iteration based on feedback, and final delivery with documentation. I believe in involving clients throughout the process to ensure the best possible outcomes."
    },
    {
      question: "Do you also handle development?",
      answer: "While my primary focus is on design, I work closely with development teams and have a strong understanding of front-end technologies. I can provide development-ready designs and collaborate effectively with developers to ensure proper implementation."
    }
  ];

  return (
    <section className="relative" id="faq" style={{ paddingTop: 'clamp(3rem, 8vh, 5rem)', paddingBottom: 'clamp(3rem, 8vh, 5rem)' }}>
      <div className="container mx-auto" style={{ paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', paddingRight: 'clamp(1rem, 3vw, 1.5rem)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center" style={{ marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
            <h2 className="font-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>We got you an answer</h2>
            <p className="text-foreground/60" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', padding: '0 clamp(1rem, 2vw, 0)' }}>
              Everything you need to know to make your brand better — answered using best practices.
            </p>
          </div>

          <div className="glass-card rounded-2xl" style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/20">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;