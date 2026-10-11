import Contributions from "@/components/Contributions";
import NowPlaying from "@/components/NowPlaying";
import Sky from "@/components/Sky";
import Tree from "@/components/Tree";
import { coursework } from "@/lib/coursework";
import { githubUrl, projects, sideQuest, site } from "@/lib/site";
import { growTree } from "@/lib/tree";

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M3.6 5.9H1.2V14h2.4V5.9ZM2.4 2a1.4 1.4 0 1 0 0 2.8A1.4 1.4 0 0 0 2.4 2Zm3.5 3.9V14h2.4V9.8c0-1.1.5-1.9 1.6-1.9 1 0 1.4.7 1.4 1.9V14h2.4V9.2c0-2.3-1.1-3.5-3-3.5-1.1 0-1.9.5-2.4 1.2V5.9H5.9Z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
    <path d="m2 4 6 5 6-5" />
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M9.5 1.5h-6v13h9v-10l-3-3Z" />
    <path d="M9.5 1.5v3h3M5.5 8h5M5.5 10.5h5" />
  </svg>
);

function Links() {
  return (
    <ul className="links">
      <li>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          <GitHubIcon /> GitHub
        </a>
      </li>
      <li>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          <LinkedInIcon /> LinkedIn
        </a>
      </li>
      <li>
        <a href={`mailto:${site.email}`}>
          <MailIcon /> Email
        </a>
      </li>
      <li>
        <a href={site.resume} target="_blank" rel="noreferrer">
          <ResumeIcon /> Résumé
        </a>
      </li>
    </ul>
  );
}

const crown = growTree({ seed: 7, depth: 8, trunk: 150, bough: 150, spread: 0.46, lean: 0.1, girth: 4.5 });
const roots = growTree({ seed: 19, depth: 6, trunk: 40, bough: 120, spread: 0.55, lean: 0.28, girth: 4.5 });

// Each section hangs from the trunk under an Elder Futhark rune whose meaning fits it.
function Realm({
  id,
  rune,
  name,
  meaning,
  title,
  side,
  aside,
  children,
}: {
  id: string;
  rune: string;
  name: string;
  meaning: string;
  title: string;
  side?: "left" | "right";
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={`realm ${side ? `realm-${side}` : "realm-full"}`} id={id} aria-labelledby={`${id}-title`}>
      <span className="rune" aria-hidden="true">
        {rune}
      </span>
      <header>
        <p className="rune-name">
          {name} · {meaning}
        </p>
        <h2 id={`${id}-title`}>{title}</h2>
        {aside}
      </header>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Sky />

      <nav className="nav" aria-label="Sections">
        <a className="mark" href="#top" aria-label={`${site.name}, back to top`}>
          {site.initials}
        </a>
        <div>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#coursework">Coursework</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section className="hero" id="top">
          <h1>{site.name}</h1>
          <p className="role">{site.role}</p>
          <Links />
          <div className="crown">
            <Tree art={crown} className="crown-art" />
          </div>
        </section>

        <div className="realms">
          <div className="trunk" aria-hidden="true" />

          <div className="fork">
            <Realm id="about" rune="ᚨ" name="Ansuz" meaning="word" title="About" side="left">
              <p className="lede">{site.tagline}</p>
              {site.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <dl className="facts">
                {site.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Realm>

            <div className="fork-right">
              <Realm id="signal" rune="ᚹ" name="Wunjo" meaning="joy" title="Listening" side="right">
                <NowPlaying />
              </Realm>

              <Realm id="quest" rune="ᚱ" name="Raidho" meaning="journey" title="Current side quest" side="right">
                <span className="status status-live">In progress</span>
                <p className="quest-name">{sideQuest.current}</p>
                <p className="quest-note">{sideQuest.note}</p>
                <p className="quest-goal">
                  <span>Objective</span>
                  {sideQuest.goal}
                </p>
                {sideQuest.completed.length > 0 && (
                  <ul className="quest-log">
                    {sideQuest.completed.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                )}
              </Realm>
            </div>
          </div>

          <Realm
            id="projects"
            rune="ᚲ"
            name="Kenaz"
            meaning="craft"
            title="Projects"
            aside={
              <a className="h2-link" href={githubUrl} target="_blank" rel="noreferrer">
                @{site.github} ↗
              </a>
            }
          >
            <ul className="projects">
              {projects.map((p) => (
                <li key={p.name}>
                  <a href={p.url} target="_blank" rel="noreferrer">
                    <span className="project-name">
                      {p.name}
                      {p.status && <em>{p.status}</em>}
                    </span>
                    <span className="project-desc">{p.description}</span>
                    <span className="tags">
                      {p.stack.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <Contributions />
          </Realm>

          <Realm id="coursework" rune="ᛟ" name="Othala" meaning="heritage" title="Coursework">
            <ol className="terms">
              {coursework.map((t) => (
                <li key={t.term}>
                  <h3>
                    {t.term}
                    {t.note && <em>{t.note}</em>}
                  </h3>
                  <ul>
                    {t.courses.map(([code, title]) => (
                      <li key={code}>
                        <span>{code}</span>
                        {title}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Realm>

          <Realm id="contact" rune="ᚷ" name="Gebo" meaning="gift" title="Contact">
            <a className="hail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <Links />
          </Realm>
        </div>

        <Tree art={roots} className="roots" />
      </main>

      <footer className="foot">
        <span>{site.name}</span>
        <span>{site.location.label}</span>
      </footer>
    </>
  );
}
