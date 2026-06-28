import type { APIRoute } from "astro";
import { createScreeningSubmission } from "../../lib/cms";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body?.fullName || !body?.email) {
      return new Response(
        JSON.stringify({ ok: false, error: "Name and email are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await createScreeningSubmission({
      fullName: String(body.fullName).slice(0, 200),
      email: String(body.email).slice(0, 200),
      age: body.age ? Number(body.age) : undefined,
      primaryGoal: body.primaryGoal,
      cardiacHistory: body.cardiacHistory,
      currentMedications: body.currentMedications,
      prRaynaudsOrPregnancy: body.prRaynaudsOrPregnancy,
      clearedByPhysician: body.clearedByPhysician,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[api/screening] insert failed:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Something went wrong submitting your request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
