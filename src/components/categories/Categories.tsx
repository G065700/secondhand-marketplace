'use client';

import {
  TbDeviceImacBolt,
  TbWashMachine,
  TbBuildingWarehouse,
  TbWoman,
  TbMan,
} from 'react-icons/tb';
import {
  MdFace2,
  MdOutlineSportsSoccer,
  MdDirectionsCar,
} from 'react-icons/md';
import { useSearchParams } from 'next/navigation';
import CategoryBox from '@/components/categories/CategoryBox';

const Categories = () => {
  const params = useSearchParams();
  const categoryParam = params?.get('category');

  return (
    <div className="flex flex-row justify-between items-center pt-4 overflow-x-auto">
      {categories.map((category) => (
        <CategoryBox
          key={category.label}
          label={category.label}
          path={category.path}
          icon={category.icon}
          selected={categoryParam === category.path}
        />
      ))}
    </div>
  );
};

export default Categories;

export const categories = [
  {
    label: '디지털기기',
    path: 'digital',
    icon: TbDeviceImacBolt,
    description: '디지털기기 카테고리입니다.',
  },
  {
    label: '생활가전',
    path: 'appliances',
    icon: TbWashMachine,
    description: '생활가전 카테고리입니다.',
  },
  {
    label: '가구/인테리어',
    path: 'interior',
    icon: TbBuildingWarehouse,
    description: '가구/인테리어 카테고리입니다.',
  },
  {
    label: '여성의류',
    path: 'women-clothing',
    icon: TbWoman,
    description: '여성의류 카테고리입니다.',
  },
  {
    label: '남성패션/잡화',
    path: 'men-fashion',
    icon: TbMan,
    description: '남성패션/잡화 카테고리입니다.',
  },
  {
    label: '뷰티/미용',
    path: 'beauty',
    icon: MdFace2,
    description: '뷰티/미용 카테고리입니다.',
  },
  {
    label: '스포츠/레저',
    path: 'sports',
    icon: MdOutlineSportsSoccer,
    description: '스포츠/레저 카테고리입니다.',
  },
  {
    label: '중고차',
    path: 'used-car',
    icon: MdDirectionsCar,
    description: '중고차 카테고리입니다.',
  },
];
