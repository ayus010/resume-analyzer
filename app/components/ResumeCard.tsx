import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

interface ResumeCardProps {
  resume: Resume;
  isPreview?: boolean;
}

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath }, isPreview = false }: ResumeCardProps) => {
    const { fs, auth } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            if (isPreview) {
                // For preview resumes, we use the imagePath directly
                setResumeUrl(imagePath);
                return;
            }

            // For authenticated users, load from filesystem
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath, isPreview]);

    return (
        <div 
            className="resume-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={isPreview ? auth.signIn : undefined}
            style={isPreview ? {cursor: 'pointer'} : {}}
        >
            {!isPreview ? (
                <Link to={`/resume/${id}`} className="resume-card-content">
                    <div className="resume-card-header">
                        <div className="flex flex-col gap-2">
                            {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                            {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                            {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                        </div>
                        <div className="flex-shrink-0">
                            <ScoreCircle score={feedback.overallScore} />
                        </div>
                    </div>
                    {resumeUrl && (
                        <div className="gradient-border">
                            <div className="w-full h-full overflow-hidden">
                                <img
                                    src={resumeUrl}
                                    alt="resume"
                                    className="w-full h-[350px] max-sm:h-[200px] object-cover object-top hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    )}
                </Link>
            ) : (
                <>
                    <div className="resume-card-header">
                        <div className="flex flex-col gap-2">
                            {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                            {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                            {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                        </div>
                        <div className="flex-shrink-0">
                            <ScoreCircle score={feedback.overallScore} />
                        </div>
                    </div>
                    {resumeUrl && (
                        <div className="gradient-border">
                            <div className="w-full h-full overflow-hidden">
                                <img
                                    src={resumeUrl}
                                    alt="resume"
                                    className="w-full h-[350px] max-sm:h-[200px] object-cover object-top filter hover:brightness-90 transition-all duration-300"
                                />
                            </div>
                        </div>
                    )}
                    
                </>
            )}
        </div>
    )
}
export default ResumeCard