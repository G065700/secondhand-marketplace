import { User } from '@/prisma/client';
import { useRouter } from 'next/navigation';
import { Box, Button, Sheet, Table } from '@mui/joy';

interface UserListProps {
  data: User[];
  totalItems: number;
  skip: number;
}

const UserList = ({ data, totalItems, skip }: UserListProps) => {
  const router = useRouter();

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
        <thead>
          <tr>
            <th style={{ width: 60, verticalAlign: 'middle' }}>No.</th>
            <th style={{ verticalAlign: 'middle' }}>이름</th>
            <th style={{ verticalAlign: 'middle' }}>이메일</th>
            <th style={{ width: '10%', verticalAlign: 'middle' }}>구분</th>
            <th style={{ width: '10%', verticalAlign: 'middle' }}>
              활성화 여부
            </th>
            <th style={{ width: 70 }} />
          </tr>
        </thead>
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
                      onClick={() => router.push(`/admin/users/${row.id}`)}
                    >
                      수정
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>

    // <div className="border-b border-neutral-400 text-sm mt-2">
    //   <table className="min-w-full table-fixed">
    //     <thead className="bg-black text-white">
    //       {table.getHeaderGroups().map((headerGroup) => (
    //         <tr key={headerGroup.id}>
    //           {headerGroup.headers.map((header) => (
    //             <th key={header.id} className="p-2">
    //               {header.isPlaceholder
    //                 ? null
    //                 : flexRender(
    //                     header.column.columnDef.header,
    //                     header.getContext(),
    //                   )}
    //             </th>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //   </table>
    //
    //   <div className="max-h-[calc(100dvh_-_285px)] overflow-y-auto">
    //     <table className="min-w-full table-fixed">
    //       <tbody>
    //         {table.getRowModel().rows.length === 0 ? (
    //           <tr>
    //             <td
    //               colSpan={columns.length}
    //               className="text-center py-4 text-gray-500 border"
    //             >
    //               데이터가 존재하지 않습니다.
    //             </td>
    //           </tr>
    //         ) : (
    //           table.getRowModel().rows.map((row) => (
    //             <tr key={row.id}>
    //               {row.getVisibleCells().map((cell) => (
    //                 <td
    //                   key={cell.id}
    //                   className={`${row.index === table.getRowModel().rows.length - 1 ? 'border-x' : 'border'} border-neutral-400 px-4 py-2`}
    //                 >
    //                   {flexRender(
    //                     cell.column.columnDef.cell,
    //                     cell.getContext(),
    //                   )}
    //                 </td>
    //               ))}
    //             </tr>
    //           ))
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default UserList;
