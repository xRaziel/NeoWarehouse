# NeoWarehouse - Sistema de Gestión de Inventario

Sistema full-stack de gestión de inventario, construido con NestJS, React y PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso](#-uso)

## ✨ Características

- **Gestión de Productos**: CRUD completo con soporte para productos manuales e importados desde API externa
- **Control de Inventario**: Registro de movimientos (entradas, salidas, ajustes)
- **Auditoría Completa**: Historial detallado de todos los movimientos
- **Alertas de Stock**: Identificación automática de productos bajo stock mínimo
- **Dashboard Analítico**: Estadísticas y métricas clave del inventario
- **Integración Externa**: Importación de productos desde DummyJSON API
- **Validaciones Robustas**: Prevención de stock negativo y validación de datos en ambos lados

## 🛠 Tecnologías

### Backend
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **TypeScript**

### Frontend
- **React 18**
- **Vite**
- **TypeScript**
- **TailwindCSS**
- **TanStack Query**
- **React Router**
- **Axios**

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** 18 o superior
- **npm** o **yarn**
- **PostgreSQL** 14 o superior
- **Git**

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/xRaziel/neowarehouse.git
cd neowarehouse
```

### 2. Configurar Base de Datos

```bash
# Acceder a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE neowarehouse;

# Salir de psql
\q
```

### 3. Configurar Backend

```bash
cd neo-warehouse-back

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env con tus credenciales de PostgreSQL
# nano .env o usa tu editor preferido
```

**Configuración del archivo `.env`:**

```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=[tu_password]
DB_NAME=neowarehouse

# External API
DUMMYJSON_API_URL=https://dummyjson.com
```

```bash
# Ejecutar migraciones para crear las tablas
npm run migration:run

# Poblar base de datos con datos de ejemplo
npm run seed:external

# Iniciar servidor de desarrollo
npm run start:dev
```

El backend estará corriendo en `http://localhost:3000`

### 4. Configurar Frontend

```bash
# En otra terminal, desde la raíz del proyecto
cd neo-warehouse-front

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env si es necesario (por defecto apunta a localhost:3000)
# nano .env
```

**Configuración del archivo `.env`:**

```env
VITE_API_URL=http://localhost:3000
```

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🎯 Uso

### Acceder a la Aplicación

1. Abre tu navegador en `http://localhost:5173`
2. Explora el **Dashboard** para ver estadísticas generales
3. Ve a **Inventario** para gestionar productos
4. Usa **Movimientos** para registrar entradas/salidas

### Funcionalidades Principales

#### Gestión de Productos

- **Crear Producto Manual**: Formulario con validaciones
- **Editar**: Modificar productos existentes
- **Filtros**: Buscar por nombre, SKU o categoría
- **Alertas**: Indicadores visuales de stock bajo

#### Registro de Movimientos

- **Entrada**: Compras, devoluciones, reposición
- **Salida**: Ventas, consumo interno
- **Ajuste**: Correcciones, mermas

#### Dashboard

- Total de productos
- Productos con stock bajo
- Ultimos movimientos registrados
- Listado de movimientos recientes



## 📝 Scripts Disponibles

### Backend

```bash
npm run start:dev      # Desarrollo con hot-reload
npm run start:prod     # Producción
npm run build          # Compilar proyecto
npm run migration:generate src/database/migrations/NombreMigracion  # Generar migración
npm run migration:run  # Ejecutar migraciones pendientes
npm run migration:revert  # Revertir última migración
npm run seed:external  # Poblar base de datos
```

### Frontend

```bash
npm run dev            # Desarrollo
npm run build          # Build para producción
npm run preview        # Preview del build
npm run lint           # Linter
```
