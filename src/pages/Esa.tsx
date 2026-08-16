import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { companions, legoSets, snackles } from "../data";

const carouselImages = [
  ...companions.map((friend) => ({ src: friend.img, alt: friend.alt })),
  ...snackles.map((item) => ({ src: item.img, alt: item.alt })),
];

export default function Esa() {
  return (
    <>
      <header className="page-head esa-head">
        <p className="eyebrow">Emotional support & collections</p>
        <h1>The small systems that keep the big ones running</h1>
        <p className="lede">
          My emotional support animals and personal collections help me stay
          grounded, focused, and resilient in high-pressure environments like
          conferences, events, and academic work.
        </p>
      </header>

      <section className="carousel-band" aria-label="Companion photos">
        <p className="eyebrow">Drag to spin · click to open</p>
        <div className="carousel-frame">
          <ThreeDPhotoCarousel images={carouselImages} />
        </div>
      </section>

      <section className="companion-board">
        {companions.map((friend, i) => (
          <article className={`companion reveal from-up delay-${(i % 3) + 1}`} key={friend.name}>
            <p className="companion-fact">“{friend.fact}”</p>
            <img src={friend.img} alt={friend.alt} />
            <h2>{friend.name}</h2>
            <dl>
              <div>
                <dt>Birthday</dt>
                <dd>{friend.bday}</dd>
              </div>
              <div>
                <dt>Pronouns</dt>
                <dd>{friend.pronouns}</dd>
              </div>
              <div>
                <dt>Brand</dt>
                <dd>{friend.brand}</dd>
              </div>
              <div>
                <dt>Product</dt>
                <dd>{friend.product}</dd>
              </div>
            </dl>
            <a className="text-link" href={friend.href} target="_blank" rel="noreferrer">
              Product page
            </a>
          </article>
        ))}
      </section>

      <section className="esa-notes">
        <article className="reveal from-left">
          <h2>Focus rituals</h2>
          <p>
            I use a simple pre-session routine with comfort items to settle
            attention before speeches, negotiations, and team coordination.
          </p>
        </article>
        <article className="reveal from-right">
          <h2>Travel companion</h2>
          <p>
            Carrying familiar support items while moving countries and schools
            has helped me maintain emotional stability and confidence.
          </p>
        </article>
      </section>

      <section className="collections">
        <h2>Collections that support wellbeing</h2>
        <div className="collection-spread">
          <article className="comfort-col reveal from-left">
            <h3>Comfort</h3>
            <p>
              My collection is intentionally small and meaningful: a few trusted
              items connected to positive memories, calm, and confidence. They
              serve as practical tools for emotional regulation and
              self-management.
            </p>
          </article>
          <article className="lego-col reveal from-up">
            <h3>LEGO · {legoSets.length} sets</h3>
            <p>
              Building LEGO helps me reset mentally, stay present, and
              decompress after high-intensity days.
            </p>
            <ul className="set-catalog" aria-label="LEGO sets I own">
              {legoSets.map((set) => (
                <li key={set}>{set}</li>
              ))}
            </ul>
          </article>
        </div>
        <article className="snackles-col reveal from-right">
          <h3>Snackles</h3>
          <p>
            Snackles are plush companions that pair a soft stuffed animal with a
            mini snack mascot — a playful, collectible comfort line I enjoy
            building slowly over time.
          </p>
          <ul className="snackle-row">
            {snackles.map((item) => (
              <li key={item.name}>
                <img src={item.img} alt={item.alt} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
