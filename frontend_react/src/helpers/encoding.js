import bcrypt from 'bcryptjs'; // Importa bcryptjs

// Función para cifrar el rol
export function cifrar(rol) {
  const salt = bcrypt.genSaltSync(10); // Genera una sal aleatoria
  const hash = bcrypt.hashSync(rol, salt); // Aplica el hash al rol
  return hash;
}

// Función para descifrar el rol
export function descifrar(rolCifrado, rolOriginal) {
  return bcrypt.compareSync(rolOriginal, rolCifrado); // Compara el rol original con el cifrado
}