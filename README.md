# Sistema de Registro de Productos

## Requisitos del Sistema

- **PHP:** 7.4 o superior (Recomendado: PHP 8.0+)
- **PostgreSQL:** 12 o superior (Recomendado: PostgreSQL 14+)
- **Servidor Web:** Apache o Nginx
- **Extensión PHP requerida:** `php-pgsql` (para conexión con PostgreSQL)

---

## Instrucciones de Instalación

### 1. Configurar la Base de Datos

#### a) Crear la base de datos en PostgreSQL

1. Abrir `psql` o **pgAdmin**
2. Ejecutar el siguiente comando:

```sql
CREATE DATABASE sistema_productos;
```

#### b) Ejecutar el script SQL

1. Navegar a la carpeta `sql/`
2. Ejecutar el archivo `schema.sql` en la base de datos creada

Comando en terminal:

```bash
psql -U postgres -d sistema_productos -f sql/schema.sql
```

---

### 2. Configurar la Conexión a la Base de Datos

1. Abrir el archivo:

```
config/database.php
```

2. Modificar las siguientes constantes según tu configuración:

```php
define('DB_HOST', 'localhost');          // Host de PostgreSQL
define('DB_NAME', 'sistema_productos');  // Nombre de la base de datos
define('DB_USER', 'postgres');           // Usuario de PostgreSQL
define('DB_PASS', 'tu_password');        // Contraseña de PostgreSQL
```

---

### 3. Configurar el Servidor Web

#### Opción A – Servidor integrado de PHP (Desarrollo)

1. Abrir una terminal en la carpeta del proyecto
2. Ejecutar:

```bash
php -S localhost:8000
```

3. Abrir en el navegador:

```
http://localhost:8000
```

---

#### Opción B – Usando XAMPP / WAMP / LAMP

1. Copiar la carpeta **SistemaProductos** dentro de `htdocs` (o `www`)
2. Asegurarse de que **Apache** esté en ejecución
3. Abrir en el navegador:

```
http://localhost/SistemaProductos
```

---

### 4. Verificar la Instalación

1. Acceder a la aplicación desde el navegador
2. Verificar que los campos **select** (Bodega, Moneda, Materiales) se carguen con datos
3. Probar el cambio de **bodega** para confirmar que las **sucursales** se cargan dinámicamente

---

## Notas Importantes

1. Asegúrese de que la extensión `php-pgsql` esté habilitada en el archivo `php.ini`
2. Verificar que **PostgreSQL** esté corriendo antes de acceder a la aplicación
3. Los datos de ejemplo (bodegas, sucursales, monedas, materiales) se insertan automáticamente al ejecutar el script SQL

---

## Contacto

Para cualquier duda o problema, contactar a:

📧 **fvarasadaros@gmail.com**

