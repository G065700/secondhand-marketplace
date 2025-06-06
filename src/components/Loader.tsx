'use client';

import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="h-[60vh] max-w-6xl mx-auto w-full flex items-center justify-center py-40">
      <RotatingLines
        strokeColor="gray"
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={true}
      />
    </div>
  );
};

export default Loader;
