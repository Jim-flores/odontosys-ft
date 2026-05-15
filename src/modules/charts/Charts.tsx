import { Odontogram, OdontogramChange } from "odontogram-view";
import { useState } from "react";
const initialValue: OdontogramChange = [
  {
    tooth: "26",
    surfaces: {
      O: ["CARIES"],
    },
  },
  {
    tooth: "11",
    conditions: ["CROWN"],
  },
];
const Charts = () => {
  const [data, setData] = useState<OdontogramChange>(initialValue);
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-auto pt-0">
      <Odontogram
        value={data}
        onChange={(change) => {
          setData(change);
        }}
        className="w-full"
        size="xs"
      />
    </div>
  );
};

export default Charts;
