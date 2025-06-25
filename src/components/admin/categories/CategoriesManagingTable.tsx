import { Button, Input, Sheet, Table } from '@mui/joy';
import {
  FieldValues,
  UseFieldArrayReturn,
  UseFormRegister,
} from 'react-hook-form';

interface CategoriesManagingTableHandler {
  fieldArray: UseFieldArrayReturn;
  register: UseFormRegister<FieldValues>;
}

const CategoriesManagingTable = ({
  fieldArray,
  register,
}: CategoriesManagingTableHandler) => {
  const { fields, remove } = fieldArray;

  return (
    <Sheet
      variant="outlined"
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
        })}
      >
        <thead>
          <tr>
            <th
              style={{ width: 100, verticalAlign: 'middle', paddingLeft: 16 }}
            >
              순서
            </th>
            <th style={{ verticalAlign: 'middle', paddingLeft: 16 }}>
              카테고리명
            </th>
            <th style={{ width: 70, verticalAlign: 'middle' }} />
          </tr>
        </thead>
        <tbody>
          {fields.map((field, idx) => (
            <tr key={field.id}>
              <td>
                <Input
                  variant="soft"
                  type="number"
                  size="sm"
                  {...register(`categories.${idx}.order`)}
                />
              </td>
              <td>
                <Input
                  variant="soft"
                  size="sm"
                  {...register(`categories.${idx}.name`)}
                />
              </td>
              <td>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => {
                    remove(idx);
                  }}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default CategoriesManagingTable;
