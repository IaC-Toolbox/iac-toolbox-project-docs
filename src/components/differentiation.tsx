import { CheckCircle2, XCircle } from "lucide-react"

// Section text
const SECTION_TITLE = "A Better Way to Learn Infrastructure"
const SECTION_DESCRIPTION =
  "Most guides assume deep AWS knowledge or show incomplete examples. There is a better approach."
const HIGHLIGHT_TITLE = "Incremental, opinionated, and grounded in real deployments"
const HIGHLIGHT_DESCRIPTION =
  "Learn infrastructure the way startups actually need it — step by step, with working code."

const alternatives = [
  { name: "AWS Console clicking", problem: "Manual, error-prone, not reproducible" },
  { name: "Generic Terraform examples", problem: "Incomplete, not production-ready" },
  { name: "One-off blog tutorials", problem: "Outdated, inconsistent, no full picture" },
]

export function Differentiation({ sectionClassnames }: { sectionClassnames: string }) {
  return (
    <section className={`py-16 md:py-24 ${sectionClassnames}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{SECTION_TITLE}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{SECTION_DESCRIPTION}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {alternatives.map((alt, index) => (
              <div key={index} className="rounded-lg border border-border/50 bg-card p-6">
                <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold">{alt.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{alt.problem}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-primary/50 bg-primary/5 p-8 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">{HIGHLIGHT_TITLE}</h3>
            <p className="text-lg text-muted-foreground">{HIGHLIGHT_DESCRIPTION}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
