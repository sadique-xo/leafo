export type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

const contactEmail = "leafoindia@gmail.com";
const contactPhone = "+91 95948 97176";

export const termsDocument: LegalDocument = {
  eyebrow: "Legal",
  title: "Terms & Conditions",
  intro:
    "These terms govern your use of the LEAFO website and any inquiry, quote, or purchase arranged with us. By using this site or placing an order, you agree to them.",
  lastUpdated: "19 May 2026",
  sections: [
    {
      title: "1. About LEAFO",
      paragraphs: [
        `LEAFO® ("LEAFO", "we", "us") designs and manufactures fiber-reinforced plastic (FRP) planters and fiber pots. Our registered place of business is Gandhidham, Gujarat, India.`,
        `You may contact us at ${contactEmail} or ${contactPhone}.`,
      ],
    },
    {
      title: "2. Use of this website",
      paragraphs: [
        "Content on this site is provided for general information about our products and services. We may update product imagery, specifications, finishes, and availability without notice.",
        "You agree not to misuse the site, attempt unauthorised access, scrape content at scale, or use our materials in a way that infringes our intellectual property.",
      ],
    },
    {
      title: "3. Inquiries, quotes, and orders",
      paragraphs: [
        "Submitting an inquiry or receiving a quote does not create a binding contract until we confirm an order in writing (email or formal quotation acceptance).",
        "Quotes are typically valid for the period stated on the quotation. Prices may change if specifications, finishes, quantities, freight, or duties change after a quote is issued.",
        "You are responsible for confirming dimensions, finish selection, drainage requirements, and site access before production begins.",
      ],
    },
    {
      title: "4. Pricing and payment",
      paragraphs: [
        "Unless stated otherwise, prices are quoted in Indian Rupees (INR) and exclude applicable taxes, freight, insurance, packing for export, and on-site installation unless explicitly included.",
        "Payment terms will be confirmed on your order. We may require an advance before production and balance before dispatch or delivery, depending on order size and account history.",
        "Late or failed payments may delay production, dispatch, or release of goods.",
      ],
    },
    {
      title: "5. Production, delivery, and risk",
      paragraphs: [
        "Lead times are estimates based on current production load, finish, and order size. We will communicate material delays when practicable.",
        "Delivery timelines depend on your location, carrier availability, and order volume. Risk in the goods passes to you on delivery to the address agreed, or on collection from our facility, unless otherwise stated in writing.",
        "You must inspect goods on receipt and notify us of transit damage or quantity discrepancies within a reasonable period, with supporting photographs where applicable.",
      ],
    },
    {
      title: "6. Custom work and specifications",
      paragraphs: [
        "Custom sizes, colours, branding, or engineering may require separate approval drawings. Approved specifications form the basis of manufacture.",
        "Changes requested after approval may incur additional cost and time. We are not responsible for issues arising from client-supplied dimensions or finishes that were not confirmed in writing.",
      ],
    },
    {
      title: "7. Returns, cancellations, and defects",
      paragraphs: [
        "Standard catalogue items may be cancellable only before production begins. Custom or made-to-order goods are generally non-cancellable once production has started.",
        "Manufacturing defects should be reported promptly with clear evidence. Our remedy, where accepted, is typically repair, replacement, or credit at our discretion and in line with any warranty terms provided with your order.",
        "Normal variation in hand-applied finishes, minor surface texture, and colour batching within an agreed tolerance range is not considered a defect.",
      ],
    },
    {
      title: "8. Warranty",
      paragraphs: [
        "Warranty terms, if offered, are stated on your quotation or order confirmation. Warranty does not cover misuse, improper installation, unauthorised modification, accidental damage, or normal weathering beyond stated limits.",
      ],
    },
    {
      title: "9. Intellectual property",
      paragraphs: [
        "All website content, product designs, photography, logos, and trade names are owned by or licensed to LEAFO. You may not reproduce or commercially exploit them without our prior written consent.",
      ],
    },
    {
      title: "10. Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by applicable law, LEAFO is not liable for indirect, incidental, or consequential loss, including loss of profit, planting stock, or project delay.",
        "Our total liability for any claim relating to an order is limited to the amount paid for the goods giving rise to the claim, except where liability cannot be limited under applicable law.",
      ],
    },
    {
      title: "11. Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. Courts at Gandhidham, Gujarat shall have exclusive jurisdiction, subject to mandatory consumer protections that may apply to you.",
      ],
    },
    {
      title: "12. Changes",
      paragraphs: [
        "We may update these terms from time to time. The date at the top of this page indicates when they were last revised. Continued use of the site after changes constitutes acceptance of the updated terms.",
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  intro:
    "This policy explains how LEAFO collects, uses, and protects personal information when you visit our website or contact us about our planters and fiber pots.",
  lastUpdated: "19 May 2026",
  sections: [
    {
      title: "1. Who we are",
      paragraphs: [
        `LEAFO® operates from Gandhidham, Gujarat, India. For privacy-related questions, contact ${contactEmail} or ${contactPhone}.`,
      ],
    },
    {
      title: "2. Information we collect",
      paragraphs: ["We may collect the following categories of information:"],
      list: [
        "Contact details you provide, such as name, email address, phone number, and company name.",
        "Project information you share in inquiry forms, including location, quantities, finishes, timelines, and messages.",
        "Technical data when you browse our site, such as IP address, browser type, device information, and pages visited.",
        "Communications you send us by email, phone, WhatsApp, or social channels.",
      ],
    },
    {
      title: "3. How we use your information",
      paragraphs: ["We use personal information to:"],
      list: [
        "Respond to inquiries and prepare quotations.",
        "Process and fulfil orders, arrange delivery, and provide after-sales support.",
        "Improve our website, products, and customer experience.",
        "Send service-related updates about an active inquiry or order.",
        "Comply with legal, tax, and regulatory obligations.",
      ],
    },
    {
      title: "4. Legal basis",
      paragraphs: [
        "We process information where necessary to respond to your request, perform a contract, pursue legitimate business interests (such as improving our services), or comply with law. Where consent is required, we will ask for it clearly.",
      ],
    },
    {
      title: "5. Sharing information",
      paragraphs: [
        "We do not sell your personal information. We may share data with trusted service providers who help us operate our website, hosting, analytics, logistics, or payment processing, subject to appropriate confidentiality obligations.",
        "We may disclose information if required by law, court order, or to protect our rights, customers, or property.",
      ],
    },
    {
      title: "6. Data retention",
      paragraphs: [
        "We retain inquiry and order records for as long as needed to fulfil the purpose collected, support warranty or legal claims, and meet accounting or regulatory requirements, then delete or anonymise them where practicable.",
      ],
    },
    {
      title: "7. Security",
      paragraphs: [
        "We use reasonable administrative and technical measures to protect personal information. No online transmission or storage system is completely secure; please avoid sending sensitive payment card details through general inquiry forms.",
      ],
    },
    {
      title: "8. Cookies and analytics",
      paragraphs: [
        "Our website may use cookies and similar technologies to remember preferences, measure traffic, and understand how visitors use the site. You can control cookies through your browser settings. Disabling cookies may affect some site features.",
      ],
    },
    {
      title: "9. Your rights",
      paragraphs: [
        "Depending on applicable law, you may request access to, correction of, or deletion of your personal information, or object to certain processing. Contact us using the details above and we will respond within a reasonable time.",
      ],
    },
    {
      title: "10. Third-party links",
      paragraphs: [
        "Our site may link to social platforms or other websites. We are not responsible for the privacy practices of those third parties. Review their policies before providing personal information.",
      ],
    },
    {
      title: "11. Children",
      paragraphs: [
        "Our services are directed at businesses and adults purchasing planters for commercial or residential projects. We do not knowingly collect personal information from children.",
      ],
    },
    {
      title: "12. Changes to this policy",
      paragraphs: [
        "We may update this policy from time to time. The last updated date at the top of this page will change when we do. Material changes will be reflected on this page.",
      ],
    },
  ],
};
