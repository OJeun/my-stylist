import Configuration from "openai";
import OpenAI from "openai";
import { Cloth, getAllClothesByTypesAndSeasons } from "../database/clothes";

import {
  convertSeasonIdsToSeasons,
  convertTypeIdsToCategories,
  convertTypeIdToCategory,
} from "../utils/convertId";
import 'dotenv/config';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export const aiRecommendation = async (
  userId: string,
  selectedItem: Cloth,
  selectedCategoryCheckbox: number[]
): Promise<number[] | undefined> => {
  const seasonsStr = convertSeasonIdsToSeasons(selectedItem.season);
  const toBeMatchedtypesStr = convertTypeIdsToCategories(
    selectedCategoryCheckbox
  );
  const selectedCategoryStr = convertTypeIdToCategory(selectedItem.typeId);
  const clothesByTypeAndSeasons = getAllClothesByTypesAndSeasons(
    userId,
    selectedCategoryCheckbox,
    selectedItem.season
  );
  try {
    const prompt = `
    You are given the following details:
    1. Selected cloth description: ${selectedItem.description}
    2. Selected cloth type: ${selectedCategoryStr}
    3. Preferred seasons: ${seasonsStr}
    
    Additionally, the user has chosen to match this cloth with the following categories: ${toBeMatchedtypesStr}.
    
    From the list below, select the cloth that best matches the above criteria. Each item is represented by its ID and description:
    
    ${(await clothesByTypeAndSeasons)
      .map((item) => `${item.clothId}. ${item.description}`)
      .join("\n")}
    
    Return only the clothId(s) as an array of integers. For example, if the best-matched clothes have IDs 5 and 10, return [5, 10]. 
    Ensure that the response is formatted as a plain JSON array with no additional text.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const recommendationText = response.choices[0].message?.content;

    console.log("Recommendation:", recommendationText);
    const clothIds: number[] = JSON.parse(recommendationText || "[]");

    return clothIds;
    
  } catch (error) {
    console.error("Error with OpenAI API:", error);
  }
};

// {
//     "id": "chatcmpl-123",
//     "object": "chat.completion",
//     "created": 1677652288,
//     "model": "gpt-4o-mini",
//     "system_fingerprint": "fp_44709d6fcb",
//     "choices": [{
//       "index": 0,
//       "message": {
//         "role": "assistant",
//         "content": "\n\nHello there, how may I assist you today?",
//       },
//       "logprobs": null,
//       "finish_reason": "stop"
//     }],
//     "usage": {
//       "prompt_tokens": 9,
//       "completion_tokens": 12,
//       "total_tokens": 21
//     }
//   }
