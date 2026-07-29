import { profile } from "@/data/profile"
import { Plus } from "lucide-react"

export default function AboutEx() {
    const itemsLogo = [
        { path: "/assets/gray_icon/g_node.png" , sizeX: 100 , sizeY: 90 },
        { path: "/assets/gray_icon/g-react.png" , sizeX: 80 , size: 30},
        { path: "/assets/gray_icon/g_swift.png" , sizeX: 130 , sizeY: 90},
        { path: "/assets/gray_icon/g_n8n.png" , sizeX: 130 , sizeY: 90},
        { path: "/assets/gray_icon/g_tailwindcss.png" , sizeX: 200 , sizeY: 90},
        { path: "/assets/gray_icon/g-adobe.png" , sizeX: 130 , sizeY: 90 },
        { path: "/assets/gray_icon/g_hubspot.png" , sizeX: 130 , sizeY: 90 },
    ]

  return (
    <div className="bg-[#F9F9F9] text-black w-full pt-10">
        <div className="w-full flex gap-6 flex-col pt-10 items-center justify-center text-black px-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[Archivo_Black] w-full sm:w-[85%] md:w-[65%] lg:w-[48%] text-center text-black">
                "Créer des Marques, des Produits et des Expériences <span className="text-white bg-violet-700 px-2 ">mémorables</span >"
            </h2>
            <p className="w-full sm:w-[80%] md:w-[55%] lg:w-[40%] mt-4 text-center text-black">
                {profile.bio}
            </p>

        <button
        onClick={() => window.location.href = "/about"}
        className="bg-orange-600 hover:bg-orange-700 flex items-center justify-center h-[40px] text-white px-4 py-2 rounded-md mt-4 gap-2">
            En savoir <Plus size={20}/>
        </button>

        </div>

        <div className="bg-gray-100/60 pt-5 mt-10">
            <div className="w-full flex flex-col items-center justify-center px-5">
                <h3 className="text-sm text-gray-400 w-full sm:w-[60%] md:w-[35%] lg:w-[25%] text-center text-black">Logiciels sur lesquels j'ai travaillé</h3>
            </div>

            <div className="w-full container mx-auto flex flex-wrap items-center py-10 justify-center gap-x-4 gap-y-4 leading-none px-5">
                {itemsLogo.map((item, index) => (
                    <img
                        key={index}
                        src={item.path}
                        alt={item.path}
                        className="object-contain mt-0 w-16 sm:w-20 md:w-24 lg:w-auto h-10 sm:h-12 md:h-16 lg:h-auto"
                        style={{ maxWidth: `${item.sizeX}px`, maxHeight: `${item.sizeY}px` }}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}