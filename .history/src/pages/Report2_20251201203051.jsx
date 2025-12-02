import React from 'react';
import { report1 } from '@/data/report1';
import SlideViewer from '@/components/report/SlideViewer';
import ReportChat from '@/components/report/ReportChat';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Report2Page() {
    return (
        <div className="h-[calc(100vh-64px)] w-full bg-slate-100" dir="rtl">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30} minSize={20}>
                    <ReportChat sessionId="report1" />
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={70} minSize={30}>
                    <div className="h-full p-8 overflow-y-auto space-y-12">
                        {report1.slides.map((slide, index) => (
                            <div key={slide.id} id={`slide-${index}`}>
                                <SlideViewer
                                    slide={slide}
                                    index={index}
                                    total={report1.slides.length}
                                />
                            </div>
                        ))}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
