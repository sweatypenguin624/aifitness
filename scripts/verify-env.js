const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');

    const requiredKeys = [
        'DATABASE_URL',
        'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
        'CLERK_SECRET_KEY',
        'GROQ_API_KEY'
    ];

    console.log('Checking .env for required keys...');

    requiredKeys.forEach(key => {
        const found = lines.find(line => line.startsWith(`${key}=`));
        if (found) {
            const value = found.split('=')[1].trim();
            if (value && value.length > 0) {
                console.log(`✅ ${key} is present.`);
            } else {
                console.log(`❌ ${key} is present but EMPTY.`);
            }
        } else {
            console.log(`❌ ${key} is MISSING.`);
        }
    });

} catch (err) {
    console.error('Error reading .env:', err.message);
}
