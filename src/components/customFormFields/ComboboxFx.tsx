import { FieldValues, useFormContext } from "react-hook-form";
import { Path } from "react-hook-form";

import {
  useComboboxAnchor,
  ComboboxChipsInput,
  ComboboxContent,
  Combobox,
  ComboboxChips,
  ComboboxValue,
  ComboboxChip,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "../ui/combobox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
interface Props<T, U> {
  name: Path<T>;
  options: U[];
  label?: string;
  placeholder?: string;
  getValue: (item: U) => string;
  getLabel: (item: U) => string;
}
const ComboboxFx = <T extends FieldValues, U>({
  name,
  options,
  getValue,
  label,
  getLabel,
  placeholder = "Seleccione...",
}: Props<T, U>) => {
  const { control } = useFormContext<T>();
  const anchor = useComboboxAnchor();
  const values = options.map(getValue);
  const optionMap = new Map(
    options.map((option) => [getValue(option), option]),
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="w-full truncate">{label}</FormLabel>}
          <FormControl>
            <Combobox
              multiple
              autoHighlight
              items={values}
              value={field.value ?? []}
              onValueChange={field.onChange}
            >
              <ComboboxChips ref={anchor} className="w-full">
                <ComboboxValue>
                  {(values: string[]) => (
                    <>
                      {values.map((value) => {
                        const option = optionMap.get(value)!;

                        return (
                          <ComboboxChip key={value}>
                            {getLabel(option)}
                          </ComboboxChip>
                        );
                      })}

                      <ComboboxChipsInput
                        ref={field.ref}
                        placeholder={placeholder}
                      />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>

                <ComboboxList>
                  {(value) => {
                    const option = optionMap.get(value)!;

                    return (
                      <ComboboxItem key={value} value={value}>
                        {getLabel(option)}
                      </ComboboxItem>
                    );
                  }}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
export default ComboboxFx;
