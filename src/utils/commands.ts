import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  about: () => {
    return `
🎭 Codename: XMZPC

💻 Profile:
   ▶ Java & Python Programmer
   ▶ Backend Developer
   ▶ Big Data Enthusiast

🔧 Arsenal:
   ▶ Java ☕ | Python 🐍
   ▶ Spring Boot 🍃 | PostgreSQL 🐘
   ▶ Kafka 🚀 | Docker 🐳
   ▶ Flink 🌊 | Spark ⚡
   ▶ Linux 🐧 | macOS 🍎

🕵️ Specialties:
   ▶ Designing robust backend services
   ▶ Architecting high-throughput data processing systems
   ▶ Optimizing distributed environments for scalability
   ▶ Implementing high-availability solutions
   ▶ Tuning systems for maximum performance and reliability

💀 "Building bridges between data chaos and digital order."
  `;
},
  hostname: () => hostname,
  whoami: () => 'guest',
  date: () => new Date().toLocaleString(),
  vi: () => `why use vi? try 'emacs'`,
  vim: () => `why use vim? try 'emacs'`,
  emacs: () => `why use emacs? try 'vim'`,
  echo: (args: string[]) => args.join(' '),
  sudo: (args: string[]) => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case 'ls': {
        let result = themes.map((t) => t.name.toLowerCase()).join(', ');
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return result;
      }

      case 'set': {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  repo: () => {
    window.open(packageJson.repository.url, '_blank');

    return 'Opening repository...';
  },
  clear: () => {
    history.set([]);

    return '';
  },
  email: () => {
    window.open(`mailto:${packageJson.author.email}`);

    return `Opening mailto:${packageJson.author.email}...`;
  },
  donate: () => {
    return "Thanks! 🚀 Hack the planet! 💻";
  },
  weather: async (args: string[]) => {
    const city = args.join('+');

    if (!city) {
      return 'Usage: weather [city]. Example: weather Brussels';
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);

    return weather.text();
  },
  exit: () => {
    return 'Please close the tab to exit.';
  },
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return 'curl: no URL provided';
    }

    const url = args[0];

    try {
      const response = await fetch(url);
      const data = await response.text();

      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },
  banner: () => `
██╗  ██╗███╗   ███╗███████╗██████╗  ██████╗
╚██╗██╔╝████╗ ████║╚══███╔╝██╔══██╗██╔════╝
 ╚███╔╝ ██╔████╔██║  ███╔╝ ██████╔╝██║     
 ██╔██╗ ██║╚██╔╝██║ ███╔╝  ██╔═══╝ ██║     
██╔╝ ██╗██║ ╚═╝ ██║███████╗██║     ╚██████╗
╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝      ╚═════╝v${packageJson.version}🚀

Welcome to my terminal! 👋
Type 'help' to see list of available commands.💡
`,

};
