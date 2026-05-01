"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiryAction } from "@/app/actions/submit-inquiry";
import type { ContactField } from "@/data/site-content";

type Props = {
  fields: ContactField[];
  submitLabel: string;
  thankYouTitle: string;
  thankYouBody: string;
};

function fieldId(name: string) {
  return `inquiry-${name}`;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="label-ui mt-2 h-11 w-fit bg-[color:var(--primary)] px-10 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? "Sending…" : label}
    </button>
  );
}

function InquiryFields({ fields }: { fields: ContactField[] }) {
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
                rows={5}
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
}: Props & { onSendAnother: () => void }) {
  const [state, formAction] = useActionState(submitInquiryAction, { status: "idle" });

  if (state.status === "success") {
    return (
      <div className="rule-section-h-soft pt-10 lg:border-t-0 lg:pt-0">
        <h2 className="font-display text-3xl tracking-tight text-[color:var(--charcoal)]">{thankYouTitle}</h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{thankYouBody}</p>
        <button
          type="button"
          className="label-ui mt-8 inline-flex h-11 items-center border border-[color:var(--primary-ink)] px-8 text-[11px] text-[color:var(--primary-ink)] transition-all duration-300 hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.98]"
          onClick={onSendAnother}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-8 rule-section-h-soft pt-10 lg:border-t-0 lg:pt-0">
      {state.status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
      <InquiryFields fields={fields} />
      <SubmitButton label={submitLabel} />
    </form>
  );
}

export function ContactInquiryForm(props: Props) {
  const [stepKey, setStepKey] = useState(0);
  return (
    <InquiryFormShell
      key={stepKey}
      {...props}
      onSendAnother={() => setStepKey((k) => k + 1)}
    />
  );
}
