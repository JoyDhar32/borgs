// src/app/submit/route.js
export async function POST(req) {
  const data = await req.json();

  const res = await fetch(
    "https://defaultff6276d2b9b246c2b60f7ceaa0e075.02.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/f3e54784e41c47408545b44ff3c70114/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7CXjKA2fmmtpY4onCnH2V3NwB4xKkpw5Kv120MglV38",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        fileName: data.fileName,
        fileContent: data.fileContent,
      }),
    }
  );

  return new Response("OK", { status: res.ok ? 200 : 500 });
}
