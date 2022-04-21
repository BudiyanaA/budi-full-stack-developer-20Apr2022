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
import getAllUsers from '../../utils/getAllUsers';
import getUser from '../../utils/getUser';

function ResumeDetail({ data }) {
  return (
    <div className="antialiased text-neutral-900 bg-neutral-100 min-h-screen sm:px-5">
      <Nav />
      <ResumeHeader 
        name={data.fullname}
        age={data.age}
        // contacts={resume.contact}
      />
      <ResumeSummary
        photos={data.photos} 
        data={resume.summary} 
      />
      <div className="border-b border-neutral-300 pb-2 my-5 lg:flex">
        <div className="lg:w-2/3 lg:pr-8">
          {data.experience && <ResumeExperience data={data.experience} />}
          {/* {resume.projects && <ResumeProjects data={resume.projects} />} */}
        </div>
        {/* <div className="lg:w-1/3 lg:pl-8 lg:border-l lg:border-neutral-300 ">
          {resume.skills && <ResumeSkills data={resume.skills} />}
          {resume.education && <ResumeEducation data={resume.education} />}
        </div> */}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const users = await getAllUsers();

  const paths = users.map((user) => ({
    params: { uid: user.uid },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await getUser(context.params.uid);

  // const user = context.preview
  //   ? { ...data, preview: true }
  //   : { ...data, preview: false };

  return { props: { data } };
}


export default ResumeDetail;