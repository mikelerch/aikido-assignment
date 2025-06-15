import { serve } from '@hono/node-server'
import { OpenAI } from "openai";
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { z } from "zod";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = new Hono()

app.use(
    '*',
    cors({
        origin: ['http://localhost:7878'],
    })
)

app.post(
    '/php/backticks',
    zValidator(
        'json',
        z.object({
            code: z.string().min(1),
        })
    ),
    async (c) => {
        const { code } = await c.req.json();
        const response = await client.responses.create({
            model: 'gpt-4o',
            instructions: `
                You are a security expert.
                Your task is to remove all backticks used for shell execution in PHP code to prevent
                remote code execution (RCE) vulnerabilities.
                Preserve the original functionality of the code as much as possible.
                Replace backtick usage with safer, standard alternatives, ensuring secure coding practices are followed.
                Respond with ONLY the code. Do not include any formatting, explanation, or markdown.
                Do not remove comments from the code.
            `,
            input: code,
        });

        return c.text(response.output_text)
    })

serve({
    fetch: app.fetch,
    port: 7879,
})