import { Users, Briefcase, Rocket } from "lucide-react"

// Section text
const SECTION_TITLE = "Built For Teams Like Yours"
const SECTION_DESCRIPTION =
  "Whether you are shipping an MVP or scaling to production, these tutorials meet you where you are."

const personas = [
  {
    icon: Users,
    title: "Developers",
    description: "Deploy your backend properly instead of duct-taping AWS together.",
  },
  {
    icon: Briefcase,
    title: "Startup Founders & CTOs",
    description: "Get production infrastructure now without hiring DevOps too early.",
  },
  {
    icon: Rocket,
    title: "Teams Shipping MVPs",
    description: "Start cheap today without blocking yourself tomorrow.",
  },
]

export function TargetAudience({ sectionClassnames }: { sectionClassnames: string }) {
  return (
    <section className={`py-16 md:py-24 ${sectionClassnames}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{SECTION_TITLE}</h2>
          <p className="mb-12 text-lg text-muted-foreground">{SECTION_DESCRIPTION}</p>

          <div className="grid gap-8 md:grid-cols-3">
            {personas.map((persona, index) => {
              const Icon = persona.icon
              return (
                <div key={index} className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{persona.title}</h3>
                  <p className="text-muted-foreground">{persona.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
