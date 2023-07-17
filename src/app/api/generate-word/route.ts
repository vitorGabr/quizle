import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
 
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
 
export async function GET() {
 
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    temperature: 0.6,
    prompt: `Me gere uma palavra de 4 letras sobre tecnologia`,
  })

 
  return NextResponse.json({
    response: response.data
  })
}