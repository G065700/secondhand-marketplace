import { Sheet, Table } from '@mui/joy';
import { Control, UseFieldArrayReturn } from 'react-hook-form';
import SmallInput from '@/components/shared/input/SmallInput';
import SmallButton from '@/components/shared/button/SmallButton';
import { ComponentProps } from 'react';

interface CategoriesManagingTableProps {
  fieldArray: UseFieldArrayReturn;
  control: Control;
}

const CategoriesManagingTable = (props: CategoriesManagingTableProps) => {
  return (
    <Sheet
      variant="soft"
      sx={{ maxHeight: 'calc(100dvh - 145px)', overflow: 'auto' }}
    >
      <Table
        stickyHeader
        hoverRow
        sx={() => ({
          '& thead > tr > *': {
            bgcolor: 'black',
            color: 'white',
          },
          '& td': { bgcolor: 'white', color: 'black' },
          '--Table-headerUnderlineThickness': 0,
          '--TableCell-borderColor': 'white',
        })}
      >
        <CategoriesManagingTableHeader />
        <CategoriesManagingTableBody {...props} />
      </Table>
    </Sheet>
  );
};

export default CategoriesManagingTable;

const CategoriesManagingTableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ width: 100, verticalAlign: 'middle', paddingLeft: 16 }}>
          순서
        </th>
        <th style={{ verticalAlign: 'middle', paddingLeft: 16 }}>카테고리명</th>
        <th style={{ width: 70, verticalAlign: 'middle' }} />
      </tr>
    </thead>
  );
};

const CategoriesManagingTableBody = (
  props: ComponentProps<typeof CategoriesManagingTable>,
) => {
  const { fieldArray, control } = props;
  const { fields, remove } = fieldArray;

  return (
    <tbody>
      {fields.map((field, idx) => (
        <tr key={field.id}>
          <td>
            <SmallInput
              id={`categories.${idx}.order`}
              type="number"
              control={control}
            />
          </td>
          <td>
            <SmallInput id={`categories.${idx}.name`} control={control} />
          </td>
          <td>
            <SmallButton
              color="danger"
              variant="outlined"
              onClick={() => {
                remove(idx);
              }}
            >
              삭제
            </SmallButton>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
