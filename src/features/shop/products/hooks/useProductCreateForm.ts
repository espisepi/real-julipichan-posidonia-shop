import { useForm } from "react-hook-form"
import { ICreateProductFormData } from "../types/ICreateProductFormData"


type useCreateProductFormProps = {
  product?: ICreateProductFormData
}

const product_default = {
    title: "",
    description: "",
    slug: "",
    tags: [],
    price: 0,
    inStock: 0,
    images: [],
    scene: ""
}

export const useProductCreateForm = ({ product = product_default }) => {
    const { 
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        watch,
     } = useForm<ICreateProductFormData>({
        defaultValues: product,
     });

     const onSubmit = async (form: ICreateProductFormData) => {

        console.log(form);

        // Restricciones antes de llamar a la API del servidor para crear el producto
        if (form?.images?.length < 2) return alert('Mínimo 2 imagenes');

        // Llamada a la API del servidor para crear producto
        //createProduct.submit({ data: form })
     }

     return {
        onSubmit,
        /* useForm attributes below */
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        watch,
     }
}