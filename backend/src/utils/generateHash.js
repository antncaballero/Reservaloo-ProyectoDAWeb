import bcrypt from 'bcrypt';

async function generateHash() {
    const password = 'pass';
    const saltRounds = 10;
    
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Contraseña original:', password);
        console.log('Hash generado:', hash);
        console.log('\nPara verificar que funciona, puedes usar este hash en tu base de datos.');
        console.log('Cuando el usuario intente iniciar sesión con "pass", bcrypt.compare() funcionará correctamente.');
    } catch (error) {
        console.error('Error generando hash:', error);
    }
}

generateHash(); 