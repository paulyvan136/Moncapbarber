export interface Service {
    id: number;
    category: string;
    services: { id: number; name: string; price: number | string; description: string }[];
}

const Services: Service[] = [

    {
  id: 1,
  category: "Hommes",
  services: [
    {
      id: 1,
      name: "Raze simple",
      price: 5000,
      description: "Une coupe de cheveux propre et nette qui consiste à raser uniformément les cheveux pour un style classique et soigné. Idéale pour ceux qui préfèrent un entretien minimal et une apparence fraîche."
    },
    {
      id: 2,
      name: "Dégradé simple",
      price: 5000,
      description: "Un fondu progressif sur les côtés et l’arrière de la tête qui apporte un style moderne et élégant. Adapté à tous types de visages et personnalisable selon vos préférences."
    },
    {
      id: 3,
      name: "Taper fade",
      price: 5000,
      description: "Un style de coupe subtil où les cheveux sont progressivement coupés plus courts vers le cou et les tempes. Apporte une finition nette et contemporaine."
    },
    {
      id: 4,
      name: "Coco taillé",
      price: 5000,
      description: "Une coupe artistique avec des contours précis et une finition sculptée, parfaite pour une coiffure unique qui met en valeur votre personnalité."
    },
    {
      id: 5,
      name: "Limitation",
      price: 2000,
      description: "Définition nette des contours de la coupe ou de la barbe. Un service rapide mais essentiel pour un look propre et professionnel."
    },
    {
      id: 6,
      name: "Barbe",
      price: 2000,
      description: "Taillage et entretien de la barbe pour un look soigné. Peut inclure le traçage, le dégradé et la symétrie de la pilosité faciale."
    },
    {
      id: 7,
      name: "Coiffure avec noircissant",
      price: 7000,
      description: "Ajout d’un produit noircissant pour accentuer les contours et donner une apparence plus dense et marquée à la coupe. Idéal pour un effet ‘fresh cut’ prolongé."
    },
    {
      id: 8,
      name: "Démêlée",
      price: 7000,
      description: "Service de démêlage des cheveux avec soin et douceur, adapté aux cheveux crépus, bouclés ou emmêlés. Préparation parfaite avant une coupe ou une coiffure."
    },
    {
      id: 9,
      name: "Démêlée + noircie",
      price: 8000,
      description: "Combinaison du démêlage et de l’application de produit noircissant pour une coiffure nette, volumineuse et intensément définie."
    },
    {
      id: 10,
      name: "Coco taillé + barbe",
      price: 5000,
      description: "Pack complet comprenant une coupe sculptée 'coco taillé' et l'entretien de la barbe pour un look harmonieux et stylé."
    },
    {
      id: 11,
      name: "Waves",
      price: 7000,
      description: "Mise en forme des cheveux pour obtenir l’effet ‘vagues’ très prisé. Nécessite un brossage régulier et une finition soignée pour un rendu impeccable."
    },
    {
      id: 12,
      name: "Curly",
      price: 10000,
      description: "Coiffure bouclée réalisée sur cheveux texturés. Apporte du volume et un look naturel. Peut inclure une mise en forme temporaire ou un traitement."
    }
  ]
},

    {
        id: 2,
        category: "Coloration + Coiffure",
        services: [
          {
            id: 1,
            name: "Décoloration simple",
            price: 10000,
            description: "Éclaircissement des cheveux pour préparer une coloration ou obtenir un blond naturel. Réalisé avec soin pour préserver la santé du cuir chevelu."
          },
          {
            id: 2,
            name: "Déco + Permanent",
            price: 20000,
            description: "Décoloration suivie d’un traitement permanent pour des cheveux lisses ou bouclés. Transformation complète pour un nouveau look durable."
          },
          {
            id: 3,
            name: "Déco + Super Permanent",
            price: 35000,
            description: "Un combo haut de gamme incluant décoloration et super permanent pour un style éclatant, durable et parfaitement maîtrisé."
          },
          {
            id: 4,
            name: "Coloration cendré",
            price: 20000,
            description: "Coloration grise ou argentée avec effet cendré pour un look moderne et sophistiqué. Résultat intense avec des reflets froids élégants."
          },
          {
            id: 5,
            name: "Coloration semi permanente",
            price: 15000,
            description: "Coloration temporaire qui s’estompe en douceur. Idéal pour tester une nouvelle teinte sans engagement à long terme."
          }
        ]
      },
      {
        id: 3,
        category: "Locks + Coiffure",
        services: [
          {
            id: 1,
            name: "Resserrage demie tête",
            price: 15000,
            description: "Entretien des racines des locks sur la moitié de la tête. Redonne une apparence nette et structurée aux cheveux."
          },
          {
            id: 2,
            name: "Resserrage complet",
            price: 20000,
            description: "Raffermissement des racines sur toute la tête pour entretenir vos locks et garantir leur durabilité et leur esthétisme."
          },
          {
            id: 3,
            name: "Resserrage + noircie demie",
            price: 20000,
            description: "Resserrage avec application d’un produit noircissant sur la moitié de la tête pour une finition plus profonde et marquée."
          },
          {
            id: 4,
            name: "Décoloration demie",
            price: 15000,
            description: "Éclaircissement des locks sur une moitié de tête pour un style audacieux et personnalisé. Fait ressortir les textures et les contrastes."
          },
          {
            id: 5,
            name: "Décoloration complet",
            price: 20000,
            description: "Décoloration intégrale des locks pour un changement radical de look, réalisé avec des produits adaptés pour éviter la casse."
          },
          {
            id: 6,
            name: "Coloration demie",
            price: 20000,
            description: "Application d’une couleur vive ou naturelle sur la moitié de la tête. Permet de créer un contraste artistique ou discret."
          },
          {
            id: 7,
            name: "Coloration complète",
            price: 30000,
            description: "Coloration uniforme sur l’ensemble de la chevelure ou des locks. Personnalisation possible selon les préférences de teintes."
          },
          {
            id: 8,
            name: "Début locks sans tige",
            price: 25000,
            description: "Création de locks naturelles sans accessoires, à la main. Résultat plus organique et évolutif dans le temps."
          },
          {
            id: 9,
            name: "Début locks naturel demie tête",
            price: 40000,
            description: "Formation manuelle de locks naturelles sur une demi-tête. Technique respectueuse du cheveu et idéale pour les débutants."
          },
          {
            id: 10,
            name: "Début locks naturel complet",
            price: 55000,
            description: "Création artisanale de locks sur toute la tête sans outil. Offre un rendu naturel, équilibré et durable dans le temps."
          },
          {
            id: 11,
            name: "Nattés",
            price: 5000,
            description: "Tresses classiques ou modernes selon vos envies. Idéal pour une coiffure rapide et protectrice au quotidien."
          },
          {
            id: 12,
            name: "Attrapé",
            price: 3000,
            description: "Technique d’accrochage des cheveux ou des locks pour maintenir une coiffure ou créer un design temporaire."
          },
          {
            id: 13,
            name: "Tiges/unité",
            price: 1000,
            description: "Ajout d'une tige/unité pour définir ou renforcer les locks. Utilisé pour débuter ou compléter une coiffure lockée."
          }
        ]
      },
      {
        id: 4,
        category: "Soins Capillaire",
        services: [
          {
            id: 1,
            name: "Hydratant",
            price: "20000 fcfa+",
            description: "Soin profond pour redonner de l’hydratation aux cheveux secs et ternes. Adapté aux cheveux naturels, défrisés ou colorés."
          },
          {
            id: 2,
            name: "Hydratant intense",
            price: "20000 fcfa+",
            description: "Traitement enrichi pour cheveux extrêmement secs ou abîmés. Apporte brillance, souplesse et douceur longue durée."
          },
          {
            id: 3,
            name: "Anti pelliculaire",
            price: "25000 fcfa+",
            description: "Soin spécialisé contre les pellicules. Nettoie en profondeur, apaise le cuir chevelu et limite la réapparition des squames."
          },
          {
            id: 4,
            name: "Protéine",
            price: "20000 fcfa+",
            description: "Renforce la fibre capillaire avec des protéines naturelles. Parfait pour les cheveux cassants, fragiles ou en transition."
          }
        ]
      },
      {
        id: 5,
        category: "Enfants",
        services: [
          {
            id: 1,
            name: "Coiffure simple",
            price: 2000,
            description: "Coiffure rapide et adaptée aux enfants. Réalisée avec douceur et patience dans un environnement rassurant."
          },
          {
            id: 2,
            name: "Coiffure noircie",
            price: 3000,
            description: "Coiffure pour enfants avec application légère de noircissant pour un rendu plus net et défini."
          },
          {
            id: 3,
            name: "Resserrage demie tête",
            price: 10000,
            description: "Entretien des locks des enfants sur une demi-tête. Permet de garder les racines propres et organisées."
          },
          {
            id: 4,
            name: "Shampoing simple",
            price: 3000,
            description: "Nettoyage doux du cuir chevelu et des cheveux des enfants avec des produits non agressifs et parfumés."
          }
        ]
      },
      {
        id: 6,
        category: "Nappy + Coiffure",
        services: [
          {
            id: 1,
            name: "Nappy demie tête",
            price: 10000,
            description: "Coiffure naturelle pour cheveux afro sur une demi-tête. Met en valeur la texture et respecte la nature du cheveu."
          },
          {
            id: 2,
            name: "Nappy complet",
            price: 15000,
            description: "Coiffure complète sur cheveux naturels. Idéal pour définir les boucles, hydrater et protéger durablement."
          },
          {
            id: 3,
            name: "Enfant",
            price: 8000,
            description: "Coiffure nappy pour enfant. Respecte la fragilité du cuir chevelu et valorise les cheveux naturels en douceur."
          }
        ]
      },
      {
        id: 7,
        category: "Nattes + Coiffure",
        services: [
          {
            id: 1,
            name: "Demie tête",
            price: 10000,
            description: "Tresses sur la moitié de la tête. Style protecteur, esthétique et pratique pour un port quotidien."
          },
          {
            id: 2,
            name: "Super nattes",
            price: 15000,
            description: "Tresses élaborées ou design artistiques. Finition professionnelle et tenue longue durée."
          },
          {
            id: 3,
            name: "Accessoires",
            price: 3000,
            description: "Ajout d’accessoires décoratifs à la coiffure : perles, fils, anneaux, etc. Pour un rendu unique et personnalisé."
          }
        ]
      },
      {
        id: 8,
        category: "Dames",
        services: [
          {
            id: 1,
            name: "Shampoing simple",
            price: 5000,
            description: "Lavage des cheveux avec massage du cuir chevelu. Laisse les cheveux doux, propres et revitalisés."
          },
          {
            id: 2,
            name: "Shampoing + brushing",
            price: 8000,
            description: "Lavage suivi d’un brushing lisse ou bouclé. Apporte volume et éclat tout en respectant la nature du cheveu."
          },
          {
            id: 3,
            name: "Shampoing + mise en plit",
            price: 8000,
            description: "Shampoing suivi d’une mise en plis avec rouleaux ou bigoudis pour une coiffure souple et élégante."
          }
        ]
      },
      {
        id: 9,
        category: "Défrisage",
        services: [
          {
            id: 1,
            name: "Produits salon",
            price: 12000,
            description: "Défrisage avec des produits professionnels fournis par le salon. Lisse les cheveux durablement et avec soin."
          },
          {
            id: 2,
            name: "Produits client",
            price: 10000,
            description: "Défrisage réalisé avec les produits que vous apportez. Application experte selon les besoins du cheveu."
          }
        ]
      },
      {
        id: 10,
        category: "Coupes",
        services: [
          {
            id: 1,
            name: "Coupe courte/longue",
            price: 20000,
            description: "Coupe adaptée à votre longueur préférée, courte ou longue. Réalisée avec soin pour mettre en valeur vos traits."
          },
          {
            id: 2,
            name: "Coloration + coupe",
            price: 25000,
            description: "Pack complet : transformation avec une coloration de votre choix suivie d’une coupe personnalisée."
          }
        ]
      },
      {
        id: 11,
        category: "Tresses",
        services: [
          {
            id: 1,
            name: "Tresses simple",
            price: 15000,
            description: "Tresses traditionnelles réalisées avec précision pour un look naturel et protecteur au quotidien."
          },
          {
            id: 2,
            name: "Tresses complexe",
            price: 40000,
            description: "Tresses élaborées avec motifs ou styles artistiques. Exigent plus de temps mais offrent un résultat remarquable."
          }
        ]
      },
      {
        id: 12,
        category: "Perruque",
        services: [
          {
            id: 1,
            name: "Tissage simple",
            price: 10000,
            description: "Pose de tissage classique, sans lace, pour ajouter du volume ou de la longueur à vos cheveux naturels."
          },
          {
            id: 2,
            name: "Tissage lace",
            price: 15000,
            description: "Pose avec frontal lace pour un effet naturel et invisible sur la ligne frontale."
          },
          {
            id: 3,
            name: "Tissage closure",
            price: 10000,
            description: "Installation avec closure pour une finition discrète. Idéal pour protéger les cheveux naturels."
          },
          {
            id: 4,
            name: "Customisation simple",
            price: 10000,
            description: "Ajustement de votre perruque ou lace pour un rendu naturel : découpe, blanchiment de nœuds, coiffage."
          },
          {
            id: 5,
            name: "Confection lace",
            price: "15000 fcfa+",
            description: "Création complète d’une perruque lace sur mesure. Adaptée à la taille et au style de chaque cliente."
          },
          {
            id: 6,
            name: "Confection closure",
            price: "20000 fcfa+",
            description: "Confection d’une perruque avec closure. Résultat naturel, facile à poser et à entretenir au quotidien."
          }
        ]
      }
      

];

export default Services;