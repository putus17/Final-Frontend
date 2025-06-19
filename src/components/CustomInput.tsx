import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
  type?: string
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel className="text-sm font-medium text-foreground">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              onChange={(e) =>
                type === 'number'
                  ? field.onChange(
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  : field.onChange(e)
              }
              value={field.value ?? ''}
            />
          </FormControl>
          <FormMessage className="text-sm text-destructive mt-1" />
        </div>
      )}
    />
  )
}

export default CustomInput
