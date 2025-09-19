"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, X, CheckCircle } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  file: File
}

interface DocumentUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void
  uploadedFiles: UploadedFile[]
}

export function DocumentUpload({ onFilesUploaded, uploadedFiles }: DocumentUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      }))

      const updatedFiles = [...uploadedFiles, ...newFiles].slice(0, 10) // حد أقصى 10 ملفات
      onFilesUploaded(updatedFiles)
    },
    [uploadedFiles, onFilesUploaded],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
    },
    maxFiles: 10,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  })

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId)
    onFilesUploaded(updatedFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄"
    if (type.includes("excel") || type.includes("spreadsheet")) return "📊"
    if (type.includes("word") || type.includes("document")) return "📝"
    if (type.includes("image")) return "🖼️"
    return "📁"
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#B48500] mb-2">أرفق المستندات المالية</h2>
        <p className="text-gray-300 mb-6">ارفع حتى 10 مستندات مالية لتحليل شامل لمدة تصل إلى 10 سنوات</p>
      </div>

      {/* منطقة رفع الملفات */}
      <Card
        {...getRootProps()}
        className={`p-8 border-2 border-dashed cursor-pointer transition-all duration-300 ${
          isDragActive ? "border-[#B48500] bg-[#B48500]/10" : "border-gray-600 bg-gray-900 hover:border-[#B48500]/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragActive ? "text-[#B48500]" : "text-gray-400"}`} />
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            {isDragActive ? "أفلت الملفات هنا" : "اسحب وأفلت الملفات هنا"}
          </h3>
          <p className="text-gray-400 mb-4">أو اضغط لاختيار الملفات</p>
          <div className="text-sm text-gray-500">
            <p>الصيغ المدعومة: PDF, Excel, Word, صور</p>
            <p>حد أقصى: 10 ملفات</p>
          </div>
        </div>
      </Card>

      {/* قائمة الملفات المرفوعة */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#B48500] flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 rtl:ml-2" />
            الملفات المرفوعة ({uploadedFiles.length}/10)
          </h3>

          <div className="grid gap-3">
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="p-4 bg-gray-800 border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    <div>
                      <p className="font-medium text-gray-200 truncate max-w-xs">{file.name}</p>
                      <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* معلومات إضافية */}
      <Card className="p-4 bg-blue-900/20 border-blue-700/50">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <FileText className="w-5 h-5 text-blue-400 mt-0.5" />
          <div className="text-sm text-blue-200">
            <p className="font-medium mb-1">نصائح لأفضل النتائج:</p>
            <ul className="space-y-1 text-blue-300">
              <li>• ارفع القوائم المالية الكاملة (الميزانية، الدخل، التدفقات النقدية)</li>
              <li>• تأكد من وضوح الأرقام والبيانات في المستندات</li>
              <li>• ارفع البيانات لعدة سنوات للحصول على تحليل مقارن</li>
              <li>• يمكن رفع مستندات بصيغ مختلفة لنفس الفترة</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
