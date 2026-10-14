
## 1. What is 2-SAT?

2-SAT (2-Satisfiability) is a special case of the Boolean satisfiability problem. It asks whether there is a way to assign True or False to variables so that a Boolean formula is satisfied. In 2-SAT, each clause has exactly two literals.

**Example:**

$$(x_1 \lor \lnot x_2) \land (\lnot x_1 \lor x_3) \land (x_2 \lor x_3)$$

- $x_1, x_2, x_3$ are Boolean variables.
- $\lor$ means OR, $\land$ means AND, $\lnot$ means NOT.
- **Goal:** assign values to make all clauses true.
- A clause is satisfied if at least one of its literals is True.
- A formula is satisfied if all clauses are satisfied.

## 2. Intuition for Algorithm

Each clause involves two variables of the form $(a \lor b)$.

A clause $(a \lor b)$ can be rewritten as:

- $\lnot a \rightarrow b$ (If $a$ is False, $b$ must be True)
- $\lnot b \rightarrow a$ (If $b$ is False, $a$ must be True)

Therefore, this can be thought of as a graph theory problem where:

- **Nodes:** all literals and their negations ($a, \lnot a, b, \lnot b$)
- **Edges:** each implication becomes a directed edge
  - $\lnot a \rightarrow b$
  - $\lnot b \rightarrow a$

This graph encodes all constraints and dependencies — an edge $\lnot a \rightarrow b$ shows a forced relationship: if $\lnot a$ is chosen, $b$ must follow. By following paths along the graph, we can propagate forced assignments across variables.

## 3. Algorithm to Solve 2-SAT

1. **Construct Implication Graph** — convert every clause to two implications.
2. **Find Strongly Connected Components** — use Kosaraju's or Tarjan's algorithm.
3. **Check for Contradictions** — if a variable and its negation are in the same SCC, the formula is unsatisfiable.

### Why SCC?

- SCCs are groups of nodes where every node is reachable from every other node.
- If a variable $x$ and its negation $\lnot x$ are in the same SCC, the implications create a cycle of forced assignments that require $x$ to be both True and False — which implies unsatisfiability.
- If $x$ and $\lnot x$ are in different SCCs, we can assign truth values in a topological order to satisfy all clauses.

### Logic

- If $x$ and $\lnot x$ are in the same SCC → contradiction ⇒ **UNSATISFIABLE**.
- Otherwise, assign truth values by processing SCCs in reverse topological order:
  - If $x$'s SCC appears after $\lnot x$'s SCC → assign $x = \text{True}$
  - Else $x = \text{False}$

### Code

We will use Kosaraju's algorithm for SCC finding.

```cpp
struct TwoSAT {
    int n; // number of variables
    vector<vector<int>> g, gr; // graph and reverse graph
    vector<int> comp, order, assignment;
    vector<bool> used;

    TwoSAT(int vars) {
        n = vars;
        g.assign(2 * n, {});
        gr.assign(2 * n, {});
    }

    // get index of negation
    int neg(int x) { return x ^ 1; }

    // Add clause (a ∨ b)
    // Equivalent to: (¬a → b) and (¬b → a)
    void addClause(int a, int b) {
        g[neg(a)].push_back(b);
        g[neg(b)].push_back(a);
        gr[b].push_back(neg(a));
        gr[a].push_back(neg(b));
    }

    // First DFS (to get order)
    void dfs1(int v) {
        used[v] = true;
        for (int to : g[v]) {
            if (!used[to]) {
                dfs1(to);
            }
        }
        order.push_back(v);
    }

    // Second DFS (to assign components)
    void dfs2(int v, int cl) {
        comp[v] = cl;
        for (int to : gr[v]) {
            if (comp[to] == -1) {
                dfs2(to, cl);
            }
        }
    }

    bool solve() {
        int N = 2 * n;
        used.assign(N, false);
        comp.assign(N, -1);

        // Fill order stack
        for (int i = 0; i < N; i++) {
            if (!used[i]) {
                dfs1(i);
            }
        }

        // Process in reverse order
        reverse(order.begin(), order.end());
        int j = 0;
        for (int v : order) {
            if (comp[v] == -1) {
                dfs2(v, j++);
            }
        }

        // Check for contradictions
        assignment.assign(n, 0);
        for (int i = 0; i < n; i++) {
            if (comp[2 * i] == comp[2 * i + 1])
                return false; // x and ¬x in same SCC → UNSAT
            assignment[i] = comp[2 * i] > comp[2 * i + 1];
        }
        return true;
    }
};
```

## 4. Why Do We Care?

- Basic circuital design can be verified using 2-SAT.
- Dependency resolution in software package installation is reduced to 2-SAT.
- Type inference in programming languages can often be reduced to 2-SAT.

**Time Complexity:** $O(m + n)$ due to the SCC finding algorithm.

---

## Task #1

Checkout what 3-SAT problem is and why it is one of the hardest problems.
Checkout NP-hard, NP-complete problems.
