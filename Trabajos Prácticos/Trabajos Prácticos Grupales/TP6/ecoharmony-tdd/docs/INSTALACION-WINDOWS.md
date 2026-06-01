# Instalación en Windows — Grupo 2

## 1. Clonar el repo del grupo

```bash
git clone https://github.com/Martinrinaudo/ISW_Grupo2_4k4_2026.git
cd ISW_Grupo2_4k4_2026/Trabajos\ Prácticos/Trabajos\ Prácticos\ Grupales/TP6/ecoharmony-tdd
```

(Si la ruta con tildes molesta, cloná el repo y navegá con el Explorador de archivos.)

## 2. Node

Node 20 LTS desde https://nodejs.org — en PowerShell:

```bash
node -v
npm -v
```

## 3. Dependencias

```bash
npm install
npm test
```

Si falla, probá en `C:\Users\TuUsuario\ecoharmony-tdd` (copiá la carpeta sin `node_modules`).

## Problemas frecuentes

| Problema | Qué hacer |
|----------|-----------|
| Proyecto en Google Drive | Copiar a disco C |
| `npm install` lento o roto | Borrar `node_modules` y `package-lock.json`, volver a instalar en C:\ |
| Tests no encuentran módulos | Estás en la carpeta que tiene `package.json` |

## Correr la web

```bash
npm run dev
```

http://localhost:3000/inscripcion

Para inscribir un turno “mañana” hace falta que falten **24 hs** reales (la app usa la hora del sistema).
