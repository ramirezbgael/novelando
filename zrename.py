import os

# Ruta de la carpeta con las fotos
carpeta = "public/photos/fuentes"

# Prefijo para los nuevos nombres
prefijo = "fuentes"

# Extensiones de imágenes que quieres renombrar
extensiones = [".jpg", ".jpeg", ".png", ".webp"]

# Iteramos sobre los archivos
contador = 1
for archivo in os.listdir(carpeta):
    nombre, extension = os.path.splitext(archivo)
    if extension.lower() in extensiones:
        nuevo_nombre = f"{prefijo}_{contador}{extension.lower()}"
        ruta_vieja = os.path.join(carpeta, archivo)
        ruta_nueva = os.path.join(carpeta, nuevo_nombre)
        os.rename(ruta_vieja, ruta_nueva)
        print(f"Renombrado: {archivo} → {nuevo_nombre}")
        contador += 1

print("✅ Renombrado completado.")
