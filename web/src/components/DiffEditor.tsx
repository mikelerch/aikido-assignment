import { DiffEditor as MonacoDiffEditor } from '@monaco-editor/react';

interface Props {
    original: string
    modified: string
    onBack: () => void
}

export function DiffEditor({ original, modified, onBack }: Props) {
    return <>
        <MonacoDiffEditor
            height="50vh"
            original={ original }
            modified={ modified }
            language="php"
            options={ {
                readOnly: true,
            } }
            keepCurrentOriginalModel={ true }
            keepCurrentModifiedModel={ true }
        />
        <button
            type="button"
            className="rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
            onClick={ onBack }
        >
            Back
        </button>
    </>
}