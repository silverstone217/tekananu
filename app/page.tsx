import Header from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-16 lg:pt-18">
      <Header />
      <div className="max-w-7xl mx-auto p-4 space-y-2 w-full ">
        <h1>Bienvenue à Teka Nanu</h1>
        <p>
          Votre solution tout-en-un pour acheter et vendre des produits de
          seconde main.
        </p>
        <Link href="/path/to/your/page">
          <Button>Cliquez ici pour en savoir plus</Button>
        </Link>
      </div>
    </div>
  );
}
