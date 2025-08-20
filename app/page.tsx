import Header from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-16">
      <Header />
      <h1>Bienvenue à Teka Nanu</h1>
      <p>
        Votre solution tout-en-un pour acheter et vendre des produits de seconde
        main.
      </p>
      <Link href="/path/to/your/page">
        <Button>Cliquez ici pour en savoir plus</Button>
      </Link>
    </div>
  );
}
