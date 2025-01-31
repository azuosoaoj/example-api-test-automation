import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const breedsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/breeds.json'), 'utf8'));

export function getRandomBreed() {
    const breeds = Object.keys(breedsData);
    const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
    return randomBreed;
}