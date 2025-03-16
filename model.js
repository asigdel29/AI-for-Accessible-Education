// model.js

import { pipeline } from '@xenova/transformers';

// Global variable to cache the generator pipeline.
let generator = null;

/**
 * Asynchronously load the text generation model from your local model directory.
 * 
 * This version uses a model identifier "local-model" and sets a baseUrl to point to the files in your public folder.
 * Ensure that TRANSFORMERS_OFFLINE=1 is set (e.g., in .env.local) so that the library does not try to reach out to Hugging Face.
 */
async function loadModel() {
  if (!generator) {
    let baseUrl;
    if (typeof window !== "undefined") {
      baseUrl = window.location.origin + "/local-model";
    } else {
      baseUrl = "./local-model";
    }
    generator = await pipeline("text-generation", "local-model", {
      localFilesOnly: true,
      baseUrl: baseUrl
    });    
  }
  return generator;
}

/**
 * Generate a personalized course outline from the given prompt.
 *
 * @param {string} prompt - The prompt that includes personality profile and course topic.
 * @returns {Promise<string>} - The generated course outline.
 */
export async function generateCourse(prompt) {
  try {
    const gen = await loadModel();
    const output = await gen(prompt, { max_length: 300 });
    return output[0].generated_text;
  } catch (error) {
    console.error("Error in generateCourse:", error);
    throw error;
  }
}

/**
 * Adapt the course outline based on assessment feedback.
 *
 * @param {string} courseOutline - The current course outline.
 * @param {Object} assessmentFeedback - Feedback for adaptation.
 * @returns {Promise<string>} - The updated course outline.
 */
export async function adaptCourse(courseOutline, assessmentFeedback) {
  try {
    const feedbackStr = JSON.stringify(assessmentFeedback);
    const newPrompt = `${courseOutline}

Assessment Feedback: ${feedbackStr}

Please update the course outline to include remedial lessons and extra quizzes where needed:
`;
    const gen = await loadModel();
    const output = await gen(newPrompt, { max_length: 300 });
    return output[0].generated_text;
  } catch (error) {
    console.error("Error in adaptCourse:", error);
    throw error;
  }
}
