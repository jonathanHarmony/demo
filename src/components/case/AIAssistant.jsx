import React from "react";
import FollowUpAssistant from "./FollowUpAssistant";

export default function AIAssistant({ selectedQuestion, caseData, onAddFollowUp }) {
  return (
    <FollowUpAssistant 
      selectedQuestion={selectedQuestion}
      caseData={caseData}
      onAddFollowUp={onAddFollowUp}
    />
  );
}