import { Odontogram as OdontogramView } from "odontogram-view";
import { OdontogramDTO } from "../../interfaces/types";
import { useMemo, useState } from "react";
import { UnsavedChangesBar } from "@/components/ui/unsaved-changes-bar";
import { useUpdateCustumerOdontogramQuery } from "../../hooks/useCustumerInfoQuery";

interface Props {
  data?: OdontogramDTO;
}

const Odontogram = ({ data }: Props) => {
  const [values, setValues] = useState<OdontogramDTO["details"]>(
    data?.details || [],
  );
  const { mutate } = useUpdateCustumerOdontogramQuery();
  const [initialValues, setInitialValues] = useState<OdontogramDTO["details"]>(
    data?.details || [],
  );

  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initialValues),
    [values, initialValues],
  );

  const handleSave = async () => {
    if (!data?.clientId) return;
    mutate(
      {
        id: data.clientId,
        data: {
          details: values,
        },
      },
      {
        onSuccess: () => {
          setInitialValues(structuredClone(values));
          setValues(values);
        },
      },
    );
  };
  const handleDiscard = () => {
    setValues(initialValues);
  };
  return (
    <div className="flex flex-col gap-3 w-full px-2">
      <OdontogramView
        value={values || []}
        dentition="mixed"
        onChange={setValues}
        size="xs"
      />
      <UnsavedChangesBar
        visible={isDirty}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  );
};

export default Odontogram;
