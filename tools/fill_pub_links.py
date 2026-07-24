#!/usr/bin/env python3
import sys
import json
import urllib.parse
import urllib.request
from pathlib import Path
try:
    import yaml
except Exception:
    print('PyYAML missing; please run: pip install pyyaml requests', file=sys.stderr)
    sys.exit(2)
from difflib import SequenceMatcher

DATA = Path("_data/publications.yml")
if not DATA.exists():
    print('publications.yml not found', file=sys.stderr)
    sys.exit(1)

with DATA.open('r', encoding='utf-8') as f:
    pubs = yaml.safe_load(f)

changed = False

def similar(a,b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

for pub in pubs:
    links = pub.get('links')
    if links and len(links)>0:
        continue
    title = pub.get('title','')
    print('Searching for:', title)
    # Try arXiv API
    query = 'ti:"%s"' % title.replace('"','')
    url = 'http://export.arxiv.org/api/query?search_query=%s&start=0&max_results=5' % urllib.parse.quote(query)
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            data = resp.read().decode('utf-8')
        # crude check for title in entries
        if '<entry>' in data:
            # parse entries
            entries = data.split('<entry>')[1:]
            best = None; bestscore=0
            for e in entries:
                # extract title
                if '<title>' in e and '</title>' in e:
                    t = e.split('<title>')[1].split('</title>')[0].strip()
                    score = similar(title, t)
                    if score>bestscore:
                        bestscore=score; best=t; ent=e
            if bestscore>0.8:
                # get id link
                if '<id>' in ent and '</id>' in ent:
                    arxiv_id = ent.split('<id>')[1].split('</id>')[0].strip()
                    pub['links'] = [{'label':'arXiv','url':arxiv_id}]
                    changed = True
                    print('  -> Found arXiv:', arxiv_id)
                    continue
    except Exception as e:
        print('  arXiv search failed:', e)
    # Try CrossRef
    try:
        cr_url = 'https://api.crossref.org/works?query.title=%s&rows=5' % urllib.parse.quote(title)
        with urllib.request.urlopen(cr_url, timeout=10) as resp:
            cr = json.load(resp)
        items = cr.get('message',{}).get('items',[])
        best=None; bestscore=0
        for it in items:
            it_title = ' '.join(it.get('title',[]))
            score = similar(title, it_title)
            if score>bestscore:
                bestscore=score; best=it
        if best and bestscore>0.75:
            doi = best.get('DOI')
            if doi:
                doi_url = 'https://doi.org/' + doi
                pub['links'] = [{'label':'DOI','url':doi_url}]
                changed = True
                print('  -> Found DOI:', doi_url)
                continue
    except Exception as e:
        print('  CrossRef search failed:', e)
    print('  -> No link found')

if changed:
    with DATA.open('w', encoding='utf-8') as f:
        yaml.safe_dump(pubs, f, allow_unicode=True, sort_keys=False)
    print('Updated', DATA)
else:
    print('No changes')
