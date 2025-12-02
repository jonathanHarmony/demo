import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function FullCase() {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    navigate(createPageUrl("Home"));
  }, []);

  return null;
}