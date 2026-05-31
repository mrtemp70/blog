## Prerequisites

1. Log in to Cloudflare from your browser.
    
2. Open **PowerShell as Administrator**.
    

---

## Part 1: Create Cloudflared Folder

Create a folder on the `C:` drive:

```text
C:\cloudflared
```

Place the `cloudflared.exe` file inside this folder.
![[cloudflareTunnel1.png]]

![[cloudflareTunnel2.png]]

---

## Part 2: Create Configuration Folder

Navigate to:

```text
C:\Users\<your-username>\
```

Create a folder named:

```text
.cloudflared
```

![[cloudflareTunnel3.png]]

![[cloudflareTunnel4.png]]

![[cloudflareTunnel5.png]]

---

## Configuration File

Create a `config.yml` file inside `.cloudflared`.

```yaml
tunnel: my-tunnel
credentials-file: C:\Users\showy\.cloudflared\64c8b1c4-c6eb-4c84-8f9a-e22fa9d7b4d6.json

ingress:
  - hostname: test1.shoyeb.asia
    service: https://localhost:7111
  - service: http_status:404
```

### Configuration Details

- **Tunnel Name:** `my-tunnel`
    
- **Hostname:** `test1.shoyeb.asia`
    
- **Local Service:** `https://localhost:7111`
    
- **Fallback Route:** Returns HTTP 404 for unmatched requests
    

---

## Tunnel Commands

Run the following commands from the folder containing `cloudflared.exe`:

### Login to Cloudflare

```powershell
.\cloudflared tunnel login
```

### Create Tunnel

```powershell
.\cloudflared tunnel create my-tunnel
```

### Create DNS Route

```powershell
.\cloudflared tunnel route dns my-tunnel test1.shoyeb.asia
```

### Start Tunnel

```powershell
.\cloudflared tunnel run my-tunnel
```

---

## Verification

After the tunnel starts successfully:

1. Ensure your ASP.NET application is running on:
    
    ```text
    https://localhost:7111
    ```
    
2. Open:
    
    ```text
    https://test1.shoyeb.asia
    ```
    
3. Your local application should now be accessible through the Cloudflare Tunnel.