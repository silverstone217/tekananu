import Header from "@/components/home/Header";
import TestComp from "@/components/testComp";
// import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
// import Link from "next/link";

const getUsersLength = async () => {
  const users = await prisma.user.findMany();
  return users.length;
};

export default async function Home() {
  const usersLength = await getUsersLength();

  return (
    <div className="pt-16 lg:pt-18">
      <Header />
      <div className="max-w-7xl mx-auto p-4 space-y-2 w-full ">
        <h1>Bienvenue à Teka Nanu</h1>
        <p>
          Votre solution tout-en-un pour acheter et vendre des produits de
          seconde main.
        </p>
        <p>
          Nous avons actuellement {usersLength ? usersLength : "rien trouvé"}{" "}
          utilisateurs inscrits.
        </p>
        {/* <Link href="/path/to/your/page">
          <Button>Cliquez ici pour en savoir plus</Button>
        </Link> */}
        <TestComp />
      </div>
    </div>
  );
}
