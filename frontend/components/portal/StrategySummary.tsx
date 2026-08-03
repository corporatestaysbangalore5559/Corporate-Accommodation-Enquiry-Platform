"use client";

import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip, OptionCard } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import {
  ACCOMMODATION_OPTIONS,
  DURATION_OPTIONS,
  EMPLOYEE_OPTIONS,
  FREQUENCY_OPTIONS,
  REQUIREMENT_OPTIONS,
  SPECIAL_REQUIREMENT_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/portal/options";
import { getDisplayLabel } from "@/lib/portal/responses";
import type {
  AccommodationPreference,
  EmployeeCount,
  PortalAnswers,
  ProposalTimeline,
  QuestionId,
  RequirementFrequency,
  RequirementType,
  SpecialRequirement,
  StayDuration,
} from "@/lib/portal/types";
import { formatCurrencyINR } from "@/lib/utils";

const SUMMARY_FIELDS: { id: QuestionId; label: string }[] = [
  { id: "requirementType", label: "Requirement" },
  { id: "location", label: "Office" },
  { id: "employees", label: "Employees" },
  { id: "duration", label: "Duration" },
  { id: "budget", label: "Budget" },
  { id: "accommodationPreference", label: "Accommodation Preference" },
  { id: "specialRequirements", label: "Special Requirements" },
  { id: "proposalTimeline", label: "Proposal Timeline" },
  { id: "frequency", label: "Recurring Requirement" },
];

export function StrategySummary({
  answers,
  onChange,
  onSubmit,
  submitting,
  error,
}: {
  answers: PortalAnswers;
  onChange: (patch: Partial<PortalAnswers>) => void;
  onSubmit: () => void;
  submitting: boolean;
  error?: string;
}) {
  const [editing, setEditing] = useState<QuestionId | null>(null);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
          Accommodation Strategy
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-950">
          Your corporate accommodation brief
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          Review the strategy inputs below. Edit anything inline—then request your
          customised corporate proposal. No listings. No instant booking. One smart
          recommendation from your consultant team.
        </p>
      </div>

      <div className="space-y-4">
        {SUMMARY_FIELDS.map((field) => (
          <div
            key={field.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {field.label}
                </p>
                {editing === field.id ? (
                  <div className="mt-3">
                    <InlineEditor
                      field={field.id}
                      answers={answers}
                      onChange={onChange}
                      onDone={() => setEditing(null)}
                    />
                  </div>
                ) : (
                  <p className="mt-2 text-[15px] font-medium leading-relaxed text-slate-900">
                    {getDisplayLabel(field.id, answers)}
                  </p>
                )}
              </div>
              {editing !== field.id && (
                <button
                  type="button"
                  onClick={() => setEditing(field.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Contact
          </p>
          <p className="mt-2 text-[15px] font-medium text-slate-900">
            {answers.contactPerson} · {answers.designation}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {answers.companyName} · {answers.email} · {answers.phone}
          </p>
          {answers.additionalNotes.trim() && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">Notes: </span>
              {answers.additionalNotes}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8">
        <Button
          type="button"
          size="xl"
          className="w-full sm:w-auto"
          disabled={submitting}
          onClick={onSubmit}
        >
          {submitting ? "Submitting your brief…" : "Request My Corporate Proposal"}
        </Button>
      </div>
    </div>
  );
}

function InlineEditor({
  field,
  answers,
  onChange,
  onDone,
}: {
  field: QuestionId;
  answers: PortalAnswers;
  onChange: (patch: Partial<PortalAnswers>) => void;
  onDone: () => void;
}) {
  if (field === "requirementType") {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {REQUIREMENT_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            selected={answers.requirementType === option.id}
            title={option.title}
            description={option.description}
            onClick={() => {
              onChange({ requirementType: option.id as RequirementType });
              onDone();
            }}
          />
        ))}
      </div>
    );
  }

  if (field === "location") {
    return (
      <EditRow
        onDone={onDone}
        onSave={() => onDone()}
      >
        <Input
          autoFocus
          value={answers.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
      </EditRow>
    );
  }

  if (field === "employees") {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {EMPLOYEE_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            selected={answers.employees === option.id}
            title={option.title}
            description={option.description}
            onClick={() => {
              onChange({ employees: option.id as EmployeeCount });
              onDone();
            }}
          />
        ))}
      </div>
    );
  }

  if (field === "duration") {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {DURATION_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            selected={answers.duration === option.id}
            title={option.title}
            onClick={() => {
              onChange({ duration: option.id as StayDuration });
              onDone();
            }}
          />
        ))}
      </div>
    );
  }

  if (field === "budget") {
    return (
      <EditRow onDone={onDone} onSave={onDone}>
        <div className="mb-3 inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
          {(
            [
              ["night", "Per Night"],
              ["week", "Per Week"],
              ["month", "Per Month"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onChange({ budgetPeriod: id })}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                answers.budgetPeriod === id
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <Input
          autoFocus
          value={formatCurrencyINR(answers.budgetAmount)}
          onChange={(e) =>
            onChange({ budgetAmount: e.target.value.replace(/[^\d]/g, "") })
          }
        />
      </EditRow>
    );
  }

  if (field === "accommodationPreference") {
    return (
      <div className="grid gap-2">
        {ACCOMMODATION_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            selected={answers.accommodationPreference === option.id}
            title={option.title}
            description={option.description}
            onClick={() => {
              onChange({
                accommodationPreference: option.id as AccommodationPreference,
              });
              onDone();
            }}
          />
        ))}
      </div>
    );
  }

  if (field === "specialRequirements") {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {SPECIAL_REQUIREMENT_OPTIONS.map((option) => {
            const selected = answers.specialRequirements.includes(option);
            return (
              <Chip
                key={option}
                selected={selected}
                onClick={() => {
                  const next = selected
                    ? answers.specialRequirements.filter((item) => item !== option)
                    : [...answers.specialRequirements, option];
                  onChange({ specialRequirements: next as SpecialRequirement[] });
                }}
              >
                {option}
              </Chip>
            );
          })}
        </div>
        {answers.specialRequirements.includes("Other") && (
          <Input
            value={answers.specialOther}
            onChange={(e) => onChange({ specialOther: e.target.value })}
            placeholder="Other requirement"
          />
        )}
        <Button type="button" size="sm" onClick={onDone}>
          Done
        </Button>
      </div>
    );
  }

  if (field === "proposalTimeline") {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {TIMELINE_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            selected={answers.proposalTimeline === option.id}
            title={option.title}
            description={option.description}
            onClick={() => {
              onChange({ proposalTimeline: option.id as ProposalTimeline });
              onDone();
            }}
          />
        ))}
      </div>
    );
  }

  if (field === "frequency") {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {FREQUENCY_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            selected={answers.frequency === option.id}
            title={option.title}
            description={option.description}
            onClick={() => {
              onChange({ frequency: option.id as RequirementFrequency });
              onDone();
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <EditRow onDone={onDone} onSave={onDone}>
      <Textarea
        value={answers.additionalNotes}
        onChange={(e) => onChange({ additionalNotes: e.target.value })}
      />
    </EditRow>
  );
}

function EditRow({
  children,
  onDone,
  onSave,
}: {
  children: React.ReactNode;
  onDone: () => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-3">
      {children}
      <div className="flex gap-2">
        <Button type="button" size="sm" onClick={onSave}>
          <Check className="h-3.5 w-3.5" />
          Save
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onDone}>
          <X className="h-3.5 w-3.5" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
