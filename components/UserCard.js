import Link from 'next/link'

function UserCard() {
  return (
    <div class="container lg:w-1/4 xl:w-2/7 sm:w-full md:w-2/3 m-4 bg-white shadow-lg transform duration-200 easy-in-out">
      <div class="flex justify-center px-5">
        <img class="h-32 w-32 bg-white p-2 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
      </div>
      <div class=" ">
        <div class="text-center px-4">
          <h2 class="text-gray-800 text-3xl font-bold">Mohit Dhiman</h2>
          <p class="text-gray-400 mt-2">23 Years Old</p>
          <p class="mt-2 text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div class="p-4 flex justify-center">
            <img src="https://tailus.io/sources/blocks/company-site/preview/images/clients/airbnb.svg" class="" alt="" />
          </div>
        </div>            
        <hr class="mt-2" />
        <div class="flex justify-center bg-gray-50 ">
          <div class="text-center p-4 hover:bg-gray-100 cursor-pointer">
            <Link href="/resumes/id">
              <button class="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition">
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