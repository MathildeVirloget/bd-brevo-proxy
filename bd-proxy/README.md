# bd-brevo-proxy

Proxy Netlify pour contourner le CORS entre le générateur de newsletters et l'API Brevo.

## Déploiement (5 min)

1. Crée un repo GitHub avec ces fichiers
2. Va sur netlify.com → "Add new site" → "Import an existing project" → sélectionne ton repo
3. Dans Site settings → Environment variables, ajoute : `BREVO_API_KEY` = ta clé API Brevo
4. Déploie — Netlify te donne une URL type `https://ton-site.netlify.app`

## Endpoints disponibles

- `POST /.netlify/functions/brevo-upload` — upload une image vers Brevo
  Body JSON : `{ "file": "<base64>", "filename": "banniere.jpg", "name": "banniere-antilles", "contentType": "image/jpeg" }`
  Retourne : `{ "fileUrl": "https://img.mailinblue.com/..." }`

- `GET /.netlify/functions/brevo-images` — liste les 50 dernières images de ta bibliothèque
  Retourne : `{ "list": [{ "name": "...", "fileUrl": "...", "createdAt": "..." }] }`

## Utilisation dans le générateur

Renseigne l'URL de ton proxy dans le champ dédié du générateur :
`https://ton-site.netlify.app`
