// app/api/prediction/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const prompt = formData.get('prompt');

    if (!file || !prompt) {
      return NextResponse.json({ error: 'Missing file or prompt' }, { status: 400 });
    }

    const proxyForm = new FormData();
    proxyForm.append('file', file, file.name);
    proxyForm.append('prompt', prompt);

    const response = await fetch("https://p-fyp-service-34fe7.vercel.app/api/predict-export", {
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYWl6YW4iLCJpYXQiOjE3NTI1NTYyMDUsImV4cCI6MTc1Nzk3NzIwMH0.fpTADkmw-qcW9kggPpS8kTVqBU8lZvCZ2Im-PGC-pTk"
      },
      body: proxyForm
    });

    const result = await response.text();

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
