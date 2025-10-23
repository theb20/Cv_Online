import { useState, useEffect } from "react";
import { Timeline } from "../components/Timeline";
import expServices from "../config/Services/expServices.js";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await expServices.getExp(); // attendre la promesse
        setExperiences(data);
        console.log("experiences:", data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div id="work" className="w-full">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
