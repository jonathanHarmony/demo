import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AddBlockDialog({ isOpen, onClose, onAdd }) {
    const [source, setSource] = useState('web');
    const [question, setQuestion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ source, question });
        setQuestion('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Research Block</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="source">Data Source</Label>
                        <Select value={source} onValueChange={setSource}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="web">Web Search</SelectItem>
                                <SelectItem value="docs">Uploaded Documents</SelectItem>
                                <SelectItem value="signals">Signals Hub</SelectItem>
                                <SelectItem value="playground">Research Playground</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="question">Research Question</Label>
                        <Textarea
                            id="question"
                            placeholder="What do you want to analyze in this block?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={!question.trim()}>Add Block</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
