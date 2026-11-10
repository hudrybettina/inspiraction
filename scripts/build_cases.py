"""Lit la base Grist et écrit site/data/cases.js pour la cartographie.

Identifiants : variables d'environnement GRIST_DOC_ID et GRIST_API_KEY
(secrets GitHub), ou à défaut un fichier .env passé en argument
(GRIST_KEY = identifiant du document, GRIST_API_KEY = clé API).

Colonnes lues dans Liste_des_cas_regen (par identifiant Grist) :
Nom_du_cas, Secteur_d_activite, Taille, Pays, Site_internet, Description,
Source (référence vers Sources_cles). Les autres colonnes sont ignorées.
Si une de ces colonnes disparaît ou est renommée, le script s'arrête en
erreur : le site garde alors sa version précédente.
"""
import datetime, json, os, re, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVER = 'https://grist.numerique.gouv.fr/o/docs'
REQUIRED = ['Nom_du_cas', 'Secteur_d_activite', 'Taille', 'Pays', 'Site_internet', 'Description', 'Source']
ALIASES = {'USA': 'États-Unis'}
MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août',
          'septembre', 'octobre', 'novembre', 'décembre']


def credentials():
    doc, key = os.environ.get('GRIST_DOC_ID'), os.environ.get('GRIST_API_KEY')
    if (not doc or not key) and len(sys.argv) > 1:
        vals = {}
        for line in open(sys.argv[1], encoding='utf-8'):
            if '=' in line:
                k, v = line.strip().split('=', 1)
                vals[k.strip()] = v.strip()
        doc = doc or vals.get('GRIST_DOC_ID') or vals.get('GRIST_KEY')
        key = key or vals.get('GRIST_API_KEY')
    if not doc or not key:
        sys.exit('Identifiants Grist manquants (GRIST_DOC_ID / GRIST_API_KEY).')
    return doc, key


def main():
    doc, key = credentials()
    base = f'{SERVER}/api/docs/{doc}'

    def get(path):
        req = urllib.request.Request(base + path, headers={'Authorization': 'Bearer ' + key})
        return json.load(urllib.request.urlopen(req, timeout=60))

    cols = {c['id'] for c in get('/tables/Liste_des_cas_regen/columns')['columns']}
    missing = [c for c in REQUIRED if c not in cols]
    if missing:
        sys.exit('Colonnes manquantes dans Grist : ' + ', '.join(missing))

    sources = {r['id']: (r['fields'].get('Sources_documentaires_et_bibliographiques') or '').strip()
               for r in get('/tables/Sources_cles/records')['records']}

    def as_list(v):
        if isinstance(v, list):
            return [x for x in (v[1:] if v and v[0] == 'L' else v) if x not in (None, '')]
        return [v] if v not in (None, '') else []

    cases = []
    for rec in get('/tables/Liste_des_cas_regen/records')['records']:
        f = rec['fields']
        name = (f.get('Nom_du_cas') or '').strip()
        if not name:
            continue
        countries = []
        for p in as_list(f.get('Pays')):
            for part in str(p).split('&'):
                part = ALIASES.get(part.strip(), part.strip())
                if part and part not in countries:
                    countries.append(part)
        cases.append({
            'n': name,
            's': [str(x) for x in as_list(f.get('Secteur_d_activite'))],
            't': [str(x) for x in as_list(f.get('Taille'))],
            'p': countries,
            'w': (f.get('Site_internet') or '').strip(),
            'x': (f.get('Description') or '').strip(),
            'o': [sources[i].replace('Lumiå', 'LUMIÅ') for i in as_list(f.get('Source')) if sources.get(i)],
        })

    # Pays absents du fond de carte : avertissement (le cas reste visible dans la liste)
    world = open(os.path.join(ROOT, 'site', 'data', 'world.js'), encoding='utf-8').read()
    known = set(json.loads(re.search(r'"nameToA2":(\{.*?\})', world).group(1)))
    unknown = sorted({p for c in cases for p in c['p']} - known)
    if unknown:
        print('::warning::Pays absents de la carte : ' + ', '.join(unknown))

    today = datetime.date.today()
    updated = f'{today.day} {MONTHS[today.month - 1]} {today.year}'
    out = os.path.join(ROOT, 'site', 'data', 'cases.js')
    with open(out, 'w', encoding='utf-8') as fh:
        fh.write('window.GRIST_UPDATED=' + json.dumps(updated, ensure_ascii=False) + ';\n')
        fh.write('window.GRIST_CASES=' + json.dumps(cases, ensure_ascii=False).replace('</', '<\\/') + ';\n')
    print(f'{len(cases)} cas écrits dans site/data/cases.js ({updated})')


if __name__ == '__main__':
    main()
