import Image from 'next/image';

function ResumeSummary ({ data }) {
  return (
    <section className="py-5 border-b border-neutral-300 lg:flex items-center">
      <div className="my-5">
        <Image
          className="rounded-full mx-auto w-32 lg:w-full xl:w-4/5"
          src="https://i.pravatar.cc/1000"
          alt="profile"
          width={200}
          height={200}
        />
      </div>
      <p className="text-center tracking-wide leading-relaxed lg:text-left lg:mx-8 lg:text-lg">
        {data}
      </p>
    </section>
  );
}

export default ResumeSummary;