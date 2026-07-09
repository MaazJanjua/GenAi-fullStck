import axios from "axios";

const api = axios.create({
    baseURL: 'https://genai-fullstck.onrender.com/',
    withCredentials: true
})

/**
 * Generate interview report
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

    const response = await api.post('/api/interview', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}

/**
 * Get report by id
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId.trim()}`)

    return response.data
}

/**
 * Get all reports
 */
export const getAllInterviewReports = async () => {

    const response = await api.get('/api/interview')

    return response.data
}



export const deleteInterviewReportApi = async (id) => {
    const response = await api.delete(
        `api/interview/delete/${id}`,
        {
            withCredentials: true
        }
    );

    return response.data;
};
