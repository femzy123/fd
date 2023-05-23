import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';
import { ConfigService } from '@nestjs/config';

describe('OpenaiService', () => {
  let openaiService: OpenaiService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiService, ConfigService],
    }).compile();

    openaiService = module.get<OpenaiService>(OpenaiService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('OpenAI Response', () => {
    it('should generate a response from OpenAI', async () => {
      // Mock the required dependencies and HTTP request
      const mockApiKey = configService.get('OPENAI_API_KEY');
      const mockText = 'Hello, World!';
      const mockResponse = {
        choices: [{ text: 'Generated response' }],
      };
      const fetchMock = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
      jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

      // Set the mock API key in the ConfigService
      jest.spyOn(configService, 'get').mockReturnValueOnce(mockApiKey);

      // Call the generateResponse method
      const result = await openaiService.generateResponse(mockText);

      // Verify the HTTP request was made with the correct data
      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.openai.com/v1/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mockApiKey}`,
          },
          body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: mockText,
            temperature: 0.9,
            max_tokens: 2048,
            top_p: 0,
            frequency_penalty: 0,
            presence_penalty: 0,
          }),
        },
      );

      // Verify the response is as expected
      expect(result).toBe(mockResponse.choices[0].text);
    });

    it('should handle errors during API call', async () => {
      // Mock the required dependencies and HTTP request
      const mockError = `new Error('Error generating summary')`;
      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockRejectedValueOnce(mockError);

      try {
        // Call the generateResponse method
        await openaiService.generateResponse('Test text');
      } catch (error) {
        // Verify the error is thrown and matches the expected error
        expect(error).toBe(mockError);
      }

      fetchMock.mockRestore();
    });
  });
});
