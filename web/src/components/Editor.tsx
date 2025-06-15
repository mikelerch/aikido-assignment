import { Editor as MonacoEditor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface Props {
    code: string
    isLoading: boolean
    onMount: (editor: monaco.editor.IStandaloneCodeEditor) => void
    onSubmit: () => void
}

export function Editor({ code, isLoading, onMount, onSubmit }: Props) {
    return <>
        <MonacoEditor
            height="50vh"
            language="php"
            defaultValue={ code }
            onMount={ onMount }
        />
        <button
            type="button"
            className="flex items-center rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:cursor-not-allowed"
            onClick={ onSubmit }
            disabled={ isLoading }
        >
            { isLoading ? "Please wait" : "Submit" }
            { isLoading && <svg
                className="animate-spin ml-3 h-4 w-4 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg> }
        </button>
    </>
}