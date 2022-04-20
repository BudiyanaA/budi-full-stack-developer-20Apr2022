import Link from 'next/link'
import Image from 'next/image'

function UserCard() {
  return (
    <div className="container lg:w-1/4 xl:w-2/7 sm:w-full md:w-2/3 m-4 bg-white shadow-lg transform duration-200 easy-in-out">
      <div className="flex justify-center px-5">
        <Image 
          className="h-32 w-32 bg-white p-2 rounded-full" 
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt=""
          width={150} 
          height={150}
        />
      </div>
      <div className=" ">
        <div className="text-center px-4">
          <h2 className="text-gray-800 text-3xl font-bold">Mohit Dhiman</h2>
          <p className="text-gray-400 mt-2">23 Years Old</p>
          <p className="mt-2 text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="p-4 flex justify-center">
            <Image 
              src="https://tailus.io/sources/blocks/company-site/preview/images/clients/airbnb.svg" 
              className="" 
              alt="" 
              width={100} 
              height={50}
            />
          </div>
        </div>            
        <hr className="mt-2" />
        <div className="flex justify-center bg-gray-50 ">
          <div className="text-center p-4 hover:bg-gray-100 cursor-pointer">
            <Link href="/resumes/id" passHref={true}>
              <button className="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;