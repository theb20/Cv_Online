import { useState, useEffect } from "react";
import { Timeline } from "../components/Timeline";
import expServices from "../config/Services/expServices.js";
import { experiences as experiencesData } from "../data/experiences";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await expServices.getExp();
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data);
        } else {
          setExperiences(experiencesData);
        }
        console.log("experiences:", data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        setExperiences(experiencesData);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div id="work" className="mt-20 w-full  ">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
