import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";

export default function ComponentQA({ component, result, onAsk }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are analyzing a report component. Answer the user's question based on the data.

Component: ${component.title}
Data Source: ${component.data_source}
Data: ${JSON.stringify(result?.visualization_data || result?.data || {})}
Narrative: ${result?.narrative || 'None'}

User Question: ${question}

Provide a concise, helpful answer based on the component data.`,
        response_json_schema: {
          type: "object",
          properties: {
            answer: { type: "string" },
            confidence: { type: "number" }
          }
        }
      });
      
      setAnswer(response);
      if (onAsk) onAsk(question, response);
    } catch (error) {
      setAnswer({ answer: "Sorry, I couldn't process that question.", confidence: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-slate-50">
      <div className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about this component..."
          className="text-sm bg-white"
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <Button
          onClick={handleAsk}
          disabled={isLoading || !question.trim()}
          size="sm"
          className="bg-slate-900"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      {answer && (
        <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
          <p className="text-sm text-slate-700">{answer.answer}</p>
          {answer.confidence && (
            <div className="text-xs text-slate-400 mt-2">
              Confidence: {answer.confidence}%
            </div>
          )}
        </div>
      )}
    </div>
  );
}