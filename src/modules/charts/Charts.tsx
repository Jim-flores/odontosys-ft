import { Chart1 } from "./components/Chart1";
import { Chart2 } from "./components/Chart2";
import { Chart3 } from "./components/Chart3";
import { Chart4 } from "./components/Chart4";

const Charts = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Chart1 />
        <Chart2 />
        <Chart3 />
      </div>
      <div className="bg-muted/50  flex-1 rounded-xl flex items-center">
        <Chart4 />
      </div>
    </div>
  );
};

export default Charts;
