import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";

export default function ReportQA({ template, results }) {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    const userMessage = { role: "user", content: question };
    setConversation(prev => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const compressedContext = results.map(r => ({
        id: r.component_id,
        data: r.visualization_data?.slice(0, 5),
        narrative: r.narrative?.substring(0, 200)
      }));

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a research analyst assistant. Answer questions about this report.

Template: ${template.name}
Description: ${template.description || 'N/A'}

Component Results Summary:
${JSON.stringify(compressedContext, null, 2)}

Previous conversation:
${conversation.map(m => `${m.role}: ${m.content}`).join('\n')}

User Question: ${question}

Provide a helpful, analytical answer based on the report data.`,
        response_json_schema: {
          type: "object",
          properties: {
            answer: { type: "string" },
            sources: { type: "array", items: { type: "string" } }
          }
        }
      });

      setConversation(prev => [...prev, {
        role: "assistant",
        content: response.answer,
        sources: response.sources
      }]);
    } catch (error) {
      setConversation(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I couldn't process that question."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        Ask about this report
      </div>

      {conversation.length > 0 && (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-slate-100 ml-8"
                  : "bg-teal-50 mr-8"
              }`}
            >
              <p className="text-sm text-slate-700">{msg.content}</p>
              {msg.sources?.length > 0 && (
                <div className="mt-2 text-xs text-slate-500">
                  Sources: {msg.sources.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about trends, comparisons, insights..."
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
        />
        <Button onClick={handleAsk} disabled={isLoading || !question.trim()}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}