import { useState, useEffect, useRef } from "react";
import {
  FileText, Upload, Download, Trash2, Eye, File, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../store/AuthContext";
import {
  PageHeader, Card, Badge, Button, SearchBar, Select, Tabs,
  LoadingSpinner, EmptyState, ConfirmDialog, Modal, cn,
} from "../components/ui";
import { documentService } from "../services/api";
import type { Document, DocumentCategory } from "../types";

const CATEGORY_CONFIG: Record<DocumentCategory, { label: string; v: "success" | "info" | "warning" | "default" | "purple" | "magenta" }> = {
  contract: { label: "Contract", v: "purple" },
  policy: { label: "Policy", v: "info" },
  payslip: { label: "Payslip", v: "success" },
  certificate: { label: "Certificate", v: "warning" },
  id: { label: "ID Document", v: "magenta" },
  other: { label: "Other", v: "default" },
};

const FILE_ICON_COLOR: Record<string, string> = {
  PDF: "text-red-500",
  DOCX: "text-blue-500",
  XLSX: "text-green-500",
  PNG: "text-purple-500",
  JPG: "text-purple-500",
};

export function DocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<string>("other");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const data = await documentService.list(user.id);
      setDocuments(data);
      setLoading(false);
    };
    void load();
  }, [user]);

  const filtered = documents.filter(d => {
    const matchSearch = search === "" || d.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "" || d.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await documentService.delete(deleteId);
      setDocuments(prev => prev.filter(d => d.id !== deleteId));
      toast.success("Document deleted");
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    setUploading(true);
    try {
      const result = await documentService.upload(uploadFile, uploadCategory);
      if (result.success) {
        const newDoc: Document = {
          id: result.id,
          name: uploadFile.name,
          category: uploadCategory as DocumentCategory,
          uploadedBy: user ? `${user.firstName} ${user.lastName}` : "You",
          uploadedDate: new Date().toISOString().slice(0, 10),
          size: `${(uploadFile.size / 1024).toFixed(0)} KB`,
          fileType: uploadFile.name.split(".").pop()?.toUpperCase() ?? "FILE",
        };
        setDocuments(prev => [newDoc, ...prev]);
        toast.success("Document uploaded successfully");
        setUploadOpen(false);
        setUploadFile(null);
        setUploadCategory("other");
      }
    } finally {
      setUploading(false);
    }
  };

  const groupedByCategory = Object.keys(CATEGORY_CONFIG).reduce<Record<string, Document[]>>((acc, cat) => {
    const docs = filtered.filter(d => d.category === cat);
    if (docs.length > 0) acc[cat] = docs;
    return acc;
  }, {});

  if (loading) return <LoadingSpinner />;

  const isExpiringSoon = (d: Document) => {
    if (!d.expiryDate) return false;
    const diff = new Date(d.expiryDate).getTime() - Date.now();
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
  };

  const expiringSoon = documents.filter(isExpiringSoon).length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PageHeader
        title="Document Hub"
        description="Your employment documents, payslips, certificates, and personal files"
        actions={
          <Button variant="primary" size="sm" icon={<Upload size={14} />} onClick={() => setUploadOpen(true)}>
            Upload Document
          </Button>
        }
      />

      {/* Expiry warning */}
      {expiringSoon > 0 && (
        <div className="mb-5 p-3.5 bg-status-warning50 border border-status-warning/20 rounded-xl flex items-center gap-3">
          <AlertCircle size={15} className="text-status-warning flex-shrink-0" />
          <span className="text-sm text-status-warning font-medium">
            {expiringSoon} document{expiringSoon > 1 ? "s" : ""} expiring within 30 days. Please renew them.
          </span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
        {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => {
          const count = documents.filter(d => d.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(prev => prev === cat ? "" : cat)}
              className={cn(
                "flex flex-col items-center gap-1 p-2.5 rounded-xl border text-center transition-all",
                categoryFilter === cat ? "bg-primary text-white border-primary" : "bg-card border-border hover:border-primary/30"
              )}
            >
              <span className={cn("text-xl font-bold", categoryFilter === cat ? "text-white" : "text-foreground")}>{count}</span>
              <span className={cn("text-[10px] font-medium leading-tight", categoryFilter === cat ? "text-white/80" : "text-muted-foreground")}>{cfg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search documents…" className="flex-1" />
        <Select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          options={[
            { label: "All Categories", value: "" },
            ...Object.entries(CATEGORY_CONFIG).map(([v, c]) => ({ label: c.label, value: v })),
          ]}
          className="sm:w-44"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title="No documents found" description="Upload your first document to get started" />
      ) : categoryFilter ? (
        /* Flat list when filtering by category */
        <div className="flex flex-col gap-2">
          {filtered.map(doc => <DocumentRow key={doc.id} doc={doc} onDelete={() => setDeleteId(doc.id)} isExpiringSoon={isExpiringSoon(doc)} />)}
        </div>
      ) : (
        /* Grouped by category */
        <div className="flex flex-col gap-6">
          {Object.entries(groupedByCategory).map(([cat, docs]) => {
            const cfg = CATEGORY_CONFIG[cat as DocumentCategory];
            return (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{cfg.label}</span>
                  <Badge variant={cfg.v}>{docs.length}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {docs.map(doc => <DocumentRow key={doc.id} doc={doc} onDelete={() => setDeleteId(doc.id)} isExpiringSoon={isExpiringSoon(doc)} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Document"
        description="Are you sure you want to delete this document? This action cannot be undone."
        confirmLabel="Delete"
        destructive
        loading={deleteLoading}
      />

      {/* Upload Modal */}
      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Document" size="sm">
        <div className="flex flex-col gap-4">
          <Select
            label="Document Category"
            value={uploadCategory}
            onChange={e => setUploadCategory(e.target.value)}
            options={Object.entries(CATEGORY_CONFIG).map(([v, c]) => ({ label: c.label, value: v }))}
          />

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">File</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all",
                uploadFile ? "border-[#440F7C] bg-[#440F7C]/5" : "border-border hover:border-[#440F7C]/40"
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={e => setUploadFile(e.target.files?.[0] ?? null)}
                accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
              />
              {uploadFile ? (
                <div className="flex items-center gap-2 justify-center">
                  <File size={16} className="text-[#440F7C]" />
                  <span className="text-sm font-medium text-[#440F7C]">{uploadFile.name}</span>
                </div>
              ) : (
                <>
                  <Upload size={20} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to select a file</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX, PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={uploading} disabled={!uploadFile} onClick={() => void handleUpload()}>
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function DocumentRow({ doc, onDelete, isExpiringSoon }: { doc: Document; onDelete: () => void; isExpiringSoon: boolean }) {
  const iconColor = FILE_ICON_COLOR[doc.fileType] ?? "text-muted-foreground";
  return (
    <div className={cn("flex items-center gap-3 p-3.5 bg-card border rounded-xl hover:border-primary/20 transition-all group", isExpiringSoon && "border-status-warning/30 bg-status-warning50/30")}>
      <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
        <File size={16} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-foreground truncate">{doc.name}</span>
          {isExpiringSoon && <Badge variant="warning">Expiring soon</Badge>}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {doc.fileType} · {doc.size} · Uploaded {new Date(doc.uploadedDate).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
          {doc.expiryDate && ` · Expires ${new Date(doc.expiryDate).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}`}
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          title="Preview"
          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          onClick={() => toast.info("Document preview coming soon")}
        >
          <Eye size={14} />
        </button>
        <button
          title="Download"
          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          onClick={() => toast.success("Download started")}
        >
          <Download size={14} />
        </button>
        <button
          title="Delete"
          className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
