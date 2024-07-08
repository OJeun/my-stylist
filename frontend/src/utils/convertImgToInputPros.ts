import { InputProps } from '../components/ui/Input'

export const convertImgToInputProps = (base64: string, id: string | number): InputProps => {
    return {
        id: String(id),
        type: 'checkbox',
        imageSrc: base64,
        inputClassName: "hidden"
    }
}