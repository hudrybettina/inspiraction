// Traductions de l'interface (français = langue d'origine, anglais, espagnol).
// Les valeurs venant de Grist (secteurs, tailles, pays) gardent leur libellé français
// comme identifiant ; seules leur présentation est traduite ici.
// Les descriptions des cas restent dans la langue saisie dans Grist.
(function(){
const LANGS = ['fr','en','es'];
const saved = (()=>{ try{ return localStorage.getItem('lang'); }catch{ return null; } })();
const fromUrl = new URLSearchParams(location.search).get('lang');
const fromNav = (navigator.languages||[navigator.language||'']).map(l=>l.slice(0,2).toLowerCase()).find(l=>LANGS.includes(l));
const LANG = [fromUrl, saved, fromNav, 'fr'].find(l=>LANGS.includes(l));
document.documentElement.lang = LANG;

const S = {
en:{
  title:"Inspir'Action: Mapping regenerative cases",
  metaDesc:"A map of companies and territories with a regenerative purpose, identified by expert sources.",
  eyebrow:"Regen database: Inspir'Action",
  h1:"Mapping regenerative cases",
  lede:"Companies and territories committed to regenerating life, gathered from several documentary sources. Explore by country on the map, filter by sector, size or country, and open each card to learn more.",
  topcta:"A case is missing? Contact us",
  tabMap:"Map & cases", tabExperts:"Expert sources", tabTeam:"The team",
  beta:"Preview version: this site is still under construction and has not been officially launched yet. Content and figures may change.",
  teamWho:"Who are we?",
  teamOneline:"All three of us are alumni of Isabelle Delannoy's “symbiotic economy” programme at CNAM, and we share the drive to:",
  team1:"Shine a light on all the pioneering companies moving along a regenerative path, to inspire other organisations facing similar challenges",
  team2:"Show that by thinking differently, a company can create just as much value and secure its long-term future in the face of coming environmental and social shocks",
  team3:"Pool the identification work already carried out by various experts into a single commons",
  teamCore:"The core team", teamVol:"Volunteers", teamFund:"Our financial backers", teamPart:"Our partners",
  soonHere:"Coming soon", volPh:"Photo · name · LinkedIn", why:"A sentence on why they support the project", logo:"Logo",
  filters:"Filters", search:"Search for a case, a keyword…",
  mapAria:"World map of the number of cases per country", zoomIn:"Zoom in", zoomOut:"Zoom out",
  mapHint:"Click a country to filter · scroll to zoom",
  ftoggle:"☰ Filters", propose:"+ Suggest a case", sort:"Sort",
  sortAz:"Name (A → Z)", sortPays:"Country", sortSecteur:"Sector",
  prev:"Previous case", next:"Next case", close:"Close",
  fSector:"Sector", fSize:"Size", fCountry:"Country", fExpert:"Expert source",
  gCompanies:"Companies", gTerritories:"Territories",
  clear:"clear", less:"Show less", seeAll:n=>`Show all ${n}`,
  removeFilter:"Remove this filter", clearAll:"Clear all",
  nCases:n=>`${n} case${n>1?'s':''}`, outOf:n=>` of ${n}`,
  noMatch:"No case matches these criteria.",
  more:n=>`Show more (${n} remaining)`, source:"Source: ",
  territory:"Territory",
  zones:['World','Europe','France','Americas'],
  legend:"Number of cases per country",
  discover:"Discover this expert →", visit:"Visit the website ↗", noSite:"No website listed in the database.",
  noDesc:"No description available.", descLang:"Description in French",
  identifiedOne:"Identified by our expert source", identifiedMany:"Identified by our expert sources",
  noSource:"Source not provided.",
  stCases:" cases", stCountries:" countries", stSectors:" sectors", stCompanies:" companies · ", stTerr:" territories",
  foot:d=>`Data: Regen database (Grist)${d?', updated '+d:''}. Cases are located at country level. Expert profiles written from their publications and public information.`,
  pIntro:n=>`This map exists thanks to the work of ${n} expert sources: researchers, authors, networks and communities who identify and document regenerative initiatives. Find out who they are and the sources the cases come from.`,
  whoAre:"Who are they? →", soonTitle:"More sources to come",
  soonText:"The map grows as other experts share their work. Know a source we should include?", contact:"Contact us ↗",
  back:"← All experts", related:"Related sources", soonCases:"Cases from this source will be added to the map soon.",
  seeCases:"See cases from this source →", liProfile:"LinkedIn profile",
},
es:{
  title:"Inspir'Action: La cartografía de casos regenerativos",
  metaDesc:"Cartografía de empresas y territorios con vocación regenerativa, identificados por expertos fuente.",
  eyebrow:"Base de datos Regen: Inspir'Action",
  h1:"La cartografía de casos regenerativos",
  lede:"Empresas y territorios comprometidos con la regeneración de lo vivo, recopilados a partir de varias fuentes documentales. Explore por país en el mapa, filtre por sector, tamaño o país, y abra cada ficha para saber más.",
  topcta:"¿Falta un caso? Contáctenos",
  tabMap:"Cartografía y casos", tabExperts:"Expertos fuente", tabTeam:"El equipo",
  beta:"Versión preliminar: este sitio está en construcción y aún no se ha lanzado oficialmente. Los contenidos y las cifras pueden cambiar.",
  teamWho:"¿Quiénes somos?",
  teamOneline:"Los tres somos antiguos alumnos de la formación «economía simbiótica» de Isabelle Delannoy en el CNAM, y nos mueve el deseo de:",
  team1:"Dar visibilidad a todas las empresas pioneras que avanzan hacia una trayectoria regenerativa, para inspirar a otras organizaciones con retos similares",
  team2:"Demostrar que, pensando de otra manera, se puede crear el mismo valor para la empresa y asegurar su continuidad frente a los choques ambientales y sociales que se avecinan",
  team3:"Reunir en un único bien común los trabajos de identificación ya realizados por distintos expertos",
  teamCore:"El equipo principal", teamVol:"Los voluntarios", teamFund:"Nuestros apoyos financieros", teamPart:"Nuestros socios",
  soonHere:"Próximamente", volPh:"Foto · nombre · LinkedIn", why:"Una frase sobre sus motivos para apoyar el proyecto", logo:"Logo",
  filters:"Filtros", search:"Buscar un caso, una palabra clave…",
  mapAria:"Mapa del mundo con el número de casos por país", zoomIn:"Acercar", zoomOut:"Alejar",
  mapHint:"Haga clic en un país para filtrar · rueda para hacer zoom",
  ftoggle:"☰ Filtros", propose:"+ Proponer un caso", sort:"Ordenar",
  sortAz:"Nombre (A → Z)", sortPays:"País", sortSecteur:"Sector",
  prev:"Caso anterior", next:"Caso siguiente", close:"Cerrar",
  fSector:"Sector de actividad", fSize:"Tamaño", fCountry:"País", fExpert:"Experto fuente",
  gCompanies:"Empresas", gTerritories:"Territorios",
  clear:"borrar", less:"Ver menos", seeAll:n=>`Ver los ${n}`,
  removeFilter:"Quitar este filtro", clearAll:"Borrar todo",
  nCases:n=>`${n} caso${n>1?'s':''}`, outOf:n=>` de ${n}`,
  noMatch:"Ningún caso corresponde a estos criterios.",
  more:n=>`Mostrar más (quedan ${n})`, source:"Fuente: ",
  territory:"Territorio",
  zones:['Mundo','Europa','Francia','Américas'],
  legend:"Número de casos por país",
  discover:"Conocer a este experto →", visit:"Visitar el sitio ↗", noSite:"No hay sitio web en la base.",
  noDesc:"Sin descripción.", descLang:"Descripción en francés",
  identifiedOne:"Identificado por nuestro experto fuente", identifiedMany:"Identificado por nuestros expertos fuente",
  noSource:"Fuente no indicada.",
  stCases:" casos", stCountries:" países", stSectors:" sectores", stCompanies:" empresas · ", stTerr:" territorios",
  foot:d=>`Datos: base Regen (Grist)${d?', actualizada el '+d:''}. Los casos se sitúan a escala de país. Presentaciones de los expertos redactadas a partir de sus publicaciones e información pública.`,
  pIntro:n=>`Esta cartografía existe gracias al trabajo de ${n} expertos fuente: investigadores, autores, redes y comunidades que identifican y documentan iniciativas regenerativas. Descubra quiénes son y las fuentes de las que proceden los casos.`,
  whoAre:"¿Quiénes son? →", soonTitle:"Más fuentes próximamente",
  soonText:"La cartografía se enriquece con el trabajo de otros expertos. ¿Conoce una fuente que deberíamos incluir?", contact:"Contáctenos ↗",
  back:"← Todos los expertos", related:"Fuentes asociadas", soonCases:"Los casos de esta fuente se incorporarán pronto a la cartografía.",
  seeCases:"Ver los casos de esta fuente →", liProfile:"Perfil de LinkedIn",
},
fr:{
  beta:"Version de travail : ce site est en construction et n'a pas encore été lancé officiellement. Les contenus et les chiffres peuvent évoluer.",
  fSector:"Secteur d'activité", fSize:'Taille', fCountry:'Pays', fExpert:'Expert source',
  gCompanies:'Entreprises', gTerritories:'Territoires',
  clear:'effacer', less:'Voir moins', seeAll:n=>`Voir les ${n}`,
  removeFilter:'Retirer ce filtre', clearAll:'Tout effacer',
  nCases:n=>`${n} cas`, outOf:n=>` sur ${n}`,
  noMatch:'Aucun cas ne correspond à ces critères.',
  more:n=>`Afficher plus (${n} restants)`, source:'Source : ',
  territory:'Territoire',
  zones:['Monde','Europe','France','Amériques'],
  legend:'Nombre de cas par pays',
  discover:'Découvrir cet expert →', visit:'Visiter le site ↗', noSite:'Aucun site renseigné dans la base.',
  noDesc:'Pas de description renseignée.', descLang:'',
  identifiedOne:'Identifié par notre expert source', identifiedMany:'Identifié par nos experts sources',
  noSource:'Source non renseignée.',
  stCases:' cas', stCountries:' pays', stSectors:' secteurs', stCompanies:' entreprises · ', stTerr:' territoires',
  foot:d=>`Données : base Regen (Grist)${d?', mise à jour du '+d:''}. Les cas sont localisés à l'échelle du pays. Présentations des experts rédigées à partir de leurs publications et informations publiques.`,
  pIntro:n=>`Cette cartographie existe grâce aux travaux de ${n} experts sources : chercheurs, auteurs, réseaux et communautés qui repèrent et documentent les initiatives régénératives. Découvrez qui ils sont et les sources dont sont issus les cas.`,
  whoAre:'Qui sont-ils ? →', soonTitle:"D'autres sources à venir",
  soonText:"La cartographie s'enrichit au fil des travaux d'autres experts. Vous connaissez une source à intégrer ?", contact:'Contactez-nous ↗',
  back:'← Tous les experts', related:'Sources associées', soonCases:'Les cas issus de cette source arrivent bientôt dans la cartographie.',
  seeCases:'Voir les cas issus de cette source →', liProfile:'Profil LinkedIn',
},
};

const SECTORS = {
  'Alimentation & Agriculture':['Food & Agriculture','Alimentación y agricultura'],
  'Bâtiment, Immobilier & Construction':['Buildings, Real Estate & Construction','Edificación, inmobiliario y construcción'],
  'Circularité & Seconde main':['Circularity & Second-hand','Circularidad y segunda mano'],
  'Commerce & Biens de consommation':['Retail & Consumer Goods','Comercio y bienes de consumo'],
  'Cosmétique, Santé & Bien-être':['Cosmetics, Health & Wellbeing','Cosmética, salud y bienestar'],
  'ESS & Associations':['Social Economy & Non-profits','Economía social y asociaciones'],
  'Finance & Investissement':['Finance & Investment','Finanzas e inversión'],
  'Industrie & Équipements':['Industry & Equipment','Industria y equipamiento'],
  'Mode, Textile & Matériaux':['Fashion, Textiles & Materials','Moda, textil y materiales'],
  'Restauration de la Nature & Biomimétisme':['Nature Restoration & Biomimicry','Restauración de la naturaleza y biomímesis'],
  'Services, Conseil & Éducation':['Services, Consulting & Education','Servicios, consultoría y educación'],
  'Technologie & Numérique':['Technology & Digital','Tecnología y digital'],
  'Territoire & Collectivités':['Territories & Local Authorities','Territorios y entidades locales'],
  'Tourisme, Culture & Médias':['Tourism, Culture & Media','Turismo, cultura y medios'],
  'Énergie & Mobilité':['Energy & Mobility','Energía y movilidad'],
};
const SIZES = {
  'TPE / PME':['Micro, small & medium enterprise','Micro, pequeña y mediana empresa'],
  'ETI':['Mid-sized company','Empresa mediana'],
  'Grand groupe':['Large group','Gran grupo'],
  'Territoire - Petite échelle (< 100k hab.)':['Territory - Small scale (< 100k inhab.)','Territorio - Pequeña escala (< 100k hab.)'],
  'Territoire - Moyenne échelle (100k - 500k hab.)':['Territory - Medium scale (100k - 500k inhab.)','Territorio - Escala media (100k - 500k hab.)'],
  'Territoire - Grande échelle (> 500k hab.)':['Territory - Large scale (> 500k inhab.)','Territorio - Gran escala (> 500k hab.)'],
};

// Experts sources : type, nom, présentation, faits clés, libellé du lien
const PARTNERS_I18N = {
  nsv:{
    en:{type:'Award & network', short:'Regeneration Laurels', name:'Nous Sommes Vivants — Regeneration Laurels',
      desc:"Nous Sommes Vivants is a non-profit that brings together a network of consultants supporting companies and local authorities towards the regeneration of life, humans included. Every year, its Regeneration Laurels, an award followed by an event, honour organisations that have launched products or services that regenerate nature and life while remaining economically viable."},
    es:{type:'Premio y red', short:'Laureles de la Regeneración', name:'Nous Sommes Vivants — Laureles de la Regeneración',
      desc:"Nous Sommes Vivants es una asociación que reúne a una red de consultores que acompañan a empresas y entidades locales hacia la regeneración de lo vivo, incluidos los seres humanos. Cada año, sus Laureles de la Regeneración, un concurso seguido de un evento, distinguen a organizaciones que han lanzado productos o servicios que regeneran la naturaleza y lo vivo sin dejar de ser económicamente viables."}},
  lumia:{
    en:{type:'Action-research centre', name:'LUMIÅ — Action research on the regenerative economy',
      desc:"LUMIÅ is an action-research and training centre dedicated to transforming organisations towards the regenerative economy, founded and led by Christophe Sempels. A partner of the CEC, it authored the reference study “The company with a regenerative purpose” and its eleven principles, followed by guides on regenerative urban planning and tourism."},
    es:{type:'Centro de investigación-acción', name:'LUMIÅ — Investigación-acción sobre la economía regenerativa',
      desc:"LUMIÅ es un centro de investigación-acción y formación dedicado a la transformación de las organizaciones hacia la economía regenerativa, fundado y dirigido por Christophe Sempels. Socio de la CEC, es autor del estudio de referencia «La empresa con vocación regenerativa» y de sus once principios, y después de guías sobre urbanismo y turismo regenerativos."}},
  regen:{
    en:{type:'Consulting community', name:'Conseil REGEN — Observatory commons',
      desc:"Conseil REGEN is the community of regenerative consulting. Hosted by Syntec Conseil, it brings together more than 30 firms that went through the CEC Consulting programme of the Convention des Entreprises pour le Climat in 2023. Most of the cases shared as commons by its observatory refer to the roadmaps published by companies that completed a CEC programme.",
      facts:["The CEC is a public-interest non-profit whose purpose is to make the shift to a regenerative economy irresistible by 2030"], link:'CEC roadmaps'},
    es:{type:'Comunidad de consultoría', name:'Conseil REGEN — Bienes comunes del observatorio',
      desc:"Conseil REGEN es la comunidad de la consultoría con vocación regenerativa. Acogida por Syntec Conseil, reúne a más de 30 consultoras que en 2023 siguieron el programa CEC Consulting de la Convention des Entreprises pour le Climat. La mayoría de los casos que su observatorio comparte como bienes comunes remiten a las hojas de ruta publicadas por las empresas que siguieron un programa de la CEC.",
      facts:["La CEC es una asociación de interés general cuya razón de ser es hacer irresistible el paso a una economía regenerativa de aquí a 2030"], link:'Hojas de ruta CEC'}},
  deal:{
    en:{type:'International lab',
      desc:"Founded in 2019 around economist Kate Raworth, DEAL helps cities, businesses and communities put “Doughnut Economics” into practice: thriving within a safe and just space, between a social foundation and an ecological ceiling. Its case studies cover, on the one hand, territories (cities, regions, parks) inspired by it, and on the other, businesses seen through the lens of “Doughnut Design for Business”.",
      facts:["DEAL does not certify or label the companies it studies: its cases are inspiring examples"]},
    es:{type:'Laboratorio internacional',
      desc:"Fundado en 2019 en torno a la economista Kate Raworth, el DEAL ayuda a ciudades, empresas y comunidades a poner en práctica la «economía rosquilla»: prosperar en un espacio seguro y justo, entre un suelo social y un techo ecológico. Sus estudios de caso tratan, por un lado, de territorios (ciudades, regiones, parques) que se inspiran en ella y, por otro, de empresas analizadas a través del «Doughnut Design for Business».",
      facts:["El DEAL no certifica ni etiqueta a las empresas que estudia: sus casos son ejemplos inspiradores"]}},
  bpi:{
    en:{type:'Case studies', name:'Bpifrance Le Lab × CEC × LUMIÅ — Case studies',
      desc:"A series of case studies by Bpifrance Le Lab on companies aiming for a regenerative model after taking part in the Convention des Entreprises pour le Climat. Each company is analysed using a five-dimension framework developed with the CEC and LUMIÅ.",
      facts:["Companies analysed: SMEs and mid-sized companies whose leaders aim for a regenerative model by 2035"]},
    es:{type:'Estudios de caso', name:'Bpifrance Le Lab × CEC × LUMIÅ — Estudios de caso',
      desc:"Serie de estudios de caso de Bpifrance Le Lab dedicada a empresas que aspiran a un modelo regenerativo tras su paso por la Convention des Entreprises pour le Climat. Cada empresa se analiza según una matriz de cinco dimensiones, elaborada con la CEC y LUMIÅ.",
      facts:["Empresas analizadas: pymes y empresas medianas cuyos directivos aspiran a un modelo regenerativo para 2035"]}},
  hec:{
    en:{type:'White paper',
      desc:"White paper published in 2025 by Laurence Lehmann-Ortega, professor of strategy at HEC Paris, and Sarah Dubreil, founder of circl.earth. Drawing on 39 pioneering organisations, it sets out seven attributes of regenerative maturity and seven archetypes of regenerative businesses.",
      facts:["Examples of archetypes: regenerative supplier network, regenerative site, catalyst of collective capacity"], link:'HEC Paris overview'},
    es:{type:'Libro blanco',
      desc:"Libro blanco publicado en 2025 por Laurence Lehmann-Ortega, profesora de estrategia en HEC Paris, y Sarah Dubreil, fundadora de circl.earth. A partir de 39 organizaciones pioneras, propone siete atributos de madurez regenerativa y siete arquetipos de empresas regenerativas.",
      facts:["Ejemplos de arquetipos: red de proveedores regenerativa, sitio regenerativo, catalizador de capacidad colectiva"], link:'Presentación HEC Paris'}},
  symbiotique:{
    en:{type:'Consulting & training', name:"L'Entreprise Symbiotique — Regenerative economy engineering",
      desc:"L'Entreprise Symbiotique supports companies and territories towards regenerative models, from strategy to implementation: audits, training, pilot projects and monitoring tools. It builds on the theory of the symbiotic economy developed by Isabelle Delannoy, which serves as scientific foundation, framework for action and method, and its mission is to show, through documented and inspiring examples, that the regenerative economy can replace the extractive model.",
      facts:["Its founders bring more than 15 years of experience, in France and worldwide","Co-led the AFNOR specification on the regenerative economy"]},
    es:{type:'Consultoría y formación', name:"L'Entreprise Symbiotique — Ingeniería en economía regenerativa",
      desc:"L'Entreprise Symbiotique acompaña a empresas y territorios hacia modelos regenerativos, desde la estrategia hasta la puesta en marcha: auditoría, formación, proyectos piloto y herramientas de seguimiento. Se apoya en la teoría de la economía simbiótica concebida por Isabelle Delannoy, que es a la vez base científica, marco de acción y método, y su misión es demostrar, mediante ejemplos documentados e inspiradores, que la economía regenerativa puede sustituir al modelo extractivo.",
      facts:["Más de 15 años de experiencia de sus fundadores, en Francia y en el mundo","Codirigió la especificación AFNOR sobre la economía regenerativa"]}},
  regenesis:{
    en:{type:'International institute',
      desc:"Based in the United States, Regenesis Group and its institute are among the pioneers of regenerative development. Their ambition: to transform the way humans inhabit the Earth by realigning human activities with the living systems unique to each place. They support developers, local authorities and organisations worldwide and train practitioners through The Regenerative Practitioner Series.",
      facts:["Authors of the reference book “Regenerative Development and Design: A Framework for Evolving Sustainability” (Wiley, 2016)","Training cohorts in the United States, Europe, New Zealand and Australia"]},
    es:{type:'Instituto internacional',
      desc:"Con sede en Estados Unidos, Regenesis Group y su instituto están entre los pioneros del desarrollo regenerativo. Su ambición: transformar la manera en que los seres humanos habitan la Tierra, realineando las actividades humanas con los sistemas vivos propios de cada lugar. Acompañan a promotores, entidades locales y organizaciones de todo el mundo y forman a profesionales a través de The Regenerative Practitioner Series.",
      facts:["Autores de la obra de referencia «Regenerative Development and Design: A Framework for Evolving Sustainability» (Wiley, 2016)","Cohortes de formación en Estados Unidos, Europa, Nueva Zelanda y Australia"]}},
  niels:{
    en:{type:'Book & case database', name:'Niels de Fraguier — The Regenerative Enterprise',
      desc:"An entrepreneur and author committed to regeneration, Niels de Fraguier co-wrote “The Regenerative Enterprise” (2023) with Stephen Vasconcellos, published in French as “L'entreprise régénérative – Prospérer avec le vivant” (L'éditeur à part, 2025). The book draws on more than 120 examples of pioneering companies, and the case database compiled by the author is the first source of this map.",
      facts:["Co-founder of Positive, a global initiative that brought together more than 200 companies, and of Corporate ReGeneration International","Teaches regenerative entrepreneurship at Sciences Po Paris"]},
    es:{type:'Libro y base de casos', name:'Niels de Fraguier — La empresa regenerativa',
      desc:"Emprendedor y autor comprometido con la regeneración, Niels de Fraguier escribió junto a Stephen Vasconcellos «The Regenerative Enterprise» (2023), publicado en francés con el título «L'entreprise régénérative – Prospérer avec le vivant» (L'éditeur à part, 2025). La obra se basa en más de 120 ejemplos de empresas pioneras, y la base de casos elaborada por el autor es la primera fuente de esta cartografía.",
      facts:["Cofundador de Positive, iniciativa mundial que reunió a más de 200 empresas, y de Corporate ReGeneration International","Enseña emprendimiento regenerativo en Sciences Po París"]}},
  das:{
    en:{type:'Academic study',
      desc:"Scientific article by Ankita Das and Nancy Bocken published in 2024 in the journal Sustainable Production and Consumption. The authors compile a database of 84 regenerative business cases across 15 sectors, and derive a typology of six strategies: regenerative leadership, nature regeneration, social regeneration, responsible sourcing, health and wellbeing, and an employee-centred approach.",
      facts:["Peer-reviewed journal (Elsevier), vol. 49, 2024","Examples of stable regenerative businesses, some dating back to the 1870s"], link:'Read the article'},
    es:{type:'Estudio académico',
      desc:"Artículo científico de Ankita Das y Nancy Bocken publicado en 2024 en la revista Sustainable Production and Consumption. Las autoras reúnen una base de 84 casos de empresas regenerativas en 15 sectores y extraen una tipología de seis estrategias: liderazgo regenerativo, regeneración de la naturaleza, regeneración social, abastecimiento responsable, salud y bienestar, y un eje centrado en los empleados.",
      facts:["Revista con revisión por pares (Elsevier), vol. 49, 2024","Ejemplos de empresas regenerativas estables, algunas de las cuales se remontan a la década de 1870"], link:'Leer el artículo'}},
  brunel:{
    en:{type:'White paper', name:'Brunel, Dubreil et al. — Entrepreneurship for the regeneration of life',
      desc:"White paper published in 2023 by Valérie Brunel, practitioner-researcher in socio-ecological transition, Sarah Dubreil, entrepreneur and investor in the environment, and their co-authors, with the support of Bpifrance Le Lab. It explores what a regenerative approach to entrepreneurship is, and under what conditions it can emerge and be viable.", link:'Read the white paper'},
    es:{type:'Libro blanco', name:'Brunel, Dubreil et al. — Emprender para la regeneración de lo vivo',
      desc:"Libro blanco publicado en 2023 por Valérie Brunel, profesional-investigadora en transición socioecológica, Sarah Dubreil, emprendedora e inversora en medio ambiente, y sus coautores, con el apoyo de Bpifrance Le Lab. Explora qué es un enfoque regenerativo del emprendimiento y en qué condiciones puede surgir y ser viable.", link:'Leer el libro blanco'}},
};

const idx = LANG==='en'?0:LANG==='es'?1:-1;

// Intitulés de source (table Sources_cles de Grist) : seules les formules descriptives sont traduites,
// les titres de publications restent dans leur langue d'origine
const SOURCE_RULES = [
  [/^Base de données de l'étude /, ['Database from the study ','Base de datos del estudio ']],
  [/^Communs de l'Observatoire Regen Conseil$/, ['Regen Conseil Observatory commons','Bienes comunes del Observatorio Regen Conseil']],
  [/^Etude de cas BPI-CEC-Lumia : /, ['BPI-CEC-Lumia case study: ','Estudio de caso BPI-CEC-Lumia: ']],
  [/^Lauréat des Lauriers de la Régénération de Nous Sommes Vivants /, ['Winner of the Nous Sommes Vivants Regeneration Laurels ','Ganador de los Laureles de la Regeneración de Nous Sommes Vivants ']],
  [/^base de données réalisée par Niels de Fraguier, auteur de « L'Entreprise Régénérative »$/, ['database compiled by Niels de Fraguier, author of “The Regenerative Enterprise”','base de datos elaborada por Niels de Fraguier, autor de «La empresa regenerativa»']],
  [/^Études de cas du Doughnut Economics Action Lab - /, ['Doughnut Economics Action Lab case studies - ','Estudios de caso del Doughnut Economics Action Lab - ']],
];
const SOURCE_WORDS = { ' et ':[' and ',' y '], 'Entreprises':['Businesses','Empresas'], 'Territoires':['Territories','Territorios'] };
function source(label){
  if (idx<0 || !label) return label;
  for (const [re,tr] of SOURCE_RULES) if (re.test(label)){
    let out = label.replace(re, tr[idx]);
    for (const [fr,w] of Object.entries(SOURCE_WORDS)) out = out.split(fr).join(w[idx]);
    return out;
  }
  return label;
}
let regionNames=null; try{ regionNames=new Intl.DisplayNames([LANG],{type:'region'}); }catch{}

window.I18N = {
  lang: LANG, langs: LANGS,
  t(k,...a){ const v=(S[LANG]&&S[LANG][k]!==undefined)?S[LANG][k]:S.fr[k]; return typeof v==='function'?v(...a):v; },
  sector(v){ return idx<0 ? v : (SECTORS[v]||[])[idx] || v; },
  size(v){ return idx<0 ? v : (SIZES[v]||[])[idx] || v; },
  source,
  country(v, a2){ if (idx<0 || !a2 || !regionNames) return v; try{ return regionNames.of(a2) || v; }catch{ return v; } },
  partner(p){
    const tr = (PARTNERS_I18N[p.id]||{})[LANG];
    if (!tr) return p;
    return {...p, type:tr.type||p.type, name:tr.name||p.name, short:p.short, shortL:tr.short||p.short, desc:tr.desc||p.desc,
      facts:tr.facts||p.facts, link:p.link&&tr.link?[p.link[0],tr.link]:p.link};
  },
  setLang(l){ try{ localStorage.setItem('lang',l); }catch{}
    const u=new URL(location.href); u.searchParams.set('lang',l); location.href=u.toString(); },
};

// Textes fixes de la page (attributs data-i18n)
if (LANG!=='fr'){
  document.title = S[LANG].title;
  const md=document.querySelector('meta[name="description"]'); if(md) md.content=S[LANG].metaDesc;
}
document.querySelectorAll('[data-i18n]').forEach(e=>{ const v=S[LANG][e.dataset.i18n]; if (typeof v==='string') e.textContent=v; });
document.querySelectorAll('[data-i18n-attr]').forEach(e=>{
  for (const pair of e.dataset.i18nAttr.split(';')){ const [att,k]=pair.split(':'); const v=S[LANG][k]; if (typeof v==='string') e.setAttribute(att,v); }
});
const sw=document.getElementById('langs');
if (sw) LANGS.forEach(l=>{ const b=document.createElement('button'); b.textContent=l.toUpperCase(); b.lang=l;
  b.setAttribute('aria-pressed', String(l===LANG)); if(l===LANG) b.className='on';
  b.title={fr:'Français',en:'English',es:'Español'}[l]; b.onclick=()=>{ if(l!==LANG) window.I18N.setLang(l); }; sw.append(b); });
})();
