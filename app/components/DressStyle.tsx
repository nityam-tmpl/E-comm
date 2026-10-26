
const styles = [
  { name: "Casual", image: "/images/casual.png" },
  { name: "Formal", image: "/images/formal.png" },
  { name: "Party", image: "/images/party.png" },
  { name: "Gym", image: "/images/gym.png" },
];

export default function DressStyle() {
  return (
    <section className="mx-12 max-w-7.5xl px-5 py-12 md:px-8">
      <div className="rounded-3xl bg-[#F0F0F0] p-5 sm:p-8 md:p-10">
        <h2 className="text-center text-5xl mt-7 mb-15  font-league font-black uppercase ">
          Browse by Dress Style
        </h2>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-5">
          {styles.map((style, index) => (
            <div
              key={style.name}
              className={`relative h-80 overflow-hidden rounded-xl bg-white sm:h-52 ${
                index === 0 || index === 3
                  ? "sm:col-span-2"
                  : "sm:col-span-3"
              }`}
            >
              <img
                src={style.image}
                alt={style.name}
                
                className="h-[289px] w-full  "
              />

              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
