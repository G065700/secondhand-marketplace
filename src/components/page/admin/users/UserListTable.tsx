import { User } from '@/prisma/client';
import { useRouter } from 'next/navigation';
import { Box, Button, Sheet, Table } from '@mui/joy';
import { ComponentProps, useCallback, memo } from 'react';

interface UserListTableProps {
  data: User[];
  totalItems: number;
  skip: number;
}

const UserListTable = (props: UserListTableProps) => {
  return (
    <Sheet variant="outlined" sx={{ maxHeight: 433, overflow: 'auto' }}>
      <Table
        stickyHeader
        hoverRow
        sx={() => ({
          '& tr > *': { bgcolor: 'black', color: 'white' },
          '& td': { bgcolor: 'white', color: 'black' },
          '--Table-headerUnderlineThickness': 0,
        })}
      >
        <UserListTableHeader />
        <UserListTableBody {...props} />
      </Table>
    </Sheet>
  );
};

export default UserListTable;

const UserListTableHeader = memo(function UserListTableHeader() {
  return (
    <thead>
      <tr>
        <th style={{ width: 60, verticalAlign: 'middle' }}>No.</th>
        <th style={{ verticalAlign: 'middle' }}>이름</th>
        <th style={{ verticalAlign: 'middle' }}>이메일</th>
        <th style={{ width: '10%', verticalAlign: 'middle' }}>구분</th>
        <th style={{ width: '10%', verticalAlign: 'middle' }}>활성화 여부</th>
        <th style={{ width: 70 }} />
      </tr>
    </thead>
  );
});

const UserListTableBody = function UserListTableBody(
  props: ComponentProps<typeof UserListTable>,
) {
  const router = useRouter();
  const { data, totalItems, skip } = props;

  const handleUserUpdateBtnClick = useCallback(
    (userId: string) => {
      router.push(`/admin/users/${userId}`);
    },
    [router],
  );

  return (
    <tbody>
      {data.length === 0 && (
        <tr>
          <td colSpan={6} align="center">
            <strong>데이터가 존재하지 않습니다.</strong>
          </td>
        </tr>
      )}

      {data.length > 0 &&
        data.map((row, rowIdx) => (
          <tr key={row.name}>
            <td>{totalItems - skip - rowIdx}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.userType === 'Admin' ? '관리자' : '일반'}</td>
            <td>{row.active ? 'Y' : 'N'}</td>
            <td>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => handleUserUpdateBtnClick(row.id)}
                >
                  수정
                </Button>
              </Box>
            </td>
          </tr>
        ))}
    </tbody>
  );
};
