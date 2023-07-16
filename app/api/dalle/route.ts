import {Configuration, OpenAIApi} from "openai";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openAI = new OpenAIApi(config);

export const POST = async (req: Request) => {

    try {
        const {prompt} = await req.json();

        const response = await openAI.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        })

        const image = response.data.data[0].b64_json;
        return new Response(JSON.stringify({photo: image}), {status: 200});
    } catch (e: any) {
        console.log(e.message);
        return new Response(e?.response.data.error.message, {status: 500})
    }
}