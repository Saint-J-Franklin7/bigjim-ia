// À DÉPLOYER À LA RACINE DU REPO bigjim-ia SOUS : api/formation-content.js
// (Vercel ne route que /api/* placé à la racine du projet, pas dans un sous-dossier de page.)
//
// Variable d'environnement requise sur le projet Vercel "bigjim-ia" :
//   FORMATION_PASSWORD = PREMIERCLIENT
//
// Le mot de passe et tout le contenu (liens vidéo, homework, bonus) ne quittent
// jamais le serveur tant que le mot de passe n'est pas validé — rien n'est visible
// dans le HTML/JS envoyé au navigateur avant authentification.

const CONTENT = {
  prerec: [
    { n: 1, title: "Comment avoir Claude Code gratuitement ?", yt: "KaFAWzfdA38" },
    { n: 2, title: "Installer n8n sur serveur Hostinger", yt: "XADhfSPfTZ8" },
    { n: 3, title: "Connecter Claude Code à n8n (MCP + API)", yt: "MeUtnaldGBw" },
    { n: 4, title: "Connecter les credentials essentiels dans n8n", yt: "ksM1YXQrMJ0" },
    { n: 5, title: "Configurer un agent vocal IA", yt: "x7vqxxL8HhY" },
    { n: 6, title: "Créer son site web avec Claude Design", yt: "kGj6FunyJEk" },
    { n: 7, title: "Exemple teaser démo", yt: "oJHeCD4Zqdw" },
    { n: 8, title: "Faire et/ou filmer une démo de son agent", yt: "PAEs7Ds4Kog" },
    {
      n: 9,
      title: "Créer sa micro-entreprise et déclarer son CA",
      yt: "YmPcdzZx-uA",
      resources: [
        { label: "Créer sa micro", url: "https://procedures.inpi.fr/?/" },
        { label: "Déclarer son CA", url: "https://www.autoentrepreneur.urssaf.fr/portail/accueil.html" }
      ]
    }
  ],
  hotseats: [
    { n: 1, title: "Différence entre automatisation et agent IA", yt: "MVkkS4ViVIc" },
    { n: 2, title: "Différence entre forfait et clé API", yt: "IQJP7r8PZeA" },
    { n: 3, title: "Explications diverses n8n", yt: "TPITnGL-fEI" },
    { n: 4, title: "Comment fixer vos charges mensuelles et onboard l'agent pour le client ?", yt: "4TpwC_srcPo" }
  ],
  masterclass: [
    { n: 1, yt: "0FYuxNfgsuk", homework: ["Confirmer la niche (post dans le groupe WA)", "Finaliser l'offre", "Regarder Prérec 2", "Regarder Prérec 3", "Regarder Prérec 4", "Connecter ses crédentials en avance"] },
    { n: 2, yt: "L5yQqdalpPU", homework: ["Finir l'agent si pas terminé", "Tester en réel", "Regarder Prérec 5 (si nécessaire)", "Regarder Prérec 6", "Regarder Prérec 7"] },
    { n: 3, yt: "XL_e4q9X2cQ", homework: ["Contacter 100 leads avant le prochain call. Non négociable."] },
    { n: 4, yt: "N1x9XQ6Zotc", homework: ["Arriver au Module 4 avec au moins 1 démo bookée.", "Regarder Prérec 8"] },
    { n: 5, yt: "8kAgJf2B3t4", homework: ["Faire la vraie démo avec le prospect", "Noter les objections entendues pour le prochain call"] },
    { n: 6, yt: "9jJ8wuCIW60", homework: ["Objectif : 1 deal clôturé ou en bonne voie", "Regarder Prérec 9", "Regarder Prérec 10"] },
    { n: 7, yt: "VCe7kGEq-XU", homework: ["Envoyer la propale dans les 2h après la démo", "Relancer J+2 si pas de réponse"] },
    { n: 8, yt: "dgTfpIBsW_w", homework: ["Livrer votre premier client", "Obtenir le premier résultat chiffré (no-shows évités, leads qualifiés, deals closés...)"] }
  ],
  bonuses: [
    { name: "Niche Selector", url: "https://bigjim-ia.com/niche-selector" },
    { name: "Closer IA Agent", url: "https://bigjim-ia.com/agent-ia" },
    { name: "Agent Hormozi", url: "https://bigjim-ia.com/agent-hormozi" },
    { name: "Prompt Library", url: "https://bigjim-ia.com/prompt-library" },
    { name: "Prompts Agents IA", url: "https://bigjim-ia.com/prompts-agents-ia" },
    { name: "Guide Lead Sourcing", url: "https://bigjim-ia.com/lead-sourcing" },
    { name: "Demo Framework", url: "https://bigjim-ia.com/demo-framework" },
    { name: "Objection Handling Bible", url: "https://bigjim-ia.com/objection-bible" },
    { name: "Template Propale", url: "https://bigjim-ia.com/template-propale" },
    { name: "Pack Juridique", url: "https://bigjim-ia.com/pack-juridique" },
    { name: "SOP Livraison", url: "https://bigjim-ia.com/sop-livraison" }
  ]
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const { password } = req.body || {};
  const expected = (process.env.FORMATION_PASSWORD || '').trim().toUpperCase();
  const given = String(password || '').trim().toUpperCase();

  if (!expected || given !== expected) {
    return res.status(401).json({ ok: false });
  }

  return res.status(200).json({ ok: true, data: CONTENT });
}
