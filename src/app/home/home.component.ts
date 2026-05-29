import { CommonModule } from '@angular/common';
import { Component, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type Lang = 'EN' | 'ES';
type Theme = 'light' | 'dark';
type Photo = 'on' | 'off';

interface Highlight {
  num: string;
  suffix: string;
  label: string;
}

interface RoleSrc {
  startYear: number;
  endYear: number | null;
  durationSuffix?: string;
  position: string;
  company: { name: string; url: string };
  stack: string;
  note?: string;
  responsibilities: string[];
}

interface Role extends RoleSrc {
  yearRange: string;
  duration: string;
}

interface SkillGroup {
  label: string;
  yearsLabel: string;
  skills: { name: string; lead?: boolean }[];
}

interface SpokenLanguage {
  language: string;
  proficiency: string;
}

interface Project {
  name: string;
  tech: string;
  description: string;
  url: string;
  urlLabel: string;
}

interface Cert {
  tech: string;
  url: string;
  date: string;
}

const CAREER_START_YEAR = 2017;

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  /** Toolbar is only visible during `ng serve`; production builds hide it. */
  readonly isDev = isDevMode();

  lang: Lang = 'EN';
  theme: Theme = 'light';
  photo: Photo = 'on';

  name = 'Christian Changa';

  contact = {
    email: 'christian.changa.94@gmail.com',
    phone: '+51 993 279 957',
    linkedinLabel: 'linkedin.com/in/christian-changa',
    linkedinUrl: 'https://linkedin.com/in/christian-changa',
    githubLabel: 'github.com/christianempire',
    githubUrl: 'https://github.com/christianempire',
  };

  headers!: ReturnType<HomeComponent['buildHeaders']>;
  highlights: Highlight[] = [];
  about = '';
  roles: Role[] = [];
  projects: Project[] = [];
  techGroups: SkillGroup[] = [];
  alsoExperiencedWith = '';
  softSkills: string[] = [];
  certifications: Cert[] = [];
  education: { degree: string; school: string; dateRange: string; note?: string }[] = [];
  spokenLanguages: SpokenLanguage[] = [];

  get yearsOfExperience(): number {
    return new Date().getFullYear() - CAREER_START_YEAR;
  }

  get updatedLabel(): string {
    const now = new Date();
    const locale = this.lang === 'ES' ? 'es' : 'en';
    const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(now);
    const cap = month.charAt(0).toUpperCase() + month.slice(1);
    const prefix = this.lang === 'ES' ? 'Actualizado' : 'Updated';
    return `${prefix}: ${cap} ${now.getFullYear()}`;
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.headers = this.buildHeaders('EN');
    this.route.queryParamMap.subscribe((params) => {
      const langParam = params.get('lang');
      const themeParam = params.get('theme');
      const photoParam = params.get('photo');
      if (langParam === 'EN' || langParam === 'ES') this.lang = langParam;
      if (themeParam === 'light' || themeParam === 'dark') this.theme = themeParam;
      if (photoParam === 'on' || photoParam === 'off') this.photo = photoParam;

      this.headers = this.buildHeaders(this.lang);
      this.loadContent(this.lang);
    });
  }

  setTheme(value: Theme) { this.theme = value; this.syncQuery({ theme: value }); }
  setPhoto(value: Photo) { this.photo = value; this.syncQuery({ photo: value }); }
  setLang(value: Lang) { this.syncQuery({ lang: value }); }

  private syncQuery(partial: Record<string, string>) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: partial,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private buildHeaders(lang: Lang) {
    const ES = lang === 'ES';
    return {
      roleTitle: ES ? 'Desarrollador Full-Stack Senior' : 'Senior Full-Stack Developer',
      location: ES ? 'Lima, Perú · GMT−5' : 'Lima, Peru · GMT−5',
      availability: ES
        ? 'Abierto a remoto (LATAM / zonas horarias USA) · Contrato o tiempo completo'
        : 'Open to remote (LATAM / US timezones) · Contract or full-time',
      about: ES ? 'Perfil' : 'About',
      workExperience: ES ? 'Experiencia Laboral' : 'Work Experience',
      selectedProjects: ES ? 'Proyectos Destacados' : 'Selected Projects',
      techStack: ES ? 'Stack Tecnológico' : 'Tech Stack',
      alsoExp: ES ? 'También con experiencia en' : 'Also experienced with',
      softSkills: ES ? 'Habilidades Blandas' : 'Soft Skills',
      certifications: ES ? 'Certificaciones' : 'Certifications',
      education: ES ? 'Educación' : 'Education',
      languages: ES ? 'Idiomas' : 'Languages',
      highlightsAria: ES ? 'Destacados' : 'Highlights',
      themeLabel: ES ? 'Tema' : 'Theme',
      photoLabel: ES ? 'Foto' : 'Photo',
      themeLight: ES ? 'Claro' : 'Light',
      themeDark: ES ? 'Oscuro' : 'Dark',
      photoShow: ES ? 'Mostrar' : 'Show',
      photoHide: ES ? 'Ocultar' : 'Hide',
      present: ES ? 'Presente' : 'Present',
      yearOne: ES ? 'año' : 'yr',
      yearMany: ES ? 'años' : 'yrs',
    };
  }

  private formatYearRange(startYear: number, endYear: number | null): string {
    return endYear === null ? `${startYear} — ${this.headers.present}` : `${startYear} — ${endYear}`;
  }

  private formatDuration(startYear: number, endYear: number | null, suffix?: string): string {
    const effectiveEnd = endYear ?? new Date().getFullYear();
    const years = Math.max(1, effectiveEnd - startYear);
    const unit = years === 1 ? this.headers.yearOne : this.headers.yearMany;
    return suffix ? `${years} ${unit} · ${suffix}` : `${years} ${unit}`;
  }

  private resolveRoles(src: RoleSrc[]): Role[] {
    return src.map((r) => ({
      ...r,
      yearRange: this.formatYearRange(r.startYear, r.endYear),
      duration: this.formatDuration(r.startYear, r.endYear, r.durationSuffix),
    }));
  }

  private loadContent(lang: Lang) {
    const ES = lang === 'ES';
    const yrs = this.yearsOfExperience;

    this.highlights = ES
      ? [
          { num: String(yrs), suffix: '+ años', label: 'Experiencia full-stack' },
          { num: '13', suffix: ' enviados', label: 'Proyectos en producción' },
          { num: '6', suffix: ' industrias', label: 'Banca · MarTech · Retail · Finanzas · Marketplace · E-learning' },
        ]
      : [
          { num: String(yrs), suffix: '+ yrs', label: 'Full-stack experience' },
          { num: '13', suffix: ' shipped', label: 'Production projects delivered' },
          { num: '6', suffix: ' industries', label: 'Banking · MarTech · Retail · Finance · Marketplace · E-learning' },
        ];

    this.about = ES
      ? `Desarrollador Full-Stack Senior, <b>${yrs}+ años</b> entregando <b>13 productos en producción</b> en <b>banca, MarTech, retail, finanzas, marketplace y e-learning</b> — con foco en <b>.NET, Angular y el stack MEAN</b>. Llevo features desde un brief ambiguo hasta producción, encargándome de la API, la UI y el pipeline de CI que las despliega. Trabajo remoto nativo, cómodo en comunicación asíncrona, sesgo hacia PRs pequeños y revisables.`
      : `Senior Full-Stack Developer with <b>${yrs}+ years</b> delivering <b>13 production products</b> across <b>banking, MarTech, retail, finance, marketplace and e-learning</b> — anchored in <b>.NET, Angular and the MEAN stack</b>. I take features from ambiguous brief to production, owning the API, the UI and the CI pipeline that ships them. Remote-native, async-comfortable, biased toward small reviewable PRs.`;

    const rolesEN: RoleSrc[] = [
      {
        startYear: 2025,
        endYear: null,
        durationSuffix: 'Current',
        position: 'Full-Stack Developer',
        company: { name: 'Nubelity', url: 'https://www.linkedin.com/company/nubelity-llc/' },
        stack: '.NET · Angular · Multinational banking',
        responsibilities: [
          '<b>Architected the frontend and API layer</b> of a request-management platform for a <b>multinational banking institution</b>, shipping the MVP in <b>5 months</b>.',
          '<b>Standardized a shared component library</b> across <b>4 modules</b>, cutting feature-build time by <b>~35%</b> and onboarding new devs in under a week.',
          'Owned API contract design and data modeling for <b>18 entities</b>, paired with product to keep scope crisp.',
        ],
      },
      {
        startYear: 2023,
        endYear: 2025,
        position: 'Software Engineer',
        company: { name: 'Halo Media', url: 'https://www.linkedin.com/company/halo-media/' },
        stack: 'MEAN · Azure DevOps · MarTech (US)',
        note: 'Moonlighted 2023 – 2024 while finishing at Globant.',
        responsibilities: [
          '<b>Delivered 4 production MEAN-stack applications</b> for a US enterprise client in the marketing / MarTech space, owning code from prototype to release.',
          '<b>Refactored the slowest Angular module</b> in the suite — cut average page load from <b>3.8s to 1.4s</b> and dropped Lighthouse CLS by <b>~55%</b>.',
          '<b>Set up Azure DevOps pipelines</b> with automated tests and continuous integration, moving the team from weekly manual deploys to on-demand merges.',
        ],
      },
      {
        startYear: 2019,
        endYear: 2024,
        position: 'Semi-Senior .NET Developer',
        company: { name: 'Globant', url: 'https://www.linkedin.com/company/globant/' },
        stack: '.NET · Angular · Retail & Finance (US)',
        responsibilities: [
          '<b>Built and maintained 2 enterprise platforms</b> (.NET / Angular) for US clients in retail and financial services, used by <b>~20k</b> daily users.',
          '<b>Migrated 4 microservices to OAuth2/JWT auth</b> with zero downtime, releasing <b>180+ changes</b> to production in the first quarter.',
          '<b>Mentored 5 junior developers</b> through code reviews and pairing, raising team merge throughput by <b>~30%</b>.',
        ],
      },
      {
        startYear: 2019,
        endYear: 2020,
        durationSuffix: 'Part-time',
        position: 'Full-Stack Developer',
        company: { name: 'Apps2go Perú', url: 'https://www.linkedin.com/company/apps2go-per%C3%BA/' },
        stack: '.NET · Android · Marketplace',
        note: 'Concurrent side contract while at Globant.',
        responsibilities: [
          '<b>Shipped a marketplace Android app and .NET API end-to-end</b> as sole engineer, reaching <b>2k installs</b> in the first quarter.',
        ],
      },
      {
        startYear: 2018,
        endYear: 2019,
        position: 'Frontend Developer',
        company: { name: 'Kodoti', url: 'https://www.linkedin.com/company/kodoti/' },
        stack: 'Vue.js · E-learning',
        responsibilities: [
          '<b>Built the public e-learning site in Vue.js</b> from designs to launch, supporting <b>15+ course landing pages</b> with a shared component library.',
        ],
      },
      {
        startYear: 2017,
        endYear: 2018,
        durationSuffix: 'Junior',
        position: 'Full-Stack Developer Jr',
        company: { name: 'Juntoz', url: 'https://www.linkedin.com/company/juntoz/' },
        stack: '.NET · Angular · Retail',
        responsibilities: [
          '<b>Contributed to 4 retail e-commerce releases</b> as a junior .NET/Angular dev — fixed <b>60+ bugs</b> and shipped <b>25+ small features</b>.',
        ],
      },
    ];

    const rolesES: RoleSrc[] = [
      {
        startYear: 2025,
        endYear: null,
        durationSuffix: 'Actual',
        position: 'Desarrollador Full-Stack',
        company: { name: 'Nubelity', url: 'https://www.linkedin.com/company/nubelity-llc/' },
        stack: '.NET · Angular · Banca multinacional',
        responsibilities: [
          '<b>Diseñé la arquitectura del frontend y la capa de API</b> de una plataforma de gestión de solicitudes para una <b>institución bancaria multinacional</b>, entregando el MVP en <b>5 meses</b>.',
          '<b>Estandaricé una biblioteca de componentes compartida</b> entre <b>4 módulos</b>, recortando el tiempo de desarrollo de features en <b>~35%</b> y reduciendo el onboarding de nuevos devs a menos de una semana.',
          'Lideré el diseño de contratos de API y el modelado de datos para <b>18 entidades</b>, en colaboración estrecha con producto para mantener el alcance acotado.',
        ],
      },
      {
        startYear: 2023,
        endYear: 2025,
        position: 'Ingeniero de Software',
        company: { name: 'Halo Media', url: 'https://www.linkedin.com/company/halo-media/' },
        stack: 'MEAN · Azure DevOps · MarTech (USA)',
        note: 'Trabajo paralelo (moonlight) 2023 – 2024 mientras cerraba mi etapa en Globant.',
        responsibilities: [
          '<b>Entregué 4 aplicaciones MEAN en producción</b> para un cliente empresarial estadounidense del sector marketing/MarTech, asumiendo el código desde prototipo hasta release.',
          '<b>Refactoricé el módulo Angular más lento</b> de la suite — bajé el tiempo de carga de <b>3.8s a 1.4s</b> y reduje el Lighthouse CLS en <b>~55%</b>.',
          '<b>Configuré pipelines de Azure DevOps</b> con pruebas automatizadas e integración continua, pasando al equipo de despliegues manuales semanales a merges bajo demanda.',
        ],
      },
      {
        startYear: 2019,
        endYear: 2024,
        position: 'Desarrollador .NET Semi-Senior',
        company: { name: 'Globant', url: 'https://www.linkedin.com/company/globant/' },
        stack: '.NET · Angular · Retail & Finance (USA)',
        responsibilities: [
          '<b>Construí y mantuve 2 plataformas empresariales</b> (.NET / Angular) para clientes estadounidenses de retail y servicios financieros, usadas por <b>~20k</b> usuarios diarios.',
          '<b>Migré 4 microservicios a autenticación OAuth2/JWT</b> sin downtime, liberando <b>180+ cambios</b> a producción en el primer trimestre.',
          '<b>Mentoricé a 5 desarrolladores junior</b> mediante revisiones de código y pair programming, elevando el throughput de merges del equipo en <b>~30%</b>.',
        ],
      },
      {
        startYear: 2019,
        endYear: 2020,
        durationSuffix: 'Tiempo parcial',
        position: 'Desarrollador Full-Stack',
        company: { name: 'Apps2go Perú', url: 'https://www.linkedin.com/company/apps2go-per%C3%BA/' },
        stack: '.NET · Android · Marketplace',
        note: 'Contrato paralelo durante mi etapa en Globant.',
        responsibilities: [
          '<b>Entregué de extremo a extremo una app Android de marketplace y su API en .NET</b> como único ingeniero, alcanzando <b>2k instalaciones</b> en el primer trimestre.',
        ],
      },
      {
        startYear: 2018,
        endYear: 2019,
        position: 'Desarrollador Frontend',
        company: { name: 'Kodoti', url: 'https://www.linkedin.com/company/kodoti/' },
        stack: 'Vue.js · E-learning',
        responsibilities: [
          '<b>Construí el sitio público de e-learning en Vue.js</b> desde los diseños hasta el lanzamiento, dando soporte a <b>15+ landing pages</b> de cursos con una librería de componentes compartidos.',
        ],
      },
      {
        startYear: 2017,
        endYear: 2018,
        durationSuffix: 'Junior',
        position: 'Desarrollador Full-Stack Jr',
        company: { name: 'Juntoz', url: 'https://www.linkedin.com/company/juntoz/' },
        stack: '.NET · Angular · Retail',
        responsibilities: [
          '<b>Contribuí a 4 releases de e-commerce retail</b> como dev junior .NET/Angular — corregí <b>60+ bugs</b> y entregué <b>25+ pequeñas features</b>.',
        ],
      },
    ];

    this.roles = this.resolveRoles(ES ? rolesES : rolesEN);

    this.projects = ES
      ? [
          {
            name: 'Este CV',
            tech: 'Angular 19 · SCSS · GitHub Pages',
            description: 'CV bilingüe, con temas claro/oscuro, controles por query-string y optimizado para impresión a una sola página.',
            url: 'https://github.com/christianempire/my-cv',
            urlLabel: 'github.com/christianempire/my-cv',
          },
          {
            name: 'PingPulse',
            tech: 'Electron · React · TypeScript · Tailwind · Zustand',
            description: 'App de escritorio que monitorea la salud de la conexión a internet en tiempo real: latencia, pérdida de paquetes, umbrales auto-calibrados y overlay siempre visible.',
            url: 'https://github.com/christianempire/PingPulse',
            urlLabel: 'github.com/christianempire/PingPulse',
          },
          {
            name: 'Prodtick',
            tech: 'Electron · React · TypeScript · Tailwind · Zustand',
            description: 'App de productividad local-first para Windows: tareas con timestamps, texto enriquecido, reordenamiento drag-and-drop y gráfico de 14 días.',
            url: 'https://github.com/christianempire/Prodtick',
            urlLabel: 'github.com/christianempire/Prodtick',
          },
        ]
      : [
          {
            name: 'This CV',
            tech: 'Angular 19 · SCSS · GitHub Pages',
            description: 'Bilingual single-page CV with light/dark themes, query-string controls, and a print-optimized stylesheet.',
            url: 'https://github.com/christianempire/my-cv',
            urlLabel: 'github.com/christianempire/my-cv',
          },
          {
            name: 'PingPulse',
            tech: 'Electron · React · TypeScript · Tailwind · Zustand',
            description: 'Desktop app that monitors internet-connection health in real time — latency, packet loss, self-calibrating thresholds, and an always-on-top overlay.',
            url: 'https://github.com/christianempire/PingPulse',
            urlLabel: 'github.com/christianempire/PingPulse',
          },
          {
            name: 'Prodtick',
            tech: 'Electron · React · TypeScript · Tailwind · Zustand',
            description: 'Local-first Windows productivity app: tasks with completion timestamps, rich-text formatting, drag-and-drop reordering, and a 14-day chart.',
            url: 'https://github.com/christianempire/Prodtick',
            urlLabel: 'github.com/christianempire/Prodtick',
          },
        ];

    this.techGroups = ES
      ? [
          {
            label: 'Experto',
            yearsLabel: '5+ años',
            skills: [
              { name: '.NET', lead: true },
              { name: 'Angular', lead: true },
              { name: 'C#' },
              { name: 'TypeScript' },
              { name: 'JavaScript' },
              { name: 'Node.js' },
              { name: 'SQL' },
              { name: 'Azure DevOps' },
              { name: 'Git' },
            ],
          },
          {
            label: 'Competente',
            yearsLabel: '2 – 5 años',
            skills: [{ name: 'Docker' }, { name: 'MongoDB' }, { name: 'Python' }, { name: 'React' }],
          },
          {
            label: 'Familiar',
            yearsLabel: '< 2 años',
            skills: [{ name: 'AWS' }],
          },
        ]
      : [
          {
            label: 'Expert',
            yearsLabel: '5+ yrs',
            skills: [
              { name: '.NET', lead: true },
              { name: 'Angular', lead: true },
              { name: 'C#' },
              { name: 'TypeScript' },
              { name: 'JavaScript' },
              { name: 'Node.js' },
              { name: 'SQL' },
              { name: 'Azure DevOps' },
              { name: 'Git' },
            ],
          },
          {
            label: 'Proficient',
            yearsLabel: '2 – 5 yrs',
            skills: [{ name: 'Docker' }, { name: 'MongoDB' }, { name: 'Python' }, { name: 'React' }],
          },
          {
            label: 'Familiar',
            yearsLabel: '< 2 yrs',
            skills: [{ name: 'AWS' }],
          },
        ];

    this.alsoExperiencedWith = ES
      ? 'REST APIs · ASP.NET Core · Entity Framework · LINQ · RxJS · HTML5 · CSS3 · SCSS · Diseño responsivo · Pruebas unitarias · Ágil / Scrum · JIRA · CI/CD · Microservicios · Swagger / OpenAPI · Express.js · SQL Server · Postman'
      : 'REST APIs · ASP.NET Core · Entity Framework · LINQ · RxJS · HTML5 · CSS3 · SCSS · Responsive design · Unit testing · Agile / Scrum · JIRA · CI/CD · Microservices · Swagger / OpenAPI · Express.js · SQL Server · Postman';

    this.softSkills = ES
      ? ['Resolución de problemas', 'Comunicación asíncrona clara', 'Revisión de código y mentoría', 'Aprendizaje continuo', 'Colaboración multifuncional']
      : ['Problem-solving', 'Clear async communication', 'Code review & mentorship', 'Continuous learning', 'Cross-functional collaboration'];

    this.certifications = [
      { tech: 'Angular',             url: 'https://www.udemy.com/certificate/UC-0c2da545-7a78-4d99-a127-c2aa86f98e3f/', date: '2022' },
      { tech: 'Node.js',             url: 'https://www.udemy.com/certificate/UC-bff821ee-301a-463f-ad72-9639ee2888fe/', date: '2022' },
      { tech: '.NET',                url: 'https://www.udemy.com/certificate/UC-ccccb339-13da-4cf8-91e0-92e95bdd64d9/', date: '2022' },
      { tech: 'Django',              url: 'https://www.udemy.com/certificate/UC-f7caccc8-d888-423d-9a59-46441f690b2b/', date: '2022' },
      { tech: 'MySQL',               url: 'https://www.udemy.com/certificate/UC-2f5e5be2-3395-4b05-ac53-fd3e708ba5ad/', date: '2022' },
      { tech: 'DevOps Fundamentals', url: 'https://www.udemy.com/certificate/UC-d43b3357-bdc2-4792-b32c-f38a31059e1f/', date: '2022' },
      { tech: 'MongoDB',             url: 'https://www.udemy.com/certificate/UC-670c702c-0a29-48a7-bad7-b95717a6e6c4/', date: '2023' },
    ];

    this.education = ES
      ? [
          {
            degree: 'Bachiller en Ingeniería Informática',
            school: 'Universidad de Lima',
            dateRange: '2014 — 2020',
            note: 'Trabajé tiempo completo durante los 2 últimos años.',
          },
        ]
      : [
          {
            degree: 'B.S. Informatics Engineering',
            school: 'University of Lima',
            dateRange: '2014 — 2020',
            note: 'Worked full-time during final 2 years.',
          },
        ];

    this.spokenLanguages = ES
      ? [
          { language: 'Español', proficiency: 'Nativo' },
          { language: 'Inglés', proficiency: 'Fluido · C1' },
        ]
      : [
          { language: 'Spanish', proficiency: 'Native' },
          { language: 'English', proficiency: 'Fluent · C1' },
        ];
  }
}
