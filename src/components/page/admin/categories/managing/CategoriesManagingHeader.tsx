import { UseFieldArrayReturn } from 'react-hook-form';
import { useMemo } from 'react';
import { Box } from '@mui/joy';
import SmallButton from '@/components/shared/button/SmallButton';

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
    <Box display="flex" justifyContent="space-between">
      <SmallButton
        variant="outlined"
        onClick={() => {
          prepend(initializedCategory);
        }}
      >
        카테고리 추가
      </SmallButton>
      <SmallButton disabled={isSubmitting} onClick={handleCategoriesSubmit}>
        저장
      </SmallButton>
    </Box>
  );
};

export default CategoriesManagingHeader;
