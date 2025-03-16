import { pipeline } from '@xenova/transformers';

let generator = null;

async function loadModel() {
  if (!generator) {
    generator = await pipeline('text-generation', './adaptive_course_model');
  }
  return generator;
}

/**
 * Generate a personalized course outline from the given prompt.
 *
 * @param {string} prompt - The combined prompt including personality profile and course topic.
 * @returns {Promise<string>} - A promise that resolves to the generated course outline text.
 */
export async function generateCourse(prompt) {
  try {
    const gen = await loadModel();
    const output = await gen(prompt, { max_length: 300 });
    return output[0].generated_text;
  } catch (error) {
    console.error('Error in generateCourse:', error);
    throw error;
  }
}

/**
 * Adapt the given course outline based on assessment feedback.
 *
 * @param {string} courseOutline - The current course outline.
 * @param {Object} assessmentFeedback - An object containing feedback (e.g., remedial recommendations).
 * @returns {Promise<string>} - A promise that resolves to the updated course outline.
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
    console.error('Error in adaptCourse:', error);
    throw error;
  }
}