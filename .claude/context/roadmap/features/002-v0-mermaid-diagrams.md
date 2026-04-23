---
status: draft
completed_date:
pr_url:
---

# v0 Docs — Add Mermaid Diagrams

## Overview

Add Mermaid diagram support to the documentation site and replace the existing ASCII art diagrams in `content/docs/v0-private-on-premises-infrastructure/` with Mermaid equivalents. Also add new diagrams to pages that currently have none. The goal is a more professional, visually consistent set of docs.

---

## What Changes

| Area | Change |
| ---- | ------ |
| `package.json` | Add `mermaid` npm package |
| `source.config.ts` | Add `remarkMdxMermaid` remark plugin |
| `src/mdx-components.tsx` | Register dynamic `Mermaid` component |
| `src/components/mermaid.tsx` | New client component that renders mermaid charts |
| `content/docs/v0-private-on-premises-infrastructure/index.mdx` | Replace ASCII architecture diagram with Mermaid |
| `content/docs/v0-private-on-premises-infrastructure/cloudflare-tunnel/configure-cloudflare-tunnel.mdx` | Replace ASCII tunnel diagram with Mermaid |
| `content/docs/v0-private-on-premises-infrastructure/ci-cd/docker-build-deployment.mdx` | Replace ASCII CI/CD flow with Mermaid |
| `content/docs/v0-private-on-premises-infrastructure/observability/grafana-setup.mdx` | Replace ASCII architecture with Mermaid; add stack diagram |
| `content/docs/v0-private-on-premises-infrastructure/observability/prometheus-metrics-setup.mdx` | Add Mermaid scrape architecture diagram |
| `content/docs/v0-private-on-premises-infrastructure/observability/logs-with-loki.mdx` | Add Mermaid log pipeline diagram |
| `content/docs/v0-private-on-premises-infrastructure/secrets-management/managing-secrets-vault.mdx` | Add Mermaid Vault architecture diagram |
| `content/docs/v0-private-on-premises-infrastructure/github-runner/configure-github-runner.mdx` | Add Mermaid runner workflow diagram |
| `content/docs/v0-private-on-premises-infrastructure/ansible-configuration/base-software-setup.mdx` | Add Mermaid Ansible execution flow diagram |

---

## Infrastructure Changes

### 1. Install mermaid package

```bash
pnpm add mermaid
```

### 2. source.config.ts

```typescript
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { remarkMdxFiles, remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMdxFiles, remarkMdxMermaid],
  },
});
```

### 3. src/components/mermaid.tsx (new file)

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
    if (ref.current && !rendered) {
      mermaid.run({ nodes: [ref.current] });
      setRendered(true);
    }
  }, [chart, rendered]);

  return (
    <div ref={ref} className="mermaid my-6">
      {chart}
    </div>
  );
}
```

### 4. src/mdx-components.tsx

```tsx
import defaultMdxComponents from 'fumadocs-ui/mdx';
import dynamic from 'next/dynamic';
import type { MDXComponents } from 'mdx/types';

const Mermaid = dynamic(() => import('@/components/mermaid'), { ssr: false });

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Mermaid,
    ...components,
  };
}
```

---

## Diagram Specs

### index.mdx — Overall Architecture

Replace the existing ASCII art block (lines 14–44) with:

~~~mermaid
graph TD
    Dev["Developer Machine<br/>iac-toolbox CLI"] -->|SSH + Ansible| Pi

    subgraph Pi["Raspberry Pi 4B (ARM64)"]
        Docker["Docker Engine"]
        Runner["GitHub Actions Runner"]
        CF["cloudflared (tunnel)"]
        Vault["HashiCorp Vault :8200"]
    end

    Pi -->|outbound tunnel| CFNet["Cloudflare Network<br/>(SSL, DDoS, CDN)"]
    CFNet --> Internet["🌍 Public Access<br/>api.yourdomain.com"]
    GH["GitHub (push event)"] -->|dispatch job| Runner
    Runner --> Docker
~~~

---

### configure-cloudflare-tunnel.mdx — Tunnel Flow

Replace the existing ASCII block with:

~~~mermaid
sequenceDiagram
    participant User as 🌍 Internet User
    participant CF as Cloudflare Network
    participant CFD as cloudflared (Pi)
    participant App as Your App (localhost)

    User->>CF: HTTPS GET https://api.yourdomain.com
    Note over CF: SSL termination, DDoS protection
    CF->>CFD: Encrypted tunnel (outbound only)
    CFD->>App: http://localhost:4000
    App-->>CFD: Response
    CFD-->>CF: Response via tunnel
    CF-->>User: HTTPS response
~~~

---

### docker-build-deployment.mdx — CI/CD Pipeline

Replace the existing ASCII block with:

~~~mermaid
graph LR
    Push["git push origin main"] --> GH["GitHub Repo"]
    GH -->|triggers workflow| WF[".github/workflows/deploy.yml"]
    WF -->|dispatches to runner| Pi

    subgraph Pi["Raspberry Pi (ARM64 Runner)"]
        Build["docker build -t myapp:SHA ."] --> Reg["docker push myapp:SHA"]
        Reg --> Deploy["docker stop + pull + run"]
    end

    Reg -->|image| DH["Docker Hub"]
    Deploy --> Running["✅ App running :4000"]
~~~

---

### grafana-setup.mdx — Observability Stack

Replace the existing ASCII block with:

~~~mermaid
graph TD
    You["🌍 You (anywhere)"] -->|HTTPS| CF["Cloudflare Network"]
    CF -->|tunnel| GF["Grafana :3000"]

    subgraph Pi["Raspberry Pi"]
        GF -->|queries metrics| Prom["Prometheus :9090"]
        GF -->|queries logs| Loki["Loki :3100"]
        Prom -->|scrapes| NE["Node Exporter :9100"]
        Alloy["Grafana Alloy :12345"] -->|ships logs| Loki
    end
~~~

---

### prometheus-metrics-setup.mdx — Scrape Architecture

Add after the intro paragraph:

~~~mermaid
graph LR
    Prom["Prometheus :9090"] -->|scrape /metrics every 15s| NE["Node Exporter :9100"]
    NE -->|exposes| CPU["CPU / Memory / Disk / Network"]
    Prom -->|stores| TSDB["Local TSDB (15d retention)"]
    GF["Grafana :3000"] -->|PromQL queries| Prom
~~~

---

### logs-with-loki.mdx — Log Pipeline

Add after the intro paragraph:

~~~mermaid
graph LR
    Sys["System Journals<br/>/var/log"] --> Alloy["Grafana Alloy :12345"]
    Docker["Docker container logs"] --> Alloy
    Alloy -->|push| Loki["Loki :3100"]
    Loki -->|stores| Chunks["Compressed log chunks"]
    GF["Grafana :3000"] -->|LogQL queries| Loki
~~~

---

### managing-secrets-vault.mdx — Vault Architecture

Add after the "The Strategy" section:

~~~mermaid
graph TD
    App["Your Application"] -->|fetch secret via token| Vault["HashiCorp Vault :8200"]
    GHA["GitHub Actions"] -->|VAULT_TOKEN env var| Vault
    Vault -->|stores encrypted| KV["KV v2 Engine<br/>kv/myapp/*"]
    Vault -->|writes| Audit["Audit Log<br/>(every access logged)"]
    CF["Cloudflare Tunnel"] -->|HTTPS| Vault
    Admin["Admin (you)"] -->|Web UI / CLI| CF
~~~

---

### configure-github-runner.mdx — Runner Workflow

Add after the intro paragraph:

~~~mermaid
sequenceDiagram
    participant Dev as Developer
    participant GH as GitHub
    participant Runner as Pi Runner
    participant Reg as Docker Hub

    Dev->>GH: git push origin main
    GH->>Runner: dispatch workflow job
    Runner->>Runner: docker build (native ARM64)
    Runner->>Reg: docker push myapp:SHA
    Runner->>Runner: docker stop + run new image
    Runner-->>GH: job success
~~~

---

### base-software-setup.mdx — Ansible Execution Flow

Add after the intro paragraph:

~~~mermaid
graph TD
    CLI["iac-toolbox init"] -->|generates| Config["iac-toolbox.yml<br/>+ credentials"]
    CLI -->|runs| Script["install.sh"]
    Script -->|invokes| AP["ansible-playbook main.yml"]

    subgraph Playbook["Ansible Playbook (runs on Pi)"]
        Docker["Role: docker"]
        Vault["Role: vault"]
        CF["Role: cloudflare"]
        Runner["Role: github-runner"]
        Grafana["Role: grafana"]
    end

    AP --> Docker
    AP --> Vault
    AP --> CF
    AP --> Runner
    AP --> Grafana
~~~

---

## Out of Scope

- Adding Mermaid to the new technical docs sections (cli-reference, integrations, etc.) — separate spec
- Replacing screenshot images with diagrams — images stay as-is
- Dark mode theme tuning for Mermaid — use `theme: 'neutral'` which works for both
