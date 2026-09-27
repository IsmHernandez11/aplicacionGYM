import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  initDatabase,
  insertRoutineDB,
  updateRoutineDB,
  deleteRoutineDB,
  toggleFeaturedDB,
} from "../database/db";

// Tipo de una rutina completa
export type Routine = {
  id: string;
  name: string;
  muscleGroup: string;
  duration: number;
  createdAt: string;
  featured?: boolean;
};

// Datos que llegan desde los inputs
export type DatosRutina = {
  name: string;
  muscleGroup: string;
  duration: string | number;
  featured?: boolean;
};

// Lo que comparte el Context
type RoutineContextType = {
  routines: Routine[];
  isLoading: boolean;
  addRoutine: (datos: DatosRutina) => void;
  updateRoutine: (id: string, datos: DatosRutina) => void;
  deleteRoutine: (id: string) => void;
  toggleFeatured: (id: string) => void;
};

// Crear Context
const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

// Provider
export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Carga inicial desde SQLite al abrir la app
  useEffect(() => {
    async function loadFromDB() {
      try {
        const storedRoutines = await initDatabase();
        setRoutines(storedRoutines);
      } catch (error) {
        console.error("Error al cargar rutinas desde SQLite:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFromDB();
  }, []);

  // AGREGAR RUTINA
  const addRoutine = (datos: DatosRutina) => {
    const isFeatured = Boolean(datos.featured);
    const nuevaRutina: Routine = {
      id: Date.now().toString(),
      name: datos.name.trim(),
      muscleGroup: datos.muscleGroup.trim(),
      duration: Number(datos.duration),
      createdAt: new Date().toISOString(),
      featured: isFeatured,
    };

    setRoutines((actuales) => {
      const listWithoutFeatured = isFeatured
        ? actuales.map((r) => ({ ...r, featured: false }))
        : actuales;
      return [nuevaRutina, ...listWithoutFeatured];
    });

    insertRoutineDB(nuevaRutina);
  };

  // ACTUALIZAR RUTINA
  const updateRoutine = (id: string, datos: DatosRutina) => {
    const durationNum = Number(datos.duration);
    const isFeatured = datos.featured;

    setRoutines((actuales) =>
      actuales.map((rutina) => {
        if (rutina.id === id) {
          const updated: Routine = {
            ...rutina,
            name: datos.name.trim(),
            muscleGroup: datos.muscleGroup.trim(),
            duration: durationNum,
            featured: isFeatured !== undefined ? isFeatured : rutina.featured,
          };
          updateRoutineDB(updated);
          return updated;
        } else if (isFeatured) {
          return { ...rutina, featured: false };
        }
        return rutina;
      })
    );
  };

  // ELIMINAR RUTINA
  const deleteRoutine = (id: string) => {
    setRoutines((actuales) => actuales.filter((rutina) => rutina.id !== id));
    deleteRoutineDB(id);
  };

  // MARCAR / DESMARCAR RUTINA DESTACADA (Garantiza ÚNICA rutina destacada)
  const toggleFeatured = (id: string) => {
    setRoutines((actuales) => {
      const target = actuales.find((r) => r.id === id);
      if (!target) return actuales;
      const isCurrentlyFeatured = Boolean(target.featured);

      toggleFeaturedDB(id, isCurrentlyFeatured);

      return actuales.map((rutina) => {
        if (rutina.id === id) {
          return { ...rutina, featured: !isCurrentlyFeatured };
        }
        // Todas las demás pasan a false (REGLA: solo 1 destacada a la vez)
        return { ...rutina, featured: false };
      });
    });
  };

  return (
    <RoutineContext.Provider
      value={{
        routines,
        isLoading,
        addRoutine,
        updateRoutine,
        deleteRoutine,
        toggleFeatured,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
}

// Hook para consumir el Context
export function useRoutines() {
  const context = useContext(RoutineContext);

  if (context === undefined) {
    throw new Error("useRoutines debe utilizarse dentro de RoutineProvider");
  }

  return context;
}

