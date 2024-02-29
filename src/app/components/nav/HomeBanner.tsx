import Image from 'next/image';

const HomeBanner = () => {
  return (
    <div
      className="relative mb-8
    bg-gradient-to-r
    from-sky-500
    to-sky-700
    "
    >
      <div className="mx-auto flex flex-col items-center justify-evenly gap-2 px-8 py-12 md:flex-row">
        <div className="mb-8 text-center md:mb-0">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Summer Slae
          </h1>
          <p className="mb-2 text-lg text-white md:text-xl">
            Enjoy discount on select items
          </p>
          <p className="text-2xl font-bold text-yellow-400 md:text-5xl">
            Get up to 50% off
          </p>
        </div>
        <div className="relative aspect-video w-1/3">
          <Image
            src="/banner-image.png"
            fill
            alt="banner image"
            className="object-container"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
