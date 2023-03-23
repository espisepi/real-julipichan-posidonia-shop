import { PublicLayout } from "@/layouts/public-layout";
import { useProductCreateForm } from "../../hooks";

import styles from './ProductCreateForm.module.css';
import { InputText } from "@/components/dom";



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
        </form>
      </div>
    )
}