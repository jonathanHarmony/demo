import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PresentationSlides from '@/components/report/PresentationSlides';
import ReportChat from '@/components/report/ReportChat';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const TOTAL_SLIDES = 23;

export default function Report2Page() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < TOTAL_SLIDES - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] w-full bg-slate-100" dir="rtl">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
                    <ReportChat />
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={80} minSize={65}>
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center p-4">
                        {/* Main Slide Container */}
                        <div className="relative w-full max-w-[1600px] aspect-[16/9] bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col">
                            {/* Top Decorative Line */}
                            <div className="w-full h-[6px] bg-[#0F1C2E] flex-shrink-0"></div>

                            {/* Content Area */}
                            <div className="flex-grow relative overflow-hidden">
                                <div className="h-full w-full overflow-y-auto">
                                    <PresentationSlides slideIndex={currentSlide} />
                                </div>
                            </div>

                            {/* Slide Footer / Numbering */}
                            <div className="absolute bottom-4 left-6 text-gray-400 text-sm font-medium z-10">
                                {currentSlide + 1} / {TOTAL_SLIDES}
                            </div>

                            {/* Navigation Controls (Floating) */}
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-50 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg border border-gray-200">
                                <button 
                                    onClick={prevSlide}
                                    disabled={currentSlide === 0}
                                    className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-colors text-[#0F1C2E]"
                                >
                                    <ChevronRight size={24} />
                                </button>
                                <span className="self-center font-bold text-gray-600 min-w-[60px] text-center">
                                    שקף {currentSlide + 1}
                                </span>
                                <button 
                                    onClick={nextSlide}
                                    disabled={currentSlide === TOTAL_SLIDES - 1}
                                    className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-colors text-[#0F1C2E]"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
