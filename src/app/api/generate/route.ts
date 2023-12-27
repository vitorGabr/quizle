import { supabase } from "@/lib/supabase";
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
        "Gere sete palavras para um jogo no estilo Wordle com os temas nerd, programação e geek. Separe as palavras por vírgulas, apenas em uma única string",
      max_tokens: 1,
    });
    const words = gptResponse.choices[0].text
      .replace(/ /g, "")
      .split(",")
      .map((word, index) => {
        const date = new Date(data?.date);
        date.setDate(date.getDate() + index + 1);
        const formattedDate = date.toISOString().split("T")[0];
        return { word, date: formattedDate };
      });
    const { error } = await supabase.from("words").insert(words);
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
