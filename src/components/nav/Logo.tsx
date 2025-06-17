import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="text-2xl">
      <span className="font-semibold">2nd</span>
      <span className="text-cyan-500 font-bold">HAND</span>
    </Link>
  );
};

export default Logo;
