import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { OpenAI } from "openai";

export async function GET() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });

  try {
    const { data } = await supabase
      .from("words")
      .select("date")
      .order("date", { ascending: false })
      .limit(1)
      .single();

    const gptResponse = await openai.completions.create({
      model: "text-davinci-002",
      prompt:
        "Gere sete palavras para um jogo no estilo Wordle com os temas nerd, programação e geek. Palavras: Código, Byte, Algoritmo, Console, Hackathon, Geek, Framework. Separe as palavras por vírgulas.",
      max_tokens: 1,
    });
    const words = gptResponse.choices[0].text
      .replace(/ /g, "")
      .split(",")
      .map((word, index) => {
        const date = dayjs(data?.date)
          .add(index + 1, "day")
          .format("YYYY-MM-DD");
        return { word, date };
      });
    const { error } = await supabase.from("words").insert(words);
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
