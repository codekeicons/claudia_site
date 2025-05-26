

import { useState } from "react"
import { User, Settings, Bell, Shield, CreditCard } from "lucide-react"

const tabs = [
  {
    id: "profile",
    label: "Perfil",
    icon: User,
    content: {
      title: "Información del Perfil",
      description: "Gestiona tu información personal y preferencias de cuenta.",
      details: [
        "Actualiza tu foto de perfil",
        "Cambia tu nombre y apellidos",
        "Modifica tu biografía",
        "Configura tu zona horaria",
      ],
    },
  },
  {
    id: "settings",
    label: "Configuración",
    icon: Settings,
    content: {
      title: "Configuración General",
      description: "Personaliza la aplicación según tus necesidades.",
      details: [
        "Tema claro/oscuro",
        "Idioma de la interfaz",
        "Configuración de privacidad",
        "Preferencias de visualización",
      ],
    },
  },
  {
    id: "notifications",
    label: "Notificaciones",
    icon: Bell,
    content: {
      title: "Centro de Notificaciones",
      description: "Controla qué notificaciones quieres recibir y cómo.",
      details: ["Notificaciones por email", "Notificaciones push", "Recordatorios automáticos", "Alertas de seguridad"],
    },
  },
  {
    id: "security",
    label: "Seguridad",
    icon: Shield,
    content: {
      title: "Seguridad y Privacidad",
      description: "Protege tu cuenta con configuraciones de seguridad avanzadas.",
      details: ["Autenticación de dos factores", "Cambiar contraseña", "Sesiones activas", "Historial de accesos"],
    },
  },
  {
    id: "billing",
    label: "Facturación",
    icon: CreditCard,
    content: {
      title: "Facturación y Pagos",
      description: "Administra tu suscripción y métodos de pago.",
      details: ["Plan actual y facturación", "Métodos de pago", "Historial de transacciones", "Descargar facturas"],
    },
  },
]

export const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  const currentTab = tabs.find((tab) => tab.id === activeTab)
  const IconComponent = currentTab?.icon || User

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-gray-600">Gestiona tu cuenta y configuraciones</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <div className="p-6">
          {currentTab && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{currentTab.content.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{currentTab.content.description}</p>
                </div>
                <div className="mt-1">
                  {currentTab.label}
                </div>
              </div>

              {/* Content Details */}
              <div className="grid gap-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Opciones Disponibles</h3>
                <div className="grid gap-3">
                  {currentTab.content.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Guardar Cambios
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
