import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";

const sections = [
    {
        id: "technical",
        label: "Technical questions",
        key: "technicalQuestions"
    },
    {
        id: "behavioural",
        label: "Behavioral questions",
        key: "behaviouralQuestions"
    },
    {
        id: "roadmap",
        label: "Road map",
        key: "preparationPlan"
    }
];

const severityStyles = {
    high: "border-rose-200 bg-rose-50 text-rose-800",
    medium: "border-amber-200 bg-amber-50 text-amber-800",
    low: "border-emerald-200 bg-emerald-50 text-emerald-800"
};

function Interview({ report: suppliedReport }) {

    const {
        report: contextReport,
        loading,
        getReportById
    } = useInterview();

    const { state } = useLocation();
    const { interviewId } = useParams();

    const [activeSection, setActiveSection] = useState("technical");

    const [checkedTasks, setCheckedTasks] = useState(
        () => new Set()
    );

    const [error, setError] = useState("");

    const report =
        state?.report ||
        suppliedReport ||
        contextReport;

    useEffect(() => {

        if (!interviewId) {
            setError("Interview ID not found in URL.");
            return;
        }

        if (contextReport) {
            return;
        }

        const fetchReport = async () => {
            try {
                setError("");

                console.log(
                    "Fetching interview report:",
                    interviewId
                );

                await getReportById(interviewId);

            } catch (error) {

                console.error(
                    "Failed to fetch interview report:",
                    error
                );

                console.error(
                    "Server response:",
                    error.response?.data
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load interview report."
                );
            }
        };

        fetchReport();

    }, [interviewId, contextReport]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f5f6f3]">
                <p className="text-sm text-[#66726b]">
                    Loading interview report...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f6f3]">

                <p className="text-sm font-medium text-red-600">
                    {error}
                </p>

                <p className="mt-2 text-xs text-[#66726b]">
                    Interview ID: {interviewId || "Not found"}
                </p>

            </div>
        );
    }

    if (!report) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f6f3]">

                <p className="text-sm text-red-600">
                    Interview report not found.
                </p>

                <p className="mt-2 text-xs text-[#66726b]">
                    Interview ID: {interviewId || "Not found"}
                </p>

            </div>
        );
    }

    const activeNav = sections.find(
        (section) => section.id === activeSection
    );

    const questions = report[activeNav.key] ?? [];

    const score = Math.max(
        0,
        Math.min(100, Number(report.matchScore) || 0)
    );

    function toggleTask(taskId) {
        setCheckedTasks((current) => {

            const next = new Set(current);

            if (next.has(taskId)) {
                next.delete(taskId);
            } else {
                next.add(taskId);
            }

            return next;
        });
    }

    return (
        <div className="min-h-screen bg-[#f5f6f3] text-[#202b2a]">

            <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_290px]">

                {/* Left Sidebar */}
                <aside className="border-b border-[#d9dfda] bg-[#fbfcfa] px-5 py-7 lg:border-b-0 lg:border-r lg:px-6">

                    <div className="mb-8 flex items-center gap-3">

                        <span className="grid size-9 place-items-center rounded-xl bg-[#d9eee6] text-sm font-bold text-[#17634b]">
                            R
                        </span>

                        <div>

                            <p className="text-sm font-semibold tracking-wide">
                                Interview prep
                            </p>

                            <p className="mt-0.5 text-xs text-[#75817b]">
                                Your report
                            </p>

                        </div>

                    </div>

                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#89948e]">
                        Review sections
                    </p>

                    <nav
                        aria-label="Report sections"
                        className="flex gap-2 overflow-x-auto lg:flex-col"
                    >

                        {sections.map((section, index) => {

                            const selected =
                                activeSection === section.id;

                            const count =
                                report[section.key]?.length ?? 0;

                            return (
                                <button
                                    key={section.id}
                                    type="button"
                                    aria-current={
                                        selected
                                            ? "page"
                                            : undefined
                                    }
                                    onClick={() =>
                                        setActiveSection(
                                            section.id
                                        )
                                    }
                                    className={`flex min-w-max items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors lg:w-full ${
                                        selected
                                            ? "bg-[#e7f1ec] font-semibold text-[#17634b]"
                                            : "text-[#53605a] hover:bg-[#f0f3f0]"
                                    }`}
                                >

                                    <span
                                        className={`grid size-6 place-items-center rounded-md text-xs ${
                                            selected
                                                ? "bg-white text-[#17634b]"
                                                : "bg-[#eef1ee] text-[#77827c]"
                                        }`}
                                    >
                                        {index + 1}
                                    </span>

                                    <span className="flex-1">
                                        {section.label}
                                    </span>

                                    <span
                                        className={`text-xs ${
                                            selected
                                                ? "text-[#54806e]"
                                                : "text-[#9aa39e]"
                                        }`}
                                    >
                                        {count}
                                    </span>

                                </button>
                            );
                        })}

                    </nav>

                    <div className="mt-10 hidden border-t border-[#e6eae6] pt-5 lg:block">

                        <p className="text-xs leading-5 text-[#89948e]">
                            A focused review of your interview strengths
                            and next steps.
                        </p>

                    </div>

                </aside>

                {/* Main Content */}
                <main className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

                    <header className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-[#dfe4df] pb-6">

                        <div>

                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#668075]">
                                Interview report
                            </p>

                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                {activeNav.label}
                            </h1>

                            <p className="mt-2 text-sm text-[#75817b]">
                                Questions and guidance tailored to your
                                profile
                            </p>

                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-[#dce4de] bg-white px-4 py-3">

                            <div
                                className="relative grid size-12 place-items-center rounded-full"
                                style={{
                                    background: `conic-gradient(#25815e ${score}%, #e8eeea ${score}%)`
                                }}
                            >

                                <span className="grid size-9 place-items-center rounded-full bg-white text-xs font-bold text-[#205d47]">
                                    {score}
                                </span>

                            </div>

                            <div>

                                <p className="text-sm font-semibold">
                                    {score}% match
                                </p>

                                <p className="text-xs text-[#839089]">
                                    Profile alignment
                                </p>

                            </div>

                        </div>

                    </header>

                    {activeSection === "roadmap" ? (

                        <section
                            aria-label="Preparation road map"
                            className="space-y-4"
                        >

                            {(report.preparationPlan ?? []).map(
                                (day) => (

                                    <article
                                        key={day.day}
                                        className="rounded-xl border border-[#e0e5e0] bg-white p-5 sm:p-6"
                                    >

                                        <div className="mb-4 flex items-start gap-4">

                                            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#e7f1ec] text-xs font-bold text-[#17634b]">
                                                {String(day.day).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            <div>

                                                <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#849189]">
                                                    Day {day.day}
                                                </p>

                                                <h2 className="mt-1 text-base font-semibold">
                                                    {day.focus}
                                                </h2>

                                            </div>

                                        </div>

                                        <ul className="space-y-3 border-l border-[#dce5df] pl-4 sm:ml-5">

                                            {(day.tasks ?? []).map(
                                                (
                                                    task,
                                                    taskIndex
                                                ) => {

                                                    const taskId =
                                                        `${day.day}-${taskIndex}`;

                                                    const complete =
                                                        checkedTasks.has(
                                                            taskId
                                                        );

                                                    return (
                                                        <li
                                                            key={
                                                                taskId
                                                            }
                                                        >

                                                            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#59665f]">

                                                                <input
                                                                    checked={
                                                                        complete
                                                                    }
                                                                    onChange={() =>
                                                                        toggleTask(
                                                                            taskId
                                                                        )
                                                                    }
                                                                    type="checkbox"
                                                                    className="mt-1 size-4 shrink-0 accent-[#25815e]"
                                                                />

                                                                <span
                                                                    className={
                                                                        complete
                                                                            ? "text-[#98a29c] line-through"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {
                                                                        task
                                                                    }
                                                                </span>

                                                            </label>

                                                        </li>
                                                    );
                                                }
                                            )}

                                        </ul>

                                    </article>
                                )
                            )}

                        </section>

                    ) : (

                        <section
                            aria-label={activeNav.label}
                            className="space-y-4"
                        >

                            {questions.map(
                                (item, index) => (

                                    <article
                                        key={`${activeSection}-${index}`}
                                        className="rounded-xl border border-[#e0e5e0] bg-white p-5 sm:p-6"
                                    >

                                        <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#7c8a82]">

                                            <span className="grid size-6 place-items-center rounded-md bg-[#eef3ef] text-[#47735f]">
                                                {String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            Question

                                        </div>

                                        <h2 className="text-base font-semibold leading-7 text-[#26332d]">
                                            {item.question}
                                        </h2>

                                        <div className="mt-5 grid gap-4 border-t border-[#edf0ed] pt-4 sm:grid-cols-2">

                                            <div>

                                                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#87938c]">
                                                    What they are looking for
                                                </p>

                                                <p className="text-sm leading-6 text-[#66726b]">
                                                    {item.intention}
                                                </p>

                                            </div>

                                            <div>

                                                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#47735f]">
                                                    Answer direction
                                                </p>

                                                <p className="text-sm leading-6 text-[#53635a]">
                                                    {item.answer}
                                                </p>

                                            </div>

                                        </div>

                                    </article>
                                )
                            )}

                            {questions.length === 0 && (

                                <p className="rounded-xl border border-dashed border-[#cfd8d1] p-8 text-center text-sm text-[#75817b]">
                                    No questions in this section yet.
                                </p>

                            )}

                        </section>
                    )}

                </main>

                {/* Right Sidebar */}
                <aside className="border-t border-[#d9dfda] bg-[#fbfcfa] px-5 py-7 lg:border-l lg:border-t-0 lg:px-6 lg:py-10">

                    <div className="mb-5 flex items-center justify-between gap-3">

                        <div>

                            <p className="text-xs font-semibold text-[#53605a]">
                                Skill gaps
                            </p>

                            <p className="mt-1 text-xs text-[#89948e]">
                                Areas to strengthen
                            </p>

                        </div>

                        <span className="grid size-8 place-items-center rounded-lg bg-[#f0eee6] text-xs font-semibold text-[#786b42]">
                            {report.skillsGaps?.length ?? 0}
                        </span>

                    </div>

                    <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">

                        {(report.skillsGaps ?? []).map(
                            (gap) => (

                                <span
                                    key={gap.skill}
                                    className={`inline-flex max-w-full items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${
                                        severityStyles[
                                            gap.severity
                                        ] ??
                                        severityStyles.low
                                    }`}
                                >

                                    <span className="size-1.5 shrink-0 rounded-full bg-current" />

                                    <span className="wrap-break-word">
                                        {gap.skill}
                                    </span>

                                </span>
                            )
                        )}

                        {(!report.skillsGaps ||
                            report.skillsGaps.length === 0) && (

                            <p className="text-sm text-[#75817b]">
                                No skill gaps identified.
                            </p>

                        )}

                    </div>

                    <div className="mt-7 border-t border-[#e6eae6] pt-5">

                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#89948e]">
                            Severity
                        </p>

                        <div className="space-y-2 text-xs text-[#748078]">

                            <p className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-rose-400" />
                                High priority
                            </p>

                            <p className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-amber-400" />
                                Developing
                            </p>

                            <p className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-emerald-500" />
                                Low priority
                            </p>

                        </div>

                    </div>

                </aside>

            </div>

        </div>
    );
}

export default Interview;