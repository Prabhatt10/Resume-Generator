import React from "react";
import { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";

function Home() {
    const { loading, generateReport } = useInterview();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");

    const resumeInputRef = useRef(null);
    const navigate = useNavigate();

    const handleGenerateReport = async (e) => {
        e.preventDefault();

        const resumeFile = resumeInputRef.current?.files?.[0];

        if (!jobDescription.trim()) {
            alert("Job Description is required");
            return;
        }

        if (!resumeFile) {
            alert("Resume file is required");
            return;
        }

        try {
            const data = await generateReport({
                jobDescription,
                selfDescription,
                resume: resumeFile
            });

            if (data?._id) {
                navigate(`/interview/${data._id}`);
            }
        } catch (error) {
            console.error("Error generating interview report:", error);
        }
    };

    return (
        <main className="min-h-screen bg-linear-to-br from-black via-gray-950 to-indigo-950 p-6">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <h1 className="mb-8 text-center text-4xl font-extrabold text-white">
                    AI Interview Report Generator
                </h1>

                <form
                    onSubmit={handleGenerateReport}
                    className="rounded-3xl border border-gray-800 bg-gray-950/90 p-8 shadow-2xl"
                >

                    {/* Job Description */}
                    <div className="mb-6 rounded-2xl border border-blue-500/40 bg-linear-to-br from-blue-950/40 to-gray-900 p-5 shadow-lg shadow-blue-950/20">

                        <label
                            htmlFor="jobDescription"
                            className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-400"
                        >
                            Job Description

                            <span className="text-red-400">
                                *
                            </span>

                            <span className="text-xs font-normal text-gray-500">
                                Required
                            </span>
                        </label>

                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            rows={8}
                            required
                            value={jobDescription}
                            onChange={(e) =>
                                setJobDescription(e.target.value)
                            }
                            placeholder="Enter Job Description Here..."
                            className="w-full resize-none rounded-xl border border-blue-900 bg-black/60 p-4 text-gray-200 outline-none placeholder:text-gray-600 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* Optional Inputs */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Self Description */}
                        <div className="rounded-2xl border border-purple-500/30 bg-linear-to-br from-purple-950/30 to-gray-900 p-5 shadow-lg shadow-purple-950/20">

                            <label
                                htmlFor="selfDescription"
                                className="mb-3 flex items-center gap-2 text-lg font-bold text-purple-400"
                            >
                                Self Description

                                <span className="text-xs font-normal text-gray-500">
                                    Optional
                                </span>
                            </label>

                            <textarea
                                id="selfDescription"
                                name="selfDescription"
                                rows={10}
                                value={selfDescription}
                                onChange={(e) =>
                                    setSelfDescription(e.target.value)
                                }
                                placeholder="Tell us about yourself..."
                                className="w-full resize-none rounded-xl border border-purple-900 bg-black/60 p-4 text-gray-200 outline-none placeholder:text-gray-600 transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                            />
                        </div>

                        {/* Resume Upload */}
                        <div className="rounded-2xl border border-pink-500/30 bg-linear-to-br from-pink-950/30 to-gray-900 p-5 shadow-lg shadow-pink-950/20">

                            <label
                                htmlFor="resume"
                                className="mb-3 flex items-center gap-2 text-lg font-bold text-pink-400"
                            >
                                Upload Resume

                                <span className="text-red-400">
                                    *
                                </span>

                                <span className="text-xs font-normal text-gray-500">
                                    Required
                                </span>
                            </label>

                            <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-pink-800 bg-black/50 p-5 transition hover:border-pink-500">

                                <input
                                    ref={resumeInputRef}
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    accept=".pdf,application/pdf"
                                    required
                                    className="w-full cursor-pointer text-sm text-gray-400 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-pink-500 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-pink-600"
                                />

                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-center">

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-blue-600 px-10 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Generating Report..."
                                : "Generate Interview Report"}
                        </button>

                    </div>

                </form>
            </div>
        </main>
    );
}

export default Home;
