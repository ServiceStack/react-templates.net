import { Children, isValidElement, type ReactNode } from 'react';

interface PipelineProps {
  children: ReactNode;
  /** Optional caption rendered above the steps. */
  title?: string;
}

interface PipelineStepProps {
  children?: ReactNode;
  /** The step label, rendered in monospace when `code` is set. */
  title: string;
  /** Render the title as inline code, for type and file names. */
  code?: boolean;
}

/**
 * A vertical flow diagram for documentation.
 * Renders a numbered sequence of steps joined by a connector rail, as an
 * alternative to an ASCII arrow chain in a fenced code block.
 */
export function Pipeline({ children, title }: PipelineProps) {
  const steps = Children.toArray(children).filter(isValidElement);

  return (
    <figure className="my-6 not-prose">
      {title && (
        <figcaption className="mb-3 text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
          {title}
        </figcaption>
      )}
      <ol className="m-0 flex list-none flex-col gap-0 p-0">
        {steps.map((step, i) => (
          <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[15px] top-8 bottom-0 w-px bg-fd-border"
              />
            )}
            <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-card text-xs font-semibold tabular-nums text-fd-muted-foreground">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 rounded-lg border border-fd-border bg-fd-card px-4 py-2.5">
              {step}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** A single step within a {@link Pipeline}. */
export function PipelineStep({ children, title, code }: PipelineStepProps) {
  return (
    <>
      <p
        className={`m-0 text-sm font-medium text-fd-foreground ${
          code ? 'font-mono' : ''
        }`}
      >
        {title}
      </p>
      {children && (
        <div className="mt-1 text-sm text-fd-muted-foreground [&>p]:m-0 [&_code]:text-xs">
          {children}
        </div>
      )}
    </>
  );
}
