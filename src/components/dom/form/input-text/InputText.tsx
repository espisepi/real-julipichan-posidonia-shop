
import { uid } from '@/utils/uid';
import styles from './InputText.module.css';
import { useEffect, useRef, useState } from 'react';



export const InputText = ({ labelText, registerUseForm, error, helperText, type="text" }) => {

    const [isFocus, setIsFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const handleFocus = (e) => {
      setIsFocus(true);
    }

    const handleBlur = (e) => {
      setIsFocus(false);
    }

    // TODO: NO funciona el inputRef :(

    // console.log(inputRef);

    useEffect(() => {
      const element = inputRef.current
    //   console.log(element) // element here
    }, [])

    return (
      <div
        onBlur={(e) => handleBlur(e)}
        id={`div-input-text-${labelText}`}
        className={styles.product_create_form_div_input_text}>
        <label
          className={
            isFocus || inputRef?.current?.value ? styles.product_create_form_input_text_label__focus : styles.product_create_form_input_text_label
          }>
          {labelText}
        </label>
        <input type={type} ref={inputRef} onFocus={(e) => handleFocus(e)} className={styles.product_create_form_input_text} {...registerUseForm} />
        {/* errors will return when field validation fails  */}
        {error && <span style={{color:'red'}}>{helperText}</span>}
      </div>
    )
}