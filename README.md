# NeoWarehouse - Sistema de Gestión de Inventario

Sistema full-stack de gestión de inventario, construido con NestJS, React y PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Alcance Completado](#-alcance-completado)
- [Visión Futura](#-visión-futura)
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

## ❕ Decisiones Técnicas
1.- ¿Por qué elegiste este stack?
- En el backend utilicé NestJS porque su arquitectura modular se ajusta bien al proyecto, y junto a TypeORM pude manejar migraciones y poblar la base de datos.
- Para el frontend escogí React con Vite debido a su rapidez y simplicidad, suficiente para un MVP y adecuado por su enfoque en componentes.
- Finalmente, seleccioné PostgreSQL por su robustez e integridad en el manejo de datos.

2.- ¿Cómo modelaste el inventario? (entidades principales)
Entidades utilizadas:
- Producto
- Categoría
- Movimiento
- Tipo de movimiento

### Modelo Base de Datos
<img width="827" height="492" alt="image" src="https://github.com/user-attachments/assets/ddc7517f-5f2c-4b7e-a6f1-29791c4a7dff" />

3.- ¿Qué operaciones de inventario decidiste soportar?
- Ingreso: Permite crear nuevos productos, reabastecer productos existentes y agregar nuevas categorías.
- Egreso: Permite registrar la salida de un producto, disminuyendo su stock correspondiente.
- Ajuste: Permite modificar un producto existente, pudiendo actualizar su nombre, stock, categoría o SKU.

4.- ¿Qué validaciones implementaste en el backend?
En el backend implementé diversas validaciones para asegurar la consistencia de los datos y el correcto funcionamiento de las operaciones. Entre ellas:

### ProductController

- En createProduct validé que el nombre y el SKU no estuvieran vacíos, que el precio fuera mayor a 0 y que el stock fuera mayor o igual a 0. Además, si se enviaba un categoria_id, este no podía venir vacío.
- En updateProductStock verifiqué que el SKU no estuviera vacío y que el nuevo stock fuera mayor o igual a 0.
- En getProductBySKU validé que el SKU no estuviera vacío y retorné un error NotFound si el producto no existía.
- En getProductsByCategory verifiqué que la categoría no fuera vacía y retorné NotFound si no existían productos asociados.
- En updateProduct validé que el SKU no estuviera vacío y retorné NotFound si el producto no existía.
- En deleteProduct validé que el SKU no estuviera vacío.

### MovementsService

- Verifiqué que el producto asociado al movimiento existiera; en caso contrario, se arrojaba un error.
- Validé que el tipo de movimiento fuera válido.
- Apliqué reglas específicas según el tipo de movimiento:
  - Entrada: se suma stock.
  - Salida: se valida que exista stock suficiente; de no ser así, se arroja un error.
  - Ajuste: se asigna directamente el nuevo stock.

5.-¿Cómo manejaste la sincronización entre frontend y backend?
- La sincronización la manejé mediante contratos REST claros y DTOs tipados, asegurando validaciones consistentes en el backend y consumo ordenado desde servicios en el frontend.
- Tras crear o actualizar datos, el frontend vuelve a ejecutar loadData() para mantener la información actualizada, y el stock solo se modifica a través de movimientos o el endpoint dedicado, evitando inconsistencias.
- Además, usé estados de carga/error y respuestas JSON coherentes, y evité condiciones de carrera usando Promise.all y esperando siempre las mutaciones antes de refrescar los datos.

## 👌🏻 Alcance Completado

1.- ¿Qué features están funcionales?
- Gestión de catálogo de productos
  - Crear
  - Editar 
- Registro de operaciones de inventario
  - Entrada
  - Salida
  - Ajuste
- Visualización y consulta de datos
  - Tabla de productos y categorías
  - Tabla de Movimientos
  - Dashboard con información relevante

2.- ¿Qué quedó fuera del MVP y por qué?

Lo siguiente quedó fuera del MVP por falta de tiempo:
- Ordenamiento en tablas
- Paginación en tablas
- Testing

3.- ¿Bugs conocidos o limitaciones?

- Bugs no se han encontrado aún.
- Una posible limitación es la ausencia de paginación en las tablas. Si la cantidad de productos, categorías o movimientos crece demasiado, la carga de datos podría volverse lenta o incluso provocar fallos en la aplicación.

## 🚀 Visión Futura

- Agregaría una funcionalidad extra de exportar la tabla de productos o movimientos a una tabla excel.
- Estadísticas avanzadas (Gráficos y reportes detallados al dashboard).
- Alerta de última venta (Si un producto no se ha vendido en el último mes que se visualice esta información en el Dashboard).
- Login/Roles para usuarios.
- Permisos para acceder a los endpoints o para visualizar los módulos.

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** 18 o superior
- **npm** o **yarn**
- **PostgreSQL** 14 o superior
- **Git**

## ✍🏻 Instalación y Configuración

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
