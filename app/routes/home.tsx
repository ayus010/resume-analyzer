import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link} from "react-router";
import {useEffect, useState} from "react";
import { resumes as defaultResumes } from "../../constants";
import { fadeIn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    const loadResumes = async () => {
      if (!auth.isAuthenticated) {
        setResumes(defaultResumes);
        return;
      }
      
      setLoadingResumes(true);
      const userResumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = userResumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ));

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes();
  }, [auth.isAuthenticated]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <div>
      <Navbar />
    </div>

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>
          {!auth.isAuthenticated ? (
            "Login to upload your resume and get AI-powered feedback."
          ) : !loadingResumes && resumes?.length === 0 ? (
            "No resumes found. Upload your first resume to get feedback."
          ) : (
            "Review your submissions and check AI-powered feedback."
          )}
        </h2>
      </div>
      
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume, index) => (
              <div key={resume.id} className={fadeIn((index + 1) * 100)}>
                <ResumeCard 
                  resume={resume} 
                  isPreview={!auth.isAuthenticated}
                />
              </div>
          ))}
        </div>
      )}

      {auth.isAuthenticated && !loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold hover:scale-105 transition-transform">
              Upload Resume
            </Link>
          </div>
      )}
      
      {!auth.isAuthenticated && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <button 
            onClick={auth.signIn} 
            className="primary-button w-fit text-xl font-semibold hover:scale-105 transition-transform"
          >
            Login to Get Started
          </button>
        </div>
      )}
    </section>
  </main>
}