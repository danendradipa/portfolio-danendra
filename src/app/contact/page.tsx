import { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Danendra Dipa Dananjaya. Let's discuss your next project or collaboration opportunity.",
};

const Contact = () => {
  return (
    <section className="pt-18 pb-20 px-8 bg-zinc-100 dark:bg-zinc-900">
      <ContactSection />
    </section>
  );
};

export default Contact;
