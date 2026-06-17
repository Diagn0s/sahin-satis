import { prisma } from "@/lib/prisma";
import { TestimonialsList } from "./TestimonialsList";

const gradients = [
  "from-sahred to-sahred-hover",
  "from-emerald-500 to-emerald-700",
  "from-purple-500 to-purple-700",
  "from-amber-500 to-amber-700",
  "from-blue-500 to-blue-700",
  "from-rose-500 to-rose-700",
];

const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
};

export async function Testimonials() {
  const dbReviews = await prisma.review.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 4
  });

  // Map to the required format
  const mappedReviews = dbReviews.map((r, i) => ({
    id: r.id,
    initials: getInitials(r.user.name),
    name: r.user.name,
    stars: r.stars,
    text: r.text,
    gradient: gradients[i % gradients.length]
  }));

  if (mappedReviews.length === 0) return null;

  return (
    <section id="yorumlar" className="max-w-[1200px] mx-auto py-16 md:py-20 px-4 md:px-8">
      <div className="text-center mb-12">
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground tracking-tight">
          Müşteri Yorumları
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Bizi tercih eden kullanıcılarımızın deneyimleri
        </p>
      </div>

      <TestimonialsList reviews={mappedReviews} />
    </section>
  );
}
