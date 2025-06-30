
import React from 'react'
import { useState, useEffect } from 'react'

export const BarProgress = () => {
    const [progress, setProgress] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    // Configuración del círculo
    const size = 200
    const strokeWidth = 8
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (progress / 100) * circumference

    // Animación automática al renderizar
    useEffect(() => {
        setIsAnimating(true)
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsAnimating(false)
                    return 100
                }
                return prev + 1
            })
        }, 50)

        return () => clearInterval(interval)
    }, [])

    return (
        // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
        //   <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-6">
        //     <h1 className="text-xl font-semibold text-gray-800">Progreso</h1>

        //   </div>
        // </div>

        <>
            <div className='flex justify-center items-center'>
                {/* Contenedor del progreso circular */}
                <div className="relative">
                    <svg width={size} height={size} className="transform -rotate-90">
                        {/* Círculo de fondo */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            className="text-black"
                        />

                        {/* Círculo de progreso */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className={`text-white transition-all duration-200 ease-out ${isAnimating ? "animate-pulse" : ""}`}
                        />
                    </svg>

                    {/* Porcentaje en el centro */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white">{Math.round(progress)}%</div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
