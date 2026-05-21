// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { Button } from '../Components/ui/button';
// import { Home } from 'lucide-react';
// import { createPageUrl } from '../utils';

// export default function AnalysisResult() {
//   const location = useLocation();
//   const result = location.state?.result;

//   if (!result) {
//     return (
//       <div className="text-center">
//         <p>No analysis data found. Please start the analyzer again.</p>
//         <Link to={createPageUrl('SymptomAnalyzer')}>
//           <Button>Go to Analyzer</Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//       <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
//         Your Symptom Analysis
//       </h1>

//       <div className="p-6 rounded-xl bg-white shadow-md text-gray-800 whitespace-pre-line">
//         {result}
//       </div>

//       <div className="text-center pt-4">
//         <Link to={createPageUrl('SymptomAnalyzer')}>
//           <Button variant="outline">
//             <Home className="w-4 h-4 mr-2" />
//             Back to Analyzer
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }



// src/pages/AnalysisResult.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AlertTriangle, HeartHandshake, FileText, ClipboardList } from "lucide-react";
import { Button } from "../Components/ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

/* ---------------- helper utilities ---------------- */

// safe display helper — always returns a string or React node
function toDisplay(x) {
  if (x === null || x === undefined) return "";
  if (typeof x === "string" || typeof x === "number" || typeof x === "boolean") return x;
  if (React.isValidElement(x)) return x;
  try {
    return JSON.stringify(x, null, 2);
  } catch (e) {
    return String(x);
  }
}

/**
 * aggressiveParse (same robust parser you used earlier)
 */
function aggressiveParse(input) {
  const result = { parsed: null, raw: input, warnings: [] };

  if (input == null) return result;

  if (typeof input === "object") {
    if (typeof input.raw === "string" && input.raw.trim().length > 0) {
      result.raw = input.raw;
      input = input.raw;
    } else {
      result.parsed = input;
      return result;
    }
  }

  if (typeof input !== "string") {
    result.warnings.push("not_a_string_after_unwrap");
    return result;
  }

  let s0 = input.trim();
  result.raw = input;

  const fenceMatch = s0.match(/```(?:\w+)?\s*([\s\S]*?)\s*```/);
  if (fenceMatch && fenceMatch[1]) {
    s0 = fenceMatch[1].trim();
    result.warnings.push("stripped_code_fence");
  }

  if ((s0.startsWith('"') && s0.endsWith('"')) || (s0.startsWith("'") && s0.endsWith("'"))) {
    s0 = s0.slice(1, -1);
    s0 = s0.replace(/\\"/g, '"').replace(/\\'/g, "'");
    result.warnings.push("stripped_outer_quotes");
  }

  try {
    result.parsed = JSON.parse(s0);
    result.warnings.push("parse_direct_success");
    return result;
  } catch (e1) {
    result.warnings.push("parse_direct_failed");
  }

  try {
    const unescaped = s0.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    result.parsed = JSON.parse(unescaped);
    result.warnings.push("parse_unescaped_success");
    return result;
  } catch (e2) {
    result.warnings.push("parse_unescaped_failed");
  }

  try {
    const first = JSON.parse(input);
    if (typeof first === "string") {
      const second = JSON.parse(first);
      result.parsed = second;
      result.warnings.push("parse_double_success");
      return result;
    }
  } catch (e3) {
    result.warnings.push("parse_double_failed");
  }

  try {
    const matchObject = input.match(/\{[\s\S]*\}/);
    if (matchObject) {
      const candidate = matchObject[0];
      result.parsed = JSON.parse(candidate);
      result.warnings.push("parse_substring_success");
      return result;
    }
  } catch (e4) {
    result.warnings.push("parse_substring_failed");
  }

  return result;
}

/* ---------------- UI small components ---------------- */

function ConfidenceBar({ value = 0 }) {
  const pct = Math.max(0, Math.min(100, Number(value || 0)));

  // gradient background that changes by threshold
  const gradient =
    pct >= 70
      ? "linear-gradient(90deg,#10b981,#06b6d4)" // green -> cyan
      : pct >= 40
        ? "linear-gradient(90deg,#f59e0b,#f97316)" // amber
        : "linear-gradient(90deg,#ef4444,#f43f5e)"; // red-ish

  const containerStyle = {
    background: "#edf2f7",
    borderRadius: 999,
    height: 10,
    overflow: "hidden",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
  };

  const fillerStyle = {
    width: `${pct}%`,
    height: "100%",
    borderRadius: 999,
    transition: "width 800ms cubic-bezier(.2,.9,.2,1)",
    background: gradient,
    boxShadow:
      pct > 0 ? "0 6px 18px rgba(6,78,59,0.08), inset 0 -4px 12px rgba(255,255,255,0.06)" : "none",
  };

  return (
    <div className="flex items-center space-x-3">
      <div style={{ width: 140 }}>
        <div style={containerStyle}>
          <div style={fillerStyle} />
        </div>
      </div>
      <div className="text-xs text-gray-600 w-12 text-right font-medium">{pct}%</div>
    </div>
  );
}

function Section({ title, children, icon }) {
  return (
    <section className="bg-white/95 p-5 rounded-2xl shadow-md">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-2 bg-gradient-to-tr from-pink-50 to-pink-100 rounded-xl">{icon}</div>
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <div>{children}</div>
    </section>
  );
}

/* ---------------- main component ---------------- */

export default function AnalysisResult() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [rawText, setRawText] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // parse incoming
    let incoming = location.state?.result ?? location.state ?? null;
    const parsed = aggressiveParse(incoming);
    setWarnings(parsed.warnings || []);
    setRawText(parsed.raw ?? null);

    let normalized = parsed.parsed;

    // unwrap common wrapper { success, data }
    if (normalized && typeof normalized === "object" && ("success" in normalized) && ("data" in normalized)) {
      normalized = normalized.data;
    }

    // second pass if still a string
    if (typeof normalized === "string") {
      const second = aggressiveParse(normalized);
      if (second.parsed) {
        normalized = second.parsed;
        setWarnings((w) => [...w, ...(second.warnings || [])]);
      }
    }

    // if object but some fields are strings representing arrays/objects, attempt to parse them
    if (normalized && typeof normalized === "object") {
      const attempt = { ...normalized };
      let changed = false;
      for (const k of Object.keys(attempt)) {
        if (typeof attempt[k] === "string") {
          try {
            const maybe = JSON.parse(attempt[k]);
            attempt[k] = maybe;
            changed = true;
          } catch (e) {
            // ignore
          }
        }
      }
      if (changed) normalized = attempt;
    }

    // helper to detect expected analysis shape
    const looksLikeAnalysis = (obj) => {
      if (!obj || typeof obj !== "object") return false;
      const keys = Object.keys(obj);
      const expected = [
        "likely_conditions",
        "red_flags",
        "self_care_tips",
        "recommended_next_steps",
        "brief_advice",
        "disclaimer",
      ];
      return expected.some((k) => keys.includes(k));
    };

    if (looksLikeAnalysis(normalized)) {
      setData(normalized);
      return;
    }

    // fallback to raw view
    setData(null);
    // leave rawText set
  }, [location.state]);

  // Prepare severity history for chart:
  // Accept either location.state.severityHistory (array of {day,label,severity}) OR data.severity_history
  const severityHistory = (() => {
    const maybe = location.state?.severityHistory ?? (data && data.severity_history) ?? null;
    if (!Array.isArray(maybe)) return null;

    // Normalize numeric value
    return maybe
      .map((item, idx) => {
        if (typeof item === "number") {
          return { name: `T${idx + 1}`, severity: item };
        }
        if (typeof item === "string") {
          const n = Number(item);
          return { name: `T${idx + 1}`, severity: Number.isFinite(n) ? n : 0 };
        }
        // object with {time,value} or {label,severity}
        return {
          name: item.label || item.time || `T${idx + 1}`,
          severity: Number(item.severity ?? item.value ?? 0),
        };
      })
      .slice(0, 50); // limit points
  })();

  // ---------- Render fallback raw view when no structured data ----------
  if (!data) {
    return (
      <div
        className={`max-w-4xl mx-auto py-10 px-6 space-y-6 transition-opacity transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        style={{ transition: "all 420ms cubic-bezier(.2,.9,.2,1)" }}
      >
        <header className="text-center mb-4">
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
            Your Symptom Analysis
          </h1>
          <p className="text-sm text-gray-500 mt-2">Preliminary insights — not a diagnosis.</p>
        </header>

        <section className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Analysis (raw)</h3>
              <p className="text-sm text-gray-600 mt-1">
                We couldn't parse the analysis into a structured format. Below is the raw server response.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard?.writeText(toDisplay({ raw: rawText }));
                }}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="text-xs text-gray-500 mb-3">Warnings: {warnings.join(", ") || "none"}</div>

          <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-md min-h-[180px] overflow-auto">
            {toDisplay(rawText ?? "No raw content available.")}
          </pre>
        </section>

        <div className="mt-10 flex justify-center">
          <Link to="/SymptomAnalyzer">
            <Button
              variant="outline"
              className="text-pink-600 border-pink-300 px-6 py-2 text-lg rounded-xl hover:bg-pink-50"
            >
              ← Back to Analyzer
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Render structured, beautiful UI ----------
  return (
    <div
      className={`max-w-4xl mx-auto py-10 px-6 space-y-8 transition-opacity transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
      style={{ transition: "all 420ms cubic-bezier(.2,.9,.2,1)" }}
    >
      <header className="text-center mb-4">
        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
          Your Symptom Analysis
        </h1>
        <p className="text-sm text-gray-500 mt-2">Preliminary insights — not a diagnosis.</p>
      </header>

      {/* top row */}
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Likely conditions" icon={<ClipboardList className="w-5 h-5 text-pink-600" />}>
          {data.likely_conditions && data.likely_conditions.length > 0 ? (
            <div className="space-y-3">
              {data.likely_conditions.map((c, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg hover:shadow-lg transition-shadow transform hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-500">Possible</div>
                      <div className="font-semibold text-gray-800">{toDisplay(c.name)}</div>
                      {c.rationale && <div className="text-xs text-gray-500 mt-1">{toDisplay(c.rationale)}</div>}
                    </div>
                    <div className="w-28 text-right">
                      <div className="text-sm font-semibold">{toDisplay(c.confidence ?? 0)}%</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <ConfidenceBar value={c.confidence ?? 0} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No likely conditions provided.</p>
          )}
        </Section>

        <Section title="Red flags" icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}>
          {data.red_flags && data.red_flags.length > 0 ? (
            <>
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-100">
                <ul className="list-disc ml-5 text-sm text-rose-800">
                  {data.red_flags.map((r, idx) => (
                    <li key={idx}>{typeof r === "string" ? r : toDisplay(r)}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
                <p className="text-xs text-gray-500">If you see any of these, seek urgent medical attention.</p>
                <div className="flex gap-2">
                  <a
                    href="tel:112"
                    className="inline-flex items-center px-3 py-2 rounded-lg bg-rose-600 text-white text-sm shadow"
                  >
                    Call emergency
                  </a>
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigator.clipboard?.writeText(
                        (data.red_flags || []).map((x) => (typeof x === "string" ? x : toDisplay(x))).join("\n")
                      )
                    }
                  >
                    Copy red flags
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">No red flags identified.</p>
          )}
        </Section>
      </div>

      {/* middle row */}
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Self-care tips" icon={<HeartHandshake className="w-5 h-5 text-emerald-600" />}>
          {data.self_care_tips && data.self_care_tips.length > 0 ? (
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              {data.self_care_tips.map((t, i) => (
                <li key={i}>{typeof t === "string" ? t : toDisplay(t)}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No tips available.</p>
          )}
        </Section>

        <Section title="Recommended next steps" icon={<FileText className="w-5 h-5 text-sky-600" />}>
          {data.recommended_next_steps && data.recommended_next_steps.length > 0 ? (
            <ol className="list-decimal ml-5 text-gray-700 space-y-2">
              {data.recommended_next_steps.map((s, i) => (
                <li key={i}>{typeof s === "string" ? s : toDisplay(s)}</li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-gray-500">No next steps suggested.</p>
          )}
        </Section>
      </div>

      {/* severity chart (if available) */}
      {severityHistory && severityHistory.length > 0 && (
        <Section title="Severity over time" icon={<ClipboardList className="w-5 h-5 text-indigo-600" />}>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={severityHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="severity"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 4, stroke: "#0369a1", strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-gray-500 mt-2">Severity is shown as percentage (0 = none, 100 = worst).</div>
        </Section>
      )}

      {/* summary + disclaimer */}
      <div className="space-y-3">
        {data.brief_advice && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600">Summary</div>
            <div className="font-medium text-gray-800 mt-1">{toDisplay(data.brief_advice)}</div>
          </div>
        )}

        {data.disclaimer && <div className="text-xs text-gray-500 italic">{toDisplay(data.disclaimer)}</div>}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Analysis generated by AI — not a medical diagnosis.</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
              }}
            >
              Copy full JSON
            </Button>
          </div>
        </div>
      </div>

      {/* bottom back button */}
      <div className="mt-10 flex justify-center">
        <Link to="/SymptomAnalyzer">
          <Button
            variant="outline"
            className="text-pink-600 border-pink-300 px-6 py-2 text-lg rounded-xl hover:bg-pink-50"
          >
            ← Back to Analyzer
          </Button>
        </Link>
      </div>
    </div>
  );
}
