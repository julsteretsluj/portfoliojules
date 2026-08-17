import { takes } from "../data";

export default function Takes() {
  const [lead, ...rest] = takes;

  return (
    <>
      <header className="page-head takes-head">
        <p className="eyebrow">Hot takes</p>
        <h1>Working opinions, not a manifesto</h1>
        <p className="lede">
          How I actually run rooms, websites, and teams. Sharper versions of
          things already on this site — not a new personality.
        </p>
      </header>

      <blockquote className="take-lead reveal from-left">
        <p className="take-n">01</p>
        <p>{lead.title}</p>
        <span>{lead.body}</span>
      </blockquote>

      <ol className="takes-list" aria-label="Working opinions">
        {rest.map((take, i) => (
          <li
            className={`take reveal ${i % 2 ? "from-right" : "from-left"}`}
            key={take.title}
          >
            <p className="take-n">{String(i + 2).padStart(2, "0")}</p>
            <h2>{take.title}</h2>
            <p>{take.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
