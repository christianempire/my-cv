import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
  educationDegrees: { title: string; institution: string; dateRange: string }[] = [
    {
      title: 'Bachelor of Informatics Engineering',
      institution: 'University of Lima',
      dateRange: '2014 - 2020',
    },
  ];
  highlights: string[] = [
    'I’m a Full-Stack Developer with 8+ years of experience building web applications, both on the frontend and backend. Over the years, I’ve worked on all kinds of projects—from internal tools to user-facing platforms—always trying to write clean, efficient, and reliable code.',
    'I usually work with JavaScript, TypeScript, Angular, React, Node.js, and NestJS, and I’m also comfortable with .NET, Python (Django), and databases like MySQL and MongoDB. I’ve set up CI/CD pipelines, worked with Docker, and used tools like Azure DevOps, GitHub, and Jira.',
    'I’m used to working remotely and value clear, respectful communication and delivering work on time. I like learning new tech and figuring out the best way to build something that just works well.',
  ];
  softSkills: string[] = [
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
  spokenLanguages: { language: string; level: number }[] = [
    {
      language: 'Spanish',
      level: 10,
    },
    {
      language: 'English',
      level: 9,
    },
  ];
  techSkills: {
    tech: string;
    level: number;
  }[] = [
    {
      tech: '.NET',
      level: 100,
    },
    {
      tech: 'Angular',
      level: 100,
    },
    {
      tech: 'C#',
      level: 100,
    },
    {
      tech: 'DevOps',
      level: 60,
    },
    {
      tech: 'Django',
      level: 40,
    },
    {
      tech: 'Docker',
      level: 40,
    },
    {
      tech: 'Git',
      level: 80,
    },
    {
      tech: 'JavaScript',
      level: 100,
    },
    {
      tech: 'MongoDB',
      level: 60,
    },
    {
      tech: 'Node.js',
      level: 80,
    },
    {
      tech: 'Python',
      level: 80,
    },
    {
      tech: 'SQL',
      level: 80,
    },
    {
      tech: 'TypeScript',
      level: 100,
    },
    {
      tech: 'Unity',
      level: 40,
    },
  ].sort((a, b) => b.level - a.level);
  workExperiences: {
    company: { name: string; url: string };
    dateRange: string;
    position: string;
    responsibilities: string[];
  }[] = [
    {
      company: {
        name: 'Halo Media',
        url: 'https://www.linkedin.com/company/halo-media/',
      },
      dateRange: 'February 2023 - Present',
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
      dateRange: 'September 2019 - June 2024',
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
        name: 'Juntoz',
        url: 'https://www.linkedin.com/company/juntoz/',
      },
      dateRange: 'May 2017 - June 2018',
      position: 'Full-Stack Developer Junior | .NET & Angular',
      responsibilities: [
        'As a junior Full-Stack Developer, I assisted in the delivery of 4 projects for retail companies. Contributed to the design and development of front-end components and supported the implementation of server-side logic and APIs.',
        'Work with product managers, designers, and senior developers to implement features and fix bugs. Participate in code reviews to learn best practices and improve code quality.',
        'Attend sprint planning, daily stand-ups, and retrospective meetings. Break down tasks into manageable pieces and provide status updates on progress.',
      ],
    },
  ];
}
