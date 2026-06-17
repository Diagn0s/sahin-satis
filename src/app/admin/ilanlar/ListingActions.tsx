"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { deleteListing } from "@/actions/admin";
import Link from "next/link";
import { useTransition } from "react";

export function ListingActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Bu ilanı (ve varsa bağlı siparişleri) silmek istediğinize emin misiniz?")) {
      startTransition(async () => {
        const res = await deleteListing(id);
        if (res.error) alert(res.error);
      });
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <Link href={`/admin/ilanlar/${id}/duzenle`}>
        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
          <Edit className="w-4 h-4" />
        </Button>
      </Link>
      <Button 
        onClick={handleDelete} 
        disabled={isPending}
        variant="ghost" 
        size="sm" 
        className="text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
