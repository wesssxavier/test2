import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const demoUserId = 'demo-user';

async function main() {
  await prisma.activity.deleteMany();
  await prisma.challengeEntry.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.shareLink.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.outfit.deleteMany();
  await prisma.item.deleteMany();
  await prisma.closet.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      id: demoUserId,
      email: 'demo@styleai.app',
      name: 'Demo User',
      premium: false,
    },
  });

  const defaultCloset = await prisma.closet.create({
    data: {
      userId: user.id,
      name: 'Everyday',
      season: 'Spring',
      isDefault: true,
    },
  });

  const travelCloset = await prisma.closet.create({
    data: {
      userId: user.id,
      name: 'Travel Capsule',
      season: 'Summer',
    },
  });

  const closetIds = [defaultCloset.id, travelCloset.id];
  const categories = ['top', 'bottom', 'dress', 'outerwear', 'shoes', 'accessories'];

  for (let i = 0; i < 12; i += 1) {
    await prisma.item.create({
      data: {
        userId: user.id,
        closetId: closetIds[i % closetIds.length],
        title: `Sample Item ${i + 1}`,
        category: categories[i % categories.length],
        imagePath: `/sample/item-${i + 1}.png`,
        tags: ['demo'],
        season: i % 2 === 0 ? 'Summer' : 'Winter',
        price: 50 + i * 5,
        wears: Math.floor(Math.random() * 20),
      },
    });
  }

  const allItems = await prisma.item.findMany({ where: { userId: user.id } });

  for (let i = 0; i < 3; i += 1) {
    await prisma.outfit.create({
      data: {
        userId: user.id,
        closetId: closetIds[i % closetIds.length],
        name: `Look ${i + 1}`,
        items: JSON.stringify(allItems.slice(i, i + 4).map((item) => item.id)),
        occasion: i === 0 ? 'Work' : 'Weekend',
        style: i % 2 === 0 ? 'casual' : 'business',
      },
    });
  }

  await prisma.wishlistItem.create({
    data: {
      userId: user.id,
      title: 'Denim Jacket',
      brand: 'Indigo Co',
      price: 120,
      url: 'https://example.com/denim-jacket',
      tags: ['outerwear'],
    },
  });

  const challenge = await prisma.challenge.create({
    data: {
      title: 'Spring Layering',
      rules: 'Style a layered look for chilly mornings.',
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      ownerId: user.id,
    },
  });

  const [firstOutfit] = await prisma.outfit.findMany({ take: 1 });

  if (firstOutfit) {
    await prisma.challengeEntry.create({
      data: {
        challengeId: challenge.id,
        userId: user.id,
        outfitId: firstOutfit.id,
        votes: 4,
      },
    });
  }

  await prisma.activity.create({
    data: {
      userId: user.id,
      type: 'seed',
      payload: JSON.stringify({ message: 'Database seeded' }),
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
