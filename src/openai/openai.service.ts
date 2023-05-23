import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
  private url: string;
  private model: string;
  private temperature: number;
  private max_tokens: number;
  private top_p: number;
  private frequency_penalty: number;
  private presence_penalty: number;
  private apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.url = 'https://api.openai.com/v1';
    this.model = 'text-davinci-003';
    this.temperature = 0.9;
    this.max_tokens = 2048;
    this.top_p = 0;
    this.frequency_penalty = 0;
    this.presence_penalty = 0;
    this.apiKey = this.configService.get('OPENAI_API_KEY');
  }

  async generateResponse(text: string): Promise<string> {
    const path = `${this.url}/completions`;
    const response = await fetch(`${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        prompt: text,
        temperature: this.temperature,
        max_tokens: this.max_tokens,
        top_p: this.top_p,
        frequency_penalty: this.frequency_penalty,
        presence_penalty: this.presence_penalty,
      }),
    });
    try {
      const data = await response.json();
      return data.choices[0].text;
    } catch (error) {
      console.log(error);
      throw new Error('Error generating summary');
    }
  }
}
