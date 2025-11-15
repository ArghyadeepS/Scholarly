import { useCallback } from "react";
import { Upload } from "lucide-react";

interface UploadDropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

export const UploadDropzone = ({ onFilesAdded }: UploadDropzoneProps) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFilesAdded(files);
  }, [onFilesAdded]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFilesAdded(files);
    }
  }, [onFilesAdded]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
      <p className="text-sm text-muted-foreground">
        Supports PDF, JPG, PNG files
      </p>
      <input
        id="file-input"
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
};
