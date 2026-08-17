import { roles, munAwards, hackAwards } from "../data";
import type { Role } from "../data";

function RoleMeta({ role }: { role: Role }) {
  if (!role.place && !role.dates) return null;
  return (
    <p className="role-kicker">
      {[role.place, role.dates].filter(Boolean).join(" · ")}
    </p>
  );
}

function RoleBody({ role }: { role: Role }) {
  return (
    <>
      <RoleMeta role={role} />
      <h2>
        {role.title}
        <span> — {role.org}</span>
      </h2>
      {role.bullets && role.bullets.length > 0 ? (
        <ul className="plain-list">
          {role.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {role.href && role.hrefLabel ? (
        <a
          className="text-link"
          href={role.href}
          {...(role.href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {role.hrefLabel}
        </a>
      ) : null}
    </>
  );
}

export default function Experience() {
  const [featured, ...rest] = roles;

  return (
    <>
      <header className="page-head offset-left">
        <p className="eyebrow">Experience</p>
        <h1>Roles that have to hold under pressure</h1>
        <p className="lede">
          I focus on high-accountability execution in youth diplomacy events,
          from team leadership and logistics to digital operations.
        </p>
      </header>

      <article className="feature-role reveal from-left">
        {featured.logo ? (
          <div className="feature-role-logo">
            <img src={featured.logo} alt="" />
          </div>
        ) : null}
        <div>
          <RoleBody role={featured} />
        </div>
      </article>

      <section className="role-stack">
        {rest.map((role, i) => (
          <article
            className={`role-card reveal ${i % 2 ? "from-right shift-right" : "from-left"}`}
            key={`${role.title}-${role.org}`}
          >
            {role.logo ? <img className="role-logo" src={role.logo} alt="" /> : null}
            <RoleBody role={role} />
          </article>
        ))}
      </section>

      <section className="mun-band reveal from-up">
        <div>
          <h2>Model UN & diplomatic background</h2>
          <p>
            Delegate, VFRI International Leadership Program (2026), UNCC Bangkok.
            Represented New Zealand in high-pressure diplomatic simulations.
          </p>
        </div>
        <ul className="award-list">
          {munAwards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
      </section>

      <section className="ticket-row">
        {hackAwards.map((award) => (
          <article className="ticket reveal from-up" key={award.title}>
            <p className="ticket-result">{award.result}</p>
            <h3>{award.title}</h3>
            <p>{award.detail}</p>
          </article>
        ))}
      </section>
    </>
  );
}
