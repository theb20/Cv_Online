import { MoveUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { path } from "@/data/path";
import TechTags from "../components/TechTags";

export default function ProjectHome() {
    const navigate = useNavigate();

    const handleClick = (project) => {
        navigate(`${project.path}`);
    };

    return (
        <div className="pt-10 bg-[#F9F9F9] flex flex-col gap-12 text-black w-screen items-center justify-center">
            <h2 className="text-4xl font-bold font-[Archivo_Black] mb-2 w-full text-center text-black">
                Explorez mes réalisations par domaine
            </h2>

            <div className="flex flex-wrap gap-4 justify-center items-center">
                {path.slice(0, 4).map((project, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(project)}
                        className="flex justify-center items-center cursor-pointer"
                    >
                        <div className="bg-[#F9F9F9] overflow-hidden p-3 w-[400px] h-[570px] rounded-md">
                            <div className="relative rounded-md w-[100%] h-[70%]">
                                <img
                                    src={project.img}
                                    alt={project.name}
                                    className="w-full h-full object-cover rounded-2xl z-10"
                                />

                                <div className="absolute -bottom-5 -left-5 z-50 p-4 rounded-full bg-[#F9F9F9] transition-colors">
                                    <div className="flex hover:animate-zoom-pulse items-center justify-center w-15 h-15 rounded-full bg-black/80">
                                        <MoveUpRight size={30} className="text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative py-5 z-60">
                                <h3 className="text-xl font-bold font-[Archivo_Black] w-full text-black mb-3">
                                    {index + 1}. {project.name}
                                </h3>

                                <TechTags path={project} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}