import { useEffect } from 'react';
import { Editor, loader } from '@monaco-editor/react';
import { registerBSL } from '@/lib/monaco-bsl';

interface BslEditorProps {
    code: string;
    height?: string | number;
    readOnly?: boolean;
    loading?: React.ReactNode;
    className?: string;
    hideBorder?: boolean;
}

export function BslEditor({ code, height = '200px', readOnly = true, loading, className, hideBorder = false }: BslEditorProps) {
    // Register BSL language once
    useEffect(() => {
        loader.init().then(monaco => {
            registerBSL(monaco);
        });
    }, []);

    const defaultLoading = (
        <pre className="bg-[#1e1e1e] p-4 text-zinc-300 text-[13px] font-mono whitespace-pre opacity-50">
            {code}
        </pre>
    );

    return (
        <div
            className={`overflow-hidden transition-all duration-300 ${!hideBorder ? 'rounded-b-lg border border-[#27272a] border-t-0' : ''} ${className || ''}`}
            style={{ height: typeof height === 'number' ? `${height}px` : height }}
        >
            <Editor
                height="100%"
                language="bsl"
                theme="vs-dark"
                value={code}
                loading={loading || defaultLoading}
                options={{
                    readOnly,
                    minimap: { enabled: false },
                    fontSize: 13,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 8, bottom: 8 },
                    renderLineHighlight: 'none',
                    folding: true,
                    scrollbar: {
                        vertical: 'auto',
                        horizontal: 'auto',
                        verticalScrollbarSize: 8,
                        horizontalScrollbarSize: 8
                    }
                }}
            />
        </div>
    );
}
