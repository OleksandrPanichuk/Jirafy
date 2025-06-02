import { Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'

interface CharacterCounterProps {
    editor: Editor | null
    maxWords?: number
    showCharacterCount?: boolean
}

export const CharacterCounter = ({
    editor,
    maxWords = 500,
    showCharacterCount = false,
}: CharacterCounterProps) => {
    const [stats, setStats] = useState({ characters: 0, words: 0 })

    useEffect(() => {
        if (!editor) {
            setStats({ characters: 0, words: 0 })
            return
        }

        const updateStats = () => {
            const text = editor.getText()
            const characters = text.length
            const words = text.trim() ? text.trim().split(/\s+/).length : 0
            setStats({ characters, words })
        }

        // Initial calculation
        updateStats()

        // Listen for content changes
        editor.on('update', updateStats)

        return () => {
            editor.off('update', updateStats)
        }
    }, [editor])

    const isNearLimit = stats.words > maxWords * 0.8
    const isOverLimit = stats.words > maxWords

    const getColorClass = () => {
        if (isOverLimit) return 'text-danger'
        if (isNearLimit) return 'text-warning'
        return 'text-content2-foreground/70'
    }

    if (!editor) return null

    return (
        <div className={`text-xs ${getColorClass()} flex items-center gap-2`}>
            <span>
                {stats.words}/{maxWords} word{stats.words !== 1 ? 's' : ''}
            </span>
            {showCharacterCount && (
                <span>
                    {stats.characters} character
                    {stats.characters !== 1 ? 's' : ''}
                </span>
            )}
            {isOverLimit && (
                <span className="text-danger">
                    ({stats.words - maxWords} over limit)
                </span>
            )}
        </div>
    )
}
