import axios from "axios";
const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

/**
 * @description Generate interview report based on resume, self description and job description.
 * @param {Object} params - The parameters for generating the interview report.
 * @param {string} params.jobDescription - The job description for the position being applied for.
 */
export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile
}) => {
    const formData = new FormData()
    formData.append('jobDescription', jobDescription)
    formData.append('selfDescription', selfDescription)
    formData.append('resume', resumeFile)

    const response =await api.post('/api/interview', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}
/**
 * @description Get interview report by interviewId.
 * @param {string} interviewId - The ID of the interview report to retrieve.
 * @returns {Object} The interview report data.
 */
export const getInterviewReportById =async (interviewId) => {
    const response =await api.get(`/api/interview/report/${interviewId}`).then(res => res.data)
    return response.data
}
/**
 * @description Get all interview reports of the user.
 * @returns {Array} An array of interview reports associated with the authenticated user.
 */
export const getAllInterviewReports =async () => {
    const response =await api.get('/api/interview')
    return response.data
}