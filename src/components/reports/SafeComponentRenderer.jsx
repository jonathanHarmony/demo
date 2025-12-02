import React from "react";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ComponentRenderer from "./ComponentRenderer";

export default function SafeComponentRenderer(props) {
    return (
        <ErrorBoundary fallbackText="Unable to render this report component.">
            <ComponentRenderer {...props} />
        </ErrorBoundary>
    );
}
