import { FileSystem } from './types';

export const initialFileSystem: FileSystem = {
  Home: {
    About: {
      'bio.txt': 'Hi! I\'m Vlad, a software engineer passionate about systems programming and web development.',
      'skills.txt': 'C, TypeScript, JavaScript, React, Next.js, System Programming',
      'contact.txt': 'Email: vlad@example.com\nGitHub: github.com/vladz5\nLinkedIn: linkedin.com/in/vlad'
    },
    Projects: {
      'shell.c': 'Custom Unix shell built in C with pipes, I/O redirection, and built-in commands.',
      'portfolio.txt': 'Portfolio website built with Next.js and TypeScript featuring an interactive terminal.',
      'readme.md': 'Check out my projects on GitHub!'
    },
    Documents: {
      'resume.pdf': '[Resume content - Download available via resume command]',
      'experience.txt': 'Software Engineer at...\n[Work experience details]'
    }
  }
};