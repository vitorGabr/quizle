import { prisma } from "@/lib/prisma-client";
import dayjs from "dayjs";

export async function getWord() {
  const date = dayjs().startOf("day").utcOffset(0, true);
  const data = await prisma.word.findUnique({
    where: {
      date: date.toISOString(),
    },
  });
  return data;
}
