"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, CheckCircle, AlertCircle, FileText, ImageIcon, FileSpreadsheet } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "completed" | "error"
  progress: number
}

interface FileUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void
  maxFiles?: number
}

export function FileUpload({ onFilesUploaded, maxFiles = 10 }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
      }))

      setUploadedFiles((prev) => [...prev, ...newFiles])

      // Simulate upload progress
      newFiles.forEach((file) => {
        const interval = setInterval(() => {
          setUploadedFiles((prev) =>
            prev.map((f) => {
              if (f.id === file.id) {
                const newProgress = f.progress + Math.random() * 30
                if (newProgress >= 100) {
                  clearInterval(interval)
                  return { ...f, progress: 100, status: "completed" }
                }
                return { ...f, progress: newProgress }
              }
              return f
            }),
          )
        }, 200)
      })

      onFilesUploaded([...uploadedFiles, ...newFiles])
    },
    [uploadedFiles, onFilesUploaded],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
    },
    maxFiles: maxFiles - uploadedFiles.length,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="w-6 h-6 text-red-500" />
    if (type.includes("sheet") || type.includes("excel")) return <FileSpreadsheet className="w-6 h-6 text-green-500" />
    if (type.includes("word")) return <FileText className="w-6 h-6 text-blue-500" />
    if (type.includes("image")) return <ImageIcon className="w-6 h-6 text-purple-500" />
    return <File className="w-6 h-6 text-[#B48500]" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="bg-black border-[#B48500]">
      <CardHeader>
        <CardTitle className="text-[#B48500] flex items-center gap-2">
          <Upload className="w-5 h-5" />
          إرفاق المستندات المالية
        </CardTitle>
        <p className="text-[#8B6914] text-sm">
          ارفع القوائم المالية أو موازين المراجعة أو الموازنات التقديرية (PDF, Excel, Word, صور)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            isDragActive
              ? "border-[#B48500] bg-[#B48500]/10"
              : "border-[#8B6914] hover:border-[#B48500] hover:bg-[#B48500]/5"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-[#B48500] mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-[#B48500]">اسحب الملفات هنا...</p>
          ) : (
            <div>
              <p className="text-[#B48500] mb-2">اسحب الملفات هنا أو انقر للاختيار</p>
              <p className="text-[#8B6914] text-sm">
                يمكنك رفع حتى {maxFiles} ملفات (PDF, Excel, Word, صور) - حد أقصى 50MB لكل ملف
              </p>
            </div>
          )}
        </div>

        {/* File List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-[#B48500] font-semibold">الملفات المرفوعة ({uploadedFiles.length})</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#8B6914]"
                >
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#B48500] text-sm font-medium truncate">{file.name}</p>
                    <p className="text-[#8B6914] text-xs">{formatFileSize(file.size)}</p>
                    {file.status === "uploading" && (
                      <Progress value={file.progress} className="mt-1 h-1 bg-[#8B6914]" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === "completed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {file.status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
                    {file.status === "uploading" && (
                      <Badge variant="secondary" className="bg-[#B48500] text-black">
                        {Math.round(file.progress)}%
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Stats */}
        <div className="flex justify-between text-sm text-[#8B6914] pt-2 border-t border-[#8B6914]">
          <span>
            الملفات المرفوعة: {uploadedFiles.length}/{maxFiles}
          </span>
          <span>
            المكتملة: {uploadedFiles.filter((f) => f.status === "completed").length} | الأخطاء:{" "}
            {uploadedFiles.filter((f) => f.status === "error").length}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
