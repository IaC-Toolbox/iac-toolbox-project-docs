import { Star } from "lucide-react"
import { IaCToolboxLogo } from "@/components/iac-toolbox-logo"

const GITHUB_URL = "https://github.com/IaC-Toolbox/iac-toolbox"

const BRAND_NAME = "IaC Toolbox"
const STAR_TEXT = "Star on GitHub"
const COPYRIGHT_TEXT = "Open source under MIT License."
const LOGO_ALT = "IaC Toolbox Logo"

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
          <div className="flex items-center gap-2">
            <IaCToolboxLogo className="h-10 w-10" />
            <span className="font-bold">{BRAND_NAME}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors min-h-[44px]"
            >
              <Star className="h-4 w-4" />
              {STAR_TEXT}
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. {COPYRIGHT_TEXT}
          </p>
        </div>
      </div>
    </footer>
  )
}
