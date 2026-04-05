export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.CONTACT_SUBMISSIONS) {
    return Response.redirect(new URL("/contact.html?submitted=0", request.url), 302);
  }

  const formData = await request.formData();
  const website = String(formData.get("website") || "").trim();

  if (website) {
    return Response.redirect(new URL("/contact.html?submitted=1", request.url), 302);
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return Response.redirect(new URL("/contact.html?submitted=0", request.url), 302);
  }

  const submission = {
    name,
    email,
    message,
    source: "contact-form",
    submittedAt: new Date().toISOString(),
  };

  const key = `submission:${Date.now()}:${crypto.randomUUID()}`;

  await env.CONTACT_SUBMISSIONS.put(key, JSON.stringify(submission));

  return Response.redirect(new URL("/contact.html?submitted=1", request.url), 302);
}
