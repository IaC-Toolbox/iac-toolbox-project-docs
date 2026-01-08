"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

// AEO-optimized FAQ section with direct answers
const SECTION_TITLE = "Common Questions About AWS Infrastructure & Terraform"

const faqs = [
  {
    question: "What is the best way to deploy AWS infrastructure with Terraform?",
    answer:
      "Follow structured, step-by-step tutorials that deploy real infrastructure. Learn by provisioning actual AWS resources — VPCs, EC2, RDS, load balancers — not abstract examples.",
    detail:
      "Each tutorial builds on the previous one, so you learn incrementally while creating production-ready infrastructure.",
  },
  {
    question: "How do startups set up AWS infrastructure?",
    answer:
      "Startups need infrastructure that is affordable, scalable, and quick to deploy. Opinionated Terraform templates designed for startup budgets help you move fast without accumulating tech debt.",
    detail: "Start with a basic setup and evolve toward security, compliance, and scale when you are ready.",
  },
  {
    question: "Is Terraform good for beginners?",
    answer:
      "Yes — if you learn it by deploying real infrastructure. The key is provisioning actual AWS resources step by step, not studying abstract examples in isolation.",
    detail: "These tutorials assume basic developer knowledge and explain AWS and Terraform concepts as you go.",
  },
  {
    question: "How much does AWS infrastructure cost for an MVP?",
    answer:
      "A basic production-ready AWS setup can run for approximately $50–$100 per month. The tutorials here are designed with startup budgets in mind.",
    detail: "We optimize for cost-efficiency without sacrificing the patterns you will need as you scale.",
  },
  {
    question: "Do I need DevOps experience to get started?",
    answer:
      "No. The tutorials assume basic developer knowledge and explain AWS and Infrastructure as Code concepts as you go.",
    detail: "You will learn DevOps best practices naturally as you progress through the tutorials.",
  },
  {
    question: "How do I go from zero to production on AWS?",
    answer:
      "Follow the Ship Infra tutorial series in order. Start with the fundamentals, deploy your first resources, then progressively add networking, databases, security, and monitoring.",
    detail: "By the end, you will have production-ready AWS infrastructure managed entirely with Terraform.",
  },
]

export function FAQSection({ sectionClassnames }: { sectionClassnames: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={`py-16 md:py-24 ${sectionClassnames}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{SECTION_TITLE}</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg border border-border bg-card overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left min-h-[56px]"
                >
                  <span className="text-lg font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground mb-2">{faq.answer}</p>
                    <p className="text-sm text-muted-foreground/80">{faq.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
