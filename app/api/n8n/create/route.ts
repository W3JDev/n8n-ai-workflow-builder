import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    const N8N_BASE_URL = process.env.N8N_BASE_URL;
    const N8N_API_KEY = process.env.N8N_API_KEY;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    // Validate environment variables
    if (!N8N_BASE_URL || !N8N_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'N8N configuration missing' },
        { status: 500 },
      );
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key missing' },
        { status: 500 },
      );
    }

    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

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
    let workflowJson;
    try {
      workflowJson = JSON.parse(content);
    } catch (parseError) {
      return NextResponse.json(
        { success: false, error: 'Failed to parse OpenAI response as JSON' },
        { status: 500 },
      );
    }

    // Create workflow in N8N
    const n8nResponse = await fetch(`${N8N_BASE_URL}/api/v1/workflows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': N8N_API_KEY,
      },
      body: JSON.stringify(workflowJson),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      return NextResponse.json(
        { success: false, error: `N8N API error: ${errorText}` },
        { status: n8nResponse.status },
      );
    }

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
