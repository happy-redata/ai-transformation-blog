# Provisioning and Deployment Plan for `happymates-blob`

This plan outlines the steps to replicate the robust CI/CD and Infrastructure setup from `help-mail-mate` to `happymates-blob`.

## 1. Prerequisites (Azure & GitHub)

Before generating the files, ensure the following are configured:

1.  **Service Principal Permissions**:
    *   The Service Principal used in `AZURE_CREDENTIALS` (GitHub Org Secret) must have:
        *   `Azure Kubernetes Service RBAC Cluster Admin` on the AKS Cluster (`aks-happy-mates-sweden1`).
        *   `Key Vault Secrets Officer` on the Key Vault (`kv-happy-mates-sweden1`).

2.  **Key Vault Secrets**:
    Ensure the following secrets exist in `kv-happy-mates-sweden1` (used by the app):
    *   `happy-mates-happymates-blob-AZURE-CLIENT-ID`
    *   `happy-mates-happymates-blob-AZURE-CLIENT-SECRET`
    *   `happy-mates-happymates-blob-AZURE-TENANT-ID`
    *   `happy-mates-happymates-blob-NEXT-PUBLIC-AZURE-CLIENT-ID`
    *   `happy-mates-happymates-blob-NEXT-PUBLIC-AZURE-TENANT-ID`
    *   `happy-mates-happymates-blob-SECRET-COOKIE-PASSWORD`
    *   `happy-mates-happymates-blob-BASE-URL`
    *   `happy-mates-happymates-blob-AZURE-SPEECH-KEY`
    *   `happy-mates-happymates-blob-AZURE-SPEECH-REGION`
    *   `happy-mates-happymates-blob-STRIPE-SECRET-KEY`
    *   `happy-mates-happymates-blob-NEXT-PUBLIC-STRIPE-PUBLISHABLE-KEY`
    *   `happy-mates-happymates-blob-STRIPE-WEBHOOK-SECRET`

## 2. GitHub Actions Workflows

We will create two workflows in `.github/workflows/`.

### A. Infrastructure Provisioning (`.github/workflows/provision.yml`)
**Goal**: Prepare the environment (Namespace, etc.) before deployment.

*   **Trigger**: `workflow_dispatch` (manual)
*   **Steps**:
    1.  **Azure Login** & **Kubelogin**.
    2.  **Set AKS Context**.
    3.  **Ensure Namespace Exists**: Create `happymates-blob` namespace if missing.
    4.  *(Optional)* **Provision Storage**: If the app requires a specific Azure Storage Container, add a step/script here to check/create it via Azure CLI.
    5.  *(Note)*: Unlike `help-mail-mate`, no Database provisioning is required (unless confirmed otherwise).

### B. Build and Deploy (`.github/workflows/deploy.yml`)
**Goal**: Build Docker image, Push to GHCR, and Deploy to AKS.

*   **Trigger**: Push to `main` or `workflow_dispatch`.
*   **Steps**:
    1.  **Build Docker Image**:
        *   Context: `.` (Root)
        *   Image: `ghcr.io/happy-mates/happymates-blob`
    2.  **Azure Login** & **Kubelogin**.
    3.  **Set AKS Context**.
    4.  **Deploy Application**:
        *   `kubectl apply -k k8s/`
        *   `kubectl set image deployment/happymates-blob happymates-blob=...:${{ github.sha }}`
        *   `kubectl rollout status`

## 3. Kubernetes Manifests (`k8s/`)

Create the `k8s/` directory with the following files:

### `k8s/namespace.yaml`
Warning: Standard namespace definition.
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: happymates-blob
```

### `k8s/deployment.yaml`
*   **Replicas**: 1
*   **Image**: `ghcr.io/happy-mates/happymates-blob:latest`
*   **Port**: 3000 (Next.js default)
*   **Env**: Use `secretRef` pointing to `happymates-blob-secrets` (Ensure all variables below are mapped).
*   **Volumes**: Mount `secrets-store-inline` using CSI driver.

### `k8s/service.yaml`
*   **Type**: ClusterIP
*   **Port**: 80 -> Target 3000

### `k8s/ingress.yaml`
*   **Host**: `blob.happymates.dk` (or appropriate subdomain).
*   **TLS**: Cert-manager issuer (e.g., `letsencrypt-prod`).
*   **Backend**: `happymates-blob` service on port 80.

### `k8s/secrets.yaml`
*   **Kind**: `SecretProviderClass`
*   **Name**: `happymates-blob-keyvault`
*   **Mapping**: Map ALL the following Key Vault secrets to Kubernetes environment variables:
    *   `AZURE_CLIENT_ID`
    *   `AZURE_CLIENT_SECRET`
    *   `AZURE_TENANT_ID`
    *   `NEXT_PUBLIC_AZURE_CLIENT_ID`
    *   `NEXT_PUBLIC_AZURE_TENANT_ID`
    *   `SECRET_COOKIE_PASSWORD`
    *   `BASE_URL`
    *   `AZURE_SPEECH_KEY`
    *   `AZURE_SPEECH_REGION`
    *   `STRIPE_SECRET_KEY`
    *   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
    *   `STRIPE_WEBHOOK_SECRET`

### `k8s/kustomization.yaml`
*   List all the above resources.

## 4. Implementation Steps

1.  **Create Directory**: `mkdir -p .github/workflows k8s`
2.  **Create Workflows**:
    *   Copy `help-mail-mate/.github/workflows/deploy.yml` -> `happymates-blob/.github/workflows/deploy.yml` and modify.
    *   Copy `help-mail-mate/.github/workflows/provision.yml` -> `happymates-blob/.github/workflows/provision.yml` and simplify (remove DB parts).
3.  **Create K8s Manifests**: Retrieve templates from `help-mail-mate/k8s/*.yaml` and adapt.
4.  **Verify Secrets**: Ensure Key Vault has the expected secrets.
5.  **Run Provisioning**: Execute `provision.yml`.
6.  **Run Deployment**: Execute `deploy.yml`.