import Image from "next/image";

const styles = [
  { name: "Casual", image: "/images/casual.png" },
  { name: "Formal", image: "/images/Formal.png" },
  { name: "Party", image: "/images/Party.png" },
  { name: "Gym", image: "/images/Gym.png" },
];

export default function DressStyle() {
  return (
    <section className="mx-4 max-w-7.5xl px-0 py-8 sm:mx-12 sm:px-5 sm:py-12 md:px-8">
      <div className="rounded-3xl bg-[#F0F0F0] p-4 sm:p-8 md:p-10">
        <h2 className="mt-4 mb-8 text-center font-league text-[32px] font-black uppercase sm:mt-7 sm:mb-15 sm:text-5xl">
          Browse by Dress Style
        </h2>

        <div className="mt-4 grid grid-cols-1 justify-items-center gap-4 sm:mt-7 sm:grid-cols-5 sm:justify-items-stretch">
          {styles.map((style, index) => (
            <div
              key={style.name}
              className={`relative h-55 w-full overflow-hidden rounded-xl bg-white sm:h-72.25 ${
                index === 0 || index === 3 ? "sm:col-span-2" : "sm:col-span-3"
              }`}
            >
              <Image
                src={style.image}
                alt={style.name}
                fill
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
