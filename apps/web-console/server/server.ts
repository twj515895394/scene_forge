import express from 'express';
import { engineVersion } from '@scene-forge/engine';

const app = express();
console.log(`Starting Web Console Server (Engine v${engineVersion})...`);
