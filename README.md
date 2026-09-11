 Next.js & Server Actions Playground (Todo & Tab Management)
A experimental Full-Stack Next.js (App Router) application built specifically to test, benchmark, and stress-test Server Actions, Caching Strategies, and Tag-based Cache Invalidation, without relying on traditional client-side data stores.

 Project Overview & Intent
This project was built primarily as a Backend & Next.js Caching Architecture Sandbox.

The main objective was to push Next.js App Router to its limits using pure Server-Side operations, testing how pages seamlessly transition between Static (SSG/ISR) and Dynamic (SSR) rendering using conditional data fetching and tag invalidation (revalidateTag).

🛠 Tech Stack
Framework: Next.js 15 (App Router & React 19 use() hook)

Language: TypeScript

State Management: Zustand (UI State & Active Tabs only — No global server data store)

Styling & UI: Tailwind CSS, Lucide Icons

Local Storage: Conditional Persistence & Strategy Override

 Architectural Insights & Engineering Trade-offs
1. Server-First Architecture (No Optimistic Updates)
Intentional Design Choice:

Why no Optimistic Updates? The core goal of this test was to measure exact Server Action execution times, network latencies, and actual cache revalidation behaviors.

Trade-off: UI updates happen after the Server Action finishes resolving and revalidateTag() triggers. This introduces a slight, noticeable delay upon editing or toggling items, which is expected since state sync relies 100% on actual server response guarantees rather than client speculation.

2. On-Demand Revalidation with revalidateTag
Instead of refetching entire datasets on every client mutation, data fetching is strictly grouped under cache tags (e.g., 'todos', 'tabs').

Executing a Server Action triggers targeted cache invalidation via revalidateTag('todos'), keeping payload transfers minimal while maintaining strict data consistency across page navigations.

3. Static vs. Dynamic Page Strategy
Data-Driven Rendering: The page dynamically toggles between Static Generation and Dynamic Server Rendering based on local user conditions and query configurations.

No Server Data Store: All business data flows directly from server promises wrapped in React 19's use() hook (todospromise, tabspromise), bypassing standard React Contexts or Redux/Zustand server caches.

4. LocalStorage & Performance Bottlenecks
LocalStorage is utilized conditionally to retain specific layout modes and tab filters without polluting server state.

Note on Latency: Reading/writing to localStorage synchronously during state hydration causes slight Main-Thread blocking (TBT), which was analyzed and benchmarked via Lighthouse to measure client vs. server performance overhead.

 Performance & Benchmarking

During development, performance was continuously profiled using Lighthouse:

Metric,Initial Baseline,Optimized State,Key Driver
Performance Score,63,71+,Removing heavy JSX arrays from useMemo & slimming render trees
First Contentful Paint (FCP),0.9s,<0.9s,Direct stream unwrap using use()
Best Practices,100,100,Clean DOM structures and zero bloat
SEO,100,100,Semantic HTML tags

  Getting Started

  Clone the repository:

  git clone https://github.com/Hanafi6/nextjs-zustand-todo-app  

  cd nextjs-zustand-todo-app
  
  Install dependencies:

  pnpm install

  pnpm dev