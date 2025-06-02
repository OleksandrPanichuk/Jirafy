import { Card, CardBody } from '@heroui/react'
import { IconUpload } from '@tabler/icons-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface DragAndDropProps {
    onFilesAdded: (files: File[]) => void
    children: React.ReactNode
    accept?: string
    maxFiles?: number
    maxFileSize?: number // in bytes
}

export const DragAndDrop = ({
    onFilesAdded,
    children,
    accept,
    maxFiles = 10,
    maxFileSize = 50 * 1024 * 1024, // 50MB
}: DragAndDropProps) => {
    const [isDragging, setIsDragging] = useState(false)
    const dragCounterRef = useRef(0)

    const validateFiles = useCallback(
        (files: File[]) => {
            const validFiles: File[] = []
            const errors: string[] = []

            for (const file of files) {
                // Check file size
                if (file.size > maxFileSize) {
                    errors.push(
                        `${file.name} is too large (max ${Math.round(maxFileSize / 1024 / 1024)}MB)`,
                    )
                    continue
                }

                // Check file type if accept is specified
                if (accept) {
                    const acceptedTypes = accept
                        .split(',')
                        .map((type) => type.trim())
                    const isAccepted = acceptedTypes.some((type) => {
                        if (type.startsWith('.')) {
                            return file.name
                                .toLowerCase()
                                .endsWith(type.toLowerCase())
                        }
                        return file.type.match(type.replace('*', '.*'))
                    })

                    if (!isAccepted) {
                        errors.push(`${file.name} is not an accepted file type`)
                        continue
                    }
                }

                validFiles.push(file)
            }

            // Check max files limit
            if (validFiles.length > maxFiles) {
                errors.push(`Too many files (max ${maxFiles})`)
                return { validFiles: validFiles.slice(0, maxFiles), errors }
            }

            if (errors.length > 0) {
                console.warn('File validation errors:', errors)
                // You could show these errors to the user via a toast or modal
            }

            return { validFiles, errors }
        },
        [accept, maxFiles, maxFileSize],
    )
    const handleDragEnter = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        dragCounterRef.current++

        if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true)
        }
    }, [])
    const handleDragLeave = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        dragCounterRef.current--
        if (dragCounterRef.current === 0) {
            setIsDragging(false)
        }
    }, [])

    const handleDragOver = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])
    const handleDrop = useCallback(
        (e: DragEvent) => {
            e.preventDefault()
            e.stopPropagation()

            setIsDragging(false)
            dragCounterRef.current = 0

            if (e.dataTransfer?.files) {
                const files = Array.from(e.dataTransfer.files)
                const { validFiles } = validateFiles(files)

                if (validFiles.length > 0) {
                    onFilesAdded(validFiles)
                }
            }
        },
        [onFilesAdded, validateFiles],
    )

    const handlePaste = useCallback(
        (e: ClipboardEvent) => {
            if (e.clipboardData?.files) {
                const files = Array.from(e.clipboardData.files)
                if (files.length > 0) {
                    const { validFiles } = validateFiles(files)

                    if (validFiles.length > 0) {
                        onFilesAdded(validFiles)
                    }
                }
            }
        },
        [onFilesAdded, validateFiles],
    )

    useEffect(() => {
        const element = document.body

        element.addEventListener('dragenter', handleDragEnter)
        element.addEventListener('dragleave', handleDragLeave)
        element.addEventListener('dragover', handleDragOver)
        element.addEventListener('drop', handleDrop)
        element.addEventListener('paste', handlePaste)

        return () => {
            element.removeEventListener('dragenter', handleDragEnter)
            element.removeEventListener('dragleave', handleDragLeave)
            element.removeEventListener('dragover', handleDragOver)
            element.removeEventListener('drop', handleDrop)
            element.removeEventListener('paste', handlePaste)
        }
    }, [
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handlePaste,
    ])

    return (
        <div className="relative">
            {children}

            {isDragging && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Card className="max-w-md w-full mx-4">
                        <CardBody className="text-center p-8">
                            <div className="mb-4">
                                <IconUpload
                                    size={48}
                                    className="mx-auto text-primary"
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                Drop files to upload
                            </h3>
                            <p className="text-content2-foreground/70 text-sm">
                                {accept
                                    ? `Accepted types: ${accept}`
                                    : 'Any file type accepted'}
                            </p>
                            <p className="text-content2-foreground/70 text-xs mt-1">
                                Max {maxFiles} files,{' '}
                                {Math.round(maxFileSize / 1024 / 1024)}MB each
                            </p>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    )
}
