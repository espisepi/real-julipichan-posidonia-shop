import { PublicLayout } from "@/layouts/public-layout";
import { useProductCreateForm } from "../../hooks";

import styles from './ProductCreateForm.module.css';
import { InputText } from "@/components/dom";
import { InputImage } from "@/components/dom/form/input-image";



export const ProductCreateForm = () => {

    const { 
        onSubmit,
        /* useForm attributes below */
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        watch,
    } = useProductCreateForm({});

    // slug: string;
    // tags: string[]; // Hacerlo PK con la tabla de tags
    // price: number;
    // inStock: number;
    // images: string[];
    // scene: string; // URL to model 3D Scene to load with gltfLoader threejs



    

    return (
      <div id='product-create-form-component'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type='submit' />

          <InputText
            labelText={'title'}
            registerUseForm={register('title', {
              required: 'Este campo es requerido',
              minLength: { value: 2, message: 'Minimo 2 caracteres' },
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <InputText
            labelText={'description'}
            registerUseForm={register('description', {
              required: 'Este campo es requerido',
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <InputText
            labelText={'Slug - URL'}
            registerUseForm={register('slug', {
              required: 'Este campo es requerido',
              validate: (val) => (val.trim().includes(' ') ? 'No puede tener espacios en blanco' : undefined),
            })}
            error={!!errors.slug}
            helperText={errors.slug?.message}
          />

          <InputText
            type='number'
            labelText={'Price'}
            registerUseForm={register('price', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'Mínimo de valor cero' },
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <InputImage labelText={'upload image'} setValue={setValue} getValues={getValues} />
        </form>
      </div>
    )
}