import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CitationNodeView from './CitationNodeView';

export default Node.create({
    name: 'citation',

    group: 'inline',

    inline: true,

    atom: true,

    addAttributes() {
        return {
            number: {
                default: 1,
            },
            source: {
                default: {},
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'citation',
            },
            {
                tag: 'span[data-type="citation"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes, { 'data-type': 'citation' })];
    },

    addNodeView() {
        return ReactNodeViewRenderer(CitationNodeView);
    },
});
