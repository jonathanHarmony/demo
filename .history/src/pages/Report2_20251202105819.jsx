import React from 'react';
import PresentationSlides from '@/components/report/PresentationSlides';
import ReportChat from '@/components/report/ReportChat';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const TOTAL_SLIDES = 23;

export default function Report2Page() {
    return (
        <div className="h-[calc(100vh-64px)] w-full bg-slate-100">
            <ResizablePanelGroup direction="horizontal">
                {/* Chat panel - adjacent to sidebar */}
                <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
                    <ReportChat sessionId="report2" />
                </ResizablePanel>

                <ResizableHandle />

                {/* Slides panel */}
                <ResizablePanel defaultSize={75} minSize={60}>
                    <div className="w-full h-full bg-slate-100 overflow-y-auto scroll-smooth">
                        <div className="flex flex-col items-center p-8 gap-8">
                            {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
                                <div
                                    key={index}
                                    className="relative w-full max-w-[1400px] aspect-[16/9] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col shrink-0"
                                >
                                    {/* Top Decorative Line */}
                                    <div className="w-full h-[6px] bg-slate-900 flex-shrink-0"></div>

                                    {/* Content Area */}
                                    <div className="flex-grow relative overflow-hidden">
                                        <PresentationSlides slideIndex={index} />
                                    </div>

                                    {/* Slide Number */}
                                    <div className="absolute bottom-4 left-6 text-gray-400 text-sm font-medium z-10">
                                        {index + 1} / {TOTAL_SLIDES}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
