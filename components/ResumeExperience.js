function ResumeExperience ({ data }) {
  return (
    <section>
      <h1 className="section-header">Experience</h1>
      {data &&
        data.map((item, i) => (
          <article className="my-5" key={`${item.company}-${i}`}>
            <h2 className="item-header">{item.title}</h2>
            <h3 className="item-sub">
              {item.company} | {item.start_date} - {item.end_date || 'PRESENT'}
            </h3>
            <p className="py-6">{item.description}</p>
          </article>
        ))}
    </section>
  );
}

export default ResumeExperience;