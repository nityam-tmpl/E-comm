const brands=[  
  { name: "Versace", image: "/images/versace.png" },
  { name: "Zara", image: "/images//zara.png" },
  { name: "Gucci", image: "/images/gucci.png" },
  { name: "Prada", image: "/images/prada.png" },
  { name: "Calvin Klein", image: "/images/ck.png" },
];

export default function BrandSlider(){
    return(
<section className="mx-auto w-full  max-w px-0">
      <div className="overflow-hidden bg-black py-7 sm:py-9">
        <div className="brand-track flex w-max items-center">
          {[...brands, ...brands ,...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex h-10 w-36 shrink-0 items-center justify-center px-5 sm:w-52"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="max-h-8 max-w-full object-contain brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

    
