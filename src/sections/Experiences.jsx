import { Timeline } from "../components/Timeline";
import { useData } from "../context/DataContext";

const Experiences = () => {
  const { experiences } = useData();

  return (
    <div id="work" className=" w-full  ">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
