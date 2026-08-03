"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ApiError, submitEnquiry } from "@/lib/api";
import {
  INITIAL_ANSWERS,
  QUESTION_ORDER,
  type PortalAnswers,
  type PortalPhase,
  type QuestionId,
} from "@/lib/portal/types";
import { getConsultantResponse, getQuestionPrompt } from "@/lib/portal/responses";
import { toEnquiryPayload, validateQuestion } from "@/lib/portal/validation";
import { generateReferenceId } from "@/lib/utils";
import { ProgressHeader } from "./ProgressHeader";
import { ConsultantNote, QuestionShell } from "./QuestionShell";
import { QuestionRenderer } from "./QuestionRenderer";
import { StrategySummary } from "./StrategySummary";
import { SubmissionSuccess } from "./SubmissionSuccess";

const HELPERS: Partial<Record<QuestionId, string>> = {
  requirementType: "Select the option that best matches your business need.",
  location: "Search a Bangalore office hub or type a custom area.",
  budget: "Share a target range so we can optimise format and value.",
  specialRequirements: "Select all that apply. You can skip if none.",
  additionalNotes: "Optional — useful context for your relationship manager.",
};

export function RequestPortal() {
  const [answers, setAnswers] = useState<PortalAnswers>(INITIAL_ANSWERS);
  const answersRef = useRef(answers);
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<PortalPhase>("asking");
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [consultantNote, setConsultantNote] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState("");
  const advanceTimer = useRef<number | null>(null);

  const questionId = QUESTION_ORDER[stepIndex];

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex, phase, consultantNote]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  const patchAnswers = useCallback((patch: Partial<PortalAnswers>) => {
    setAnswers((prev) => {
      const next = { ...prev, ...patch };
      answersRef.current = next;
      return next;
    });
    setError("");
  }, []);

  const continueFromQuestion = useCallback(
    (override?: Partial<PortalAnswers>) => {
      const merged = { ...answersRef.current, ...override };
      if (override) {
        answersRef.current = merged;
        setAnswers(merged);
      }

      const err = validateQuestion(questionId, merged);
      if (err) {
        setError(err);
        return;
      }

      const response = getConsultantResponse(questionId, merged);
      setError("");

      if (response) {
        setConsultantNote(response);
      }

      const next = stepIndex + 1;
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);

      advanceTimer.current = window.setTimeout(
        () => {
          setConsultantNote(null);
          if (next >= QUESTION_ORDER.length) {
            setPhase("summary");
          } else {
            setStepIndex(next);
          }
        },
        response ? 2000 : 200
      );
    },
    [questionId, stepIndex]
  );

  async function handleSubmit() {
    setPhase("submitting");
    setSubmitError("");
    const ref = generateReferenceId();
    try {
      await submitEnquiry(toEnquiryPayload(answersRef.current, ref));
      setReferenceId(ref);
      setPhase("success");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "We couldn't submit your requirement. Please try again.";
      setSubmitError(message);
      setPhase("summary");
    }
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50/80">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-fade opacity-60" />
      <ProgressHeader stepIndex={stepIndex} phase={phase} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <AnimatePresence mode="wait">
          {phase === "asking" && consultantNote && (
            <motion.div
              key={`note-${stepIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="py-10"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                Accommodation Consultant
              </p>
              <ConsultantNote message={consultantNote} />
              <p className="mt-6 text-sm text-slate-400">Continuing…</p>
            </motion.div>
          )}

          {phase === "asking" && !consultantNote && (
            <motion.div
              key={`ask-${questionId}`}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <QuestionShell
                questionKey={questionId}
                prompt={getQuestionPrompt(questionId, answers)}
                helper={HELPERS[questionId]}
                error={error}
              >
                <QuestionRenderer
                  questionId={questionId}
                  answers={answers}
                  onChange={patchAnswers}
                  onContinue={continueFromQuestion}
                />
              </QuestionShell>
            </motion.div>
          )}

          {(phase === "summary" || phase === "submitting") && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <StrategySummary
                answers={answers}
                onChange={patchAnswers}
                onSubmit={handleSubmit}
                submitting={phase === "submitting"}
                error={submitError}
              />
            </motion.div>
          )}

          {phase === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <SubmissionSuccess referenceId={referenceId} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
