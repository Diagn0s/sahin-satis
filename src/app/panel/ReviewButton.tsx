"use client";

import { useState, useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createReview } from "@/actions/review";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

export function ReviewButton({ orderId }: { orderId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(5);
  const [state, formAction, isPending] = useActionState(createReview, null);

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2 w-full sm:w-auto text-amber-600 border-amber-200 hover:bg-amber-50"
        onClick={() => setIsOpen(true)}
      >
        <Star className="w-4 h-4 mr-2" /> Değerlendir
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h3 className="font-heading font-bold text-lg">Siparişi Değerlendir</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-muted text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5">
                <form action={formAction} className="space-y-5">
                  <input type="hidden" name="orderId" value={orderId} />
                  <input type="hidden" name="stars" value={selectedStar} />
                  
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setSelectedStar(star)}
                        className="text-3xl focus:outline-none transition-transform hover:scale-110"
                      >
                        <span className={star <= (hoveredStar || selectedStar) ? "text-amber-400" : "text-muted"}>
                          ★
                        </span>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Yorumunuz</label>
                    <textarea 
                      name="text" 
                      rows={4} 
                      required
                      placeholder="Ürün ve alışveriş deneyiminiz hakkında neler düşünüyorsunuz?"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>

                  {state?.error && (
                    <p className="text-sm text-red-500 font-medium">{state.error}</p>
                  )}

                  <Button type="submit" disabled={isPending} className="w-full bg-sahred hover:bg-sahred-hover text-white">
                    {isPending ? "Gönderiliyor..." : "Yorumu Gönder"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
