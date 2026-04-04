import Marquee from "react-fast-marquee";

export default function SponsorsCarousel() {
  const sponsors = [
    { name: "Sponsor 1", image: "/sponsors/sponsor1.png" },
    // { name: "Sponsor 2", image: "/sponsors/sponsor2.png" },
    // { name: "Sponsor 3", image: "/sponsors/sponsor3.png" },
    // { name: "Sponsor 4", image: "/sponsors/sponsor4.png" },
    // { name: "Sponsor 5", image: "/sponsors/sponsor5.png" },
    // { name: "Sponsor 6", image: "/sponsors/sponsor6.png" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
          Sponsors
        </h2>

        <Marquee
          speed={40}
          gradient={false}
          pauseOnHover={false}
          direction="left"
          autoFill={true}
        >
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="mx-8 flex items-center justify-center h-[100px] w-[180px]"
            >
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="max-h-[70px] max-w-[160px] object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}