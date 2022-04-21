import ResumeContact from './ResumeContact';

function ResumeHeader({ name, age, contacts }) {
  return (
    <header className="border-b border-neutral-300 pb-2 md:flex items-center justify-between">
      <div>
        <h1 className="text-primary-500 text-4xl md:text-5xl font-bold tracking-wide leading-tight">
          {name}
        </h1>
        <h2 className="font-light text-lg md:text-2xl text-primary-900 leading-relaxed tracking-widest">
          Age: {age}
        </h2>
      </div>
      <div className="mt-5 md:mt-0 md:border-l md:border-neutral-300 md:pl-4">
        {contacts &&
          Object.keys(contacts).map(key => (
            <ResumeContact key={key} field={key} value={contacts[key]} />
          ))}
      </div>
    </header>
  );
}

export default ResumeHeader;