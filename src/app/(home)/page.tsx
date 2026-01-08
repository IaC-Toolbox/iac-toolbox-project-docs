"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ValueProposition } from "@/components/value-proposition"
import { TargetAudience } from "@/components/target-audience"
import { Differentiation } from "@/components/differentiation"
import { Testimonials } from "@/components/testimonials"
import { TutorialsSection } from "@/components/tutorials-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero sectionClassnames="" />
        <ValueProposition sectionClassnames="bg-secondary/30 dark:bg-secondary/30 border-t border-border/40" />
        <TargetAudience sectionClassnames="" />
        <Differentiation sectionClassnames="bg-secondary/30 dark:bg-secondary/30 border-t border-border/40" />
        <Testimonials sectionClassnames="" />
        <TutorialsSection sectionClassnames="bg-secondary/30 dark:bg-secondary/30 border-t border-border/40" />
        <FAQSection sectionClassnames="" />
        <CTASection sectionClassnames="bg-secondary/30 dark:bg-secondary/30 border-t border-border/40" />
      </main>
      <Footer />
    </div>
  )
}
