import CreatedPagesGrid from "./_components/CreatedPagesGrid/page";

export default function Home() {
  return (
    <div className="text-center mt4 col-md-8 mx-auto">
      <h1 className="text-danger">Created Pages</h1>
      <div className="border border-danger"></div>
      <CreatedPagesGrid pagesData={SAMPLE_PAGES} />
    </div>
  );
}

const SAMPLE_PAGES = [
  {
    slug: "my-first-page",
    title: "My first page",
    description: "Just a testing page",
  },
  {
    slug: "about-us",
    title: "About Us",
    description: "Learn more about our company and team.",
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Get in touch with us through our contact page.",
  },
  {
    slug: "services",
    title: "Our Services",
    description: "Explore the services we offer to our clients.",
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Read our latest articles and updates.",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    description: "Take a look at some of our past projects.",
  },
  {
    slug: "faq",
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about our services.",
  },
  {
    slug: "careers",
    title: "Careers",
    description: "Explore career opportunities and join our team.",
  },
  {
    slug: "testimonials",
    title: "Testimonials",
    description: "See what our clients have to say about us.",
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    description: "Read the terms and conditions for using our services.",
  },
];
