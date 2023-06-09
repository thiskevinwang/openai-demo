import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// https://nextjs.org/docs/app/building-your-application/routing/router-handlers
/**
 *
 * @param {Request} request
 * @returns
 */
export async function POST(request) {
  console.log("POST /api/generate");
  if (!configuration.apiKey) {
    console.log("API KEY ERROR");
    return NextResponse.json(
      {
        error: {
          message:
            "OpenAI API key not configured, please follow instructions in README.md",
        },
      },
      { status: 500 }
    );
  }
  console.log("API KEY OK");

  const body = await request.json();
  console.log("body is", body);
  console.log("typeof body is", typeof body);
  const prompt = body.prompt || "";
  console.log("prompt is", prompt);
  if (prompt.trim().length === 0) {
    return NextResponse.json(
      { error: { message: "Please enter a valid prompt" } },
      {
        status: 400,
      }
    );
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      // Probably don't do this.
      // This is prone to prompt injection, if that's even a thing.
      prompt: prompt,
      temperature: 0.2,
      max_tokens: 50,
    });
    console.log(completion.data);
    return NextResponse.json(
      { result: completion.data.choices[0].text },
      { status: 200 }
    );
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json(
        {
          error: {
            message: "An error occurred during your request.",
          },
        },
        { status: 500 }
      );
    }
  }
}
