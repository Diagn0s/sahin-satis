import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sahinsatis.com' },
    update: {},
    create: {
      name: 'Admin Şahin',
      email: 'admin@sahinsatis.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created:', admin.email);

  // 2. Create Categories
  const categories = [
    { label: "Telefon & Tablet", slug: "telefon-tablet", icon: "📱" },
    { label: "Bilgisayar", slug: "bilgisayar", icon: "💻" },
    { label: "Oyun & Konsol", slug: "oyun-konsol", icon: "🎮" },
    { label: "Fotoğraf", slug: "fotograf", icon: "📷" },
    { label: "Ev & Mobilya", slug: "ev-mobilya", icon: "🏠" },
    { label: "Giyim & Aksesuar", slug: "giyim-aksesuar", icon: "⌚" },
  ];

  const categoryMap = new Map();
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.label,
        slug: cat.slug,
        icon: cat.icon,
      },
    });
    categoryMap.set(cat.slug, created.id);
  }
  console.log('Categories created.');

  // 3. Create Sample Listings
  const sampleListings = [
    { title: "iPhone 13 Pro Max 256GB", slug: "iphone-13-pro-max", description: "Az kullanılmış, kutulu. Batarya %89, küçük çizikler var.", price: 18500, badge: "hot", badgeLabel: "FIRSAT", icon: "📱", bgColor: "bg-blue-50", categorySlug: "telefon-tablet" },
    { title: "MacBook Air M2 8GB/256GB", slug: "macbook-air-m2", description: "2023 model, uzay grisi. Herhangi bir hasar yok, şarj aleti dahil.", price: 32000, badge: "new", badgeLabel: "YENİ GİBİ", icon: "💻", bgColor: "bg-green-50", categorySlug: "bilgisayar" },
    { title: "PlayStation 5 + 2 Kol", slug: "playstation-5", description: "Disk sürümü, 3 oyun hediye. Çok az kullanılmış, temiz.", price: 22000, badge: "hot", badgeLabel: "POPÜLER", icon: "🎮", bgColor: "bg-purple-50", categorySlug: "oyun-konsol" },
  ];

  for (const listing of sampleListings) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: {},
      create: {
        title: listing.title,
        slug: listing.slug,
        description: listing.description,
        price: listing.price,
        badge: listing.badge,
        badgeLabel: listing.badgeLabel,
        icon: listing.icon,
        bgColor: listing.bgColor,
        categoryId: categoryMap.get(listing.categorySlug),
      },
    });
  }
  console.log('Sample listings created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
