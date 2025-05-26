import { useState, useEffect, type ReactNode, Children } from "react"
import { Menu, X } from "lucide-react"

import blinker from "@/styles/blinker.module.css"

export const ButtonForm = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    // Set animation state when panel opens
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true)
        } else {
            setIsAnimating(false)
        }
    }, [isOpen])

    const togglePanel = () => {
        setIsOpen(!isOpen)
    }



    return (
        <div className="">
            {/* Navbar */}
            {/* <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
                <div className="text-xl font-bold">Mi Sitio</div>

            </nav> */}

            <button
                onClick={togglePanel}
                className={`rounded bg-white ${blinker.semibold}  py-3 px-8 text-black cursor-pointer *: focus:outline-none `}
                aria-label="Abrir menú"
            >
                Agendar/Consultar cita
                {/* <Menu size={24} /> */}
            </button>

            {/* Overlay - appears when panel is open */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300" onClick={togglePanel} />
            )}

            {/* Slide Panel */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-1/2 transform bg-white shadow-lg transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Fixed Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <div>
                        <h2 className={`text-7xl font-bold ${blinker.semibold}`}>Agendar una cita</h2>
                        <p className={` w-3/4 text-lg ${blinker.regular} mt-5`}>Agenda y registra tu cita para que unos de nuestros asesores expertos pueda asesorarte de acuerdo a las necesidades
                            que requiere tu empresa o negocio
                        </p>
                    </div>
                    <button onClick={togglePanel} className="rounded-full p-1 hover:bg-gray-100" aria-label="Cerrar menú">
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}

                </div>
            </div>
        </div>
    )
}