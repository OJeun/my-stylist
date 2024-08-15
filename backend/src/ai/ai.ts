import Configuration from 'openai';
import OpenAI from 'openai';
import { Cloth, getAllClothesByTypesAndSeasons } from '../database/clothes'
import { ClosetItem } from '../database/favorite';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAI({
    apiKey: configuration.apiKey
});

export const aiRecommendation = async (userId: string, selectedItem: ClosetItem, selectedCategoryCheckbox: number[]) => {

    const clothesByTypeAndSeasons = getAllClothesByTypesAndSeasons(userId, selectedCategoryCheckbox, selectedItem.seasonIds)
    try {
        const prompt = `
            This is a cloth description, cloth type, and seasons that a user want to get matched: ${selectedItem.description}, ${selectedItem.category}, and ${selectedItem.seasonIds}
            Based on the information, recommend some items that match the selected cloth type: ${selectedItem.category}.

            Cloth Descriptions:
            ${(await clothesByTypeAndSeasons).map((item) => `${item.clothId}. ${item.description}`).join('\n')}

            Return the item clothIds 
        `;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
        });

        const recommendation = response.choices[0].message?.content;
        
        return recommendation

    } catch (error) {
        console.error('Error with OpenAI API:', error);
    }
}

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
  