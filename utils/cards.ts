import { Card } from "./interfaces/linksInterface";

export const cards: Card[] = [
  {
    id: "logo",
    img: "/img/logo-mobile.png",
    name: "app logo",
    title: "stack-analyze",
    details: `version: 1.7.0`,
    social: [
      {
        logo: ioniconsLogoGithub,
        color: "github",
        link: "https://github.com/stack-analyze/stack-analyze-mobile",
      }
    ]
  },
  {
    id: "member-1",
    img: "/img/profile-omega.jpg",
    name: "developer",
    title: "omega5300",
    details: "main development",
    social: [
      {
        logo: ioniconsLogoGithub,
        color: "github",
        link: "https://github.com/omega5300",
      },
      {
        logo: ioniconsLogoInstagram,
        color: "instagram",
        link: "https://instagram.com/juliomixtreria",
      },
      {
        logo: ioniconsLogoCodepen,
        color: "codepen",
        link: "https://codepen.io/omega5300",
      },
      {
        logo: ioniconsLogoTiktok,
        color: "codepen",
        link: "https://www.tiktok.com/@juliomixtreria"
      }
    ]
  },
  {
    id: "member-2",
    img: "/img/profile-MrRedu.jpeg",
    name: "ideas",
    title: "MrRedu",
    details: "ideas and watchers",
    social: [
      {
        logo: ioniconsLogoGithub,
        color: "github",
        link: "https://github.com/MrRedu",
      }
    ]
  }
];
