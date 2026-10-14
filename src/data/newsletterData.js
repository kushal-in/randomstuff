// src/data/newsletterData.js

// 1. Import the raw markdown string (make sure this file actually exists in this folder!)
import rvoContent from './newsletters/RVO.md?raw';
import AoCContent from './newsletters/AoC.md?raw';
import Cpp23Content from './newsletters/c++23.md?raw';
import satContent from './newsletters/sat.md?raw';

export const newsletter = [
  {
    slug: 'advent-of-code',
    title: 'Advent of Code 2025',
    date: null,
    author: 'ScepticallySam',
    summary: "An introduction to the 12-day Advent of Code 2025 programming challenge, detailing puzzle mechanics and how to join the Programming Club's private leaderboard.",
    content: AoCContent, // 2. Assign the imported markdown here
    furtherReading: [ ]

  },
  {
    slug: 'rvo-cpp',
    title: 'Return Value Optimization (RVO)',
    date: null,
    author: 'tushar3q34',
    summary: 'A deep dive into C++ Return Value Optimization, analyzing assembly output across C++11 and C++17.',
    content: rvoContent, // 2. Assign the imported markdown here
    furtherReading: []
  },
  {
    slug: 'c++23',
    title: 'New feature in C++ 23',
    date: null,
    author: 'ScepticallySam',
    summary: "A brief introduction to the std::expected feature introduced in C++23, highlighting its benefits for explicit, type-safe, and composable error handling compared to traditional exceptions and std::optional.",
    content: Cpp23Content, // 2. Assign the imported markdown here
    furtherReading: [
      {
        title: 'std::expected',
        url: 'https://en.cppreference.com/w/cpp/utility/expected.html',
        type: 'read' // 'read' or 'video'
      },
      {
        title: 'error handling',
        url: 'https://www.youtube.com/watch?v=Vz40rDiWnN8',
        type: 'video' // 'read' or 'video'
      },
    ]

  },
  {
    slug: '2-sat',
    title: '2-SAT problem and its polynomial time algorithm',
    date: null,
    author: 'Suraj Kagalkar',
    summary: "Explains 2-SAT — a Boolean satisfiability problem with two-literal clauses — solved in polynomial time by building an implication graph and checking Strongly Connected Components (via Kosaraju's algorithm) for contradictions. Includes a working C++ implementation.",
    content: satContent, // 2. Assign the imported markdown here
    furtherReading: [
      {
        title: 'A clear, high-level overview of 2-SAT: definitions, implication graphs, algorithms and applications.',
        url: 'https://en.wikipedia.org/wiki/2-satisfiability',
        type: 'read' // 'read' or 'video'
      },
      {
        title: 'A compact, implementation-focused guide (implication graph + SCCs) with code and complexity notes',
        url: 'https://cp-algorithms.com/graph/2SAT.html',
        type: 'read' // 'read' or 'video'
      },
      {
        title: '“How to solve the 2-SAT problem in POLYNOMIAL TIME?”: A concise video walkthrough showing the implication-graph + SCC method step-by-step.',
        url: 'https://www.youtube.com/watch?v=Ku-jJ0G4tIc',
        type: 'video' // 'read' or 'video'
      },
      {
        title: 'Algorithm for 2-satisfiability problem: Community Q&A with practical algorithmic tips, pitfalls, and implementation pointers from experienced coders.',
        url: 'https://stackoverflow.com/questions/1663104/algorithm-for-2-satisfiability-problem',
        type: 'read' // 'read' or 'video'
      },
    ]

  }

];

export const getNewsletterBySlug = (slug) => newsletter.find(n => n.slug === slug);