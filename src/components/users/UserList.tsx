import { User } from '@/prisma/client';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

interface UserListProps {
  data: User[];
}

const UserList = ({ data }: UserListProps) => {
  const router = useRouter();

  const columnHelper = createColumnHelper<User>();

  const columns = [
    {
      id: 'no',
      header: 'No.',
      cell: ({ row }: { row: Row<User> }) => (
        <div className="text-center">{row.index + 1}</div>
      ),
    },
    columnHelper.accessor('name', {
      header: () => <span>이름</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: () => <span>이메일</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userType', {
      header: () => <span>구분</span>,
      cell: (info) => info.renderValue(),
    }),
    {
      id: 'detail',
      header: '',
      cell: ({ row }: { row: Row<User> }) => (
        <div className="text-center">
          <button
            className="text-white text-sm bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded-lg cursor-pointer"
            onClick={() => router.push(`/admin/users/${row.original.id}`)}
          >
            수정
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border-b border-neutral-400 text-sm mt-2">
      <table className="min-w-full table-fixed">
        <thead className="bg-black text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>

      <div className="max-h-[calc(100dvh_-_285px)] overflow-y-auto">
        <table className="min-w-full table-fixed">
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500 border"
                >
                  데이터가 존재하지 않습니다.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`${row.index === table.getRowModel().rows.length - 1 ? 'border-x' : 'border'} border-neutral-400 px-4 py-2`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
