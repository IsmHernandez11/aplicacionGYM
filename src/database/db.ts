import * as SQLite from "expo-sqlite";
import { Routine } from "../context/RoutineContext";

const db = SQLite.openDatabaseSync("gympro.db");

export const initDatabase = async (): Promise<Routine[]> => {
  try {
    // Crear tabla si no existe
    db.execSync(`
      CREATE TABLE IF NOT EXISTS routines (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        muscleGroup TEXT NOT NULL,
        duration INTEGER NOT NULL,
        createdAt TEXT NOT NULL,
        featured INTEGER NOT NULL DEFAULT 0
      );
    `);

    // Verificar si la columna featured existe por si proviene de una version anterior
    try {
      const tableInfo = db.getAllSync<{ name: string }>("PRAGMA table_info(routines);");
      const hasFeatured = tableInfo.some((col) => col.name === "featured");
      if (!hasFeatured) {
        db.execSync("ALTER TABLE routines ADD COLUMN featured INTEGER NOT NULL DEFAULT 0;");
      }
    } catch (migError) {
      console.log("Migration check note:", migError);
    }

    // Obtener todas las rutinas
    const rows = db.getAllSync<any>("SELECT * FROM routines ORDER BY createdAt DESC;");

    if (rows.length === 0) {
      // Datos iniciales si la DB esta vacia
      const initialRoutines: Routine[] = [
        {
          id: "1",
          name: "Pecho y Tríceps Explosivo",
          muscleGroup: "Pecho",
          duration: 50,
          createdAt: new Date().toISOString(),
          featured: true,
        },
        {
          id: "2",
          name: "Espalda Dorsales y Bíceps",
          muscleGroup: "Espalda",
          duration: 60,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          featured: false,
        },
        {
          id: "3",
          name: "Sentadilla & Cuádriceps",
          muscleGroup: "Piernas",
          duration: 45,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          featured: false,
        }
      ];

      for (const r of initialRoutines) {
        db.runSync(
          "INSERT INTO routines (id, name, muscleGroup, duration, createdAt, featured) VALUES (?, ?, ?, ?, ?, ?);",
          [r.id, r.name, r.muscleGroup, r.duration, r.createdAt, r.featured ? 1 : 0]
        );
      }
      return initialRoutines;
    }

    return rows.map((r) => ({
      id: String(r.id),
      name: String(r.name),
      muscleGroup: String(r.muscleGroup),
      duration: Number(r.duration),
      createdAt: String(r.createdAt),
      featured: Boolean(r.featured),
    }));
  } catch (error) {
    console.error("Error al inicializar SQLite database:", error);
    return [];
  }
};

export const insertRoutineDB = (routine: Routine) => {
  try {
    if (routine.featured) {
      db.runSync("UPDATE routines SET featured = 0;");
    }
    db.runSync(
      "INSERT INTO routines (id, name, muscleGroup, duration, createdAt, featured) VALUES (?, ?, ?, ?, ?, ?);",
      [routine.id, routine.name, routine.muscleGroup, routine.duration, routine.createdAt, routine.featured ? 1 : 0]
    );
  } catch (error) {
    console.error("Error al insertar rutina en SQLite:", error);
  }
};

export const updateRoutineDB = (routine: Routine) => {
  try {
    if (routine.featured) {
      db.runSync("UPDATE routines SET featured = 0 WHERE id != ?;", [routine.id]);
    }
    db.runSync(
      "UPDATE routines SET name = ?, muscleGroup = ?, duration = ?, featured = ? WHERE id = ?;",
      [routine.name, routine.muscleGroup, routine.duration, routine.featured ? 1 : 0, routine.id]
    );
  } catch (error) {
    console.error("Error al actualizar rutina en SQLite:", error);
  }
};

export const deleteRoutineDB = (id: string) => {
  try {
    db.runSync("DELETE FROM routines WHERE id = ?;", [id]);
  } catch (error) {
    console.error("Error al eliminar rutina en SQLite:", error);
  }
};

export const toggleFeaturedDB = (id: string, currentFeaturedState: boolean) => {
  try {
    // Se resetean todas a 0
    db.runSync("UPDATE routines SET featured = 0;");
    
    // Si la seleccionada NO estaba destacada, la marcamos como destacada (1)
    if (!currentFeaturedState) {
      db.runSync("UPDATE routines SET featured = 1 WHERE id = ?;", [id]);
    }
  } catch (error) {
    console.error("Error al togglear rutina destacada en SQLite:", error);
  }
};
