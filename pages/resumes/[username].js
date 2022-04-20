import Nav from '../../components/Nav';
import {
  ResumeHeader,
  ResumeSummary,
  ResumeExperience,
  ResumeProjects,
  ResumeSkills,
  ResumeEducation,
} from '../../components';
import resume from '../../data/profile';

function ResumeDetail() {
  return (
    <div className="antialiased text-neutral-900 bg-neutral-100 min-h-screen sm:px-5">
      <Nav />
      <ResumeHeader 
        name={resume.fullname}
        role={resume.role}
        contacts={resume.contact}
      />
      <ResumeSummary data={resume.summary} />
      <div className="border-b border-neutral-300 pb-2 my-5 lg:flex">
        <div className="lg:w-2/3 lg:pr-8">
          {resume.experience && <ResumeExperience data={resume.experience} />}
          {resume.projects && <ResumeProjects data={resume.projects} />}
        </div>
        <div className="lg:w-1/3 lg:pl-8 lg:border-l lg:border-neutral-300 ">
          {resume.skills && <ResumeSkills data={resume.skills} />}
          {resume.education && <ResumeEducation data={resume.education} />}
        </div>
      </div>
    </div>
  );
}

export default ResumeDetail;