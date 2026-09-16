import { createContext, useContext, useState, ReactNode } from "react";

// Tipo de una rutina completa
export type Routine = {
  id: string;
  name: string;
  muscleGroup: string;
  duration: number;
  createdAt: string;
};

// Datos que llegan desde los inputs
// duration puede llegar como string desde TextInput
type DatosRutina = {
  name: string;
  muscleGroup: string;
  duration: string | number;
};

// Lo que va a compartir nuestro Context
type RoutineContextType = {
  routines: Routine[];

  addRoutine: (datos: DatosRutina) => void;

  updateRoutine: (id: string, datos: DatosRutina) => void;

  deleteRoutine: (id: string) => void;
};

// Crear Context
const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

// Datos iniciales
const rutinasIniciales: Routine[] = [
  {
    id: "1",
    name: "Pecho y Tríceps",
    muscleGroup: "Pecho",
    duration: 50,
    createdAt: new Date().toISOString(),
  },
];

// Provider
export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>(rutinasIniciales);

  // AGREGAR RUTINA
  const addRoutine = (datos: DatosRutina) => {
    const nuevaRutina: Routine = {
      id: Date.now().toString(),

      ...datos,

      // Convertimos el valor a número
      duration: Number(datos.duration),

      createdAt: new Date().toISOString(),
    };

    setRoutines((actuales) => [...actuales, nuevaRutina]);
  };

  // ACTUALIZAR RUTINA
  const updateRoutine = (id: string, datos: DatosRutina) => {
    setRoutines((actuales) =>
      actuales.map((rutina) =>
        rutina.id === id
          ? {
              ...rutina,
              ...datos,

              // Aseguramos de guardar number
              duration: Number(datos.duration),
            }
          : rutina,
      ),
    );
  };

  // ELIMINAR RUTINA
  const deleteRoutine = (id: string) => {
    setRoutines((actuales) => actuales.filter((rutina) => rutina.id !== id));
  };

  return (
    <RoutineContext.Provider
      value={{
        routines,
        addRoutine,
        updateRoutine,
        deleteRoutine,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
}

// Hook para utilizar el Context desde las pantallas
export function useRoutines() {
  const context = useContext(RoutineContext);

  if (context === undefined) {
    throw new Error("useRoutines debe utilizarse dentro de RoutineProvider");
  }

  return context;
}
