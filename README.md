# Drivepool — Landing Page

## Déploiement en 5 minutes

### 1. Crée un repo GitHub

Va sur github.com/new, crée un repo (ex: `drivepool-landing`), puis :

```bash
cd drivepool-site
git init
git add .
git commit -m "Landing page Drivepool"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/drivepool-landing.git
git push -u origin main
```

### 2. Déploie sur Netlify

1. Va sur [netlify.com](https://netlify.com) → Sign up avec ton compte GitHub
2. Clique "Add new site" → "Import an existing project"
3. Connecte ton repo `drivepool-landing`
4. Build command : **`npm run build`**
5. Publish directory : **`dist`**
6. Clique "Deploy site"
7. C'est en ligne en ~60 secondes

### 3. Connecte ton domaine drivepool.eu

1. Dans Netlify → Domain settings → Add custom domain
2. Ajoute `drivepool.eu`
3. Netlify te donne des DNS à configurer chez ton registrar
4. HTTPS est automatique

### 4. Configure le formulaire

Ouvre `src/App.jsx` et cherche la ligne :

```js
const FORM_ENDPOINT = "";  // ← À remplir
```

**Option A — Formspree (le plus simple, 50 soumissions/mois gratuit)**
1. Va sur [formspree.io](https://formspree.io) → Crée un compte
2. Crée un nouveau formulaire
3. Copie l'endpoint (ex: `https://formspree.io/f/xABcdEfG`)
4. Colle-le dans FORM_ENDPOINT

**Option B — Make.com → Airtable (ta stack)**
1. Crée un scénario Make.com avec un trigger "Webhook"
2. Copie l'URL du webhook
3. Colle-la dans FORM_ENDPOINT
4. Configure Make pour envoyer les données vers ta table Airtable "Candidatures Fondateurs"

**Option C — Web3Forms (gratuit, illimité)**
1. Va sur [web3forms.com](https://web3forms.com)
2. Récupère un access key
3. Utilise `https://api.web3forms.com/submit` comme endpoint
4. Ajoute `access_key: "TON_KEY"` dans le body du fetch (modifie handleSubmit)

### 5. Modifier les textes

Tout est dans `src/App.jsx` :
- `SPOTS_TOTAL` et `SPOTS_TAKEN` : pour le compteur de places
- Les textes sont en clair dans le JSX, cherche et remplace

### 6. Mettre à jour

Après chaque modif :
```bash
git add .
git commit -m "mise à jour"
git push
```
Netlify redéploie automatiquement.

---

## Stack

- **Vite** + **React** — léger, rapide
- **Plus Jakarta Sans** — Google Fonts
- **Zéro dépendance** externe (pas de Tailwind, pas de UI lib)
- Hébergement **Netlify** gratuit avec SSL automatique
