# Inspiraction — Cartographie des cas régénératifs

Site : https://hudrybettina.github.io/inspiraction/

Cartographie des entreprises et territoires à visée régénérative, repérés par des experts sources.
Les données viennent de la base Grist (grist.numerique.gouv.fr) et sont mises à jour automatiquement.

## Mettre à jour le site
- **Automatique** : chaque nuit, GitHub lit Grist et republie le site.
- **Tout de suite** : onglet **Actions** → « Mise à jour depuis Grist et publication » → **Run workflow**.

Si la mise à jour échoue (par exemple une colonne renommée dans Grist), le site garde sa version
précédente et GitHub envoie un e-mail.

## Colonnes Grist utilisées (table `Liste_des_cas_regen`)
`Nom_du_cas`, `Secteur_d_activite`, `Taille`, `Pays`, `Site_internet`, `Description`, `Source`.
Les autres colonnes sont ignorées. Ne pas renommer ou supprimer ces sept colonnes sans adapter
`scripts/build_cases.py`.

## Organisation
- `site/` : le site publié (`index.html`, `style.css`, `app.js`, `img/`, `data/`)
- `site/data/cases.js` : généré depuis Grist, ne pas modifier à la main
- `site/data/world.js` : fond de carte (une centaine de pays)
- `scripts/build_cases.py` : lecture de Grist
- `.github/workflows/update-and-deploy.yml` : mise à jour et publication automatiques

## Secrets nécessaires (Settings → Secrets and variables → Actions)
- `GRIST_DOC_ID` : identifiant du document Grist
- `GRIST_API_KEY` : clé API Grist
