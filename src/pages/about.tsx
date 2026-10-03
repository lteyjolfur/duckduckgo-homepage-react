import '../styles/about.css';
import Card from '../components/card';

type AboutPageProps = {
  githubUrl?: string;
  liveUrl?: string;
};

export default function AboutPage({
  githubUrl,
  liveUrl = 'https://duck-duck-go-green.vercel.app/',
}: AboutPageProps) {
  return (
    <main className="about-page">
      <Card aria-labelledby="about-title">
        <p className="about-eyebrow">About this project</p>
        <h1 id="about-title">DuckDuckGo-inspired Search Homepage</h1>

        <p className="about-lead">
          A minimal React + TypeScript recreation of DuckDuckGo's 2023 homepage,
          focused on layout, theming, responsiveness, and interaction.
        </p>

        <p>
          Search queries are forwarded directly to DuckDuckGo, so the project is
          intentionally centered on frontend implementation rather than building
          a custom search backend.
        </p>

        <div className="about-links" aria-label="Project links">
          <a href={liveUrl} target="_blank" rel="noreferrer">
            Live demo
          </a>
          {githubUrl ? (
            <a href={githubUrl} target="_blank" rel="noreferrer">
              Source code
            </a>
          ) : null}
        </div>

        <section className="about-section" aria-labelledby="features-title">
          <h2 id="features-title">Features</h2>
          <ul>
            <li>
              Responsive homepage layout inspired by DuckDuckGo's 2023 design
            </li>
            <li>Search input that redirects queries to DuckDuckGo</li>
            <li>Light and dark mode with system preference detection</li>
            <li>Manual theme toggle with persisted preference</li>
            <li>Component-based React structure and semantic HTML</li>
          </ul>
        </section>

        <section className="about-section" aria-labelledby="tech-title">
          <h2 id="tech-title">Tech stack</h2>
          <ul className="about-inline-list">
            <li>React</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>CSS</li>
            <li>Vercel Analytics</li>
          </ul>
        </section>

        <section className="about-section" aria-labelledby="decisions-title">
          <h2 id="decisions-title">Key decisions</h2>
          <ul>
            <li>
              Used CSS variables for theming so the interface updates instantly
              without duplicating styles.
            </li>
            <li>
              Applied theme preference before hydration to avoid flashing the
              wrong theme on first paint.
            </li>
            <li>
              Kept the layout intentionally minimal to stay close to the
              original design direction.
            </li>
          </ul>
        </section>

        <section className="about-section" aria-labelledby="motivation-title">
          <h2 id="motivation-title">Motivation</h2>
          <p>
            This project was built as a frontend exercise in recreating a
            recognizable interface with attention to spacing, typography,
            responsiveness, and small interaction details.
          </p>
        </section>

        <section className="about-section" aria-labelledby="performance-title">
          <h2 id="performance-title">Performance</h2>
          <ul>
            <li>Performance: 100</li>
            <li>Accessibility: 100</li>
            <li>Best Practices: 100</li>
            <li>SEO: 100</li>
          </ul>
        </section>

        <section className="about-section" aria-labelledby="scope-title">
          <h2 id="scope-title">Scope</h2>
          <p>This project focuses on the homepage UI only.</p>
          <ul>
            <li>No custom backend</li>
            <li>No search indexing</li>
            <li>No custom results page</li>
            <li>
              Not intended as a pixel-perfect clone of the current live site
            </li>
          </ul>
        </section>

        <section className="about-section" aria-labelledby="improvements-title">
          <h2 id="improvements-title">Possible improvements</h2>
          <ul>
            <li>More robust accessibility testing</li>
            <li>Additional recreated homepage sections</li>
            <li>Visual regression comparisons</li>
          </ul>
        </section>

        <section className="about-section" aria-labelledby="disclaimer-title">
          <h2 id="disclaimer-title">Disclaimer</h2>
          <p>
            This is an independent frontend practice project inspired by
            DuckDuckGo's 2023 homepage design. It is not affiliated with or
            endorsed by DuckDuckGo.
          </p>
        </section>
      </Card>
    </main>
  );
}
