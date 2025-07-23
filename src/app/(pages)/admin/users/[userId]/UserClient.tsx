'use client';

import { User } from '@/prisma/client';
import { formatTime } from '@/helpers/dayjs';
import Image from 'next/image';
import { Box, Typography } from '@mui/joy';
import Heading from '@/components/shared/Heading';
import UserTypeUpdate from '@/components/page/admin/user/UserTypeUpdate';
import UserActiveUpdate from '@/components/page/admin/user/UserActiveUpdate';

interface UserClientProps {
  user: User;
}

const UserClient = ({ user }: UserClientProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <Box width={350} display="flex" flexDirection="column" gap={4}>
        <Heading title="계정 관리" />
        <Box display="flex" flexDirection="column" gap={3} width="100%">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <Image
              src={user.image || '/default-user-image.png'}
              alt=""
              height={200}
              width={200}
              className="object-cover w-[200px] h-[200px] rounded-full"
            />
          </Box>

          <Box>
            <Typography level="title-md">이름</Typography>
            <Typography level="body-md">{user.name}</Typography>
          </Box>

          <Box>
            <Typography level="title-md">이메일</Typography>
            <Typography level="body-md">{user.email}</Typography>
          </Box>

          <UserTypeUpdate userId={user.id} userType={user.userType} />
          <UserActiveUpdate userId={user.id} active={user.active} />

          <Box>
            <Typography level="title-md">최근 수정 일시</Typography>
            <Typography level="body-md">
              {formatTime(user.updatedAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserClient;
