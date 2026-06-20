import { Suspense } from "react";
import ConfirmationContent from "./ConfirmationContent";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="confirm-page">
          <div style={{ textAlign: "center" }}>
            <div className="spinner" style={{ borderTopColor: "var(--primary)", borderColor: "var(--purple-200)", width: 36, height: 36, margin: "0 auto" }} />
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
