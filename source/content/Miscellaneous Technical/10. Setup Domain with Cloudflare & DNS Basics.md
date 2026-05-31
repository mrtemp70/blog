
## Overview

Architecture:

```text
Domain → Cloudflare DNS (Proxy) → GitHub Pages
```

Instead of pointing the domain directly to GitHub Pages, Cloudflare acts as the DNS and proxy layer.

![[domain.png]]

---

## Step 1: Add Domain to Cloudflare

1. Add your domain to Cloudflare.
    
2. Update your domain registrar's nameservers to the Cloudflare nameservers provided.
    
3. Wait for DNS propagation (can take a few minutes up to 24 hours).
    
![[domain1.png]]

---

## Step 2: Configure DNS Records

Here is exported file from cloudflared:
![[shoyeb.asia.txt]]

or setup manually,


Add the following A records:

|Type|Name|Content|
|---|---|---|
|A|@|185.199.108.153|
|A|@|185.199.109.153|
|A|@|185.199.110.153|
|A|@|185.199.111.153|

### IPv6 Records (Optional)

Add the following AAAA records:

|Type|Name|Content|
|---|---|---|
|AAAA|@|2606:50c0:8000::153|
|AAAA|@|2606:50c0:8001::153|
|AAAA|@|2606:50c0:8002::153|
|AAAA|@|2606:50c0:8003::153|

### WWW Record

|Type|Name|Content|
|---|---|---|
|CNAME|www|mrtemp70.github.io|

Enable Cloudflare Proxy (orange cloud) for all records if desired.
![[domain2.png]]

Also, add the Cloudflare nameservers to the Spaceship DNS management

![[domain4.png]]

![[domain5.png]]

![[domain6.png]]

Add this to make it available for the project

![[domain7.png]]

> [!hint] 
> To use your own hosting instead of GitHub Pages, just update the server IP in Cloudflare. The rest of the setup is exactly the same 

---

## Step 3: Verify Domain Ownership (Domain verification is optional)
Open:

```text
GitHub
→ Settings
→ Pages (This is a global page (not a project-specific page)
```

Add your custom domain:

```text
shoyeb.asia
```


![[domain3.png]]

After adding the custom domain in GitHub Pages:

GitHub will provide a TXT record similar to:

![[domain4.png]]

Return to:

```text
GitHub
→ Settings
→ Pages
```

Click:

```text
Verify
```

If DNS propagation has completed, GitHub will verify ownership successfully.

---
---
# DNS Basics

## What is DNS?

DNS (Domain Name System) converts a domain name into an IP address.

Example:

```text
shoyeb.asia → 185.199.108.153
```

Instead of remembering IP addresses, users use domain names.

---

## How DNS Works

```text
Browser
  ↓
DNS Resolver
  ↓
Nameserver
  ↓
DNS Records
  ↓
Server
```

---

## Important Terms

### Domain

Website address.

Examples:

```text
google.com
github.com
shoyeb.asia
```

### TLD

Last part of a domain.

```text
.com
.org
.asia
.dev
```

### Subdomain

A child domain.

Examples:

```text
www.shoyeb.asia
blog.shoyeb.asia
api.shoyeb.asia
```

---

## Common DNS Records

### A Record

Points a domain to an IPv4 address.

```text
shoyeb.asia → 185.199.108.153
```

### AAAA Record

Points a domain to an IPv6 address.

```text
shoyeb.asia → 2606:50c0:8000::153
```

### CNAME Record

Makes one domain an alias of another.

```text
www.shoyeb.asia → mrtemp70.github.io
```

### TXT Record

Stores text information.

Used for:

- Domain verification
    
- SPF
    
- DKIM
    
- DMARC
    

### MX Record

Used for email delivery.

```text
yourdomain.com → Gmail / Outlook
```

Without MX records, emails won't be received.

### NS Record (Nameserver)

Tells the internet who manages DNS.

Example:

```text
abdullah.ns.cloudflare.com
lilyana.ns.cloudflare.com
```

When using Cloudflare, Cloudflare's nameservers manage all DNS records.

---

## Registrar

Where you buy a domain.

Examples:

- Namecheap
    
- Porkbun
    
- GoDaddy
    

Responsibilities:

- Buy domain
    
- Renew domain
    
- Change nameservers
    

---

## Hosting

Where your website runs.

Examples:

- GitHub Pages
    
- Vercel
    
- Netlify
    
- VPS
    

Hosting stores files. DNS points users to them.

---

## Cloudflare Proxy

Without Cloudflare:

```text
User → Server
```

With Cloudflare:

```text
User → Cloudflare → Server
```

Benefits:

- SSL
    
- CDN
    
- DDoS protection
    
- Caching
    

---

## CDN

Stores website content in multiple locations worldwide.

```text
User → Nearest Cloudflare Server
```

Makes websites load faster.

---

## SSL / HTTPS

Encrypts traffic between users and your website.

```text
http://example.com
```

↓

```text
https://example.com
```

---

## TTL

How long DNS records stay cached.

```text
TTL = 3600
```

Means:

```text
1 hour
```

---

## Root Domain

Main domain.

```text
shoyeb.asia
```

Also called:

- Apex Domain
    
- Naked Domain
    

---

## DNS Propagation

Time required for DNS changes to update globally.

Usually:

```text
5 minutes - 24 hours
```

---

## GitHub Pages + Cloudflare Flow

```text
Buy Domain
    ↓
Add Domain to Cloudflare
    ↓
Update Nameservers
    ↓
Add A/CNAME Records
    ↓
Add TXT Verification
    ↓
Configure GitHub Pages
    ↓
Verify Domain
    ↓
Website Live
```