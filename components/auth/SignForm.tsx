"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUser, NewUserData } from "@/actions/auth";

const SignForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [passwordType, setPasswordType] = React.useState<"text" | "password">(
    "password"
  );

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const phoneRegex = /^[0-9]{9}$/;

      if (!phoneRegex.test(phone)) {
        toast.error("Le numéro de téléphone doit contenir 9 chiffres.");
        setLoading(false); // éviter de rester bloqué sur loading
        return;
      }

      const formData: NewUserData = {
        email: email.trim(),
        password: password.trim(),
        name: name.trim().toLowerCase(),
        phone: phone.trim(),
      };

      const result = await createUser(formData);

      if (result.error) {
        toast.error(result.message);
        return;
      } else {
        toast.success(result.message);
        router.push("/connexion");
      }
    } catch {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full grid gap-6 mt-6" onSubmit={handleSubmit}>
      {/* names */}
      <div className="grid w-full gap-2">
        <Label htmlFor="name">Nom et prénom</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={6}
          maxLength={50}
          placeholder="Dupont Jean"
          autoCapitalize="off"
          autoComplete="name"
          autoCorrect="off"
          disabled={loading}
        />
      </div>

      {/* email */}
      <div className="grid w-full gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="dupont.jean@example.com"
          autoCapitalize="off"
          autoComplete="email"
          autoCorrect="off"
          minLength={6}
          maxLength={50}
          disabled={loading}
        />
      </div>

      {/* telephone */}
      <div className="grid w-full gap-2">
        <Label htmlFor="phone">Téléphone</Label>
        <div className="relative">
          <span
            className="absolute left-2 top-1/2 transform -translate-y-1/2
          text-gray-500
          "
          >
            +243
          </span>
          <Input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="123456789"
            autoCapitalize="off"
            autoComplete="tel"
            autoCorrect="off"
            minLength={9}
            maxLength={9}
            className="pl-12"
            disabled={loading}
          />
        </div>
      </div>

      {/* password */}
      <div className="grid w-full gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <div className="relative">
          <Input
            type={passwordType}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            maxLength={12}
            placeholder={"••••••••"}
            autoCapitalize="off"
            autoComplete="new-password"
            autoCorrect="off"
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() =>
              setPasswordType((prev) =>
                prev === "password" ? "text" : "password"
              )
            }
            disabled={loading}
          >
            {passwordType === "password" ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>

      {/* submit button */}
      <Button type="submit" className="w-full mt-4" disabled={loading}>
        {loading && <Loader className="animate-spin mr-1" />} {`S'inscrire`}
      </Button>
      {/* account ? sign in */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Vous avez déjà un compte ?{" "}
          <Link href={"/connexion"} className="font-medium text-gray-700">
            Se connecter
          </Link>
        </p>
      </div>

      {/* terms and conditions */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          En vous inscrivant, vous acceptez nos{" "}
          <Link href={"/terms"} className="font-medium text-gray-700">
            conditions {`d'utilisation`}
          </Link>{" "}
          et{" "}
          <Link href={"/privacy"} className="font-medium text-gray-700">
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

export default SignForm;
