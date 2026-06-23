import { Chart1 } from "./components/Chart1";
import { Chart2 } from "./components/Chart2";
import { Chart3 } from "./components/Chart3";
import { Chart4 } from "./components/Chart4";

const Charts = () => {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-auto pt-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Chart1 />
        <Chart2 />
        <Chart3 />
      </div>
      <Chart4 />
    </div>
  );
};

export default Charts;
