"use client";

import {
  Building2,
  Building,
  Check,
  Hotel,
  House,
  Sparkles,
  User,
  Users,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip, OptionCard } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import {
  ACCOMMODATION_OPTIONS,
  BANGALORE_LOCATIONS,
  DURATION_OPTIONS,
  EMPLOYEE_OPTIONS,
  FREQUENCY_OPTIONS,
  REQUIREMENT_OPTIONS,
  SPECIAL_REQUIREMENT_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/portal/options";
import type {
  AccommodationPreference,
  BudgetPeriod,
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
import { useMemo, useState } from "react";

const employeeIcons = {
  user: User,
  users: Users,
  building: Building2,
  hotel: Hotel,
  city: Building,
};

const accommodationIcons = {
  hotel: Hotel,
  apartment: Building2,
  house: House,
  villa: Trees,
  sparkles: Sparkles,
};

export function QuestionRenderer({
  questionId,
  answers,
  onChange,
  onContinue,
}: {
  questionId: QuestionId;
  answers: PortalAnswers;
  onChange: (patch: Partial<PortalAnswers>) => void;
  onContinue: (override?: Partial<PortalAnswers>) => void;
}) {
  switch (questionId) {
    case "requirementType":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {REQUIREMENT_OPTIONS.map((option) => (
            <OptionCard
              key={option.id}
              selected={answers.requirementType === option.id}
              title={option.title}
              description={option.description}
              onClick={() => {
                const patch = { requirementType: option.id as RequirementType };
                onChange(patch);
                onContinue(patch);
              }}
            />
          ))}
        </div>
      );

    case "companyName":
    case "contactPerson":
    case "designation":
    case "email":
    case "phone":
    case "checkinDate":
      return (
        <TextQuestion
          questionId={questionId}
          answers={answers}
          onChange={onChange}
          onContinue={onContinue}
        />
      );

    case "location":
      return (
        <LocationQuestion answers={answers} onChange={onChange} onContinue={onContinue} />
      );

    case "employees":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {EMPLOYEE_OPTIONS.map((option) => {
            const Icon = employeeIcons[option.icon];
            return (
              <OptionCard
                key={option.id}
                selected={answers.employees === option.id}
                title={option.title}
                description={option.description}
                icon={<Icon className="h-5 w-5" />}
                onClick={() => {
                  const patch = { employees: option.id as EmployeeCount };
                  onChange(patch);
                  onContinue(patch);
                }}
              />
            );
          })}
        </div>
      );

    case "duration":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {DURATION_OPTIONS.map((option) => (
            <OptionCard
              key={option.id}
              selected={answers.duration === option.id}
              title={option.title}
              description={
                option.exceeds30Days
                  ? "Long-term strategy recommended"
                  : "Short to mid-term stay"
              }
              onClick={() => {
                const patch = { duration: option.id as StayDuration };
                onChange(patch);
                onContinue(patch);
              }}
            />
          ))}
        </div>
      );

    case "budget":
      return <BudgetQuestion answers={answers} onChange={onChange} onContinue={onContinue} />;

    case "accommodationPreference":
      return (
        <div className="grid gap-3">
          {ACCOMMODATION_OPTIONS.map((option) => {
            const Icon = accommodationIcons[option.icon];
            return (
              <OptionCard
                key={option.id}
                selected={answers.accommodationPreference === option.id}
                title={option.title}
                description={option.description}
                icon={<Icon className="h-5 w-5" />}
                onClick={() => {
                  const patch = {
                    accommodationPreference: option.id as AccommodationPreference,
                  };
                  onChange(patch);
                  onContinue(patch);
                }}
              />
            );
          })}
        </div>
      );

    case "specialRequirements":
      return (
        <SpecialRequirementsQuestion
          answers={answers}
          onChange={onChange}
          onContinue={onContinue}
        />
      );

    case "frequency":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {FREQUENCY_OPTIONS.map((option) => (
            <OptionCard
              key={option.id}
              selected={answers.frequency === option.id}
              title={option.title}
              description={option.description}
              onClick={() => {
                const patch = { frequency: option.id as RequirementFrequency };
                onChange(patch);
                onContinue(patch);
              }}
            />
          ))}
        </div>
      );

    case "proposalTimeline":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {TIMELINE_OPTIONS.map((option) => (
            <OptionCard
              key={option.id}
              selected={answers.proposalTimeline === option.id}
              title={option.title}
              description={option.description}
              onClick={() => {
                const patch = { proposalTimeline: option.id as ProposalTimeline };
                onChange(patch);
                onContinue(patch);
              }}
            />
          ))}
        </div>
      );

    case "additionalNotes":
      return (
        <div>
          <Textarea
            autoFocus
            value={answers.additionalNotes}
            onChange={(e) => onChange({ additionalNotes: e.target.value })}
            placeholder="Share context that will help us design the right strategy (optional)"
            rows={5}
          />
          <div className="mt-5 flex justify-end">
            <Button type="button" size="lg" onClick={() => onContinue()}>
              Continue to Accommodation Strategy
            </Button>
          </div>
        </div>
      );
  }
}

function TextQuestion({
  questionId,
  answers,
  onChange,
  onContinue,
}: {
  questionId: QuestionId;
  answers: PortalAnswers;
  onChange: (patch: Partial<PortalAnswers>) => void;
  onContinue: (override?: Partial<PortalAnswers>) => void;
}) {
  const config: Record<
    string,
    { value: string; field: keyof PortalAnswers; type: string; placeholder: string }
  > = {
    companyName: {
      value: answers.companyName,
      field: "companyName",
      type: "text",
      placeholder: "e.g. Acme Technologies Pvt Ltd",
    },
    contactPerson: {
      value: answers.contactPerson,
      field: "contactPerson",
      type: "text",
      placeholder: "Full name",
    },
    designation: {
      value: answers.designation,
      field: "designation",
      type: "text",
      placeholder: "e.g. Travel Manager, HR Business Partner",
    },
    email: {
      value: answers.email,
      field: "email",
      type: "email",
      placeholder: "name@company.com",
    },
    phone: {
      value: answers.phone,
      field: "phone",
      type: "tel",
      placeholder: "+91 98765 43210",
    },
    checkinDate: {
      value: answers.checkinDate,
      field: "checkinDate",
      type: "date",
      placeholder: "",
    },
  };

  const current = config[questionId];
  if (!current) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
      className="space-y-5"
    >
      <Input
        autoFocus
        type={current.type}
        value={current.value}
        min={current.type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
        placeholder={current.placeholder}
        onChange={(e) => onChange({ [current.field]: e.target.value })}
      />
      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Continue
        </Button>
      </div>
    </form>
  );
}

function LocationQuestion({
  answers,
  onChange,
  onContinue,
}: {
  answers: PortalAnswers;
  onChange: (patch: Partial<PortalAnswers>) => void;
  onContinue: (override?: Partial<PortalAnswers>) => void;
}) {
  const [query, setQuery] = useState(answers.location);
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BANGALORE_LOCATIONS.slice(0, 6);
    return BANGALORE_LOCATIONS.filter((loc) => loc.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const patch = { location: query };
        onChange(patch);
        onContinue(patch);
      }}
      className="space-y-4"
    >
      <Input
        autoFocus
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange({ location: e.target.value });
        }}
        placeholder="Search office area — e.g. Manyata Tech Park"
        autoComplete="off"
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {suggestions.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => {
              setQuery(loc);
              const patch = { location: loc };
              onChange(patch);
              onContinue(patch);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50/50"
          >
            {loc}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Continue
        </Button>
      </div>
    </form>
  );
}

function BudgetQuestion({
  answers,
  onChange,
  onContinue,
}: {
  answers: PortalAnswers;
  onChange: (patch: Partial<PortalAnswers>) => void;
  onContinue: (override?: Partial<PortalAnswers>) => void;
}) {
  const periods: { id: BudgetPeriod; label: string }[] = [
    { id: "night", label: "Per Night" },
    { id: "week", label: "Per Week" },
    { id: "month", label: "Per Month" },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
      className="space-y-5"
    >
      <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
        {periods.map((period) => (
          <button
            key={period.id}
            type="button"
            onClick={() => onChange({ budgetPeriod: period.id })}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              answers.budgetPeriod === period.id
                ? "bg-white text-brand-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
          ₹
        </span>
        <Input
          autoFocus
          inputMode="numeric"
          className="pl-8"
          value={formatCurrencyINR(answers.budgetAmount)}
          onChange={(e) =>
            onChange({ budgetAmount: e.target.value.replace(/[^\d]/g, "") })
          }
          placeholder="45,000"
        />
      </div>
      <p className="text-sm text-slate-500">
        This guides strategy—not a public price list. We never display property rates here.
      </p>
      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Continue
        </Button>
      </div>
    </form>
  );
}

function SpecialRequirementsQuestion({
  answers,
  onChange,
  onContinue,
}: {
  answers: PortalAnswers;
  onChange: (patch: Partial<PortalAnswers>) => void;
  onContinue: (override?: Partial<PortalAnswers>) => void;
}) {
  function toggle(option: SpecialRequirement) {
    const exists = answers.specialRequirements.includes(option);
    const next = exists
      ? answers.specialRequirements.filter((item) => item !== option)
      : [...answers.specialRequirements, option];
    onChange({ specialRequirements: next });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {SPECIAL_REQUIREMENT_OPTIONS.map((option) => (
          <Chip
            key={option}
            selected={answers.specialRequirements.includes(option)}
            onClick={() => toggle(option)}
          >
            {answers.specialRequirements.includes(option) && (
              <Check className="h-3.5 w-3.5" />
            )}
            {option}
          </Chip>
        ))}
      </div>
      {answers.specialRequirements.includes("Other") && (
        <Input
          autoFocus
          value={answers.specialOther}
          onChange={(e) => onChange({ specialOther: e.target.value })}
          placeholder="Describe your other requirement"
        />
      )}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => {
            const patch = { specialRequirements: [] as SpecialRequirement[], specialOther: "" };
            onChange(patch);
            onContinue(patch);
          }}
        >
          Skip
        </Button>
        <Button type="button" size="lg" onClick={() => onContinue()}>
          Continue
        </Button>
      </div>
    </div>
  );
}
