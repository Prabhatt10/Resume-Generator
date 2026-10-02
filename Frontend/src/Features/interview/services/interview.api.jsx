// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:3000",
//     withCredentials: true
// });

// export const generateInterviewReport = async ({
//     jobDescription,
//     selfDescription,
//     resume
// }) => {
//     const formData = new FormData();

//     formData.append("jobDescription", jobDescription);
//     formData.append("selfDescription", selfDescription);
//     formData.append("resume", resume);

//     const res = await api.post("/api/interview/report", formData);

//     return res.data;
// };

// export const getInterviewReporById = async (interviewId) => {
//     const res = await api.get(`/api/interview/report/${interviewId}`);

//     return res.data;
// };

// export const getAllInterviewReport = async () => {
//     const res = await api.get("/api/interview");

//     return res.data;
// };

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resume
}) => {
    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    const res = await api.post(
        "/api/interview/report",
        formData
    );

    return res.data;
};

export const getInterviewReporById = async (interviewId) => {
    const res = await api.get(
        `/api/interview/report/${interviewId}`
    );

    return res.data;
};

export const getAllInterviewReport = async () => {
    const res = await api.get(
        "/api/interview"
    );

    return res.data;
};