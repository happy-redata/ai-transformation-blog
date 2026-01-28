
## Azure Resources

subscription: USD5000
Subscription ID: 742e217b-f6e1-4094-9792-49b71fde2e02
aks cluster: aks-happy-mates-sweden1
Resource group: rg-happy-mates-sweden1
Postgres: db-sweden-1
Key Vault: kv-happy-mates-sweden1


## Caddy Ingress

The AKS cluster uses [Caddy](https://caddyserver.com/) as the ingress controller. Caddy provides:

- **Automatic HTTPS** - TLS certificates are automatically provisioned via Let's Encrypt
- **Reverse proxy** - Routes external traffic to internal services
- **Simple configuration** - Uses Caddyfile syntax for easy routing setup

### Deployment

Caddy is deployed as a Kubernetes Deployment with a LoadBalancer Service:

```bash
# Check Caddy deployment status
kubectl get deployments -n caddy-system

# Check Caddy service and external IP
kubectl get svc -n caddy-system
```

### Ingress Configuration

Services are exposed by adding entries to the Caddy ConfigMap:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: caddy-config
  namespace: caddy-system
data:
  Caddyfile: |
    {
      email admin@example.com
    }

    example.com {
      reverse_proxy my-service.default.svc.cluster.local:80
    }
```

After updating the ConfigMap, reload Caddy:

```bash
kubectl rollout restart deployment/caddy -n caddy-system
```

## keyvault usage

store value in keyvault using <orgname>_<reponame>_<keyname>

example: happy-mates-chef_aks-happy-mates-sweden1_client-id


## Service Principal Setup Plan

Goal: Create a Service Principal (SP) in Entra ID to allow GitHub Actions to deploy to AKS, and store the credentials at the GitHub Organization level.

### 1. Variables

```bash
# Configuration
SUBSCRIPTION_ID="742e217b-f6e1-4094-9792-49b71fde2e02"
RESOURCE_GROUP="rg-happy-mates-sweden1"
AKS_CLUSTER="aks-happy-mates-sweden1"
ORG_NAME="happy-mates"
SP_NAME="sp-github-aks-deploy"
```

### 2. Login and Set Subscription

```bash
az login
az account set --subscription $SUBSCRIPTION_ID
```

### 3. Create Service Principal

Create an SP with `Contributor` role on the Resource Group scope. This allows the SP to manage resources in the group, including pulling credentials for the AKS cluster.

```bash
# Create SP and capture JSON output
# Note: --sdk-auth is deprecated but often used for 'AZURE_CREDENTIALS'. 
# For newer azure/login actions, standard JSON is preferred.
AZURE_CREDENTIALS=$(az ad sp create-for-rbac \
  --name $SP_NAME \
  --role Contributor \
  --scopes /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP \
  --json-auth)

echo $AZURE_CREDENTIALS
```

### 4. Store Credentials in GitHub Organization Secrets

Use the GitHub CLI (`gh`) to store the secret at the organization level.

```bash
# Ensure you are logged in to gh
# gh auth login

# Set the secret in the organization
echo "$AZURE_CREDENTIALS" | gh secret set AZURE_CREDENTIALS --org $ORG_NAME --visibility all
```

### 5. Validate

Action workflow usage example:

```yaml
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
          
      - name: Set AKS Context
        uses: azure/aks-set-context@v3
        with:
          resource-group: 'rg-happy-mates-sweden1'
          cluster-name: 'aks-happy-mates-sweden1'
          
      - name: Verify Access
        run: kubectl get nodes
```
