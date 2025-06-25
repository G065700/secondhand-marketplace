import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { ListDivider, Menu, MenuItem } from '@mui/joy';

const My = () => {
  return (
    <Menu size="sm" sx={{ minWidth: 100 }}>
      <MenuItem>
        <Link href="/chat" className="w-full">
          DM
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/my" className="w-full">
          내 계정
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/my" className="w-full">
          내역
        </Link>
      </MenuItem>
      <ListDivider />
      <MenuItem onClick={() => signOut()} className="w-full">
        로그아웃
      </MenuItem>
    </Menu>
  );
};

export default My;
