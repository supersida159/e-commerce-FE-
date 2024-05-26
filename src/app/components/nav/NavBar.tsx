import { Redressed } from 'next/font/google';
import Link from 'next/link';
import { Suspense } from 'react';
import CartCount from './CartCount';
import Categories from './Categories';
import Container from './Container';
import MenuUser from './MenuUser';
import SearchBar from './SearchBar';
const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });
const NavBar = () => {
  return (
    <div
      className="
        sticky
        top-0
        z-30
        w-full
        bg-slate-200
        shadow-sm
        "
    >
      <div className="border-b-[1px] py-4">
        <Container>
          <div
            className="
                    md-gap-0
                    flex
                    items-center
                    justify-between
                    gap-3
                    "
          >
            <Link
              href="/"
              className={`${redressed.className} text-2xl font-bold`}
            >
              E-Shop
            </Link>
            <SearchBar />
            <div className=" flex items-center gap-8 md:gap-12">
              <CartCount />
              <div>
                <MenuUser />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Suspense>
        <Categories />
      </Suspense>
    </div>
  );
};

export default NavBar;
