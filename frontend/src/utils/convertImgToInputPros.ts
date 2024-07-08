import { InputProps } from '../components/ui/Input'

export const convertImgToInputProps = (base64: string, id: string | number): InputProps => {
    return {
        id: String(id),
        type: 'checkbox',
        imageSrc: base64,
        inputClassName: "hidden peer text-primary border-gray-light border-2 focus:ring-primary focus:ring-2",
        labelClassName: "group-hover:opacity-75 inline-flex items-center border-gray-light border-2 w-full h-full bg-white rounded-lg cursor-pointer overflow-hidden rounded-md relative"
    }
}