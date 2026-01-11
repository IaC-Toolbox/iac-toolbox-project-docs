"use client"

import Link from "next/link"
import { Star, Menu, X, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { IaCToolboxLogo } from "@/components/iac-toolbox-logo"

// URLs
const GITHUB_URL = "https://github.com/IaC-Toolbox/iac-toolbox"
const DOCS_URL = "https://www.iac-toolbox.com/docs/v1-beginner-infrastructure-as-code"

// Text content
const BRAND_NAME = "IaC Toolbox"
const LOGO_ALT = "IaC Toolbox Logo"
const TUTORIALS_BUTTON_TEXT = "View Tutorials"
const STAR_BUTTON_TEXT = "Star on GitHub"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <IaCToolboxLogo className="h-10 w-10" />
          <span className="font-bold text-lg">{BRAND_NAME}</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:flex gap-2 min-h-[44px]">
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
              <BookOpen className="h-4 w-4" />
              {TUTORIALS_BUTTON_TEXT}
            </a>
          </Button>
          <Button asChild variant="outline" className="hidden sm:flex gap-2 min-h-[44px] bg-transparent">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Star className="h-4 w-4" />
              {STAR_BUTTON_TEXT}
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden min-h-[44px] min-w-[44px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4">
          <nav className="flex flex-col gap-4">
            <Button asChild className="gap-2 min-h-[44px] w-full">
              <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-4 w-4" />
                {TUTORIALS_BUTTON_TEXT}
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2 min-h-[44px] w-full bg-transparent">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Star className="h-4 w-4" />
                {STAR_BUTTON_TEXT}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
