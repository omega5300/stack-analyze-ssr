interface Pages {
  title: string;
  url: string;
  icon: string;
}

interface Accordion {
  section: string;
  name: string;
  color: string;
  pages: Pages[]
}

export const groups: Accordion[] = [
  {
    section: 'web',
    name: 'web tools',
    color: 'primary',
    pages: [
      {
        title: 'tech stack',
        url: '/tech-stack',
        icon: ioniconsExtensionPuzzleOutline
      },
      {
        title: 'pagespeed',
        url: '/pagespeed',
        icon: ioniconsHourglassOutline
      },
      {
        title: 'whois',
        url: '/whois',
        icon: ioniconsAttachOutline
      },
      {
        title: 'web scraping',
        url: '/scraping',
        icon: ioniconsCodeSlashOutline
      }
    ]
  },
  {
    section: 'info',
    name: 'info tools',
    color: 'success',
    pages: [
      {
        title: 'github',
        url: '/github',
        icon: ioniconsInformationOutline
      },
      {
        title: 'crypto',
        url: '/crypto',
        icon: ioniconsWalletOutline
      },
      {
        title: 'bitly',
        url: '/bitly',
        icon: ioniconsSearchCircleOutline
      }
    ]
  },
  {
    section: 'query',
    name: 'query tools',
    color: 'tertiary',
    pages: [
      {
        title: 'anime',
        url: 'anime',
        icon: ioniconsStarOutline
      },
      {
        title: 'movie',
        url: '/movie',
        icon: ioniconsVideocamOutline
      },
      {
        title: 'twitch',
        url: '/twitch',
        icon: ioniconsLogoTwitch
      }
    ]
  },
  {
    section: 'utility',
    name: 'utility tools',
    color: 'medium',
    pages: [
      {
        title: 'password generator',
        url: 'password',
        icon: ioniconsLockClosedOutline
      },
      {
        title: 'hardware information',
        url: 'hardware',
        icon: ioniconsTerminalOutline
      }
    ]
  }
]
