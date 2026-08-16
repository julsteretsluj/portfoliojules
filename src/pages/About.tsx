import { education, livedIn, journey, passport } from "../data";

export default function About() {
  return (
    <>
      <header className="page-head about-head">
        <p className="eyebrow">About</p>
        <h1>
          A New Zealander with a well-used passport
          <svg className="kiwi-doodle" viewBox="0 0 64 36" aria-hidden="true">
            <path
              d="M8 24c6-10 18-16 28-12 8 3 14 2 20-4 0 8-6 16-16 18-8 2-14-1-20 2-4 2-8 4-12 1 4-1 6-4 8-7z"
              fill="#3a5163"
            />
            <circle cx="46" cy="12" r="1.6" fill="#fff6ec" />
            <path d="M54 8c4 1 7 0 10-3" stroke="#b55242" strokeWidth="1.6" fill="none" />
          </svg>
        </h1>
        <p className="lede">
          I have lived and studied in seven countries, which shaped a
          cross-cultural perspective and a practical leadership style grounded
          in collaboration.
        </p>
      </header>

      <section className="journey reveal from-left">
        <div className="journey-intro">
          <h2>Moving order</h2>
          <p>
            The living and study journey, in the order it actually happened.
            Phnom Penh is home for now.
          </p>
        </div>
        <ol className="journey-path">
          {journey.map((stop, i) => (
            <li key={`${stop.place}-${i}`} className={stop.current ? "is-current" : ""}>
              <span className="journey-n">{String(i + 1).padStart(2, "0")}</span>
              <strong>{stop.place}</strong>
              <span>
                {stop.country}
                {stop.note ? ` · ${stop.note}` : ""}
                {stop.current ? " · current home" : ""}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="lived-row reveal from-up">
        <h2>Countries lived & studied in</h2>
        <ul>
          {livedIn.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      </section>

      <section className="edu-wrap">
        <h2>Education</h2>
        <ol className="edu-path">
          {education.map((item, i) => (
            <li className={`edu-node reveal ${i % 2 ? "from-right" : "from-left"}`} key={`${item.school}-${item.grades}`}>
              <img src={item.logo} alt="" />
              <div>
                <p className="role-kicker">{item.grades}</p>
                <h3>{item.school}</h3>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="passport reveal from-up">
        <div>
          <h2>Passport, New Zealand</h2>
          <p>
            Countries visited. A few pages already have a mark; the rest are
            waiting for a stamp to catch up with the memory.
          </p>
        </div>
        <ul className="stamp-grid">
          {passport.map((entry) => (
            <li key={entry.country} className={entry.stamp ? "has-stamp" : "pending"}>
              <span>{entry.country}</span>
              <small>{entry.stamp ? "Stamped" : "Coming soon"}</small>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
