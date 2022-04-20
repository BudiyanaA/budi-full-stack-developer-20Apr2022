import Hero from '../components/Hero';
import UserCard from '../components/UserCard';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
        <div id="catalog" class="container">
          <div class="flex flex-wrap justify-center -mx-4">
            <div class="w-full px-4">
              <div class="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                <span class="font-semibold text-lg text-primary mb-2 block">
                  Our Collections
                </span>
                <h2 class="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4" >
                  Recently Public Resumes
                </h2>
                <p class="text-base text-body-color">
                  There are many variations of passages of Lorem Ipsum
                  available but the majority have suffered alteration in some
                  form.
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-center">
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </div>
      </section>
    </main>
  )
}
