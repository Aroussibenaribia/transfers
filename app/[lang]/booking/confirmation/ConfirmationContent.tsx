"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDictionary } from "@/components/DictionaryProvider";

export default function ConfirmationContent() {
  const params = useSearchParams();
  const dict = useDictionary();
  const cDict = dict.booking.confirmation;
  const reference = params.get("ref") ?? "—";
  const total = params.get("total") ?? "—";

  const handlePrint = () => window.print();

  return (
    <div className="confirm-page">
      <div className="confirm-card animate-scalein">
        {/* Success icon */}
        <div className="confirm-icon">✅</div>

        <h1 style={{ fontSize: 24, marginBottom: 8 }}>
          {cDict.title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 0, lineHeight: 1.6 }}>
          {cDict.emailSent}
        </p>

        {/* Reference */}
        <div className="confirm-ref-box">
          <div className="confirm-ref-label">{cDict.reference}</div>
          <div className="confirm-ref">{reference}</div>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            {cDict.keepReference}
          </p>
        </div>

        {/* Price */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--purple-700), var(--purple-500))",
            borderRadius: "var(--radius)",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff",
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 14, color: "rgba(255,255,255,.8)" }}>
            {cDict.totalAmount}
          </span>
          <span style={{ fontSize: 28, fontWeight: 800 }}>{total}€</span>
        </div>

        {/* What's next */}
        <div className="confirm-details">
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "var(--text)" }}>
            {cDict.nextStepsTitle}
          </div>
          {[
            {
              icon: "📧",
              title: cDict.s1_title,
              desc: cDict.s1_desc,
            },
            {
              icon: "📞",
              title: cDict.s2_title,
              desc: cDict.s2_desc,
            },
            {
              icon: "🚗",
              title: cDict.s3_title,
              desc: cDict.s3_desc,
            },
            {
              icon: "💳",
              title: cDict.s4_title,
              desc: cDict.s4_desc,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: 14,
                padding: "12px 0",
                borderBottom: "1px solid var(--gray-100)",
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  width: 36,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "flex-start",
                  paddingTop: 2,
                }}
              >
                {item.icon}
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
          <button className="btn btn-outline btn-full" onClick={handlePrint}>
            {cDict.print}
          </button>
          <Link href="/" className="btn btn-primary btn-full">
            {cDict.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
