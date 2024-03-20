'use client';
import { AddNewProduct, UploadImage } from '@/api/fetch';
import Heading from '@/app/components/Heading/heading';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import CustomCheckBox from '@/app/components/inputs/CustomCheckbox';
import Input from '@/app/components/inputs/Input';
import SelectColor from '@/app/components/inputs/SelectColor';
import TextArea from '@/app/components/inputs/TextArea';
import FormWrap from '@/app/components/products/FormWrap';
import Button from '@/app/components/products/button';
import { ReqCreateProduct } from '@/lib/type/product';
import { Imagetype } from '@/lib/type/user';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { categories } from '../../../../utils/Categories';
import { Colors } from '../../../../utils/Colors';

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>([]);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      active: false,
      images: [],
      price: 0
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      if (!data.images || data.images.length === 0) {
        setIsLoading(true);

        return toast.error('Please add at least one image');
      }
      const images = data.images as Imagetype[];

      const cc = await Promise.all(
        images.map(async (item, index) => {
          const resData = await UploadImage(item.image);
          console.log('res', resData);
          return (data.images[index] = {
            color: item.color,
            colorCode: item.colorCode,
            image: resData
          });
        })
      );

      console.log('data', data);
      const resAddProduct = await AddNewProduct(data as ReqCreateProduct);
      if (resAddProduct) {
        console.log('resAddProduct', resAddProduct);
        toast.success('Add product success');
        setIsProductCreated(true);
        router.refresh();
      } else {
        toast.error('Duplicate product name');
      }
      console.log('resAddProduct', resAddProduct);
      // const handleUploadImages = async (data) => {
      //   data.map

      // }
    } catch (error) {
      toast.error('Something went wrong, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCustomValue('images', images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages([]);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const category = watch('category');
  const AddImageToState = useCallback(
    (value: ImageType) => {
      setImages((prev) => {
        if (!prev) {
          return [value];
        }
        return [...prev, value];
      });
    },
    [setImages]
  );

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  return (
    <>
      <FormWrap>
        <Heading titlle="Add Products" center />
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
        <Input
          type="number"
          id="price"
          label="Price"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
        <Input
          id="brand"
          label="Brand"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
        <TextArea
          id="description"
          label="Description"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
        <CustomCheckBox
          id="active"
          register={register}
          label="Is this product in stock ?"
        />
        <div className="w-full font-medium">
          <div className="mb-2 font-semibold"></div>
          <div className="max-h[50vh] grid grid-cols-2 gap-3 overflow-y-auto md:grid-cols-3">
            {categories.map((item) => {
              if (item.label === 'All') {
                return null;
              }
              return (
                <div key={item.label} className="col-span">
                  <CategoryInput
                    label={item.label}
                    icon={item.icon}
                    onClick={(category) => {
                      setCustomValue('category', category);
                    }}
                    selected={category === item.label}
                  />
                </div>
              );
            })}
          </div>

          {category === undefined ? null : (
            <>
              <div className="flex w-full flex-col flex-wrap gap-4 pt-4">
                <div className="font-bold">
                  Select the available product colors and upload their images
                </div>
                <div className="text-sm">
                  you must upload an image for each of the color selected
                  otherwise your color selection willbe ignored
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Colors.map((item, index) => {
                  return (
                    <SelectColor
                      key={index}
                      item={item}
                      addImageToState={AddImageToState}
                      removeImageFromState={removeImageFromState}
                      isProductCreated={isProductCreated}
                    />
                  );
                })}
              </div>
              <Button
                label={isLoading ? 'Loading...' : 'Submit'}
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
              />
            </>
          )}
        </div>
      </FormWrap>
    </>
  );
};

export default AddProductForm;
