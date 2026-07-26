"use client";

import { useEffect, useRef, useState } from "react";
import { submitEnquiry, ApiError } from "@/lib/api";

type QuestionType = "text" | "date" | "multiselect" | "email" | "tel";

type Question = {
  key:
    | "companyName"
    | "officeLocation"
    | "numEmployees"
    | "duration"
    | "budget"
    | "checkinDate"
    | "specialRequirements"
    | "contactPersonName"
    | "companyEmail"
    | "mobileNumber";
  prompt: string;
  type: QuestionType;
  placeholder?: string;
};

const QUESTIONS: Question[] = [
  { key: "companyName", prompt: "What's your company name?", type: "text", placeholder: "e.g. Acme Technologies Pvt Ltd" },
  { key: "officeLocation", prompt: "Which office location in Bangalore is this for?", type: "text", placeholder: "e.g. Whitefield, Koramangala, EPIP Zone" },
  { key: "numEmployees", prompt: "How many employees need accommodation?", type: "text", placeholder: "e.g. 5" },
  { key: "duration", prompt: "What's the expected duration of stay?", type: "text", placeholder: "e.g. 3 months" },
  { key: "budget", prompt: "What's your budget?", type: "text", placeholder: "e.g. ₹40,000/month per person" },
  { key: "checkinDate", prompt: "What's the preferred check-in date?", type: "date" },
  { key: "specialRequirements", prompt: "Any special requirements? Select all that apply.", type: "multiselect" },
  { key: "contactPersonName", prompt: "Who should we contact regarding this enquiry?", type: "text", placeholder: "Full name" },
  { key: "companyEmail", prompt: "What's the official company email address?", type: "email", placeholder: "name@company.com" },
  { key: "mobileNumber", prompt: "And a mobile number we can reach you on?", type: "tel", placeholder: "+91 98765 43210" },
];

const REQUIREMENT_OPTIONS = [
  "Breakfast", "Lunch", "Dinner", "Kitchen", "Laundry", "Wi-Fi",
  "Parking", "Airport Pickup", "GST Invoice", "Single Occupancy", "Twin Sharing",
];

type Answers = Record<string, string>;

type Message =
  | { id: string; from: "bot"; kind: "text"; text: string }
  | { id: string; from: "user"; kind: "text"; text: string }
  | { id: string; from: "bot"; kind: "review"; answers: Answers }
  | { id: string; from: "bot"; kind: "success" };

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

function validate(question: Question, value: string): string | null {
  const trimmed = value.trim();
  if (question.type !== "multiselect" && !trimmed) return "This field is required.";

  if (question.type === "email") {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!ok) return "Please enter a valid email address.";
  }
  if (question.type === "tel") {
    const digits = trimmed.replace(/[^\d]/g, "");
    if (digits.length < 7 || digits.length > 15) return "Please enter a valid mobile number.";
  }
  if (question.key === "numEmployees") {
    if (!/^\d+$/.test(trimmed)) return "Please enter a number, e.g. 5.";
  }
  return null;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"asking" | "review" | "submitting" | "done">("asking");
  const [textValue, setTextValue] = useState("");
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
  const [otherReq, setOtherReq] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: nextId(),
        from: "bot",
        kind: "text",
        text: "👋 Welcome to Corporate Stays Bangalore! We'll help you find the best accommodation for your employees. Please answer a few quick questions.",
      },
      { id: nextId(), from: "bot", kind: "text", text: QUESTIONS[0].prompt },
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const q = QUESTIONS[stepIndex];
    if (q && (q.type === "text" || q.type === "date" || q.type === "email" || q.type === "tel")) {
      setTextValue(answers[q.key] || "");
    }
    setFieldError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  const currentQuestion = QUESTIONS[stepIndex];

  function addMessage(msg: Message) {
    setMessages((prev) => [...prev, msg]);
  }

  function goToReview(finalAnswers: Answers) {
    setPhase("review");
    addMessage({ id: nextId(), from: "bot", kind: "review", answers: finalAnswers });
  }

  function advance(answerDisplay: string, storedValue: string) {
    const key = currentQuestion.key;
    const updated = { ...answers, [key]: storedValue };
    setAnswers(updated);
    setFieldError("");

    addMessage({ id: nextId(), from: "user", kind: "text", text: answerDisplay || "—" });

    const nextIndex = stepIndex + 1;
    if (nextIndex < QUESTIONS.length) {
      setStepIndex(nextIndex);
      addMessage({ id: nextId(), from: "bot", kind: "text", text: QUESTIONS[nextIndex].prompt });
    } else {
      goToReview(updated);
    }
  }

  function handleTextSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const err = validate(currentQuestion, textValue);
    if (err) {
      setFieldError(err);
      return;
    }
    advance(textValue.trim(), textValue.trim());
  }

  function toggleReq(option: string) {
    setSelectedReqs((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  }

  function handleRequirementsSubmit() {
    const all = [...selectedReqs];
    if (otherReq.trim()) all.push(otherReq.trim());
    const display = all.length ? all.join(", ") : "None";
    advance(display, display === "None" ? "" : display);
    setSelectedReqs([]);
    setOtherReq("");
  }

  function startEdit() {
    setPhase("asking");
    setStepIndex(0);
    setSubmitError("");
    addMessage({
      id: nextId(),
      from: "bot",
      kind: "text",
      text: "No problem — let's go through it again. " + QUESTIONS[0].prompt,
    });
  }

  async function submitTheEnquiry() {
    setPhase("submitting");
    setSubmitError("");
    try {
      await submitEnquiry({
        companyName: answers.companyName,
        officeLocation: answers.officeLocation,
        numEmployees: answers.numEmployees,
        duration: answers.duration,
        budget: answers.budget,
        checkinDate: answers.checkinDate,
        specialRequirements: answers.specialRequirements || "",
        contactPersonName: answers.contactPersonName,
        companyEmail: answers.companyEmail,
        mobileNumber: answers.mobileNumber,
      });
      setPhase("done");
      addMessage({ id: nextId(), from: "bot", kind: "success" });
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong while sending your enquiry. Please try again.";
      setSubmitError(message);
      setPhase("review");
    }
  }

  const progress = phase === "done" ? 100 : Math.round(((stepIndex + (phase === "review" ? 1 : 0)) / QUESTIONS.length) * 100);

  return (
    <div className="flex h-[100dvh] flex-col bg-white">
      <Header progress={progress} showProgress={phase !== "done"} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-grid px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              onEdit={startEdit}
              onSubmit={submitTheEnquiry}
              submitting={phase === "submitting"}
            />
          ))}
          {submitError && <p className="ml-1 text-sm text-red-600">{submitError}</p>}
        </div>
      </div>

      {phase === "asking" && (
        <InputBar
          question={currentQuestion}
          textValue={textValue}
          setTextValue={setTextValue}
          onTextSubmit={handleTextSubmit}
          fieldError={fieldError}
          selectedReqs={selectedReqs}
          toggleReq={toggleReq}
          otherReq={otherReq}
          setOtherReq={setOtherReq}
          onRequirementsSubmit={handleRequirementsSubmit}
        />
      )}
    </div>
  );
}

function Header({ progress, showProgress }: { progress: number; showProgress: boolean }) {
  return (
    <header className="border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-navy-800 to-navy-950 text-sm font-semibold text-gold-400 shadow-card">
          CS
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-900">Corporate Stays Bangalore</p>
          <p className="text-xs text-slate-500">Accommodation Enquiry</p>
        </div>
      </div>
      {showProgress && (
        <div className="h-1 w-full bg-slate-100">
          <div
            className="h-1 bg-gradient-to-r from-navy-700 to-gold-500 transition-all duration-500"
            style={{ width: `${Math.max(progress, 6)}%` }}
          />
        </div>
      )}
    </header>
  );
}

function MessageBubble({
  message,
  onEdit,
  onSubmit,
  submitting,
}: {
  message: Message;
  onEdit: () => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  if (message.kind === "text") {
    const isBot = message.from === "bot";
    return (
      <div className={`flex animate-fade-in-up ${isBot ? "justify-start" : "justify-end"}`}>
        <div
          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed shadow-sm ${
            isBot
              ? "rounded-tl-sm bg-slate-100 text-slate-800"
              : "rounded-tr-sm bg-navy-900 text-white"
          }`}
        >
          {message.text}
        </div>
      </div>
    );
  }

  if (message.kind === "review") {
    const a = message.answers;
    const rows: [string, string][] = [
      ["Company Name", a.companyName],
      ["Office Location", a.officeLocation],
      ["Number of Employees", a.numEmployees],
      ["Duration", a.duration],
      ["Budget", a.budget],
      ["Check-in Date", a.checkinDate],
      ["Special Requirements", a.specialRequirements || "None"],
      ["Contact Person", a.contactPersonName],
      ["Company Email", a.companyEmail],
      ["Mobile Number", a.mobileNumber],
    ];
    return (
      <div className="flex animate-fade-in-up justify-start">
        <div className="w-full max-w-[90%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-5 py-5 shadow-card">
          <p className="mb-3 text-[15px] font-semibold text-navy-900">Please review your enquiry</p>
          <dl className="space-y-2">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-slate-100 pb-2 text-sm last:border-none last:pb-0">
                <dt className="text-slate-500">{label}</dt>
                <dd className="text-right font-medium text-slate-800">{value || "—"}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex gap-2">
            <button
              onClick={onEdit}
              disabled={submitting}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Edit Details
            </button>
            <button
              onClick={onSubmit}
              disabled={submitting}
              className="flex-1 rounded-lg bg-gradient-to-r from-navy-800 to-navy-950 px-4 py-2.5 text-sm font-medium text-white shadow-card transition hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Enquiry"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex animate-fade-in-up justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-emerald-50 px-5 py-4 text-[15px] leading-relaxed text-emerald-900 shadow-sm">
        <p className="font-semibold">✅ Thank you!</p>
        <p className="mt-1">We&apos;ve received your requirement.</p>
        <p className="mt-1">We&apos;ll review your requirement and send the best options within 24 hours.</p>
        <p className="mt-1">If your requirement is urgent, please call or WhatsApp us.</p>
      </div>
    </div>
  );
}

function InputBar(props: {
  question: Question;
  textValue: string;
  setTextValue: (v: string) => void;
  onTextSubmit: (e?: React.FormEvent) => void;
  fieldError: string;
  selectedReqs: string[];
  toggleReq: (o: string) => void;
  otherReq: string;
  setOtherReq: (v: string) => void;
  onRequirementsSubmit: () => void;
}) {
  const {
    question, textValue, setTextValue, onTextSubmit, fieldError,
    selectedReqs, toggleReq, otherReq, setOtherReq, onRequirementsSubmit,
  } = props;

  if (question.type === "multiselect") {
    return (
      <div className="border-t border-slate-100 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex flex-wrap gap-2">
            {REQUIREMENT_OPTIONS.map((opt) => {
              const active = selectedReqs.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleReq(opt)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    active
                      ? "border-navy-900 bg-navy-900 text-white shadow-sm"
                      : "border-slate-300 text-slate-700 hover:border-navy-700"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={otherReq}
              onChange={(e) => setOtherReq(e.target.value)}
              placeholder="Any other requirement (optional)"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
            />
            <button
              onClick={onRequirementsSubmit}
              className="rounded-lg bg-gradient-to-r from-navy-800 to-navy-950 px-5 py-2.5 text-sm font-medium text-white shadow-card transition hover:opacity-90"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputType = question.type === "email" ? "email" : question.type === "tel" ? "tel" : question.type === "date" ? "date" : "text";

  return (
    <form onSubmit={onTextSubmit} className="border-t border-slate-100 bg-white px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="flex gap-2">
          <input
            autoFocus
            type={inputType}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder={question.placeholder}
            className={`flex-1 rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${
              fieldError
                ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                : "border-slate-300 focus:border-navy-700 focus:ring-navy-700"
            }`}
          />
          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-navy-800 to-navy-950 px-5 py-2.5 text-sm font-medium text-white shadow-card transition hover:opacity-90"
          >
            Send
          </button>
        </div>
        {fieldError && <p className="mt-1.5 text-xs text-red-600">{fieldError}</p>}
      </div>
    </form>
  );
}
