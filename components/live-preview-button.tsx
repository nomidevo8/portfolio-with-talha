"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function LivePreviewButton({ url }: { url: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className="rounded-full reveal reveal-delay-3"
        onClick={() => setIsOpen(true)}
      >
        <span className="inline-flex items-center gap-2">
          Take a look
          <ExternalLink className="h-4 w-4" />
        </span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-[90%] h-[90vh] mt-12 mx-2 bg-white rounded-lg shadow-lg ">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 px-4 right-3 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
            >
              Close
            </button>
            <iframe
              src={url}
              className="w-full h-full border-0"
              title="Live Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}
