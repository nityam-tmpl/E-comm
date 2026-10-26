import Image from "next/image";

export default function Hero() {
  return (
    <section className=" bg-[#F0EEEF]">
      <div className=" grid max-w items-center gap-8 page pt-12 md:grid-cols-2 md:px-8 md:pt-16 lg:pt-20">
        <div className="relative z-10 pb-8 md:pb-16">
          <h1 className="lg:text-7xl sm:text-5xl font-league text-black font-bold uppercase leading-[0.98] tracking-tight  ">
            Find Clothes
            <br />
            That Matches
            <br />
            Your Style
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-gray-600">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <a
            href="/shop"
            className="mt-6 inline-flex min-w-40 justify-center rounded-full bg-black px-8 py-3 text-sm text-white transition hover:bg-gray-800"
          >
            Shop Now
          </a>

          <div className="mt-9 flex gap-5 ">
            <div>
              <h2 className="sm:text-[40px] font-bold font-roboto text-black text-3xl">200+</h2>
              <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                International Brands
              </p>
            </div>

            <div className="border-l border-gray-300 sm:pl-5">
              <h2 className="sm:text-[40px] text-black font-bold font-roboto text-3xl">2,000+</h2>
              <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                High-Quality Products
              </p>
            </div>

            <div className="border-l border-gray-300  sm:pl-5">
              <h2 className="sm:text-[40px] text-black font-bold font-roboto text-3xl">30,000+</h2>
              <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden mx-auto h-[350px] w-full max-w-md md:h-[450px] lg:h-[520px] lg:max-w-none">
      

            <Image
              src="/images/couple.jpg"
              alt="Models wearing the latest fashion collection"
              fill
              priority
              
              className="object-contain object-top translate-y-17 translate-x-10 scale-150"
            />
            <div className="absolute right-1 top-8">

              <Image
                src="/images/Vector.png"
                alt="Stars Around"
                width={104}
                height={104}

              
              
              
              />
            </div>
            <div className="absolute left-15 top-58">

              <Image
                src="/images/Vector.png"
                alt="Stars Around"
                width={56}
                height={56}

              
              
              
              />
            </div>
        </div>
      </div>
    </section>
  );
}
