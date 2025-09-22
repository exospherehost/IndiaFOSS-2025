import { BaseNode } from "exospherehost";
import { z } from "zod";
import fs from "fs";

export class CreatePromptAndImagesNode extends BaseNode {

    static Outputs = z.object({
        image_path: z.string(),
        prompt: z.string()
    })

    async execute() {
        // get all images from InputImages
        const base_path = "./InputImages"
        const images = fs.readdirSync(base_path)
        
        var outputs = [];

        const prompts = [
            "Edit the uploaded photo. Convert the people into modern astronauts in space. Keep their exact faces, skin tones, hairlines, and body proportions. Contemporary EVA suits with subtle paneling and soft reflections. Scene in low Earth orbit with planet rim and stars. Do not add any new people. No text, no logos, no branding, no exosphere. Maintain realism and a clean, shareable composition",
            "Edit the uploaded photo. Place the people inside a spacecraft observation deck looking out at planets, a nebula, and a couple of satellites. Preserve exact faces and body structure for each person. Do not add any new people. No text, no logos, no exosphere. Photoreal and social friendly.",
            "Edit the uploaded photo into a lunar surface walk at golden hour. Long shadows on regolith and Earth on the horizon. Keep every person's identity, age, gender, and build unchanged. Sleek dusted suits and clear visors. Make sure people face is visible properly. Do not add any new people. No text, no logos, no exosphere. High clarity and dramatic but realistic lighting.",
            "Edit the uploaded photo into a Mars habitat scene viewed through a panoramic window at dusk. Thin atmosphere haze outside, warm interior light inside. Preserve exact faces and proportions for all subjects. Do not add any new people. No text, no logos, no exosphere. Clean, modern, shareable look.",
            "Edit the uploaded photo into a satellite repair spacewalk. Tethers and instrument panels visible with aurora and Earth limb below. Reflective visors can show tools only, not new people. Preserve all faces and bodies precisely if visors are up. Do not add any new people. No text, no logos, no exosphere. Realistic materials and details.",
            "Edit the uploaded photo into an ISS cupola window scene at night. City lights and weather systems on Earth below. Keep exact facial geometry and body proportions. Soft blue rim light and high dynamic range. Do not add any new people. No text, no logos, no exosphere. Crisp, cinematic composition for social posts.",
            "Edit the uploaded photo into a spacecraft cockpit moment. Subtle heads up displays reflected in glass, modern minimal interface. Preserve identity for each person exactly. Do not add any new people. No text, no logos, no exosphere. Photoreal, high contrast, social ready.",
            "Edit the uploaded photo into a zero gravity cabin portrait. Subjects are gently floating with small objects drifting. Maintain exact faces, skin tones, and physiques. Soft LED cabin lighting. Do not add any new people. No text, no logos, no exosphere. Clean, modern, documentary vibe.",
            "Edit the uploaded photo into an asteroid belt EVA. Backlit rim light, a few rocks drifting at safe distance, starfield and subtle nebula. Keep all identities and body structures unchanged. Do not add any new people. No text, no logos, no exosphere. Realistic, dramatic, shareable framing.",
            "Edit the uploaded photo into a launch gantry preflight portrait. Preserve exact faces and proportions for everyone. Do not add any new people. No text, no logos, no exosphere. Cinematic depth and clarity aimed for social media."
        ];

        const generalInstructions = "General Instructions: just take people from the image not any other thing from background, face should be visible properly in all of these images, make sure image human body structure is proper, keep images very high defination, relaistic and optimized to social media"

        for (const image of images) {
            if (image === ".gitkeep")
                continue;

            const image_path = `${base_path}/${image}`;
            // appending to output array and prompt combination
            for (const prompt of prompts) {
                outputs.push({
                    image_path: image_path,
                    prompt: prompt + "\n" + generalInstructions
                })
            }
        }

        return outputs
    }
}
