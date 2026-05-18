import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/site/legal-document-page";
import { termsDocument } from "@/data/legal-content";

export const metadata: Metadata = {
  title: "Terms & Conditions - LEAFO",
  description:
    "Terms and conditions for using the LEAFO website and purchasing FRP planters and fiber pots.",
};

export default function TermsPage() {
  return (
    <LegalDocumentPage
      document={termsDocument}
      contactPrompt="Questions about these terms?"
    />
  );
}
