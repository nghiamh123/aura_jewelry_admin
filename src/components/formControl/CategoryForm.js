import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import clientQuery from 'services/api';

export default function AddCategoryForm({ categoryId }) {
  const [formData, setFormData] = useState({
    img: '',
    parent: '',
    children: [],
    childInput: '',
    productType: '',
    description: '',
    status: 'Show',
  });

  useEffect(() => {
    const getCategoryDetail = async () => {
      try {
        if (!categoryId) return;
        const res = await clientQuery.get(`/category/get/${categoryId}`);

        setFormData((prev) => ({ ...res }));
      } catch (error) {}
    };
    getCategoryDetail();
  }, [categoryId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddChild = () => {
    if (formData.childInput.trim() !== '') {
      setFormData({
        ...formData,
        children: [...formData.children, formData.childInput.trim()],
        childInput: '',
      });
    }
  };

  const handleRemoveChild = (index) => {
    setFormData({
      ...formData,
      children: formData.children.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        img: formData.img,
        parent: formData.parent,
        children: formData.children,
        productType: formData.productType,
        description: formData.description,
        status: formData.status,
        id: categoryId,
      };
      if (payload.id) {
        await clientQuery.patch(`/category/edit/${categoryId}`, payload);
        alert('Danh mục đã được chỉnh sửa thành công!');
        setFormData(payload);
      } else {
        await clientQuery.post('/category/add', {
          ...payload,
        });
        alert('Danh mục đã được thêm thành công!');
        setFormData({
          img: '',
          parent: '',
          children: [],
          childInput: '',
          productType: '',
          description: '',
          status: 'Show',
        });
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Lỗi khi thêm danh mục!');
    }
  };

  return (
    <Box maxW="500px" p={5} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {/* Ảnh danh mục */}
          <FormControl>
            <FormLabel>Category Image (URL)</FormLabel>
            <Input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="Nhập URL ảnh"
              color={'white'}
            />
          </FormControl>

          {/* Tên danh mục */}
          <FormControl isRequired>
            <FormLabel>Category Name</FormLabel>
            <Input
              type="text"
              name="parent"
              value={formData.parent}
              onChange={handleChange}
              placeholder="Input category name"
              color={'white'}
            />
          </FormControl>

          {/* Danh mục con */}
          <FormControl>
            <FormLabel>Children Category</FormLabel>
            <HStack>
              <Input
                type="text"
                value={formData.childInput}
                onChange={(e) =>
                  setFormData({ ...formData, childInput: e.target.value })
                }
                placeholder="Input child category"
                color={'white'}
              />
              <Button onClick={handleAddChild} colorScheme="teal">
                Add
              </Button>
            </HStack>
            <HStack mt={2}>
              {formData.children.map((child, index) => (
                <Tag key={index} size="md" colorScheme="blue">
                  <TagLabel>{child}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveChild(index)} />
                </Tag>
              ))}
            </HStack>
          </FormControl>

          {/* Loại sản phẩm */}
          <FormControl isRequired>
            <FormLabel>Product Type</FormLabel>
            <Input
              type="text"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              placeholder="Input Product Type"
              color={'white'}
            />
          </FormControl>

          {/* Mô tả */}
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Input Description"
            />
          </FormControl>

          {/* Trạng thái */}
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Show">Show</option>
              <option value="Hide">Hide</option>
            </Select>
          </FormControl>

          {/* Nút Thêm Danh Mục */}
          <Button type="submit" colorScheme="blue" width="full">
            {formData._id ? 'Update' : 'Add'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
