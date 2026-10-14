/**
 * EVENTS DATA — Grouped by Event Series
 *
 * Structure:
 *   eventGroups[] → each group has a name + events[]
 *   Each event has a `slug` used for its internal route: /events/:slug
 *
 * Detail-page fields (all nullable — set null until real content is added):
 *   poster         – path to poster image (e.g., '/events/bitshift-poster.png')
 *   venue          – string (e.g., 'Online' or 'CLT, IIT Madras')
 *   time           – string (e.g., '5:00 PM – 7:30 PM')
 *   details        – long description / markdown text for the detail page
 *   registrationLink – external registration URL
 *   contestLink    – external contest/codeforces URL
 *   problemsetLink – external link to a problemset platform (e.g. HackerRank)
 *   problemSetters - list of strings of names
 *   teamconducted - list of strings of names
 *   slidesPdf      – path(s) to slides PDF(s) inside public folder
 *   problemsetPdf  – path(s) to problemset PDF(s) inside public folder
 *   solutionsPdf   – path(s) to solutions PDF(s) inside public folder
 *    category- past or upcoming
 *
 * TO ADD A NEW EVENT:
 *   1. Find the right group (or create a new one)
 *   2. Add an event object with a unique slug
 *   3. Set category: 'upcoming' for live events, 'past' when done
 */
const base = import.meta.env.BASE_URL;
export const assetPath = (path) => `${base}${path}`;

export const eventGroups = [
  {
    name: "Freshie Roadmaps",
    events:[
      {
        slug: "MCPC-2026",
        title: "Freshie Roadmaps",
        date:" 2026-08-15",
        category: "past",
        description: " Join us for **Freshie Roadmaps**! The Programming Club presents **\"The Art of Doing Less\"**—an absolute beginner's intro to Dynamic Programming. Learn to break down complex problems and optimize your code efficiently.",
        poster: 'events/mcpc-2026/mcpc26.jpeg',
        posters: ["events/mcpc-2026/g1.jpg", "events/mcpc-2026/g2.jpg", "events/mcpc-2026/g3.jpg", "events/mcpc-2026/g4.jpg", "events/mcpc-2026/g5.jpg", "events/mcpc-2026/g6.jpg"],
        venue: "SSB 134",
        time: "4:30 PM",
        details: "### What to expect\nThis session will bridge the gap between basic problem-solving and algorithmic optimization. We will begin with a simple puzzle about climbing stairs to understand event branching, and discover how it links to the Fibonacci sequence. You'll learn why calculating recursively from the top fails for large numbers and how to optimize your code so the same values aren't calculated again and again.\n\n### Prerequisites\n* No prior experience in dynamic programming required, just a willingness to learn!\n* Basic logical and problem-solving skills.\n* Familiarity with basic mathematical concepts like exponents, binary expansions, and matrices.\n\n### Syllabus\n1. **The Recursion Trap:** Breaking down problems using the stair-climbing puzzle and understanding the pitfalls of naive recursive functions.\n2. **Linear Iteration:** Learning to calculate from the bottom up to drastically reduce computations (e.g., dropping from 177 nodes to just 11).\n3. **Binary Matrix Exponentiation:** An introduction to using the Fibonacci matrix and the \"exponent trick\" to achieve logarithmic time complexity.",
        registrationLink: null,
        contestLink: null,
        problemsetLink: null,
        teamConducted: ["V Sathvik Reddy","Siddharth R","Siddharth Maira"],
        slidesPdf: "events/mcpc-2026/mcpc26slides.pdf",
        problemSetters: ["Rishhilingam C N", "Atharva Mhatre", "Saatvik Rai", "Mukunthan K U"],
        problemsetPdf: 'events/mcpc-2026/mcpc26problems.pdf',
        solutionsPdf: 'events/mcpc-2026/mcpc26sol.pdf',

      }
    ]
  },
  {
    name: "Intro to Programming",
    events: [
      {
        slug: "PC-1010-1020",
        title: "PC 1010 & PC 1020",
        date: "2025-08-18",
        category: "past",
        description:
          "Join us for a **comprehensive two-part series** on C++ and Competitive Programming! We will cover everything from the absolute basics of C++ and navigating Codeforces to advanced development concepts like classes and pointers.\n\n*Perfect for beginners looking to dive into competitive programming and master C++ development.*",
        poster: "events/pc-1010-1020/pc-1010-1020.jpg",
        posters: [
          "events/pc-1010-1020/g1.jpg",
          "events/pc-1010-1020/g2.jpg",
          "events/pc-1010-1020/g3.jpg",
          "events/pc-1010-1020/g4.jpg",
          "events/pc-1010-1020/g5.jpg",
          "events/pc-1010-1020/g6.jpg",
        ],
        venue: "CRC 102",
        time: "7:30 PM",
        details:
          "### What to expect\nThis two-part event will bridge the gap between basic programming and competitive problem-solving. We will begin with the fundamentals of C++ and the Codeforces platform, before diving deep into object-oriented programming and memory management in C++.\n\n### Prerequisites\n* No prior experience in C++ required, just a willingness to learn!\n* Basic logical and problem-solving skills.\n* A laptop with a working C++ compiler and IDE.\n\n### Syllabus\n1. **C++ & CP Basics:** Introduction to C++ syntax, basic competitive programming paradigms, and getting started on Codeforces.\n2. **Advanced C++ Development:** Deep dive into Object-Oriented Programming (Classes) and memory management (Pointers).",
        registrationLink: null,
        contestLink: null,
        problemsetLink: null,
        teamConducted: null,
        slidesPdf: [
          "events/pc-1010-1020/PC-1010.pdf",
          "events/pc-1010-1020/PC-1020.pdf",
        ],
        problemSetters: null,
        problemsetPdf:null,
        solutionsPdf:null,
      },
    ],
  },
  {
    name: "CPS",
    events: [
      {
        slug: "cps-1",
        title: "Intro to Programming: CPS - 1",
        date: " 2026-08-22",
        category: "past",
        description: "Ready to take your first step into the world of coding?\nThe Programming Club is back for a session to kickstart your coding journey!\n\n**INTRO TO PROGRAMMING: CPS-1**\nCovering basics of **C++**, **Competitive Programming** and **Codeforces**.",
        poster: 'events/cps-1/cps-1.jpg',
        posters: ['events/cps-1/g1.jpg', 'events/cps-1/g2.jpg', 'events/cps-1/g3.jpg', 'events/cps-1/g4.jpg', 'events/cps-1/g5.jpg' ],
        venue: "CRC 103",
        time: "7:15 PM",
        details: "### What to expect\nKickstart your coding journey, connect with peers, and learn programming basics.\n\n### Prerequisites\n* Fully charged laptop.\n* Enthusiasm!\n\n### Syllabus\n1. **C++ Basics:** Core syntax and fundamentals.\n2. **Competitive Programming:** Algorithmic problem-solving.\n3. **Codeforces:** Platform navigation and practice.",
        registrationLink: null,
        contestLink: null,
        problemsetLink: 'https://codeforces.com/group/du4g5GNE7E/contests',
        teamConducted: ["Harshvardhan Jaju", "Aayush Ranjan", "Chaithanya Parama Shivam"],
        slidesPdf: 'events/cps-1/cps1.pdf',
        problemSetters: null,
        problemsetPdf:null,
        solutionsPdf: null,
      },
      {
        slug: "cps-2",
        title: "CPS - 2",
        date: "2025-09-14",
        category: "completed",
        description:
          "The Programming Club is back to dive into the real weapons of Competitive Programming! It’s time to skip the long ways and make your code much faster – like a pro.\n\n*Perfect for anyone looking to boost their problem-solving, add speed to their code, explore new concepts, or just have some fun!*",
        poster: "events/cps-2/cps2.jpg",
        posters: [
          "events/cps-2/g1.jpg",
          "events/cps-2/g2.jpg",
          "events/cps-2/g3.jpg",
        ],
        venue: "CS36, CS Block",
        time: "6:00 PM – 8:30 PM",
        details:
          "### What to expect\nThis session focuses on essential techniques to optimize your code and solve problems more efficiently. We will introduce you to powerful built-in tools and fundamental algorithms that are crucial for any competitive programmer.\n\n### Prerequisites\n* Basic knowledge of C++ syntax and general programming concepts.\n* A laptop with a working IDE.\n\n### Syllabus\n1. **Standard Template Library (STL):** Utilizing built-in data structures and functions.\n2. **Prefix Sum:** Optimizing range queries for faster execution.\n3. **Binary Search:** Efficiently finding elements and solving monotonic functions.",
        registrationLink: null,
        contestLink: null,
        problemsetLink: null,
        teamConducted: null,
        slidesPdf: "events/cps-2/cps2.pdf",
        problemsetPdf: null,
        solutionsPdf: null
      },
      {
        slug: "cps-3",
        title: "CPS - 3",
        date: "2026-04-13",
        category: "past",
        description:
          "Ever wondered how Google Maps finds the fastest route or how social networks suggest friends? The Programming Club is hosting an introductory session to get you started with Graphs, one of the most powerful data structures in computer science!\n\n*Perfect for beginners eager to explore advanced data structures and their real-world applications.*",
        poster: "events/cps-3/cps-3.jpeg",
        posters: null,
        venue: null,
        time: "8:45 PM",
        details:
          "### What to expect\nThis session will unpack the building blocks of Graph Theory. We will explore how to represent complex networks and navigate them efficiently using foundational algorithms.\n\n### Prerequisites\n* Basic understanding of C++ and data structures (like arrays and vectors).\n* A laptop with a working IDE.\n\n### Syllabus\n1. **Fundamentals:** Nodes, edges, and graph representations.\n2. **Traversals:** Master BFS and DFS from scratch.\n3. **Shortest Path Algorithms:** Introduction to finding the most efficient routes.",
        registrationLink: null,
        contestLink: null,
        problemsetLink: null,
        teamConducted: null,
        slidesPdf: null,
        problemsetPdf: null,
        solutionsPdf: null
      },
    ],
  },
  {
    name: "SDS",
    events: [
      {
        slug: "sds-1",
        title: "SDS - 1",
        date: "2026-09-05",
        category: "completed",
        description:
          "The Programming Club is Back with SDS-1!\n\nLearn how to leverage **C++'s true power** to build scalable and understandable code—right from the basics!",
        poster: "events/sds-1/sds-1.jpeg",
        posters: ["events/sds-1/g1.jpeg", "events/sds-1/g2.jpeg", "events/sds-1/g3.jpeg", "events/sds-1/g4.jpeg", "events/sds-1/g5.jpeg", "events/sds-1/g6.jpeg"],
        venue: "SSB 134",
        time: "4:30 PM – 7:30 PM",
        details:
          "### What to Expect\nThis session introduces core C++ programming concepts essential for software development. Through practical, real-world examples—such as designing a Spotify playlist—you will learn how to structure data, organize code into reusable components, and optimize memory management.\n\n### Prerequisites\n* A fully charged laptop\n* Enthu!\n\n### Syllabus\n1. **Containers & Sequences:** Fixed-size Arrays, dynamic `std::vector`, and `std::string` manipulation.\n2. **Modular Code & Reusability:** Designing functions, parameters, and return types.\n3. **Data Modeling & OOP:** Grouping data with `struct` and encapsulating logic using `class`, access specifiers (`public`, `private`), constructors, and getters/setters.\n4. **Memory Management & Arguments:** Understanding pointers vs. references, dereferencing, and Pass-by-Value vs. Pass-by-Reference.",
        registrationLink: null,
        contestLink: 'https://www.hackerrank.com/sds-1-contest',
        problemsetLink: 'https://colab.research.google.com/drive/1gYKWhJZtZmCXBWdSKha0QUh5iFoHrN0-?usp=sharing',
        teamConducted: ['Veer Mani Tripathi', 'Mukunthan K U','Sasanka Mouli G'],
        slidesPdf: "events/sds-1/sds-1.pdf",
        problemsetPdf: null,
        solutionsPdf: null
      },
      {
        slug: "sds-2",
        title: "SDS – 2",
        date: "2025-09-25",
        category: "past",
        description:
          "Ever saved a file as project_final.cpp, then project_final_v2.cpp, then project_REALLY_final.cpp? There’s a better way! Come learn the magic of Git & GitHub with us at The Programming Club. Think of it as a time machine for your code and the best way to work on team projects.\n\n*Designed for absolute beginners. No prior experience needed!*",
        poster: "events/sds-2/sds-2.jpg",
        posters: [
          "events/sds-2/g1.jpg",
          "events/sds-2/g2.jpg",
          "events/sds-2/g3.jpg",
        ],
        venue: "CRC 101",
        time: "6:00 PM",
        details:
          "### What to expect\nThis session will introduce you to the fundamentals of version control. You will learn how to track changes securely, manage your codebase, and collaborate seamlessly on team projects using Git and GitHub.\n\n### Prerequisites\n* Absolutely none! This is designed for beginners.\n* A laptop to practice the commands and set up your account.\n\n### Syllabus\n1. **Version Control Basics:** Understanding why we track code changes and how it saves time.\n2. **Git Commands:** Essential local commands to stage, commit, and manage your repository.\n3. **GitHub:** Hosting your code, collaborating, and working efficiently in teams.",
        registrationLink: null,
        contestLink: null,
        problemsetLink: null,
        teamConducted: null,
        slidesPdf: "events/sds-2/sds-2.pdf",
        problemsetPdf: null,
        solutionsPdf: null
      },
    ],
  },
  {
    name: "OSS",
    events: [
      {
        slug: "oss-1",
        title: "OSS – 1",
        date: "2025-09-25",
        category: "past",
        description:
          "The Programming Club is thrilled to announce its inaugural session: Open Source Session – 1 (OSS-1), marking the beginning of our journey to Google Summer of Code (GSoC) mentorship for next summer! We’ll also prep you for Hacktoberfest, one of the largest open-source contributor events!\n\n*Perfect for anyone looking to dive into open source, build their developer profile, and learn directly from past contributors.*",
        poster: "events/oss-1/oss-1.jpg",
        posters: [
          "events/oss-1/g1.jpg",
          "events/oss-1/g2.jpg",
          "events/oss-1/g3.jpg",
        ],

        venue: "CRC 101",
        time: "7:30 PM",
        details:
          "### What to expect\nThis session will guide you through the open-source landscape. You will gain valuable insights from past GSoC contributors, learn how to make your first contributions, and get ready to showcase your skills during Hacktoberfest.\n\n### Prerequisites\n* No prior open-source experience needed!\n* A laptop, a GitHub account (recommended), and an eagerness to collaborate.\n\n### Syllabus\n1. **Introduction to Open Source:** How to start contributing and effectively build your profile.\n2. **Hacktoberfest Prep:** Everything you need to know to participate and showcase your skills (Join the IITM Discord: https://discord.gg/vJMSmwh4).\n3. **GSoC Mentorship:** Insights from past GSoC contributors and details on joining our mentorship program (Application: https://forms.gle/AEHAWAyYL22edZdW8).",
        registrationLink: null,
        contestLink: null,
        problemsetLink: null,
        teamConducted: null,
        slidesPdf: "events/oss-1/oss-1.pdf",
        problemsetPdf: null,
        solutionsPdf: null
      },
    ],
  },
  {
    name: "Code Arena",
    events: [
      {
        slug: "codearena-2026",
        title: "Code Arena 2.0",
        date: "2026-09-19",
        category: "upcoming",
        description:
          "The Programming Club presents **CODE ARENA 2.0** (proudly sponsored by IMC!)\n\nGet ready for an epic battle of logic, speed, and problem-solving with a massive **₹50K prize pool** up for grabs!\n\nPerfect for competitive programmers looking to test their skills, win cash prizes, claim exclusive IMC merch, and earn a direct spot in the CP Guild.",
        poster: "events/codearena-2026/codearena2026.jpeg",
        posters: null,
        venue: "TBD",
        time: "1:30 PM – 4:30 PM",
        details:
          "# The Challenge\nGear up for an intense, fast-paced algorithmic coding battle designed to push your problem-solving, logic, and speed to the absolute limit.\n\n# Divisions\nTo keep the competition fair and fierce, the arena is divided into two separate battlegrounds:\n* **Div 1 (Sophos & above):** High-stakes competition with advanced challenges.\n* **Div 2 (Freshies only):** A dedicated playing field tailored for first-years to prove their raw coding mettle.\n\n# The Loot & Perks\n* **₹50K Total Prize Pool:** Cash rewards across both divisions, plus winner T-shirts for top rankers.\n* **Div 1 Cash:** 🥇 ₹10K | 🥈 ₹8K | 🥉 ₹6K | 4th: ₹4K | 5th: ₹2K\n* **Div 2 Cash:** 🥇 ₹6K | 🥈 ₹5K | 🥉 ₹4K | 4th: ₹3K | 5th: ₹2K\n* **Guaranteed Swag:** Exclusive IMC merch for every single participant!\n* **CP Guild Recruitment:** Standout performances will be directly considered for CP Guild membership.\n\nJoin the [WhatsApp group](https://chat.whatsapp.com/CvTR9UYOo8zF3N8rh5kcSO?s=cl&p=i&mlu=4&ilr=4) for updates!",
        registrationLink: 'https://forms.gle/smpiCngLaeXthJoc9',
        contestLink: null,
        problemsetLink: null,
        teamConducted: [],
        slidesPdf: null,
        problemsetPdf: null,
        solutionsPdf: null
      },
      {
        slug: "codearena",
        title: "Code Arena",
        date: "2025-09-21",
        category: "past",
        description:
          "The Programming Club presents CODE ARENA! (Proudly sponsored by IMC). Get ready for Insti’s biggest programming contest yet – a battle of logic, speed, and problem-solving with a 16K prize pool up for grabs!\n\n*Perfect for competitive programmers of all levels looking to test their skills, win prizes, and potentially join the CP Guild.*",
        poster: "events/codearena/codearena.jpg",
        posters: [
          "events/codearena/g1.jpg",
          "events/codearena/g2.webp",
          "events/codearena/g3.webp",
          "events/codearena/g4.webp",
          "events/codearena/g5.webp",
          "events/codearena/g6.webp",
        ],
        venue: "RJN Block",
        time: "5:00 PM - 8:00 PM",
        details:
          "### The Challenge\nPrepare for an intense, fast-paced algorithmic coding competition. You will face a curated set of problems designed to push your optimization skills and logical thinking to the limit.\n\n### Divisions\nTo keep the competition fair and fierce, the arena is split into two battlegrounds:\n* **Div 1:** Open to Sophos and above. Expect advanced problems and intense rivalry.\n* **Div 2:** Exclusively for Freshies! A leveled playing field to showcase your raw potential.\n\n### The Loot & Perks\n* **Massive Prize Pool:** ₹16,000 up for grabs across both divisions.\n* **Swag & Snacks:** Exclusive IMC goodies and free refreshments for all participants.\n* **CP Guild Draft:** Stand out from the crowd! This contest doubles as an official recruitment round for the CP Guild.",
        registrationLink: null,
        contestLink: null,
        problemsetLink: null,
        teamConducted: null,
        slidesPdf: null,
        problemsetPdf: null,
        solutionsPdf: null
      },
    ],
  },
  {
    name: "BitShift",
    events: [
      {
        slug: "bitshift",
        title: "BitShift 2026",
        date: "2026-01-24",
        category: "past",
        description:
          "The Programming Club at IIT Madras invites you to BitShift 2026, a premier all-India competitive programming contest proudly sponsored by Jane Street! Battle it out for a massive ₹70,000 prize pool.\n\n*A perfect opportunity for college students across the nation to test their algorithmic prowess, climb the leaderboard, and win big.*",
        poster: "events/bitshift/bitshift.jpg",
        posters: [],
        venue: "Online",
        time: "5:00 PM – 7:30 PM",
        details:
          "### The Challenge\nPrepare for an intense online programming showdown! BitShift 2026 will push your logic, speed, and problem-solving skills to the limit as you compete against some of the best competitive programmers across India.\n\n### Format & Eligibility\n* **Who can participate:** Open to all college students in India.\n* **Team Dynamics:** Team up! You can compete online in teams of up to 2 members.\n\n### The Loot & Registration\n* **Prize Pool:** ₹70,000 is up for grabs! (Note: You must register officially to be eligible for any prizes).",
        registrationLink:
          "https://unstop.com/p/bitshift-2026-iit-madras-1619526",
        contestLink: "https://codeforces.com/blog/entry/150003",
        problemsetLink: null,
        teamConducted: null,
        slidesPdf: null,
        problemsetPdf: null,
        solutionsPdf: null
      },
    ],
  },
  {
    name: "DeadLock",
    events: [
      {
        slug: "deadlock",
        title: "DeadLock",
        date: "2026-02-14",
        category: "past",
        description:
          "The Programming Club, IIT Madras is excited to invite you to DeadLock 2026, our first-ever Software Development Contest! Proudly sponsored by IMC Trading, this competition goes beyond standard algorithms to test real-world coding efficiency.\n\n*Perfect for 1st and 2nd-year developers ready to push their system skills and compete for a massive ₹50,000 prize pool.*",
        poster: "events/deadlock/deadlock.jpg",
        posters: [
          "events/deadlock/g1.webp",
          "events/deadlock/g2.webp",
          "events/deadlock/g3.webp",
          "events/deadlock/g4.webp",
          "events/deadlock/g5.webp",
        ],
        venue: "Online",
        time: "4:00 PM – 7:30 PM",
        details:
          "### The Challenge\nMove beyond standard competitive programming! Your solutions will be evaluated on real-world performance parameters, testing how efficiently you write code and manage system overheads. Get ready to put your software development skills to the ultimate test.\n\n### Format & Eligibility\n* **Who can participate:** Open exclusively to 1st and 2nd-year UG students.\n* **Team Dynamics:** Solo battle! This is an individual participation contest.\n\n### The Loot\n* **Massive Prize Pool:** ₹50,000 total up for grabs, generously sponsored by IMC Trading.\n* **Category Breakdown:** ₹30,000 dedicated for 2nd-year students and ₹20,000 for 1st-year students.",
        registrationLink: null,
        contestLink: null,
        problemsetLink: null,
        teamConducted: null,
        slidesPdf: null,
        problemsetPdf: null,
        solutionsPdf: null
      },
    ],
  },
];

// ─── Helper: flatten all events for lookups ──────────────────────────
export const getAllEvents = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison

  return eventGroups.flatMap((group) =>
    group.events.map((event) => {
      // Automatically determine category based on date
      const eventDate = new Date(event.date);
      const category = eventDate >= today ? "upcoming" : "past";

      return { ...event, groupName: group.name, category };
    }),
  );
};

export const getEventBySlug = (slug) =>
  getAllEvents().find((e) => e.slug === slug) || null;
