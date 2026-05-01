"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiryAction } from "@/app/actions/submit-inquiry";
import type { ContactField } from "@/data/site-content";
import { cn } from "@/lib/utils";

type Props = {
  fields: ContactField[];
  submitLabel: string;
  thankYouTitle: string;
  thankYouBody: string;
  /** Compact layout for header drawer */
  variant?: "page" | "drawer";
};

function fieldId(name: string) {
  return `inquiry-${name}`;
}

function SubmitButton({ label, fullWidth }: { label: string; fullWidth?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "label-ui mt-2 h-11 bg-[color:var(--primary)] text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
        fullWidth ? "w-full px-6" : "w-fit px-10",
      )}
    >
      {pending ? "Sending…" : label}
    </button>
  );
}

function InquiryFields({ fields, textareaRows }: { fields: ContactField[]; textareaRows: number }) {
  return (
    <>
      {fields.map((field) => {
        const id = fieldId(field.name);
        const optional = !field.required;

        if (field.type === "select") {
          return (
            <div key={field.name}>
              <label htmlFor={id} className="label-ui text-[10px] text-muted-foreground">
                {field.label}
                {optional ? <span className="font-normal text-muted-foreground"> · optional</span> : null}
              </label>
              <select
                id={id}
                name={field.name}
                defaultValue=""
                className="mt-2 w-full cursor-pointer border-0 bg-transparent py-2 text-sm text-[color:var(--charcoal)] field-underline-editorial"
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name}>
              <label htmlFor={id} className="label-ui text-[10px] text-muted-foreground">
                {field.label}
                {optional ? <span className="font-normal text-muted-foreground"> · optional</span> : null}
              </label>
              <textarea
                id={id}
                name={field.name}
                rows={textareaRows}
                required={field.required}
                placeholder={field.placeholder}
                className="mt-2 w-full resize-none border-0 bg-transparent py-1 text-sm text-[color:var(--charcoal)] field-underline-editorial"
              />
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label htmlFor={id} className="label-ui text-[10px] text-muted-foreground">
              {field.label}
              {optional ? <span className="font-normal text-muted-foreground"> · optional</span> : null}
            </label>
            <input
              id={id}
              name={field.name}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              className="mt-2 w-full border-0 bg-transparent py-1 text-sm text-[color:var(--charcoal)] field-underline-editorial"
            />
          </div>
        );
      })}
    </>
  );
}

function InquiryFormShell({
  fields,
  submitLabel,
  thankYouTitle,
  thankYouBody,
  onSendAnother,
  variant = "page",
}: Props & { onSendAnother: () => void }) {
  const [state, formAction] = useActionState(submitInquiryAction, { status: "idle" });
  const isDrawer = variant === "drawer";
  const textareaRows = isDrawer ? 4 : 5;

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "rule-section-h-soft text-[color:var(--charcoal)]",
          isDrawer ? "pt-2 lg:border-t-0" : "pt-10 lg:border-t-0 lg:pt-0",
        )}
      >
        <h2
          className={cn(
            "font-display tracking-tight",
            isDrawer ? "text-2xl" : "text-3xl",
          )}
        >
          {thankYouTitle}
        </h2>
        <p
          className={cn(
            "text-muted-foreground leading-relaxed",
            isDrawer ? "mt-3 max-w-none text-sm" : "mt-4 max-w-md text-base",
          )}
        >
          {thankYouBody}
        </p>
        <button
          type="button"
          className={cn(
            "label-ui inline-flex h-11 items-center border border-[color:var(--primary-ink)] text-[11px] text-[color:var(--primary-ink)] transition-all duration-300 hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.98]",
            isDrawer ? "mt-6 w-full justify-center px-6" : "mt-8 px-8",
          )}
          onClick={onSendAnother}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className={cn(
        "rule-section-h-soft flex flex-col text-[color:var(--charcoal)]",
        isDrawer ? "gap-6 pt-2 lg:border-t-0" : "gap-8 pt-10 lg:border-t-0 lg:pt-0",
      )}
    >
      {state.status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
      <InquiryFields fields={fields} textareaRows={textareaRows} />
      <SubmitButton label={submitLabel} fullWidth={isDrawer} />
    </form>
  );
}

export function ContactInquiryForm(props: Props) {
  const [stepKey, setStepKey] = useState(0);
  return (
    <InquiryFormShell
      key={stepKey}
      {...props}
      variant={props.variant ?? "page"}
      onSendAnother={() => setStepKey((k) => k + 1)}
    />
  );
}
