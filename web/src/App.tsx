import * as monaco from 'monaco-editor';
import { useRef, useState, useTransition } from "react";
import { Editor } from "./components/Editor.tsx";
import { DiffEditor } from "./components/DiffEditor.tsx";
import { exampleCode } from "./example.ts";
import { resolveBacktickVulnerability } from "./api.ts";

export function App() {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    const [isPending, startTransition] = useTransition();
    const [code, setCode] = useState<{ original: string, modified: string | null }>({
        original: exampleCode,
        modified: null
    });

    const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    const handleSubmit = async () => {
        startTransition(async () => {
            if (!editorRef.current) {
                return;
            }

            const original = editorRef.current.getValue();
            const modified = await resolveBacktickVulnerability(original);

            setCode({ original, modified });
        });
    };

    const handleBack = async () => {
        setCode(prev => ({ ...prev, modified: "" }));
    }


    if (code.modified) {
        return <DiffEditor
            original={ code.original }
            modified={ code.modified }
            onBack={ handleBack }
        />
    }

    return <Editor
        code={ code.original }
        isLoading={ isPending }
        onMount={ handleEditorDidMount }
        onSubmit={ handleSubmit }
    />
}