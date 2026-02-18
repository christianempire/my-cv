import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  lang: 'EN' | 'ES' = 'EN';
  headers: {
    main?: string;
    aboutMe?: string;
    workExperience?: string;
    techStack?: string;
    softSkills?: string;
    certifications?: string;
    education?: string;
    languages?: string;
  } = {};
  certifications: { tech: string; url: string }[] = [
    {
      tech: 'Angular',
      url: 'https://www.udemy.com/certificate/UC-0c2da545-7a78-4d99-a127-c2aa86f98e3f/',
    },
    {
      tech: 'NodeJS',
      url: 'https://www.udemy.com/certificate/UC-bff821ee-301a-463f-ad72-9639ee2888fe/',
    },
    {
      tech: '.NET',
      url: 'https://www.udemy.com/certificate/UC-ccccb339-13da-4cf8-91e0-92e95bdd64d9/',
    },
    {
      tech: 'Django',
      url: 'https://www.udemy.com/certificate/UC-f7caccc8-d888-423d-9a59-46441f690b2b/',
    },
    {
      tech: 'MySQL',
      url: 'https://www.udemy.com/certificate/UC-2f5e5be2-3395-4b05-ac53-fd3e708ba5ad/',
    },
    {
      tech: 'MongoDB',
      url: 'https://www.udemy.com/certificate/UC-2f5e5be2-3395-4b05-ac53-fd3e708ba5ad/',
    },
    {
      tech: 'DevOps',
      url: 'https://www.udemy.com/certificate/UC-d43b3357-bdc2-4792-b32c-f38a31059e1f/',
    },
  ];
  educationDegrees: { title: string; institution: string; dateRange: string }[] = [];
  highlights: string[] = [];
  softSkills: string[] = [];
  spokenLanguages: { language: string; proficiency: string; level: number }[] = [];
  techSkills: {
    tech: string;
    years: number;
    level: number;
  }[] = [
    {
      tech: '.NET',
      years: 9,
      level: 100,
    },
    {
      tech: 'Angular',
      years: 9,
      level: 100,
    },
    {
      tech: 'AWS',
      years: 1,
      level: 13,
    },
    {
      tech: 'C#',
      years: 9,
      level: 100,
    },
    {
      tech: 'DevOps',
      years: 7,
      level: 75,
    },
    {
      tech: 'Docker',
      years: 2,
      level: 25,
    },
    {
      tech: 'Git',
      years: 9,
      level: 100,
    },
    {
      tech: 'JavaScript',
      years: 9,
      level: 100,
    },
    {
      tech: 'MongoDB',
      years: 2,
      level: 25,
    },
    {
      tech: 'Node.js',
      years: 5,
      level: 50,
    },
    {
      tech: 'Python',
      years: 2,
      level: 25,
    },
    {
      tech: 'React',
      years: 2,
      level: 25,
    },
    {
      tech: 'SQL',
      years: 7,
      level: 75,
    },
    {
      tech: 'TypeScript',
      years: 5,
      level: 50,
    },
  ].sort((a, b) => b.level - a.level);
  workExperiences: {
    company: { name: string; url: string };
    dateRange: string;
    position: string;
    responsibilities: string[];
  }[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      const langParam = params.get('lang');
      console.log('Lang param:', langParam);
      if (langParam === 'ES' || langParam === 'EN') {
        this.lang = langParam;
      }

      if (this.lang === 'ES') {
        console.log('Language set to Spanish (ES)');
      } else {
        console.log('Language set to English (EN)');
      }

      this.headers = {
        main: this.lang === 'ES' ? 'Desarrollador Full-Stack' : 'Full-Stack Developer',
        aboutMe: this.lang === 'ES' ? 'Sobre mí' : 'About Me',
        workExperience: this.lang === 'ES' ? 'Experiencia Laboral' : 'Work Experience',
        techStack: this.lang === 'ES' ? 'Stack Tecnológico' : 'Tech Stack',
        softSkills: this.lang === 'ES' ? 'Habilidades Blandas' : 'Soft Skills',
        certifications: this.lang === 'ES' ? 'Certificaciones' : 'Certifications',
        education: this.lang === 'ES' ? 'Educación' : 'Education',
        languages: this.lang === 'ES' ? 'Idiomas' : 'Languages',
      };
      this.educationDegrees = [
        this.lang === 'ES'
          ? {
              title: 'Bachiller en Ingeniería Informática',
              institution: 'Universidad de Lima',
              dateRange: '2014 - 2020',
            }
          : {
              title: 'Bachelor of Informatics Engineering',
              institution: 'University of Lima',
              dateRange: '2014 - 2020',
            },
      ];
      this.highlights =
        this.lang === 'ES'
          ? [
              'Soy un Desarrollador Full-Stack con más de 9 años de experiencia construyendo aplicaciones web, tanto en frontend como en backend. A lo largo de los años, he trabajado en todo tipo de proyectos, desde herramientas internas hasta plataformas orientadas al usuario, siempre procurando escribir código limpio, eficiente y confiable.',
              'Estoy acostumbrado a trabajar de forma remota y valoro la comunicación clara y respetuosa, así como entregar el trabajo a tiempo. Me gusta aprender nuevas tecnologías y encontrar la mejor manera de construir algo que simplemente funcione bien.',
            ]
          : [
              'I’m a Full-Stack Developer with 9+ years of experience building web applications, both on the frontend and backend. Over the years, I’ve worked on all kinds of projects—from internal tools to user-facing platforms—always trying to write clean, efficient, and reliable code.',
              'I’m used to working remotely and value clear, respectful communication and delivering work on time. I like learning new tech and figuring out the best way to build something that just works well.',
            ];
      this.softSkills =
        this.lang === 'ES'
          ? [
              'Resolución de Problemas',
              'Colaboración en Equipo',
              'Comunicación Efectiva',
              'Aprendizaje Continuo',
              'Adaptabilidad',
              'Gestión del Tiempo',
              'Creatividad',
              'Liderazgo',
              'Fiabilidad',
              'Innovación',
              'Flexibilidad',
            ]
          : [
              'Problem-Solving',
              'Team Collaboration',
              'Effective Communication',
              'Continuous Learning',
              'Adaptability',
              'Time Management',
              'Creativity',
              'Leadership',
              'Reliability',
              'Innovation',
              'Flexibility',
            ];
      this.spokenLanguages =
        this.lang === 'ES'
          ? [
              {
                language: 'Español',
                proficiency: 'Nativo',
                level: 10,
              },
              {
                language: 'Inglés',
                proficiency: 'Fluido',
                level: 9,
              },
            ]
          : [
              {
                language: 'Spanish',
                proficiency: 'Native',
                level: 10,
              },
              {
                language: 'English',
                proficiency: 'Fluent',
                level: 9,
              },
            ];
      this.workExperiences =
        this.lang === 'ES'
          ? [
              {
                company: {
                  name: 'NUBELITY',
                  url: 'https://www.linkedin.com/company/nubelity-llc/',
                },
                dateRange: '2025 - 2026 · 1 año',
                position: 'Desarrollador Full-Stack | .NET & Angular',
                responsibilities: [
                  'Como Desarrollador Full-Stack, contribuí a sentar las bases de una plataforma de solicitudes para una empresa multinacional del sector bancario. Diseñé, desarrollé y mantuve el frontend, así como la lógica del servidor, APIs y bases de datos.',
                  'Trabajé estrechamente con gerentes de producto, diseñadores y otros desarrolladores para entregar software de alta calidad. Participé en revisiones de código y ayudé a integrar elementos orientados al usuario con la lógica del servidor.',
                  'Contribuí en la planificación de sprints, reuniones diarias y retrospectivas. Dividí requisitos en tareas manejables y aseguré la entrega oportuna de funcionalidades y correcciones de errores.',
                ],
              },
              {
                company: {
                  name: 'Halo Media',
                  url: 'https://www.linkedin.com/company/halo-media/',
                },
                dateRange: '2023 - 2025 · 2 años',
                position: 'Desarrollador Full-Stack | MEAN Stack',
                responsibilities: [
                  'Como Desarrollador Full-Stack, contribuí activamente al desarrollo de 4 proyectos para una importante empresa estadounidense. Diseñé, construí y mantuve el código frontend, y desarrollé lógica del servidor, APIs y bases de datos.',
                  'Escribí código limpio, mantenible y bien documentado siguiendo las mejores prácticas. Refactoricé código existente para mejorar el rendimiento y la legibilidad, e implementé pruebas automatizadas e integración continua con Azure DevOps.',
                  'Trabajé estrechamente con gerentes de producto, diseñadores y otros desarrolladores para entregar software de alta calidad. Participé en revisiones de código y ayudé a integrar elementos orientados al usuario con la lógica del servidor.',
                  'Contribuí en la planificación de sprints, reuniones diarias y retrospectivas. Dividí requisitos en tareas manejables y aseguré la entrega oportuna de funcionalidades y correcciones de errores.',
                ],
              },
              {
                company: {
                  name: 'Globant',
                  url: 'https://www.linkedin.com/company/globant/',
                },
                dateRange: '2019 - 2024 · 5 años',
                position: 'Desarrollador Full-Stack | .NET & Angular',
                responsibilities: [
                  'Como Desarrollador Full-Stack, contribuí activamente al desarrollo de 2 proyectos a gran escala para empresas estadounidenses. Diseñé, construí y mantuve el código frontend, y desarrollé lógica del servidor, APIs y bases de datos.',
                  'Escribí código limpio, mantenible y bien documentado siguiendo las mejores prácticas. Refactoricé código existente para mejorar el rendimiento y la legibilidad, e implementé pruebas automatizadas e integración continua con Azure DevOps.',
                  'Trabajé estrechamente con gerentes de producto, diseñadores y otros desarrolladores para entregar software de alta calidad. Participé en revisiones de código y ayudé a integrar elementos orientados al usuario con la lógica del servidor.',
                  'Contribuí en la planificación de sprints, reuniones diarias y retrospectivas. Dividí requisitos en tareas manejables y aseguré la entrega oportuna de funcionalidades y correcciones de errores.',
                ],
              },
              {
                company: {
                  name: 'Apps2go Perú',
                  url: 'https://www.linkedin.com/company/apps2go-per%C3%BA/',
                },
                dateRange: '2019 - 2020 · 1 año',
                position: 'Desarrollador Full-Stack | .NET & Android',
                responsibilities: [
                  'Como Desarrollador Full-Stack, desarrollé una aplicación móvil de marketplace y su API para el propietario de la empresa, basándome en los diseños y requisitos proporcionados.',
                ],
              },
              {
                company: {
                  name: 'KODOTI',
                  url: 'https://www.linkedin.com/company/kodoti/',
                },
                dateRange: '2018 - 2019 · 1 año',
                position: 'Desarrollador Frontend | Vue.js',
                responsibilities: [
                  'Como Desarrollador Frontend, desarrollé el sitio web de una plataforma de e-learning para el propietario de la empresa, basándome en los diseños y requisitos proporcionados.',
                ],
              },
              {
                company: {
                  name: 'Juntoz',
                  url: 'https://www.linkedin.com/company/juntoz/',
                },
                dateRange: '2017 - 2018 · 1 año',
                position: 'Desarrollador Full-Stack Junior | .NET & Angular',
                responsibilities: [
                  'Como Desarrollador Full-Stack Junior, asistí en la entrega de 4 proyectos para empresas de retail. Contribuí al diseño y desarrollo de componentes frontend y apoyé la implementación de lógica del servidor y APIs.',
                  'Trabajé con gerentes de producto, diseñadores y desarrolladores senior para implementar funcionalidades y corregir errores. Participé en revisiones de código para aprender mejores prácticas y mejorar la calidad del código.',
                  'Asistí a la planificación de sprints, reuniones diarias y retrospectivas. Dividí tareas en partes manejables y proporcioné actualizaciones de estado sobre el progreso.',
                ],
              },
            ]
          : [
              {
                company: {
                  name: 'NUBELITY',
                  url: 'https://www.linkedin.com/company/nubelity-llc/',
                },
                dateRange: '2025 - 2026 · 1 yr',
                position: 'Full-Stack Developer | .NET & Angular',
                responsibilities: [
                  'As a Full-Stack Developer, I contributed to laying the foundations of a request platform for a multinational company in the banking sector. I designed, developed, and maintained the frontend, as well as the server-side logic, APIs, and databases.',
                  'Work closely with product managers, designers, and other developers to deliver high-quality software. Participate in code reviews and assist in integrating user-facing elements with server-side logic.',
                  'Contribute to sprint planning, daily stand-ups, and retrospective meetings. Break down requirements into manageable tasks and ensure timely delivery of features and bug fixes.',
                ],
              },
              {
                company: {
                  name: 'Halo Media',
                  url: 'https://www.linkedin.com/company/halo-media/',
                },
                dateRange: '2023 - 2025 · 2 yrs',
                position: 'Full-Stack Developer | MEAN Stack',
                responsibilities: [
                  'As a Full-Stack Developer, I actively contributed to the development of 4 projects for a major American company. I designed, built, and maintained front-end code, and developed server-side logic, APIs, and databases.',
                  'Write clean, maintainable, and well-documented code using best practices. Refactor existing code to enhance performance and readability, and implement automated testing and continuous integration with Azure DevOps.',
                  'Work closely with product managers, designers, and other developers to deliver high-quality software. Participate in code reviews and assist in integrating user-facing elements with server-side logic.',
                  'Contribute to sprint planning, daily stand-ups, and retrospective meetings. Break down requirements into manageable tasks and ensure timely delivery of features and bug fixes.',
                ],
              },
              {
                company: {
                  name: 'Globant',
                  url: 'https://www.linkedin.com/company/globant/',
                },
                dateRange: '2019 - 2024 · 5 yrs',
                position: 'Full-Stack Developer | .NET & Angular',
                responsibilities: [
                  'As a Full-Stack Developer, I actively contributed to the development of 2 large-scale projects for American companies. I designed, built, and maintained front-end code, and developed server-side logic, APIs, and databases.',
                  'Write clean, maintainable, and well-documented code using best practices. Refactor existing code to enhance performance and readability, and implement automated testing and continuous integration with Azure DevOps.',
                  'Work closely with product managers, designers, and other developers to deliver high-quality software. Participate in code reviews and assist in integrating user-facing elements with server-side logic.',
                  'Contribute to sprint planning, daily stand-ups, and retrospective meetings. Break down requirements into manageable tasks and ensure timely delivery of features and bug fixes.',
                ],
              },
              {
                company: {
                  name: 'Apps2go Perú',
                  url: 'https://www.linkedin.com/company/apps2go-per%C3%BA/',
                },
                dateRange: '2019 - 2020 · 1 yr',
                position: 'Full-stack Developer | .NET & Android',
                responsibilities: [
                  'As a Full-Stack Developer, I developed a marketplace mobile app and its API for the company owner, based on provided designs and requirements.',
                ],
              },
              {
                company: {
                  name: 'KODOTI',
                  url: 'https://www.linkedin.com/company/kodoti/',
                },
                dateRange: '2018 - 2019 · 1 yr',
                position: 'Frontend Developer | Vue.js',
                responsibilities: [
                  'As a Frontend Developer, I developed an e-learning platform website for the company owner, based on provided designs and requirements.',
                ],
              },
              {
                company: {
                  name: 'Juntoz',
                  url: 'https://www.linkedin.com/company/juntoz/',
                },
                dateRange: '2017 - 2018 · 1 yr',
                position: 'Full-Stack Developer Junior | .NET & Angular',
                responsibilities: [
                  'As a junior Full-Stack Developer, I assisted in the delivery of 4 projects for retail companies. Contributed to the design and development of front-end components and supported the implementation of server-side logic and APIs.',
                  'Work with product managers, designers, and senior developers to implement features and fix bugs. Participate in code reviews to learn best practices and improve code quality.',
                  'Attend sprint planning, daily stand-ups, and retrospective meetings. Break down tasks into manageable pieces and provide status updates on progress.',
                ],
              },
            ];
    });
  }

  getYearLabel(years: number): string {
    return years === 1 ? (this.lang === 'ES' ? 'año' : 'yr') : this.lang === 'ES' ? 'años' : 'yrs';
  }
}
