import { passions } from "../data";

export default function Passions() {
  const featured = passions.find((p) => p.featured)!;
  const rest = passions.filter((p) => !p.featured);

  return (
    <>
      <header className="page-head passions-head">
        <p className="eyebrow">Passions</p>
        <h1>What I keep coming back to</h1>
        <p className="lede">
          Beyond leadership roles and projects, these areas shape how I learn,
          contribute, and build communities with empathy and purpose.
        </p>
      </header>

      <blockquote className="featured-note reveal from-left">
        <p className="eyebrow">{featured.title}</p>
        <p>{featured.body}</p>
      </blockquote>

      <section className="passion-masonry">
        {rest.map((item, i) => (
          <article
            className={`passion-card reveal ${i % 2 ? "from-right" : "from-left"} card-h-${(i % 3) + 1}`}
            key={item.title}
          >
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="lego-aside-band reveal from-up">
        <h2>Creative play & problem solving</h2>
        <p>
          LEGO helps me think in systems: how parts connect, how structures
          scale, and how creativity and engineering work together.
        </p>
      </section>
    </>
  );
}
