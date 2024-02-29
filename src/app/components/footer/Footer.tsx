import React from 'react';
import FooterList from './FooterList';
import Container from '../nav/Container';
import Link from 'next/link';
import { MdFacebook } from 'react-icons/md';
import {
  AiFillAccountBook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer
      className="mt-16
    bg-slate-700 
    text-sm text-slate-200
    "
    >
      <Container>
        <div
          className="flex flex-col justify-between
            pb-8 pt-16 md:flex-row"
        >
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Shop Categorles</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktop</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>

          <FooterList>
            <h3 className="mb-2 text-base font-bold">Customer Services</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Return & Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="md::w-1/4 mb-6 w-full md:mb-0">
            <h3 className="mb-2 text-base font-bold">About Us</h3>
            <p className="mb-2 w-full">
              {' '}
              asldkfjlasdj falsdfj asdfas dfas dfas dfasdfasdf asdf asdf asdf
              asdf asdfa sdfa sdfasdf asdfasdfasdfasdfasdf sdafaf as dfa asdf
              asdfasdfasdfasdfasdfasdfasdfasdf
            </p>
            <p>
              &copy: {new Date().getFullYear()}
              E-Shop. All rights reserved
            </p>
          </div>

          <FooterList>
            <h3 className="mb-2 text-base font-bold">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
