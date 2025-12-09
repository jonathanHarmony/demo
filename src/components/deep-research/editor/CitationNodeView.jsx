import React, { useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export default function CitationNodeView(props) {
    const { node } = props;
    const { number, source } = node.attrs;
    const [hovered, setHovered] = useState(false);

    return (
        <NodeViewWrapper as="span" className="inline-block">
            <Popover open={hovered} onOpenChange={setHovered}>
                <PopoverTrigger asChild>
                    <sup
                        className="citation text-purple-600 cursor-pointer hover:text-purple-700 font-medium mx-0.5 select-none"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        contentEditable={false}
                    >
                        [{number}]
                    </sup>
                </PopoverTrigger>
                <PopoverContent
                    className="w-80 p-4 z-50"
                    side="top"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-medium">
                                {number}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-slate-900 mb-1">
                                    {source?.platform || 'Source'}
                                </div>
                                <div className="text-xs text-slate-600 italic leading-relaxed">
                                    "{source?.quote || ''}"
                                </div>
                                <div className="text-xs text-slate-400 mt-2">
                                    {source?.author} • {source?.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </NodeViewWrapper>
    );
}
