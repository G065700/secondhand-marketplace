import { UseFieldArrayReturn } from 'react-hook-form';
import { useMemo } from 'react';
import { Box, Button } from '@mui/joy';

interface CategoriesManagingHeaderHandler {
  fieldArray: UseFieldArrayReturn;
  handleCategoriesSubmit: () => void;
  isSubmitting: boolean;
}

const CategoriesManagingHeader = ({
  fieldArray,
  handleCategoriesSubmit,
  isSubmitting,
}: CategoriesManagingHeaderHandler) => {
  const { fields, prepend } = fieldArray;

  const initializedCategory = useMemo(
    () => ({
      name: '',
      order: fields.length + 1,
    }),
    [fields.length],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Button
        size="sm"
        onClick={() => {
          prepend(initializedCategory);
        }}
      >
        카테고리 추가
      </Button>
      <Button
        disabled={isSubmitting}
        size="sm"
        onClick={handleCategoriesSubmit}
      >
        저장
      </Button>
    </Box>
  );
};

export default CategoriesManagingHeader;
