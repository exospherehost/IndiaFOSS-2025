import { StateManager } from "exospherehost";
import dotenv from "dotenv";

dotenv.config();

const stateManager = new StateManager(
    "IndiaFOSS-2025",
    {
        stateManagerUri: process.env.EXOSPHERE_STATE_MANAGER_URI,
        key: process.env.EXOSPHERE_KEY
    }
)

await stateManager.trigger(
    "IndiaFossImageGenerator",
    {},
    {},
    0
)

console.log(`Graph triggered!`)