export function PageHero({
  title,
  subtitle,
  children,
}: {
  readonly title: string;
  readonly subtitle?: string;
  readonly children?: React.ReactNode;
}) {
  return (
    <div className="border-b pb-10">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle ? (
        <p className="mt-3 max-w-(--gds-content-narrow) text-base text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
      {children ? <div className="mt-6 flex flex-wrap gap-2">{children}</div> : null}
    </div>
  );
}
