What This Project Is
This is a single-page portfolio site for Nauman Sajjad, built with Next.js 15, React 18, and TypeScript. It presents you as a WordPress Developer, Customization Specialist, and Core PHP Expert, with sections for hero, about, skills, projects, achievements, contact, and footer. The app uses Tailwind CSS, shadcn/ui-style components, next-themes for dark/light mode, and EmailJS for the contact form.
High-Level Architecture
app/  layout.tsx          → Root layout (theme, metadata, fonts)  page.tsx            → Home page: composes all sections  globals.css         → Tailwind + custom CSS (reveal, gradients, waves)components/  navbar.tsx          → Fixed header with nav links + CTA  hero.tsx            → Hero with name, title, CTA, image  about.tsx           → About + personal details  skills.tsx          → Skills + API experience  projects.tsx        → Project grid (data from JSON)  achievements.tsx    → Achievement cards  contact.tsx        → Contact info + EmailJS form  footer.tsx          → Footer + social linkscomponents/data/  projects.json       → Source of truth for projects (only external data file)components/ui/        → Reusable UI (Button, Card, Input, etc.)components/  theme-provider.tsx  → next-themes wrapperpublic/               → Static assets (images, logos)
Single route: Everything lives on the home page (/).
Client-heavy: Main page and section components are "use client" and use React state/effects.
One shared data file: Only components/data/projects.json is imported and used in the app. The root data.json is not referenced anywhere.
Page Structure (Sections in Order)
#	Section	Component	ID / Anchor	Purpose
1	Navbar	navbar.tsx	—	Fixed header: logo “NOMIII”, links (About, Skills, Projects, Contact), “Schedule a Call” (Cal.com), mobile menu
2	Hero	hero.tsx	—	Full-height hero: name “NAUMAN”, tagline, “Explore My Work” button, profile image, parallax
3	About	about.tsx	#about	About text, photo , address/DOB/nationality/languages/phone/email
4	Skills	skills.tsx	#skills	“Skill Development”: technical skills grid + “API Experience” links (Setmore, Stripe, etc.)
5	Projects	projects.tsx	#projects	Project cards from projects.json; pagination (6 per page) + “Show All”; filter by ?enable_all=true
6	Achievements	achievements.tsx	#achievements	Four achievement cards (WordPress, APIs, WP-CLI, admin dashboards) – data is inline in the component
7	Contact	contact.tsx	#contact	Contact details + “Send Me a Message” form; form submits via EmailJS (service/template IDs in component)
8	Footer	footer.tsx	—	Name, tagline, year, LinkedIn / Fiverr / Upwork links
Navbar links use #about, #skills, #projects, #contact for in-page scrolling.
Data Flow
1. Projects (only JSON-driven data)
Source: components/data/projects.json
Consumer: components/projects.tsx
Flow:
projects.tsx imports: import projectsData from "@/components/data/projects.json".
On mount it:
Reads ?enable_all from window.location.search.
If enable_all is true: uses full projectsData.
Else: filters to projects where enabled_all / enabled_all_all is not true (hides “show everywhere” projects when not in “show all” mode).
Renders paginated list (6 per page) or “Show All” via local state currentPage / showAll.
So: data flows one way: projects.json → projects.tsx → UI. No other file uses this JSON.
2. URL query flags (client-only)
Read in hero.tsx and about.tsx from window.location.search in useEffect.
Projects: ?enable_all=true
Read in projects.tsx from window.location.search.
When true, all projects from JSON are shown; otherwise the list is filtered by enabled_all / enabled_all_all.
All of this is client-side only (no server-side reading of query params in these components).
3. Contact form
Source: User input in contact.tsx (local state: name, email, subject, message).
Flow: On submit → EmailJS (emailjs-com): emailjs.send(serviceId, templateId, formData, publicKey).
Service/template/keys are hardcoded in contact.tsx.
Success/error handled with alert() and form reset.
So: form state → EmailJS; no other app data is involved.
4. Everything else
Navbar / Footer: Links and labels are hardcoded in the components.
Skills: Two arrays defined inside skills.tsx: skillsWithProgress, apiExperience.
Achievements: One array inside achievements.tsx: achievements.
There is no use of the root data.json anywhere in the codebase.
Visual / UX Behavior
Reveal on scroll: Several sections use elements with class reveal (and sometimes reveal-delay-*). In page.tsx and in section components, an IntersectionObserver adds the class active when the element enters view, triggering CSS transitions.
Theme: layout.tsx wraps the app in ThemeProvider (from theme-provider.tsx) with defaultTheme="dark" and enableSystem; theme is applied via class on <html> (e.g. .dark).
Hero: Parallax on name and background is driven by mouse position in hero.tsx (no shared state with other components).
Summary Table for Quick Reference
Topic	Where it lives	Used by
Projects list	components/data/projects.json	projects.tsx only
?enable_all=true	URL (client)	projects.tsx
Contact form submit	Local state + EmailJS	contact.tsx
Skills / API list	In-component arrays	skills.tsx
Achievements	In-component array	achievements.tsx
Root data.json	Project root	Not used
How Someone Can Read and Understand the Whole Project
Start with app/page.tsx to see the single page and the order of sections (Navbar → Hero → About → Skills → Projects → Achievements → Contact → Footer).
Data: Only components/data/projects.json is the external data source; it’s used only in components/projects.tsx. Check that file to see filtering and pagination.
URL behavior:enable_all (and URLSearchParams / window.location) in hero.tsx, about.tsx, and projects.tsx to see how the page changes with query params.
Contact: In contact.tsx, look at handleSubmit and emailjs.send to see the full contact flow.
Styling: app/globals.css for reveal animations, gradients, and theme variables; Tailwind + components/ui/* for the rest.