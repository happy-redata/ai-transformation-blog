# Synopsis: Zero Trust for Dummies – Det Manifest-drevne Software-loop

**Titel:** Zero Trust for Dummies: Når Software selv har sit Pas med
**Tema:** Software Kontrol & Manifest-drevet udvikling
**Reference:** `zerotrust/apps/frontend/manifest.happymate.data.yaml`

---

## 1. Den Overordnede Idé (Elevator Pitch)
I den gamle verden stolede vi på software, fordi det var "indenfor murene" (på kontoret eller i en sikker zone). I en Zero Trust verden stoler vi på *ingenting*. Softwaren skal bevise hvem den er, og hvad den har lov til, hver eneste gang den rører en data-ressource. 

Vi forklarer dette gennem "Software Kontrol": Hvordan vi bruger en YAML-manifest til at definere softwarens univers. Det er ikke bare en passiv fil, men en aktiv instruktionsbog, som systemet bruger til at bygge og validere sig selv.

## 2. Nøglepunkter (The "Hooks")
*   **Fra "Open Access" til "Explicit Permission":** Hvorfor standardadgang er slut.
*   **Manifestet som Pas:** Ligesom du ikke rejser uden pas, kører vores software ikke uden en `manifest.happymate.data.yaml`.
*   **Automatisering af Tillid (The "Magic" Bit):** Vi har bygget et loop, hvor systemet sammenligner det gamle manifest med det nye (Diffing) og automatisk genererer de nødvendige ændringer (Migrations) i SharePoint.
*   **Identitet er den nye Firewall:** Softwaren (frontend'en) har sin egen identitet og får kun adgang til de ressourcer, manifestet eksplicit har "booket".
*   **Læring for alle (L100-L400):** Fra den hurtige installation (L100) til den dybe kode-review (L400) – Zero Trust er en rejse, ikke et mål.

## 3. Struktur i indlægget
1.  **Indledning:** "Hvorfor er mit software pludselig mistænkeliggjort?" – En introduktion til Zero Trust tankegangen.
2.  **Hvad er Software Kontrol?** En forklaring af, at vi ikke længere bare "sender koden afsted", men sender den afsted med en streng instruktionsbog.
3.  **Gennemgang af "Maskinrummet":** En pædagogisk forklaring af manifest-filen og vores `manifest-parser`:
    *   *SystemList*: Grundstenen hvor alt logges.
    *   *Manifest Diffing*: Hvordan AI og automatisering finder forskellene.
    *   *Migrations*: Hvordan vi ændrer reglerne undervejs uden at bryde tilliden.
4.  **Visualisering af flowet:** Brug af vores **ProcessFlow** (React Flow) til at vise hvordan Developer, Analyst og Admin arbejder sammen om sikkerheden.
5.  **Hvad betyder det for forretningen?** Mere sikkerhed, færre "ups"-oplevelser og fuld kontrol over data-flowet.
6.  **Afrunding:** Zero Trust er ikke besværligt – det er bare god orden.

## 4. Visualiseringer (Ideer til billedgenerering)
*   Et digitalt pas/visum der scannes af en AI-vagtmand.
*   En software-komponent der passer perfekt ind i en præcis udskåret form (manifestet).
*   En "blueprint" der automatisk folder sig ud til et færdigt hus.

---
**Status:** Klar til udkast  
**Ansvarlig:** Niels Gregers Johansen  
**Deadline:** Januar 2026
