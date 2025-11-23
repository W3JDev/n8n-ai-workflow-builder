import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const N8N_BASE_URL = process.env.N8N_BASE_URL;
    const N8N_API_KEY = process.env.N8N_API_KEY;

    // Generate N8N workflow using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert N8N workflow architect. Generate a valid N8N workflow JSON based on user descriptions.
          
Return ONLY valid JSON with this structure:
{
  "name": "Workflow Name",
  "nodes": [...],
  "connections": {...},
  "active": false,
  "settings": {}
}

Use common N8N nodes like: Webhook, HTTP Request, Set, Code, IF, Email, etc.`,
        },
        {
          role: 'user',
          content: `Create an N8N workflow: ${description}`,
        },
      ],
      temperature: 0.3,
    });

    const content = completion.choices[0].message.content || '{}';

    // Parse the JSON returned by the model
    const workflowJson = JSON.parse(content);

    // Create workflow in N8N
    const n8nResponse = await fetch(`${N8N_BASE_URL}/api/v1/workflows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': N8N_API_KEY || '',
      },
      body: JSON.stringify(workflowJson),
    });

    const n8nData = await n8nResponse.json();

    return NextResponse.json({
      success: true,
      workflow: n8nData,
      generated: workflowJson,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message ?? 'Unknown error' },
      { status: 500 },
    );
  }
}
