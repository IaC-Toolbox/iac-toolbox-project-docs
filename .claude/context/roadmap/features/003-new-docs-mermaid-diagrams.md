---
status: completed
completed_date: 2026-04-23
pr_url: https://github.com/IaC-Toolbox/iac-toolbox-project-docs/pull/4
---

# New Technical Docs — Add Mermaid Diagrams

## Overview

Add Mermaid diagrams to the new technical documentation sections (architecture, integrations, cli-reference, advanced). The Mermaid rendering infrastructure already exists (added in PR #3). This spec adds diagrams to pages that currently have none, reusing and adapting diagrams already proven in the v0 section.

---

## Diagram Specs

### architecture/index.mdx

Replace the plain code block under "## Data flow" with:

~~~mermaid
graph LR
    CLI["iac-toolbox init"] -->|downloads| Scripts["./infrastructure/\niac-toolbox-raspberrypi"]
    CLI -->|writes| Config["iac-toolbox.yml\n(commit-safe)"]
    CLI -->|writes| Creds["~/.iac-toolbox/credentials\n(mode 600)"]
    Scripts -->|read by| InstallSh["install.sh"]
    Config -->|read by| Ansible["Ansible playbooks"]
    Creds -->|injected as env| InstallSh
    InstallSh --> Ansible
    Ansible -->|SSH or --local| Pi["Target Device\n(Raspberry Pi ARM64)"]
~~~

Add under "## Repository map" a new diagram:

~~~mermaid
graph TD
    User["Developer"] --> CLI["iac-toolbox-cli\nTypeScript/Ink TUI"]
    CLI -->|downloads & runs| RPI["iac-toolbox-raspberrypi\nAnsible + Bash scripts"]
    RPI -->|provisions| Device["Target Device"]
    Docs["iac-toolbox-project-docs\nNext.js/MDX"] -->|documents| CLI
    Docs -->|documents| RPI
~~~

---

### integrations/index.mdx

Add after "## Integration dependencies":

~~~mermaid
graph TD
    CF["cloudflare"] -->|enables public domain for| Vault["vault"]
    CF -->|enables public domain for| Grafana["grafana"]
    GBW["github_build_workflow"] -->|independent| CF
    Grafana -->|includes| Prom["prometheus\n+ node_exporter\n+ loki\n+ alloy"]
~~~

---

### integrations/cloudflare-tunnel.mdx

Add after "## Wizard fields":

~~~mermaid
sequenceDiagram
    participant User as Internet User
    participant CF as Cloudflare Network
    participant CFD as cloudflared (device)
    participant App as Your App

    User->>CF: HTTPS GET api.example.com
    Note over CF: SSL termination, DDoS protection
    CF->>CFD: Encrypted outbound tunnel
    Note over CFD: No port forwarding needed
    CFD->>App: http://localhost:<port>
    App-->>CFD: Response
    CFD-->>CF: Via tunnel
    CF-->>User: HTTPS response
~~~

---

### integrations/hashicorp-vault.mdx

Add after "## Config written to iac-toolbox.yml":

~~~mermaid
graph TD
    App["Your Application"] -->|token-based request| Vault["Vault :8200\nKV v2 engine"]
    GHA["GitHub Actions"] -->|VAULT_TOKEN env| Vault
    Vault -->|encrypted storage| KV["kv/myapp/* secrets"]
    Vault -->|every access| Audit["Audit log"]
    Admin["Admin"] -->|Web UI / CLI| CFTunnel["Cloudflare Tunnel"]
    CFTunnel --> Vault
~~~

---

## What Changes

| File | Diagram added |
|---|---|
| `content/docs/architecture/index.mdx` | System overview `graph TD`; data flow `graph LR`; config/secrets separation `graph LR` |
| `content/docs/integrations/index.mdx` | Integration dependency `graph TD` |
| `content/docs/integrations/cloudflare-tunnel.mdx` | Tunnel request flow `sequenceDiagram` |
| `content/docs/integrations/hashicorp-vault.mdx` | Vault access model `graph TD` |
| `content/docs/integrations/grafana.mdx` | Observability stack `graph TD`; scrape + log pipeline `graph LR` |
| `content/docs/integrations/github-build-workflow.mdx` | CI/CD pipeline `graph LR` |
| `content/docs/cli-reference/init.mdx` | Wizard step flow `graph TD` |
| `content/docs/advanced/ansible-direct.mdx` | Ansible execution model `graph TD` |

---

### integrations/grafana.mdx

Add after "## Stack components":

~~~mermaid
graph TD
    You["You (anywhere)"] -->|HTTPS| CF["Cloudflare Network"]
    CF -->|tunnel| GF["Grafana :3000\nDashboards + Alerts"]
    subgraph Pi["Raspberry Pi"]
        GF -->|PromQL| Prom["Prometheus :9090"]
        GF -->|LogQL| Loki["Loki :3100"]
        Prom -->|scrapes /metrics| NE["Node Exporter :9100\nCPU/memory/disk"]
        Alloy["Grafana Alloy :12345"] -->|push logs| Loki
    end
~~~

Add after "## Config written to iac-toolbox.yml":

~~~mermaid
graph LR
    NE["Node Exporter :9100"] -->|/metrics every 15s| Prom["Prometheus :9090\n15d retention"]
    Journals["/var/log + Docker logs"] --> Alloy["Grafana Alloy :12345"]
    Alloy -->|push| Loki["Loki :3100\n168h retention"]
    Prom --> GF["Grafana :3000"]
    Loki --> GF
~~~

---

### integrations/github-build-workflow.mdx

Add after "## Wizard fields":

~~~mermaid
graph LR
    Push["git push origin main"] --> GH["GitHub Repo"]
    GH -->|trigger workflow| WF[".github/workflows/deploy.yml"]
    WF -->|dispatch to runner| Pi["Raspberry Pi\nSelf-hosted Runner"]
    subgraph Pi
        Build["docker build -t myapp:SHA ."] --> Reg["docker push myapp:SHA"]
        Reg --> Deploy["docker stop + pull + run"]
    end
    Reg -->|image| DH["Docker Hub"]
    Deploy --> App["App :4000 ✅"]
~~~

---

### cli-reference/init.mdx

Add after "## Wizard steps":

~~~mermaid
graph TD
    A["DeviceProfileDialog\ndevops-server / app-server / both"] --> B["DeviceTypeDialog\nremote / local"]
    B -->|remote| C["ConnectionDialog\nhostname, user, SSH key"]
    B -->|local| D["DirectoryDialog"]
    C --> D
    D --> E["DownloadDialog\nfetch iac-toolbox-raspberrypi"]
    E --> F["IntegrationSelectDialog\nmulti-select"]
    F --> G["Per-module config\nCloudflare / Vault / Grafana / GitHub"]
    G --> H["WizardSummaryDialog\nconfirm / cancel"]
    H -->|confirm| I["Write iac-toolbox.yml\n+ credentials"]
    I --> J["InstallPromptDialog\ninstall now?"]
    J -->|yes| K["InstallRunnerDialog\nlive output"]
    J -->|no| L["ManualRunDialog\niac-toolbox install"]
~~~

---

### advanced/ansible-direct.mdx

Add after the intro paragraph:

~~~mermaid
graph TD
    CLI["iac-toolbox install"] -->|reads| Creds["~/.iac-toolbox/credentials"]
    CLI -->|exports env vars| Script["install.sh"]
    Script --> AP["ansible-playbook\nmain.yml"]
    AP -->|--tags docker| Docker["Docker Engine"]
    AP -->|--tags vault| Vault["HashiCorp Vault"]
    AP -->|--tags cloudflare| CF["cloudflared"]
    AP -->|--tags github-runner| Runner["GitHub Actions Runner"]
    AP -->|--ansible-only| Grafana["Grafana stack"]
~~~

---

## Out of Scope

- Adding diagrams to configuration/, installation/, or quick-start/ pages — prose is sufficient there
- Removing v0-private-on-premises-infrastructure content — separate task
