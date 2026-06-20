import { Reveal } from "./Reveal";

export function PageHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal as="section" className="container-tight pt-6 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="heading-display mt-3 text-4xl leading-tight sm:text-5xl">
        {title}
      </h1>
      <div className="divider-leaf mt-5" />
      {intro ? (
        <p className="mx-auto mt-5 max-w-md font-sans text-[0.95rem] leading-relaxed text-cocoa">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
