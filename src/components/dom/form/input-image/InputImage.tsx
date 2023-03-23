import { uploadFileCloudinary } from "@/features/upload-cloudinary"
import { ChangeEvent, useRef } from "react"



export const InputImage = ({ labelText, setValue, getValues }) => {

    const fileInputRef = useRef<HTMLInputElement>(null)


    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (!target.files || target.files.length === 0) {
        return
      }

      try {
        // console.log( file );
        // @ts-ignore
        for (const file of target.files) {
          const formData = new FormData()
          formData.append('file', file)
          // TODO: Refactorizar con react-query esta llamada post /admin/upload
          // TODO: Devolver la imagen cuando se encuentre en el servidor de cloudinary (actualmente no lo devuelve y se queda sin poderse añadir la imagen al producto)
        //   const { data } = await tesloApi.post<{ message: string }>('/admin/upload', formData)
          const data = await uploadFileCloudinary({ params: { formData: formData } })
          
          //@ts-ignore
          const message = data.message;

          console.log("OYEE")
          console.log(data);
          console.log(message);
          setValue('images', [...getValues('images'), message], { shouldValidate: true })
        }
      } catch (error) {
        console.log({ error })
      }
    }

    return (
      <div id={`input-image-${labelText}`}>
        <label>{labelText}</label>
        <input type='button' value='Cargar imagen' onClick={() => fileInputRef.current?.click()} />
        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept='image/png, image/gif, image/jpeg'
          style={{ display: 'none' }}
          onChange={onFilesSelected}
        />
      </div>
    )
}