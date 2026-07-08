import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, deleteInterviewReportApi } from '../services/interview.api';
import { useContext, useEffect } from 'react';
import { InterviewContext } from '../interview.context';
import { useNavigate, useParams } from 'react-router';

export const useInterview = () => {
    const navigate = useNavigate();
    const { interviewId } = useParams();
    const context = useContext(InterviewContext)
    if (!context) {
        throw new Error('useInterview must be used within an InterviewProvider')
    }
    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
        } catch (error) {
            console.error('Error generating interview report:', error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true);

        let response = null;

        try {
            response = await getInterviewReportById(interviewId)

            console.log(response)

            setReport(response.interviewReport)

        } catch (error) {
            console.error('Error fetching interview report:', error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReport
    }

    const getReports = async () => {
        setLoading(true);
        let response = null;
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.error('Error fetching interview reports:', error)
        } finally {
            setLoading(false)
        }
        return response.interviewReports;
    }

    const deleteReport = async (id) => {
        try {

            await deleteInterviewReportApi(id);

            setReports((prev) =>
                prev.filter((report) => report._id !== id)
            );

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [interviewId])
    // const clearReport = () => {
    //     // setReport(null)
    //     navigate('/')
    // }
    return {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports,
        generateReport,
        getReportById,
        getReports,
        deleteReport
        // clearReport
    };
}