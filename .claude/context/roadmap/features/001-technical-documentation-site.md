---
status: draft
completed_date:
pr_url:
---

# IaC Toolbox — Technical Documentation Site

## Overview

Replace the current blog-style tutorial content with a technical reference documentation site covering the CLI (`iac-toolbox`), the Raspberry Pi infrastructure scripts, all configurable integrations, and the generated `iac-toolbox.yml` schema. The goal is docs that read like docs.k3s.io or docs.litellm.ai: precise, command-first, with copy-pasteable examples at every step.

---

## What Changes

| Area | Change |
| ---- | ------ |
| `content/docs/` | New `cli-reference/` section with one page per command group |
| `content/docs/` | New `configuration/` section documenting `iac-toolbox.yml` schema in full |
| `content/docs/` | New `integrations/` section: one page per integration (Cloudflare, Vault, Grafana, GitHub) |
| `content/docs/` | New `quick-start/` and `installation/` landing pages |
| `content/docs/` | New `architecture/` page with system diagram |
| Existing v0 pages | Preserved as-is under `v0-private-on-premises-infrastructure/` |

---

## Page Specs

### quick-start/index.mdx

Goal: reader goes from zero to running wizard in under 5 minutes.

Content:
1. Prerequisites table (Node ≥22, pnpm ≥10, Ansible, target device with SSH)
2. Install the CLI: `npm install -g iac-toolbox`
3. Run the wizard: `iac-toolbox init`
4. Full wizard flow shown as terminal transcript (device profile → device type → connection → directory → download → integrations → per-module config → summary → install)
5. "What's next" links to CLI reference and integrations

---

### installation/index.mdx

Prerequisites:

| Requirement | Version | Notes |
|---|---|---|
| Node.js | ≥ 22.14.0 | Required to run the CLI |
| pnpm | ≥ 10.33.0 | Used if building from source |
| Ansible | any recent | Required on the machine running the wizard |
| Target device | Raspberry Pi OS Lite 64-bit | ARM64 required for production |

Supported platforms:

| Platform | Status |
|---|---|
| Raspberry Pi 4B (ARM64) | Fully supported |
| Local macOS/Linux (x64) | Supported with warning |
| AWS EC2 | Coming soon |

---

### cli-reference/init.mdx

```
iac-toolbox init [--profile <name>]
```

Starts the interactive TUI wizard. Alias: default command (running `iac-toolbox` with no subcommand also prints help; `iac-toolbox init` is the explicit form).

**Wizard steps in order:**

| Step | Dialog | Description |
|---|---|---|
| 0 | DeviceProfileDialog | Choose server role: DevOps Server, App Server, or Both |
| 1 | DeviceTypeDialog | Choose target: Raspberry Pi ARM64, Local x64, or AWS EC2 (coming soon) |
| 2 | ConnectionDialog | For remote: hostname, username, SSH key path |
| 3 | DirectoryDialog | Where to save infrastructure scripts (`./infrastructure` or CWD) |
| 4 | DownloadDialog | Downloads `iac-toolbox-raspberrypi` scripts to the chosen directory |
| 5 | IntegrationSelectDialog | Multi-select: GitHub Build Workflow, Cloudflare, Vault, Grafana |
| 6 | Per-module config | One dialog per selected integration (see integrations section) |
| 7 | WizardSummaryDialog | Review selections, confirm or cancel |
| 8 | InstallPromptDialog | Optionally run `install.sh` immediately |
| 9 | InstallRunnerDialog / ManualRunDialog | Live install output or manual command |

**Flags:**

| Flag | Default | Description |
|---|---|---|
| `--profile <name>` | `default` | Credential profile to read/write |

**Outputs:**
- `<directory>/iac-toolbox.yml` — non-secret configuration
- `~/.iac-toolbox/credentials` — secrets, INI format, mode 600

---

## Proposed Page Structure

```
docs/
├── quick-start/
│   └── index.mdx                  # Install CLI → run init → done
├── installation/
│   ├── index.mdx                  # Prerequisites, supported platforms
│   ├── npm.mdx                    # npm install path
│   └── from-source.mdx            # pnpm build path
├── cli-reference/
│   ├── index.mdx                  # Overview of all commands
│   ├── init.mdx                   # iac-toolbox init (wizard)
│   ├── install.mdx                # iac-toolbox install
│   ├── credentials.mdx            # iac-toolbox credentials set <key>
│   ├── cloudflare.mdx             # iac-toolbox cloudflare install/uninstall
│   ├── vault.mdx                  # iac-toolbox vault install/uninstall
│   └── grafana.mdx                # iac-toolbox grafana install/uninstall
├── configuration/
│   ├── index.mdx                  # iac-toolbox.yml reference (all keys)
│   ├── credentials.mdx            # ~/.iac-toolbox/credentials INI format
│   └── profiles.mdx               # --profile flag, multi-profile usage
├── integrations/
│   ├── index.mdx                  # Integration overview + selection matrix
│   ├── cloudflare-tunnel.mdx      # Full Cloudflare Tunnel setup reference
│   ├── hashicorp-vault.mdx        # Vault setup, ports, KV, audit
│   ├── grafana.mdx                # Grafana + Prometheus + Loki + Alloy stack
│   └── github-build-workflow.mdx  # Docker Hub push workflow setup
├── architecture/
│   └── index.mdx                  # System diagram, repo map, data flow
└── advanced/
    ├── ansible-direct.mdx         # Running playbooks directly without CLI
    ├── install-flags.mdx          # install.sh flag reference
    └── arm64-notes.mdx            # Architecture validation, x64 workarounds
```

---

### cli-reference/install.mdx

```
iac-toolbox install [--profile <name>] [--destination <path>]
```

Runs `install.sh` using a pre-existing `iac-toolbox.yml` in `<destination>`. Use this when you already ran `init` and want to re-apply without going through the wizard again.

| Flag | Default | Description |
|---|---|---|
| `--profile <name>` | `default` | Credential profile to inject as env vars |
| `--destination <path>` | `infrastructure` | Path to directory containing `iac-toolbox.yml` |

Secrets are read from `~/.iac-toolbox/credentials[<profile>]` and passed to `install.sh` as environment variables.

---

### cli-reference/credentials.mdx

```
iac-toolbox credentials set <key> [--profile <name>]
```

Prompts for a value and writes it to `~/.iac-toolbox/credentials` under the given profile. The file is created with mode `600` if it does not exist.

**Supported keys:**

| Key | Used by |
|---|---|
| `docker_hub_token` | GitHub Build Workflow — Docker Hub push |
| `github_pat` | GitHub personal access token |
| `cloudflare_tunnel_token` | Cloudflare Tunnel |
| `vault_token` | HashiCorp Vault |
| `grafana_api_key` | Grafana API |
| `pagerduty_key` | PagerDuty integration |
| `cloudflare_api_token` | Cloudflare API (injected to `install.sh`) |
| `grafana_admin_password` | Grafana admin login |

---

### cli-reference/cloudflare.mdx

```
iac-toolbox cloudflare install
iac-toolbox cloudflare uninstall
```

`install`: reads `cloudflare_api_token` from `~/.iac-toolbox/credentials[default]`, then runs:
```bash
infrastructure/scripts/install.sh --cloudflared --local
```

`uninstall`: runs:
```bash
infrastructure/scripts/uninstall-cloudflare.sh --local
```

Both commands require the working directory to contain an `infrastructure/` folder (populated by `iac-toolbox init`).

---

### cli-reference/vault.mdx

```
iac-toolbox vault install
iac-toolbox vault uninstall
```

`install` runs:
```bash
infrastructure/scripts/install.sh --vault --local
```

`uninstall` runs:
```bash
infrastructure/scripts/uninstall-vault.sh --local
```

---

### cli-reference/grafana.mdx

```
iac-toolbox grafana install
iac-toolbox grafana uninstall
```

`install` reads `grafana_admin_password` from credentials, then runs:
```bash
infrastructure/scripts/install.sh --ansible-only --local
```

`uninstall` runs:
```bash
infrastructure/scripts/uninstall-loki.sh --local
```

---

### configuration/index.mdx — iac-toolbox.yml Full Schema

Generated by `iac-toolbox init`. Safe to commit — no secrets stored here. All sensitive values use `{{ variable }}` references injected at deploy time.

```yaml
# Generated by iac-toolbox init
# Safe to commit — no secrets stored here

device:
  profile: "devops-server"       # devops-server | app-server | both

observability:                   # only present for app-server without local Grafana
  remote: true
  prometheus_host: "10.0.0.1"
  prometheus_port: 9090
  loki_host: "10.0.0.1"
  loki_port: 3100

docker:
  enabled: true                  # always installed, not configurable

github_build_workflow:
  enabled: true
  docker_hub_username: "myuser"
  docker_image_name: "myapp"
  docker_hub_token: "{{ docker_hub_token }}"  # injected by CLI at deploy time

github_runner:
  enabled: false                 # coming soon

cloudflare:
  enabled: true
  mode: "api"                    # api (token-based) only in CLI flow
  tunnel_name: "example.com-tunnel"
  account_id: "abc123"
  zone_id: "def456"
  cloudflare_api_token: "{{ cloudflare_api_token }}"  # injected by CLI at deploy time
  domains:
    - hostname: "api.example.com"
      service_port: 80
      service: "http://localhost:80"

vault:
  enabled: true
  version: "latest"
  port: 8200
  enable_kv: true
  enable_audit: true
  domain: "vault.example.com"   # empty string if not exposed via Cloudflare

grafana:
  enabled: true
  version: "latest"
  port: 3000
  admin_user: "admin"
  admin_password: "{{ grafana_admin_password }}"  # injected by CLI at deploy time
  domain: "grafana.example.com"

prometheus:
  enabled: true
  version: "latest"
  port: 9090
  scrape_interval: "15s"
  retention: "15d"

node_exporter:
  version: "latest"
  port: 9100

loki:
  enabled: true
  version: "latest"
  port: 3100
  retention_hours: 168

alloy:
  enabled: true
  version: "latest"
  port: 12345

pagerduty:
  enabled: false                 # coming soon
```

---

### configuration/credentials.mdx — ~/.iac-toolbox/credentials

INI-format file at `~/.iac-toolbox/credentials`. Mode `600`. Never committed to git (`.gitignore` is auto-created in the directory).

```ini
[default]
cloudflare_api_token = <token>
grafana_admin_password = <password>
docker_hub_token = <token>
docker_hub_username = <username>

[staging]
cloudflare_api_token = <staging-token>
```

Switch profiles with `--profile staging` on any command. Profiles are merged: missing keys in a profile fall back to `[default]`.

---

### configuration/profiles.mdx

The `--profile` flag is available on `init`, `install`, and `credentials set`. It selects which INI section of `~/.iac-toolbox/credentials` to read from and write to.

```bash
iac-toolbox init --profile production
iac-toolbox credentials set cloudflare_api_token --profile production
iac-toolbox install --profile production
```

---

### integrations/cloudflare-tunnel.mdx

The Cloudflare Tunnel integration uses API token mode (`mode: api`). The wizard validates the token and zone ID against the Cloudflare API before writing config.

**Wizard fields:**

| Field | Description | Validated |
|---|---|---|
| API token | Cloudflare API token with Tunnel:Edit + DNS:Edit scope | Yes — calls `/user/tokens/verify` |
| Account ID | Found in Cloudflare dashboard sidebar | No |
| Zone ID | Found in domain overview page | Yes — calls `/zones/<id>` |
| Tunnel name | Auto-suggested as `<zoneName>-tunnel` | No |
| Hostname | First domain to expose (e.g. `api.example.com`) | No |
| Service port | Local port the service listens on | No (integer check only) |

**Credential stored:**
```ini
[default]
cloudflare_api_token = <token>
```

**Config written to iac-toolbox.yml:**
```yaml
cloudflare:
  enabled: true
  mode: "api"
  tunnel_name: "example.com-tunnel"
  account_id: "abc123"
  zone_id: "def456"
  cloudflare_api_token: "{{ cloudflare_api_token }}"
  domains:
    - hostname: "api.example.com"
      service_port: 80
      service: "http://localhost:80"
```

**Ansible tags:** `cloudflare`

**Re-install without wizard:**
```bash
iac-toolbox cloudflare install
```

---

### integrations/hashicorp-vault.mdx

Vault runs in dev-adjacent mode with KV secrets engine and audit log enabled by default. The wizard offers to expose Vault via Cloudflare Tunnel if that integration is also selected.

**Wizard — Cloudflare enabled:**
```
◆ Expose Vault publicly via Cloudflare?
│ Suggested domain: vault.example.com
│
│ ◉ Yes — use vault.example.com
│ ○ No — local access only (http://localhost:8200)
└
```

**Wizard — Cloudflare not enabled:**
```
◆ Expose Vault publicly via Cloudflare?
│
│   ○ Yes — not available (Cloudflare Tunnel is not enabled)
│   ● No — local access only (http://localhost:8200)
└
```

**Config written:**
```yaml
vault:
  enabled: true
  version: "latest"
  port: 8200
  enable_kv: true
  enable_audit: true
  domain: "vault.example.com"   # empty string if local only
```

**Ansible tags:** `vault`

**Re-install without wizard:**
```bash
iac-toolbox vault install
```

---

### integrations/grafana.mdx

Installs the full observability stack: Grafana + Prometheus + Node Exporter + Loki + Alloy. All components run as Docker containers.

**Stack components:**

| Component | Port | Purpose |
|---|---|---|
| Grafana | 3000 | Dashboards and alerting UI |
| Prometheus | 9090 | Metrics collection and storage |
| Node Exporter | 9100 | Host-level metrics (CPU, memory, disk) |
| Loki | 3100 | Log aggregation |
| Alloy | 12345 | Log shipping agent (Grafana Alloy) |

**Wizard fields:**
- Admin password (masked, confirmed)
- Optional public domain via Cloudflare Tunnel

**Credentials stored:**
```ini
[default]
grafana_admin_password = <password>
```

**Ansible tags:** runs via `--ansible-only` (full stack)

**Re-install without wizard:**
```bash
iac-toolbox grafana install
```

---

### integrations/github-build-workflow.mdx

Sets up GitHub Actions workflow files for building and pushing a Docker image to Docker Hub from ARM64.

**Wizard fields:**

| Field | Description |
|---|---|
| Docker Hub username | Your Docker Hub account name |
| Docker image name | Image name (without tag), e.g. `myapp` |
| Docker Hub token | Personal access token with `read/write/delete` scope |

**Credentials stored:**
```ini
[default]
docker_hub_username = myuser
docker_hub_token = <token>
```

**Config written:**
```yaml
github_build_workflow:
  enabled: true
  docker_hub_username: "myuser"
  docker_image_name: "myapp"
  docker_hub_token: "{{ docker_hub_token }}"
```

---

### architecture/index.mdx

**Repository map:**

| Repo | Purpose |
|---|---|
| `iac-toolbox-cli` | TUI wizard and CLI subcommands (TypeScript/Ink) |
| `iac-toolbox-raspberrypi` | Ansible playbooks + install scripts (Bash/YAML) |
| `iac-toolbox-project-docs` | This documentation site (Next.js/MDX) |

**Data flow:**

```
Developer machine
├── iac-toolbox init
│   ├── Downloads iac-toolbox-raspberrypi → ./infrastructure/
│   ├── Writes ./infrastructure/iac-toolbox.yml   (non-secret config)
│   └── Writes ~/.iac-toolbox/credentials          (secrets, mode 600)
│
└── install.sh (run by CLI or manually)
    ├── Reads iac-toolbox.yml via Ansible group_vars
    ├── Injects secrets from env (sourced from credentials file)
    └── Runs Ansible playbooks → target device via SSH (or --local)

Target device (Raspberry Pi ARM64)
├── Docker Engine
├── HashiCorp Vault      (port 8200)
├── Grafana stack        (ports 3000, 9090, 9100, 3100, 12345)
└── cloudflared          → Cloudflare Network → public HTTPS domains
```

**Architecture validation:**

The CLI checks `os.arch()` at startup. On non-ARM64 systems a 3-second warning is shown:
```
⚠️  Detected x86_64 on linux. This tool is optimized for ARM64/Raspberry Pi.
    You can proceed for testing purposes, but some features may not work as expected.
```

---

### advanced/ansible-direct.mdx

Run Ansible playbooks directly without the CLI (advanced users, CI pipelines).

```bash
cd infrastructure/ansible-configurations

# Full deployment
ansible-playbook -i inventory/all.yml playbooks/main.yml

# Single component
ansible-playbook -i inventory/all.yml playbooks/main.yml --tags docker
ansible-playbook -i inventory/all.yml playbooks/main.yml --tags vault
ansible-playbook -i inventory/all.yml playbooks/main.yml --tags cloudflare
ansible-playbook -i inventory/all.yml playbooks/main.yml --tags github-runner
```

Secrets must be exported before running:
```bash
export CLOUDFLARE_API_TOKEN=...
export GRAFANA_ADMIN_PASSWORD=...
export DOCKER_HUB_TOKEN=...
ansible-playbook -i inventory/all.yml playbooks/main.yml
```

---

### advanced/install-flags.mdx

`install.sh` flag reference:

| Flag | Effect |
|---|---|
| *(none)* | Full deployment: Ansible + Terraform |
| `--ansible-only` | Skip Terraform, run all Ansible playbooks |
| `--terraform-only` | Skip Ansible, run Terraform only |
| `--vault` | Run only HashiCorp Vault Ansible tag |
| `--cloudflared` | Run only Cloudflare Ansible tag |
| `--local` | Run Ansible against localhost instead of SSH |
| `-h`, `--help` | Show usage |

---

## Out of Scope

- Migrating existing v0 blog pages to the new format — preserved as-is
- AWS/EC2 documentation — blocked on CLI support (coming soon)
- GitHub Runner documentation — blocked on CLI support (coming soon)
- PagerDuty documentation — blocked on CLI support (coming soon)
- API reference for the planned Python API layer
- Versioned docs (single version only for now)
