export default function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-12 max-w-2xl lg:mb-16">
      {eyebrow && (
        <p className="mb-3 text-caption font-medium uppercase text-text-tertiary">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-display-md italic text-text-primary text-balance">
        {title}
      </h2>
    </div>
  );
}