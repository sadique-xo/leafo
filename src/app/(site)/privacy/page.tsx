import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/site/legal-document-page";
import { privacyDocument } from "@/data/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy - LEAFO",
  description:
    "How LEAFO collects, uses, and protects personal information when you visit our site or inquire about planters.",
};

export default function PrivacyPage() {
  return (
    <LegalDocumentPage
      document={privacyDocument}
      contactPrompt="Questions about your data?"
    />
  );
}
