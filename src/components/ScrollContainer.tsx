import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import blinker from "@/styles/blinker.module.css"
import {AvatarPulse} from "@/components/AvatarPulse"


interface TextSection {
    persona: string
    description: string
    source: string
}

export const ScrollContainer = () => {

    /* Hace referencia al compoentete del scroll  */
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    
    /* Hace referencia al compoente completo */
    const componentRef = useRef<HTMLDivElement>(null)

    /* Detecat el indice de la seccion del texto  */
    const [currentSection, setCurrentSection] = useState(0)

    /* Valor de porcentaje entre 0 y 1 que representa el progreso de la barra de scroll */
    const [scrollProgress, setScrollProgress] = useState(0)

    /* Booleano que indica si estamos mostrando en el ultimo objeto del arreglo */
    const [isAtEnd, setIsAtEnd] = useState(false)

    /* Booleano que indica si estamos mostrando en el primer objeto del arreglo */
    const [isAtTop, setIsAtTop] = useState(true)

    /* Booleano que indica si sl componente esta visible en la pantalla */
    const [isInView, setIsInView] = useState(false)

    const textSections: TextSection[] = [
        {
            persona: "Persona 1",
            description:
                "Detalle de la persona y responsabilidades que lleva a cabo dentro de la empresa",
            source: ''
        },
        {
            persona: "Persona 2",
            description:
                "Detalle de la persona y responsabilidades que lleva a cabo dentro de la empresa",
            source: ''
        },
        {
            persona: "Persona 3",
            description:
                "Detalle de la persona y responsabilidades que lleva a cabo dentro de la empresa",
            source: ''
        },
        {
            persona: "Persona 4",
            description:
                "Detalle de la persona y responsabilidades que lleva a cabo dentro de la empresa",
            source: ''
        },
    ]

    // Check if component is in viewport
    // Veiricamos si el componente esta dentro del viewport
    useEffect(() => {

        /*IntersectionObserver:  Detecta cuando el coponente esta visible en la pantalla. 
        threshold: hace que el componente se active cuando muestre al mesnos el 95% del componente en geneal */
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting)
            },
            { threshold: 0.95 },
        )

        /* Inicia la obervacion del componente cuando se monta */
        if (componentRef.current) {
            observer.observe(componentRef.current)
        }

        /* Detiene la obervacion del componente cuando se desmonta */
        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current)
            }
        }
    }, [])

    // Handle scroll inside the container
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        if (!scrollContainer) return


        /*Definimos una funcion que se ejecuta cuando ocurre un evenro del scroll del compoentente */
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer

            // Calculate scroll progress (0 to 1)
            // Calculamos el progreso del scroll (0 a 1) %
            const progress = scrollTop / (scrollHeight - clientHeight)
            
            /* Actualizamos el estado de la barra de progreso */
            setScrollProgress(progress)

            // Check if we've reached the end or top of the container
            /* Verificamos si estamos al inicio o finral del contenido scrolleable */
            setIsAtEnd(Math.abs(scrollTop + clientHeight - scrollHeight) < 1) /* Regresa verdadero cuando la suma de la
            posicion actual y la altura visible esta a menos de 1 pixel de la altura total */

            setIsAtTop(scrollTop === 0) /* Regresa verdadero cuando la psoicion del scroll es 0 */

            // Calculate which section to show based on scroll progress

            /* Calcula que seccion de testo mostrar basado en el progreso del screoll
            
                -Multiplica el progreso por el número de secciones
                -Redondea hacia abajo para obtener un índice entero
                -Asegura que no exceda el número de secciones disponibles
            */
            const sectionIndex = Math.min(Math.floor(progress * textSections.length), textSections.length - 1)
            setCurrentSection(sectionIndex)
        }

        scrollContainer.addEventListener("scroll", handleScroll)
        return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }, [textSections.length])

    // Handle wheel events to control scroll behavior
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        if (!scrollContainer) return

        const handleWheel = (e: WheelEvent) => {
            if (!isInView) return

            const { scrollTop, scrollHeight, clientHeight } = scrollContainer
            const isScrolledToBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 1
            const isScrolledToTop = scrollTop === 0
            const isScrollingDown = e.deltaY > 0
            const isScrollingUp = e.deltaY < 0

            // Scrolling down
            if (isScrollingDown) {
                // If not at the bottom yet, prevent page scroll and scroll the component
                if (!isScrolledToBottom) {
                    e.preventDefault()
                    scrollContainer.scrollTop += e.deltaY
                }
                // If at the bottom, let the page scroll continue
            }
            // Scrolling up
            else if (isScrollingUp) {
                // If not at the top yet, prevent page scroll and scroll the component
                if (!isScrolledToTop) {
                    e.preventDefault()
                    scrollContainer.scrollTop += e.deltaY
                }
                // If at the top, let the page scroll continue
            }
        }

        // Add the wheel event listener to the window to capture all wheel events
        window.addEventListener("wheel", handleWheel, { passive: false })
        return () => window.removeEventListener("wheel", handleWheel)
    }, [isInView])

    return (
        <div ref={componentRef} className="bg-black text-white w-full h-[600px] rounded-lg overflow-hidden">
            {/* Scroll container with fixed height and internal scroll */}
            <div
                ref={scrollContainerRef}
                className="relative w-full h-full overflow-y-auto scrollbar-hide"
                style={{
                    // Hide scrollbar for different browsers
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >
                {/* Content with enough height to enable scrolling */}
                <div className="min-h-[200%] relative">
                    {/* Sticky content that stays visible while scrolling inside the container */}
                    <div className="sticky top-0 flex min-h-[600px] items-center">
                        <div className="relative w-full  mx-auto  py-12">
                            {/* Vertical line with progress indicator */}
                            <div className="absolute left-5  top-0 bottom-0 w-2 rounded-full bg-[#0c0b0b]">
                                <div className="w-full bg-white rounded-full " style={{ height: `${scrollProgress * 100}%` }} />
                            </div>

                            {/* Text content */}
                            <div className="ml-8 content-center">
                                <motion.div
                                    key={currentSection}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center space-x-32">
                                        <div className="pl-10">
                                            <h2 className={`text-5xl mb-5 font-bold ${blinker.semibold}`}>{textSections[currentSection].persona}</h2>
                                            <p className={`text-xl max-w-2xl ${blinker.light}`}>{textSections[currentSection].description}</p>
                                        </div>

                                        <AvatarPulse source={textSections[currentSection].source}/>
                                    </div>

                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicator for scroll direction */}
            <div className="absolute bottom-4 right-4 text-white text-sm opacity-70">
                {isAtEnd ? "Continúa hacia abajo" : isAtTop ? "Scroll para descubrir" : ""}
            </div>

            {/* CSS to hide scrollbar */}
            {/* <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
        </div>
    )
}
