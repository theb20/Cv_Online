import { Timeline } from "../components/Timeline";
import { useData } from "../context/DataContext";

const Experiences = () => {
  const { experiences } = useData();

  return (
    <div id="work" className="mt-20 w-full  ">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
