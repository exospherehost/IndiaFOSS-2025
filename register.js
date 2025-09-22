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

const graphNodes = [
    {
        node_name: "CreatePromptAndImagesNode",
        namespace: "IndiaFOSS-2025",
        identifier: "CreatePromptAndImagesNode",
        next_nodes: ["GenerateImageNode"],
        inputs: {}
    },
    {
        node_name: "GenerateImageNode",
        namespace: "IndiaFOSS-2025",
        identifier: "GenerateImageNode",
        inputs: {
            "image_path": "${{ CreatePromptAndImagesNode.outputs.image_path }}",
            "prompt": "${{ CreatePromptAndImagesNode.outputs.prompt }}"
        }
    }
]

const result = await stateManager.upsertGraph(
    "IndiaFossImageGenerator",
    graphNodes,
    {}
)
console.log(`Graph registered!`)