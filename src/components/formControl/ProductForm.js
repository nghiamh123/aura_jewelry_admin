import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ProductForm() {
  const { register, handleSubmit, control, reset } = useForm();
  const [imageUrls, setImageUrls] = useState([]);

  // Thêm ảnh theo màu sắc
  const addImageUrl = () => {
    setImageUrls([...imageUrls, { color: { name: '', clrCode: '' }, img: '' }]);
  };

  // Xóa ảnh
  const removeImageUrl = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  // Gửi dữ liệu
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8386/api/product/add',
        data,
      );
      alert('Sản phẩm đã được tạo thành công!');
      reset();
    } catch (error) {
      alert('Lỗi khi tạo sản phẩm!');
    }
  };

  return (
    <Box
      // maxW="600px"
      w="100%"
      mx="auto"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <SimpleGrid
            mb="20px"
            columns={{ sm: 1, md: 2, xl: 2 }}
            spacing={{ base: '20px', xl: '20px' }}
          >
            <FormControl>
              <FormLabel>SKU</FormLabel>
              <Input {...register('sku')} placeholder="Input SKU" />
            </FormControl>

            {/* Tiêu đề */}
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input {...register('title')} placeholder="Input product name" />
            </FormControl>

            {/* Mô tả */}
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register('description')}
                placeholder="Input Description"
              />
            </FormControl>

            {/* Giá */}
            <FormControl isRequired>
              <FormLabel>Price (VND)</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('price')}
                  placeholder="Input price"
                />
              </NumberInput>
            </FormControl>

            {/* Giảm giá */}
            <FormControl>
              <FormLabel>Discount (VND)</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('discount')}
                  placeholder="Input discount price"
                />
              </NumberInput>
            </FormControl>

            {/* Số lượng */}
            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('quantity')}
                  placeholder="Input Quantity"
                />
              </NumberInput>
            </FormControl>

            {/* Ảnh chính */}
            <FormControl isRequired>
              <FormLabel>Image (URL)</FormLabel>
              <Input {...register('img')} placeholder="Input image URL" />
            </FormControl>

            {/* Ảnh theo màu sắc */}
            <FormControl>
              <FormLabel>Colors</FormLabel>
              {imageUrls.map((img, index) => (
                <HStack key={index} spacing={2}>
                  <Input
                    {...register(`imageURLs[${index}].color.name`)}
                    placeholder="Color"
                  />
                  <Input
                    {...register(`imageURLs[${index}].color.clrCode`)}
                    placeholder="Color code (#000000)"
                  />
                  <Input
                    {...register(`imageURLs[${index}].img`)}
                    placeholder="Image URL"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => removeImageUrl(index)}
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                mt={2}
                onClick={addImageUrl}
                colorScheme="blue"
              >
                Add Image
              </Button>
            </FormControl>

            {/* Danh mục */}
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Input
                {...register('category.name')}
                placeholder="Input Category"
              />
            </FormControl>

            {/* Thương hiệu */}
            <FormControl isRequired>
              <FormLabel>Brand</FormLabel>
              <Input {...register('brand.name')} placeholder="Input Brand" />
            </FormControl>

            {/* Trạng thái */}
            <FormControl isRequired>
              <FormLabel>Status</FormLabel>
              <Select {...register('status')}>
                <option value="in-stock">Available</option>
                <option value="out-of-stock">Unavailable</option>
                <option value="discontinued">Out of business</option>
              </Select>
            </FormControl>

            {/* Ngày khuyến mãi */}
            <FormControl>
              <FormLabel>Promotion day</FormLabel>
              <Input type="date" {...register('offerDate.startDate')} />
              <Input type="date" {...register('offerDate.endDate')} mt={2} />
            </FormControl>
          </SimpleGrid>
          {/* SKU */}

          {/* Nút tạo sản phẩm */}
          <Button type="submit" colorScheme="green" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
