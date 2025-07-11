import { ReactNode } from 'react';
import Link from 'next/link';

interface FloatingButtonProps {
  children: ReactNode;
  href: string;
}

export default function FloatingButton({
  children,
  href,
}: FloatingButtonProps) {
  return (
    <Link
      href={href}
      className="
        fixed
        flex
        items-center
        justify-center
        text-white
        transition-colors
        bg-cyan-500
        border-0
        border-transparent
        rounded-full
        shadow-xl
        cursor-pointer
        hover:bg-cyan-600
        aspect-square
        bottom-5
        right-5
        w-14
      "
    >
      {children}
    </Link>
  );
}
