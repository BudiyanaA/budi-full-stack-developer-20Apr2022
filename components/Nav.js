import Link from 'next/link'
import Image from 'next/image'

function Nav() {
  return (
    <nav className="w-full border-b py-5">
      <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
        <div aria-label="Home. logo" role="img">
          <Link href="/" passHref={true}>
            <Image
              className="w-12 md:w-auto"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/centre_aligned_simple-Svg1.svg"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <Link href="/login" passHref={true}>
          <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;