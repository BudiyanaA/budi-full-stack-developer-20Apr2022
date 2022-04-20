import Link from 'next/link'

function Nav() {
  return (
    <nav class="w-full border-b py-5">
      <div class="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
        <div aria-label="Home. logo" role="img">
          <img
            class="w-12 md:w-auto"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/centre_aligned_simple-Svg1.svg"
            alt="logo"
          />
        </div>
        <Link href="/login">
          <button class="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;