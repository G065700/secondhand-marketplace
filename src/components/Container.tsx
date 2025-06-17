import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className="
        max-w-[2520px]
        mx-auto
        lg:px-20
        sm:px-10
        px-5
        pt-[80px]
        pb-6
      "
    >
      {children}
    </div>
  );
};

export default Container;
