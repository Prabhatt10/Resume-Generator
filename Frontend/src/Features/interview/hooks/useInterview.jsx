// import {
//     generateInterviewReport,
//     getInterviewReporById,
//     getAllInterviewReport
// } from "../services/interview.api";

// import { useContext } from "react";
// import { InterviewContext } from "../interview.context";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";


// export const useInterview = () => {

//     const context = useContext(InterviewContext);
//     const {interviewId} = useParams();

//     if (!context) {
//         throw new Error(
//             "useInterview must be used within an InterviewProvider"
//         );
//     }

//     const {
//         loading,
//         setLoading,
//         report,
//         setReport,
//         reports,
//         setReports
//     } = context;

//     const generateReport = async ({
//         jobDescription,
//         selfDescription,
//         resume
//     }) => {
//         setLoading(true);

//         try {
//             const res = await generateInterviewReport({
//                 jobDescription,
//                 selfDescription,
//                 resume
//             });

//             const interviewReport = res.data.interviewReport;

//             setReport(interviewReport);

//             return interviewReport;

//         } catch (error) {
//             console.error(
//                 "Error generating interview report:",
//                 error
//             );

//             throw error;

//         } finally {
//             setLoading(false);
//         }
//     };

//     const getReportById = async (interviewId) => {
//         setLoading(true);

//         try {
//             const res = await getInterviewReporById(interviewId);

//             const interviewReport = res.data.interviewReport;

//             setReport(interviewReport);

//             return interviewReport;

//         } catch (error) {
//             console.error(
//                 "Error fetching interview report by ID:",
//                 error
//             );

//             throw error;

//         } finally {
//             setLoading(false);
//         }
//     };

//     const getAllReports = async () => {
//         setLoading(true);

//         try {
//             const res = await getAllInterviewReport();

//             const interviewReports = res.data.interviewReports;

//             setReports(interviewReports);

//             return interviewReports;

//         } catch (error) {
//             console.error(
//                 "Error fetching interview reports:",
//                 error
//             );

//             throw error;

//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if(interviewId){
//             getReportById(interviewId)
//         } else {
//             getAllReports()
//         }
//     },[interviewId])

//     return {
//         loading,
//         report,
//         reports,
//         generateReport,
//         getReportById,
//         getAllReports
//     };
// };








import {
    generateInterviewReport,
    getInterviewReporById,
    getAllInterviewReport
} from "../services/interview.api";

import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {

    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error(
            "useInterview must be used within an InterviewProvider"
        );
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;

    const generateReport = async ({
        jobDescription,
        selfDescription,
        resume
    }) => {
        setLoading(true);

        try {
            const res = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resume
            });

            const interviewReport = res.data.interviewReport;

            setReport(interviewReport);

            return interviewReport;

        } catch (error) {
            console.error(
                "Error generating interview report:",
                error
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
        setLoading(true);

        try {
            const res = await getInterviewReporById(interviewId);

            const interviewReport = res.data.interviewReport;

            setReport(interviewReport);

            return interviewReport;

        } catch (error) {
            console.error(
                "Error fetching interview report by ID:",
                error
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    const getAllReports = async () => {
        setLoading(true);

        try {
            const res = await getAllInterviewReport();

            const interviewReports = res.data.interviewReports;

            setReports(interviewReports);

            return interviewReports;

        } catch (error) {
            console.error(
                "Error fetching interview reports:",
                error
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getAllReports
    };
};