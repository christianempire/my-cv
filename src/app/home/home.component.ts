import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type Lang = 'EN' | 'ES';
type Theme = 'light' | 'dark';
type Photo = 'on' | 'off';
type Density = 'comfortable' | 'compact';

interface Highlight {
  num: string;
  suffix: string;
  label: string;
}

interface Role {
  yearRange: string;
  duration: string;
  position: string;
  company: { name: string; url: string };
  stack: string;
  responsibilities: string[];
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

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  lang: Lang = 'EN';
  theme: Theme = 'light';
  photo: Photo = 'on';
  density: Density = 'comfortable';

  name = 'Christian Changa';

  contact = {
    email: 'christian.changa.94@gmail.com',
    phone: '+51 993 279 957',
    linkedinLabel: 'linkedin.com/in/christian-changa',
    linkedinUrl: 'https://linkedin.com/in/christian-changa',
    githubLabel: 'github.com/christianempire',
    githubUrl: 'https://github.com/christianempire',
  };

  headers: {
    roleTitle: string;
    location: string;
    about: string;
    workExperience: string;
    techStack: string;
    softSkills: string;
    certifications: string;
    education: string;
    languages: string;
    highlightsAria: string;
    themeLabel: string;
    photoLabel: string;
    densityLabel: string;
    themeLight: string;
    themeDark: string;
    photoShow: string;
    photoHide: string;
    densityComfortable: string;
    densityCompact: string;
    printBtn: string;
    page: string;
  } = this.buildHeaders('EN');

  highlights: Highlight[] = [];
  about = '';
  roles: Role[] = [];
  techGroups: SkillGroup[] = [];
  softSkills: string[] = [];
  certifications: { tech: string; url: string; year?: string }[] = [];
  education: { degree: string; school: string; dateRange: string }[] = [];
  spokenLanguages: SpokenLanguage[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe((params) => {
      const langParam = params.get('lang');
      const themeParam = params.get('theme');
      const photoParam = params.get('photo');
      const densityParam = params.get('density');

      if (langParam === 'EN' || langParam === 'ES') this.lang = langParam;
      if (themeParam === 'light' || themeParam === 'dark') this.theme = themeParam;
      if (photoParam === 'on' || photoParam === 'off') this.photo = photoParam;
      if (densityParam === 'comfortable' || densityParam === 'compact') this.density = densityParam;

      this.headers = this.buildHeaders(this.lang);
      this.loadContent(this.lang);
    });
  }

  setTheme(value: Theme) {
    this.theme = value;
    this.syncQuery({ theme: value });
  }
  setPhoto(value: Photo) {
    this.photo = value;
    this.syncQuery({ photo: value });
  }
  setDensity(value: Density) {
    this.density = value;
    this.syncQuery({ density: value });
  }
  setLang(value: Lang) {
    this.syncQuery({ lang: value });
  }

  print() {
    window.print();
  }

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
      about: ES ? 'Perfil' : 'About',
      workExperience: ES ? 'Experiencia Laboral' : 'Work Experience',
      techStack: ES ? 'Stack Tecnológico' : 'Tech Stack',
      softSkills: ES ? 'Habilidades Blandas' : 'Soft Skills',
      certifications: ES ? 'Certificaciones' : 'Certifications',
      education: ES ? 'Educación' : 'Education',
      languages: ES ? 'Idiomas' : 'Languages',
      highlightsAria: ES ? 'Destacados' : 'Highlights',
      themeLabel: ES ? 'Tema' : 'Theme',
      photoLabel: ES ? 'Foto' : 'Photo',
      densityLabel: ES ? 'Densidad' : 'Density',
      themeLight: ES ? 'Claro' : 'Light',
      themeDark: ES ? 'Oscuro' : 'Dark',
      photoShow: ES ? 'Mostrar' : 'Show',
      photoHide: ES ? 'Ocultar' : 'Hide',
      densityComfortable: ES ? 'Cómoda' : 'Comfortable',
      densityCompact: ES ? 'Compacta' : 'Compact',
      printBtn: ES ? 'Imprimir / Guardar PDF' : 'Print / Save PDF',
      page: ES ? 'Página 1 / 1' : 'Page 1 / 1',
    };
  }

  private loadContent(lang: Lang) {
    const ES = lang === 'ES';

    this.highlights = ES
      ? [
          { num: '9', suffix: '+ años', label: 'Experiencia full-stack' },
          { num: '12', suffix: '+ enviados', label: 'Proyectos en producción' },
          { num: '3', suffix: ' stacks', label: '.NET · Angular · MEAN' },
        ]
      : [
          { num: '9', suffix: '+ yrs', label: 'Full-stack experience' },
          { num: '12', suffix: '+ shipped', label: 'Production projects delivered' },
          { num: '3', suffix: ' stacks', label: '.NET · Angular · MEAN' },
        ];

    this.about = ES
      ? 'Desarrollador Full-Stack Senior, <b>9+ años</b> en <b>12+ productos en producción</b> sobre <b>.NET, Angular y el stack MEAN</b>. Llevo features desde un brief ambiguo hasta producción — encargándome de la API, la UI y el pipeline de CI que las despliega. Trabajo remoto nativo, cómodo en comunicación asíncrona, sesgo hacia PRs pequeños y revisables.'
      : 'Senior Full-Stack Developer, <b>9+ years</b> across <b>12+ shipped products</b> on <b>.NET, Angular and the MEAN stack</b>. I take features from ambiguous brief to production — owning API, UI and the CI pipeline that ships them. Remote-native, async-comfortable, biased toward small reviewable PRs.';

    // NOTE: Bullets contain TODO markers for metrics CD invented.
    // Replace each TODO with a real number you can defend in an interview,
    // or remove the metric and keep just the verb-first phrasing.
    this.roles = ES
      ? [
          {
            yearRange: '2025 — Presente',
            duration: '1 año · Actual',
            position: 'Desarrollador Full-Stack',
            company: { name: 'Nubelity', url: 'https://www.linkedin.com/company/nubelity-llc/' },
            stack: '.NET · Angular · Banca',
            responsibilities: [
              '<b>Diseñé la arquitectura del frontend y la capa de API</b> de una plataforma de gestión de solicitudes para un banco <b>[TODO: Fortune-500 o sector concreto]</b>, entregando el MVP en <b>[TODO: N meses]</b>.',
              '<b>Estandaricé una biblioteca de componentes compartida</b> entre <b>[TODO: N]</b> módulos, recortando el tiempo de desarrollo de features en <b>~[TODO: %]</b>.',
              'Lideré el diseño de contratos de API y el modelado de datos para <b>[TODO: N]</b> entidades, en colaboración estrecha con producto.',
            ],
          },
          {
            yearRange: '2023 — 2025',
            duration: '2 años',
            position: 'Desarrollador Full-Stack',
            company: { name: 'Halo Media', url: 'https://www.linkedin.com/company/halo-media/' },
            stack: 'MEAN · Azure DevOps · Cliente USA',
            responsibilities: [
              '<b>Entregué [TODO: 4] aplicaciones MEAN en producción</b> para un cliente empresarial estadounidense, asumiendo el código desde prototipo hasta release.',
              '<b>Refactoricé el módulo Angular más lento</b> de la suite — bajé el tiempo de carga de <b>[TODO: Xs] a [TODO: Ys]</b> y reduje el CLS en <b>[TODO: %]</b>.',
              '<b>Configuré pipelines de Azure DevOps</b> con pruebas automatizadas, pasando al equipo de despliegues manuales semanales a merges bajo demanda.',
            ],
          },
          {
            yearRange: '2019 — 2024',
            duration: '5 años',
            position: 'Desarrollador Full-Stack',
            company: { name: 'Globant', url: 'https://www.linkedin.com/company/globant/' },
            stack: '.NET · Angular · Empresas USA',
            responsibilities: [
              '<b>Construí y mantuve [TODO: 2] plataformas empresariales</b> (.NET / Angular) usadas por <b>[TODO: Nk]</b> usuarios diarios.',
              '<b>Migré [TODO: N] microservicios a OAuth2/JWT</b> sin downtime, liberando <b>[TODO: N+]</b> cambios en el primer trimestre.',
              '<b>Mentoricé a [TODO: N] desarrolladores junior</b> mediante revisiones de código y pair programming, elevando el throughput de merges del equipo en <b>~[TODO: %]</b>.',
            ],
          },
          {
            yearRange: '2019 — 2020',
            duration: '1 año · Único ingeniero',
            position: 'Desarrollador Full-Stack',
            company: { name: 'Apps2go Perú', url: 'https://www.linkedin.com/company/apps2go-per%C3%BA/' },
            stack: '.NET · Android · Único ingeniero',
            responsibilities: [
              '<b>Entregué de extremo a extremo una app Android de marketplace y su API en .NET</b> como único ingeniero, alcanzando <b>[TODO: N]</b> instalaciones en el primer trimestre.',
            ],
          },
          {
            yearRange: '2018 — 2019',
            duration: '1 año',
            position: 'Desarrollador Frontend',
            company: { name: 'Kodoti', url: 'https://www.linkedin.com/company/kodoti/' },
            stack: 'Vue.js · E-learning',
            responsibilities: [
              '<b>Construí el sitio público de e-learning en Vue.js</b> desde los diseños hasta el lanzamiento, dando soporte a <b>[TODO: N]</b> landing pages de cursos con componentes compartidos.',
            ],
          },
          {
            yearRange: '2017 — 2018',
            duration: '1 año · Junior',
            position: 'Desarrollador Full-Stack Jr',
            company: { name: 'Juntoz', url: 'https://www.linkedin.com/company/juntoz/' },
            stack: '.NET · Angular · Retail',
            responsibilities: [
              '<b>Contribuí a [TODO: 4] releases de e-commerce retail</b> como dev junior .NET/Angular — corregí <b>[TODO: N+]</b> bugs y entregué <b>[TODO: N+]</b> pequeñas features.',
            ],
          },
        ]
      : [
          {
            yearRange: '2025 — Present',
            duration: '1 yr · Current',
            position: 'Full-Stack Developer',
            company: { name: 'Nubelity', url: 'https://www.linkedin.com/company/nubelity-llc/' },
            stack: '.NET · Angular · Banking',
            responsibilities: [
              '<b>Architected the frontend and API layer</b> of a request-management platform for a <b>[TODO: Fortune-500 / specific sector]</b> bank, shipping the MVP in <b>[TODO: N months]</b>.',
              '<b>Standardized a shared component library</b> across <b>[TODO: N]</b> modules, cutting feature-build time by <b>~[TODO: %]</b>.',
              'Owned API contract design and data modeling for <b>[TODO: N]</b> entities, paired with product to keep scope crisp.',
            ],
          },
          {
            yearRange: '2023 — 2025',
            duration: '2 yrs',
            position: 'Full-Stack Developer',
            company: { name: 'Halo Media', url: 'https://www.linkedin.com/company/halo-media/' },
            stack: 'MEAN · Azure DevOps · US client',
            responsibilities: [
              '<b>Delivered [TODO: 4] production MEAN-stack applications</b> for a US enterprise client, owning code from prototype to release.',
              '<b>Refactored the slowest Angular module</b> in the suite — cut average page load from <b>[TODO: Xs] to [TODO: Ys]</b> and dropped Lighthouse CLS by <b>[TODO: %]</b>.',
              '<b>Set up Azure DevOps pipelines</b> with automated tests, moving the team from weekly manual deploys to on-demand merges.',
            ],
          },
          {
            yearRange: '2019 — 2024',
            duration: '5 yrs',
            position: 'Full-Stack Developer',
            company: { name: 'Globant', url: 'https://www.linkedin.com/company/globant/' },
            stack: '.NET · Angular · US enterprise',
            responsibilities: [
              '<b>Built and maintained [TODO: 2] enterprise platforms</b> (.NET / Angular) used by <b>[TODO: Nk]</b> daily users.',
              '<b>Migrated [TODO: N] microservices to OAuth2/JWT</b> with zero downtime, releasing <b>[TODO: N+]</b> changes in the first quarter.',
              '<b>Mentored [TODO: N] junior developers</b> through code reviews and pairing, raising team merge throughput by <b>~[TODO: %]</b>.',
            ],
          },
          {
            yearRange: '2019 — 2020',
            duration: '1 yr · Sole engineer',
            position: 'Full-Stack Developer',
            company: { name: 'Apps2go Perú', url: 'https://www.linkedin.com/company/apps2go-per%C3%BA/' },
            stack: '.NET · Android · Sole engineer',
            responsibilities: [
              '<b>Shipped a marketplace Android app and .NET API end-to-end</b> as sole engineer, reaching <b>[TODO: N]</b> installs in the first quarter.',
            ],
          },
          {
            yearRange: '2018 — 2019',
            duration: '1 yr',
            position: 'Frontend Developer',
            company: { name: 'Kodoti', url: 'https://www.linkedin.com/company/kodoti/' },
            stack: 'Vue.js · E-learning',
            responsibilities: [
              '<b>Built the public e-learning site in Vue.js</b> from designs to launch, supporting <b>[TODO: N]</b> course landing pages with shared components.',
            ],
          },
          {
            yearRange: '2017 — 2018',
            duration: '1 yr · Junior',
            position: 'Full-Stack Developer Jr',
            company: { name: 'Juntoz', url: 'https://www.linkedin.com/company/juntoz/' },
            stack: '.NET · Angular · Retail',
            responsibilities: [
              '<b>Contributed to [TODO: 4] retail e-commerce releases</b> as a junior .NET/Angular dev — fixed <b>[TODO: N+]</b> bugs and shipped <b>[TODO: N+]</b> small features.',
            ],
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
              { name: 'DevOps' },
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
              { name: 'DevOps' },
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

    this.softSkills = ES
      ? ['Resolución de problemas', 'Colaboración', 'Comunicación clara', 'Aprendizaje continuo', 'Adaptabilidad', 'Gestión del tiempo', 'Liderazgo', 'Fiabilidad']
      : ['Problem-solving', 'Collaboration', 'Clear communication', 'Continuous learning', 'Adaptability', 'Time management', 'Leadership', 'Reliability'];

    this.certifications = [
      { tech: 'Angular', url: 'https://www.udemy.com/certificate/UC-0c2da545-7a78-4d99-a127-c2aa86f98e3f/' },
      { tech: 'Node.js', url: 'https://www.udemy.com/certificate/UC-bff821ee-301a-463f-ad72-9639ee2888fe/' },
      { tech: '.NET', url: 'https://www.udemy.com/certificate/UC-ccccb339-13da-4cf8-91e0-92e95bdd64d9/' },
      { tech: 'Django', url: 'https://www.udemy.com/certificate/UC-f7caccc8-d888-423d-9a59-46441f690b2b/' },
      { tech: 'MySQL', url: 'https://www.udemy.com/certificate/UC-2f5e5be2-3395-4b05-ac53-fd3e708ba5ad/' },
      { tech: 'MongoDB', url: 'https://www.udemy.com/certificate/UC-2f5e5be2-3395-4b05-ac53-fd3e708ba5ad/' },
      { tech: 'DevOps', url: 'https://www.udemy.com/certificate/UC-d43b3357-bdc2-4792-b32c-f38a31059e1f/' },
    ];

    this.education = ES
      ? [{ degree: 'Bachiller en Ingeniería Informática', school: 'Universidad de Lima', dateRange: '2014 — 2020' }]
      : [{ degree: 'B.S. Informatics Engineering', school: 'University of Lima', dateRange: '2014 — 2020' }];

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
