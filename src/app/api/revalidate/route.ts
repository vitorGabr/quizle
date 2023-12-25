import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const authorization = headersList.get("Authorization");

  if (authorization === process.env.AUTHORIZATION) {
    revalidatePath("/");
    return Response.json({
      revalidated: true,
      now: Date.now(),
      message: "Revalidated /",
    });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}
