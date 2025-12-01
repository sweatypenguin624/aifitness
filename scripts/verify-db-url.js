const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const dbUrlLine = envContent.split('\n').find(line => line.startsWith('DATABASE_URL='));

    if (!dbUrlLine) {
        console.log('❌ DATABASE_URL not found in .env');
        process.exit(1);
    }

    const url = dbUrlLine.split('=')[1].replace(/"/g, '').trim();

    // Check if it has a database name
    // Format should be: ...mongodb.net/DATABASE_NAME?options...
    // We look for a slash followed by text, not immediately followed by ? or end of string

    const hasDbName = /mongodb(\+srv)?:\/\/[^\/]+\/[^?]+/.test(url);
    const isMissingDbName = /mongodb(\+srv)?:\/\/[^\/]+\/(\?|$)/.test(url);

    if (isMissingDbName) {
        console.log('❌ DATABASE_URL is missing the database name!');
        console.log('Current format looks like: ...mongodb.net/?...');
        console.log('It should be: ...mongodb.net/YOUR_DB_NAME?...');
    } else if (hasDbName) {
        console.log('✅ DATABASE_URL format looks correct (contains database name).');
        // Print a masked version to be sure
        const masked = url.replace(/:([^@]+)@/, ':****@');
        console.log(`Read URL: ${masked}`);
    } else {
        console.log('⚠️ Could not determine format. Please check manually.');
        const masked = url.replace(/:([^@]+)@/, ':****@');
        console.log(`Read URL: ${masked}`);
    }

} catch (err) {
    console.error('Error reading .env:', err.message);
}
