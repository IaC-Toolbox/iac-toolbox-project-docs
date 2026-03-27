provider "aws" {
  region                   = "us-east-1"
  shared_credentials_files = ["./.aws-credentials"]
  profile                  = "terraform"
}


### IaC Toolbox
resource "aws_route53_zone" "main_iac_toolbox" {
  name = "iac-toolbox.com"
}

resource "aws_route53domains_registered_domain" "main_iac_toolbox" {
  domain_name = "iac-toolbox.com"

  # Vercel Nameservers
  name_server {
    name = "ns1.vercel-dns.com"
  }

  name_server {
    name = "ns2.vercel-dns.com"
  }

  name_server {
    name = "kai.ns.cloudflare.com"
  }

  name_server {
    name = "ullis.ns.cloudflare.com"
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
