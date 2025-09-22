import { BaseNode } from "exospherehost";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import crypto from "node:crypto";
import dotenv from "dotenv";

dotenv.config()

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

export class GenerateImageNode extends BaseNode {

    static Inputs = z.object({
        image_path: z.string(),
        prompt: z.string()
    })

    static Outputs = z.object({
        output_path: z.string()
    })

    async execute() {
        const { image_path, prompt } = this.inputs

        const res = await ai.models.generateContent({
            model: "gemini-2.5-flash-image-preview",
            contents: [{
                parts: [
                    { text: prompt },
                    { inlineData: { mimeType: "image/png", data: fs.readFileSync(image_path).toString("base64") } }
                ]
            }]
        })
        
        const uuid = crypto.randomUUID();
        const output_path = `./OutputImages/${uuid}.png`

        for (const part of res.candidates[0].content.parts) {
            if (part.inlineData) {
              const buf = Buffer.from(part.inlineData.data, "base64");
              fs.writeFileSync(output_path, buf);
            }
        }

        return {
            output_path: output_path
        }
    }

}