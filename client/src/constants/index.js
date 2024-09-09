import {
    benefitIcon1,
    benefitIcon2,
    benefitIcon3,
    benefitIcon4,
    benefitImage2,
    chromecast,
    disc02,
    discord,
    discordBlack,
    facebook,
    figma,
    file02,
    framer,
    homeSmile,
    instagram,
    notification2,
    notification3,
    notification4,
    notion,
    photoshop,
    plusSquare,
    protopie,
    raindrop,
    recording01,
    recording03,
    roadmap1,
    roadmap2,
    roadmap3,
    roadmap4,
    searchMd,
    slack,
    sliders04,
    telegram,
    twitter,
    yourlogo,
  } from "../assets";
  
  export const navigation = [
    {
      id: "0",
      title: "Caracteristicas",
      url: "#features",
    },
    {
      id: "1",
      title: "Precios",
      url: "#pricing",
    },
    {
      id: "2",
      title: "Como usar",
      url: "#how-to-use",
    },
    {
      id: "3",
      title: "Roadmap",
      url: "#roadmap",
    },
    {
      id: "4",
      title: "New account",
      url: "#signup",
      onlyMobile: true,
    },
    {
      id: "5",
      title: "Sign in",
      url: "#login",
      onlyMobile: true,
    },
  ];
  
  export const heroIcons = [homeSmile, file02, searchMd, plusSquare];
  
  export const notificationImages = [notification4, notification3, notification2];
  
  export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];
  
  export const brainwaveServices = [
    "Generacion de codigo",
    "Mejoras de codigo",
    "Optimizacion de tiempo",
  ];
  
  export const brainwaveServicesIcons = [
    recording03,
    recording01,
    disc02,
    chromecast,
    sliders04,
  ];
  
  export const roadmap = [
    {
      id: "0",
      title: "Herramientas nuevas",
      text: "Estamos trabajando en hacer la aplicacion lo mas comoda posible, estamos mejorando la utilidad de la pagina principal y sus utilidades",
      date: "2024",
      status: "En progreso",
      imageUrl: roadmap1,
      colorful: true,
    },
    {
      id: "1",
      title: "Codificacion",
      text: "Estamos trabajando en tener una mejor interfaz para la muestra del texto del chat y diferencias visualmente codigo y texto",
      date: "2025",
      status: "En progreso",
      imageUrl: roadmap2,
    },
    {
      id: "2",
      title: "Customizacion de la IA",
      text: "Los usuarios podran elegir que modelo de la IA, tener posibilidad de dar contexto y una mejor experiencia",
      date: "2025",
      status: "En progreso",
      imageUrl: roadmap3,
    },
    {
      id: "3",
      title: "Integracion con APIs",
      text: "Permitir que el chatbot acceda a fuentes de datos externas, como API meteorológicas o API de noticias, para proporcionar recomendaciones más relevantes..",
      date: "2025",
      status: "En progreso",
      imageUrl: roadmap4,
    },
  ];
  
  export const collabText =
    "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";
  
  export const collabContent = [
    {
      id: "0",
      title: "Seamless Integration",
      text: collabText,
    },
    {
      id: "1",
      title: "Smart Automation",
    },
    {
      id: "2",
      title: "Top-notch Security",
    },
  ];
  
  export const collabApps = [
    {
      id: "0",
      title: "Figma",
      icon: figma,
      width: 26,
      height: 36,
    },
    {
      id: "1",
      title: "Notion",
      icon: notion,
      width: 34,
      height: 36,
    },
    {
      id: "2",
      title: "Discord",
      icon: discord,
      width: 36,
      height: 28,
    },
    {
      id: "3",
      title: "Slack",
      icon: slack,
      width: 34,
      height: 35,
    },
    {
      id: "4",
      title: "Photoshop",
      icon: photoshop,
      width: 34,
      height: 34,
    },
    {
      id: "5",
      title: "Protopie",
      icon: protopie,
      width: 34,
      height: 34,
    },
    {
      id: "6",
      title: "Framer",
      icon: framer,
      width: 26,
      height: 34,
    },
    {
      id: "7",
      title: "Raindrop",
      icon: raindrop,
      width: 38,
      height: 32,
    },
  ];
  
  export const pricing = [
    {
      id: "0",
      title: "Basico",
      description: "Chatbot con IA, recomendaciones personalizadas",
      price: "0",
      features: [
        "Un chatbot con IA que puede entender tus consultas",
        "Recomendaciones personalizadas basadas en tus preferencias",
        "Posibilidad de explorar la aplicación y sus funciones sin costo",
      ],
    },
    {
      id: "1",
      title: "Premium",
      description: "Chatbot de IA avanzado, soporte prioritario, sin limite en espacio",
      price: "40.000",
      features: [
        "Un chatbot de IA avanzado que puede comprender consultas complejas",
        "Un registro de tus conversaciones sin limite",
        "Mantiene el contexto de la conversacion del chat",
      ],
    },
    {
      id: "2",
      title: "Enterprise",
      description: "Chatbot de IA personalizado, análisis avanzado, cuenta dedicada",
      price: null,
      features: [
        "Un chatbot con IA que puede entender tus consultas",
        "Recomendaciones personalizadas basadas en tus preferencias",
        "Contiene todas las ventajas disponibles",
      ],
    },
  ];
  
  export const benefits = [
    {
      id: "0",
      title: "Pregunta Todo",
      text: "Permite a los usuarios encontrar rápidamente respuestas a sus preguntas sin tener que buscar en múltiples fuentes.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "1",
      title: "Mejora cada dia",
      text: "La aplicación utiliza procesamiento de lenguaje natural para comprender las consultas de los usuarios y brindar respuestas precisas y relevantes.",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "2",
      title: "En todo lugar",
      text: "Conéctese con el chatbot de IA desde cualquier lugar y en cualquier dispositivo, haciéndolo más accesible y conveniente",
      backgroundUrl: "./src/assets/benefits/card-3.svg",
      iconUrl: benefitIcon3,
      imageUrl: benefitImage2,
    },
    {
      id: "3",
      title: "Respuestas rapidas",
      text: "Permite a los usuarios encontrar rápidamente respuestas a sus preguntas sin tener que buscar en múltiples fuentes",
      backgroundUrl: "./src/assets/benefits/card-4.svg",
      iconUrl: benefitIcon4,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "4",
      title: "Se especialista",
      text: "Los usuarios podran aprender sobre python y conocer todas las posibilidades con el chatbot de AI.",
      backgroundUrl: "./src/assets/benefits/card-5.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "5",
      title: "Explora",
      text: "La aplicacion brindara las mejores opciones para tus preguntas mas frecuentes sobre programacion.",
      backgroundUrl: "./src/assets/benefits/card-6.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
    },
  ];
  
  export const socials = [
    {
      id: "0",
      title: "Discord",
      iconUrl: discordBlack,
      url: "https://discord.com/",
    },
    {
      id: "1",
      title: "Twitter",
      iconUrl: twitter,
      url: "https://twitter.com/?lang=es",
    },
    {
      id: "2",
      title: "Instagram",
      iconUrl: instagram,
      url: "https://www.instagram.com/",
    },
    {
      id: "3",
      title: "Telegram",
      iconUrl: telegram,
      url: "https://web.telegram.org/",
    },
    {
      id: "4",
      title: "Facebook",
      iconUrl: facebook,
      url: "https://www.facebook.com/?locale=es_LA",
    },
  ];
  