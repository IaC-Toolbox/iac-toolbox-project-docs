provider "aws" {
  region                   = "us-east-1"
  shared_credentials_files = ["./.aws-credentials"]
  profile                  = "terraform"
}

### Ship Infra
resource "aws_route53_zone" "main_ship_infra" {
  name = "ship-infra.com"
}

resource "aws_route53domains_registered_domain" "main_ship_infra" {
  domain_name = "ship-infra.com"

  # Current Name Servers
  dynamic "name_server" {
    for_each = aws_route53_zone.main_ship_infra.name_servers
    content {
      name = name_server.value
    }
  }

  # Vercel Nameservers
  name_server {
    name = "ns1.vercel-dns.com"
  }

  name_server {
    name = "ns2.vercel-dns.com"
  }
}

variable "vercel_cname_records_ship_infra" {
  type = map(string)
  default = {
    www          = "ef382456d0a65bde.vercel-dns-017.com"
  }
}

resource "aws_route53_record" "vercel_cname_ship_infra" {
  for_each = var.vercel_cname_records_ship_infra

  zone_id = aws_route53_zone.main_ship_infra.zone_id
  name    = each.key
  type    = "CNAME"
  ttl     = 300
  records = [each.value]
}

### IaC Toolbox
resource "aws_route53_zone" "main_iac_toolbox" {
  name = "iac-toolbox.com"
}

resource "aws_route53domains_registered_domain" "main_iac_toolbox" {
  domain_name = "iac-toolbox.com"
  # Current Name Servers
  dynamic "name_server" {
    for_each = aws_route53_zone.main_iac_toolbox.name_servers
    content {
      name = name_server.value
    }
  }

  # Vercel Nameservers
  name_server {
    name = "ns1.vercel-dns.com"
  }

  name_server {
    name = "ns2.vercel-dns.com"
  }
}

variable "vercel_cname_records_iac_toolbox" {
  type = map(string)
  default = {
    www          = "ef382456d0a65bde.vercel-dns-017.com."
  }
}

resource "aws_route53_record" "vercel_cname_iac_toolbox" {
  for_each = var.vercel_cname_records_iac_toolbox

  zone_id = aws_route53_zone.main_iac_toolbox.zone_id
  name    = each.key
  type    = "CNAME"
  ttl     = 300
  records = [each.value]
}

resource "aws_route53_record" "vercel_a" {

  zone_id = aws_route53_zone.main_iac_toolbox.zone_id
  name    = "@"
  type    = "A"
  ttl     = 300
  records = ["216.198.79.1"]
}

## Google Search Console Verification

variable "google_search_console_verification" {
  type    = map(string)
  default = {
    "ship-infra.com" = "google-site-verification=37fahvmO36jDe089m5kdquBka3CODgvP11Gbj1x1QyA"
  }
}

resource "aws_route53_record" "google_txt_verification_ship_infra" {
  for_each = var.google_search_console_verification

  zone_id = aws_route53_zone.main_ship_infra.zone_id
  name    = each.key
  type    = "TXT"
  ttl     = 300
  records = [each.value]
}
