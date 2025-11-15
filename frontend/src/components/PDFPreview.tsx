import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, Loader2 } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

// Set up the worker properly
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

interface PDFPreviewProps {
  file: File;
  currentPage: number;
  onPageChange: (page: number) => void;
  onTotalPagesChange: (pages: number) => void;
}

export const PDFPreview = ({ file, currentPage, onPageChange, onTotalPagesChange }: PDFPreviewProps) => {
  const [preview, setPreview] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setIsLoading(true);
        setError("");
        
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        const pages = pdf.numPages;
        setTotalPages(pages);
        onTotalPagesChange(pages);

        // Load the current page
        const page = await pdf.getPage(Math.min(currentPage, pages));
        const viewport = page.getViewport({ scale: 2 });
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) {
          setError("Failed to create canvas context");
          return;
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext: any = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        setPreview(canvas.toDataURL("image/png"));
      } catch (err) {
        console.error("PDF preview error:", err);
        setError(`Failed to load PDF: ${err instanceof Error ? err.message : "Unknown error"}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (file) {
      loadPDF();
    }
  }, [file, currentPage, onTotalPagesChange]);

  if (isLoading) {
    return (
      <div className="w-full h-96 bg-muted flex items-center justify-center rounded">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 bg-muted flex items-center justify-center rounded">
        <div className="flex flex-col items-center gap-2">
          <FileText className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground text-sm text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      {/* Preview */}
      <div className="w-full bg-muted flex items-center justify-center rounded border">
        {preview ? (
          <img
            src={preview}
            alt={`Page ${currentPage}`}
            className="w-full h-auto max-h-96 object-contain"
          />
        ) : (
          <div className="w-full h-96 flex flex-col items-center justify-center gap-2">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">No preview available</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newPage = Math.max(1, currentPage - 1);
              onPageChange(newPage);
            }}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newPage = Math.min(totalPages, currentPage + 1);
              onPageChange(newPage);
            }}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
