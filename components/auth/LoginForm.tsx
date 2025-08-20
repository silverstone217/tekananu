"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [passwordType, setPasswordType] = React.useState<"text" | "password">(
    "password"
  );

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error === "CredentialsSignin") {
        toast.error("Email ou mot de passe invalide");
        return;
      } else if (result?.error) {
        toast.error("Erreur inconnue : " + result.error);
        return;
      }

      toast.success("Connexion réussie !");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full grid gap-6 mt-6" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
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
        {loading && <Loader className="animate-spin mr-1" />} {`Se connecter`}
      </Button>
      {/* No account ? sign up */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {`Vous n'avez pas de compte`} ?{" "}
          <Link href={"/inscription"} className="font-medium text-gray-700">
            {`S'inscrire`}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
