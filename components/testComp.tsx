"use client";
import React from "react";
import { Button } from "./ui/button";
import { TestCompCount } from "@/actions/auth";
import { toast } from "sonner";

const TestComp = () => {
  const [loading, setLoading] = React.useState(false);

  const handleCount = async () => {
    setLoading(true);
    try {
      const res = await TestCompCount();
      if (res.error) {
        console.error(res.message);
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la mise à jour du compteur :",
        error
      );
      toast.error(
        "Une erreur s'est produite lors de la mise à jour du compteur."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCount} disabled={loading}>
      {loading ? "Chargement..." : "Cliquez ici pour en savoir plus"}
    </Button>
  );
};

export default TestComp;
