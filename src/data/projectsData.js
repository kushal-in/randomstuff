/**
 * PROJECTS DATA
 *
 * status: 'active' | 'completed'
 *   – Mark a project 'completed' once it wraps up; ongoing ones stay 'active'.
 *
 * teamId: matches the project id in teamData.js so we can link
 *   the project card to the corresponding team section.
 */

export const projects = [
    {
        id: 1,
        title: 'NanoCompile',
        description:
            'Project NanoCompile aims to build a lightweight compiler for ONNX models that turns a model’s computation graph into optimized, model-specific C++ inference code. It shifts operations from runtime to compile time, including shape inference, operator fusion, constant folding, and AOT memory reuse, with the goal of making inference faster and more memory-efficient.',
        githubLink: null,
        status: 'active',
        teamId: 1,
    },
    {
        id: 2,
        title: 'Poozle',
        description: 'Project Poozle is a parallelized string-searching library in C++ delivering exact, regex, and fuzzy pattern matching with native multithreading and fine-grained performance control. It uses a custom FM-Index (Burrows-Wheeler Transform + suffix arrays) for compressed, ultra-fast exact search, a Thompson\'s NFA-based regex engine for linear-time matching without catastrophic backtracking, and edit-distance (Levenshtein) based fuzzy search for robust approximate matching on noisy or imperfect text. Users can choose their search algorithm and tune parameters to maximize speed for their specific use case.',
        githubLink: null,
        status: 'active',
        teamId: 2,
    },
];
