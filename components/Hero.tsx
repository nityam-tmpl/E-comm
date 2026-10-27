
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#F0EEEF]">
      <div className="page mx-auto grid items-center px-15 gap-8 pt-8 md:grid-cols-2 md:px-8 md:pt-16 lg:pt-20">
        <div className="relative z-10 pb-0 md:pb-10">
          <h1 className="font-league text-[36px] px-5 sm:px-15 font-bold uppercase leading-[0.98] tracking-wide text-black sm:text-5xl lg:text-[64px]">
            Find Clothes
            <br />
            That Matches
            <br />
            Your Style
          </h1>

          <p className="mt-5 max-w-lg px-5 sm:px-15 text-[14px] leading-[22px] text-gray-600 lg:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
        <div className="md:px-[60px] ">
          <a
            href="/shop"
            className="mt-6 inline-flex h-[52px]  w-full items-center justify-center rounded-full bg-black px-[54px] text-sm text-white transition hover:bg-gray-800 md:w-[210px]"
          >
            Shop Now
          </a>
          </div>

          <div className="mt-9 px-5 sm:px-15 grid grid-cols-2 gap-x-3 gap-y-5 md:flex md:gap-5">
            <div>
              <h2 className="font-roboto text-[12px] font-bold text-black md:text-[40px]">
                200+
              </h2>
              <p className="mt-1 text-[10px] text-gray-600 sm:text-xs md:text-sm">
                International Brands
              </p>
            </div>

            <div className="border-l border-gray-300 pl-3 sm:pl-5">
              <h2 className="font-roboto text-[12px] font-bold text-black md:text-[40px]">
                2,000+
              </h2>
              <p className="mt-1 text-[10px] text-gray-600 sm:text-xs md:text-sm">
                High-Quality Products
              </p>
            </div>

            <div className="col-span-2 justify-self-center text-center md:col-span-1 md:justify-self-auto md:text-left md:border-l md:border-gray-300 md:pl-5">
              <h2 className="font-roboto text-[12px] font-bold text-black md:text-[40px]">
                30,000+
              </h2>
              <p className="mt-1 text-[10px] text-gray-600 sm:text-xs md:text-sm">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto h-[448px] w-full max-w-none overflow-hidden sm:h-[452px] sm:w-[390px] lg:h-[520px] lg:w-full">
    <Image
    src="/images/couple.jpg"
    alt="Models wearing the latest fashion collection"
    fill
    priority
    sizes="(max-width: 639px) 100vw, 390px"
    className="object-contain  sm:-translate-x-4 sm:translate-y-20 sm:scale-[1.50]"
  />
  

  <div className="absolute right-4 top-5  z-10 sm:right-25 sm:top-8">
    <Image
      src="/images/Vector.png"
      alt="Stars around"
      width={104}
      height={104}
      className="h-[76px] w-[76px] object-contain sm:h-[104px] sm:w-[104px]"
    />
  </div>

  <div className="absolute left-4 top-[220px] z-10 sm:left-15 sm:top-58">
    <Image
      src="/images/Vector.png"
      alt="Stars around"
      width={56}
      height={56}
      className="h-[44px] w-[44px] object-contain sm:h-[56px] sm:w-[56px]"
    />
  </div>
</div>
      </div>
    </section>
  );
}
