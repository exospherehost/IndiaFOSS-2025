import { Runtime } from "exospherehost";
import { CreatePromptAndImagesNode } from "./nodes/createPromptAndImages.js";
import { GenerateImageNode } from "./nodes/generateImage.js";
import dotenv from "dotenv";

dotenv.config();

const runtime = new Runtime(
    "IndiaFOSS-2025",
    "main_runtime_0",
    [
        CreatePromptAndImagesNode,
        GenerateImageNode
    ],
    {
        stateManagerUri: process.env.EXOSPHERE_STATE_MANAGER_URI,
        key: process.env.EXOSPHERE_KEY
    }
)

runtime.start()