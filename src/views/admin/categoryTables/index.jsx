// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';
import DevelopmentTable from 'views/admin/categoryTables/components/DevelopmentTable';
import { columnsDataDevelopment } from 'views/admin/categoryTables/variables/columnsData';
import tableDataDevelopment from 'views/admin/categoryTables/variables/tableDataDevelopment.json';

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1, xl: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
      </SimpleGrid>
    </Box>
  );
}
