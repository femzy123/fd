import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/summaries (POST) - should create a new summary', async () => {
    const highlight = 'Lorem ipsum';
    const summary = 'Summary';

    const response = await request(app.getHttpServer())
      .post('/summaries')
      .send({ highlightedText: highlight, summary })
      .expect(201);

    const createdSummary = response.body;
    expect(createdSummary.highlightedText).toEqual(highlight);
    expect(createdSummary.summary).toEqual(summary);
    expect(createdSummary._id).toBeDefined();
  });

  it('/summaries (GET) - should list all summaries', async () => {
    const response = await request(app.getHttpServer())
      .get('/summaries')
      .expect(200);

    const listedSummaries = response.body;
    expect(Array.isArray(listedSummaries)).toBe(true);

    for (const summary of listedSummaries) {
      expect(summary).toEqual(
        expect.objectContaining({
          highlightedText: expect.any(String),
          summary: expect.any(String),
        }),
      );
    }
  });

  it('/summaries/:id (PATCH) - should update a summary', async () => {
    const highlight = 'Updated highlight';
    const summary = 'Updated summary';

    const createResponse = await request(app.getHttpServer())
      .post('/summaries')
      .send({ highlightedText: 'Lorem ipsum', summary })
      .expect(201);

    const createdSummary = createResponse.body;

    const updateResponse = await request(app.getHttpServer())
      .patch(`/summaries/${createdSummary._id}`)
      .send({ highlightedText: highlight })
      .expect(200);

    const updatedSummary = updateResponse.body;

    expect(updatedSummary.highlightedText).toEqual(highlight);
    expect(updatedSummary.summary).toEqual(summary);
  });

  it('/summaries/:id (DELETE) - should delete a summary', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/summaries')
      .send({ highlightedText: 'Lorem ipsum', summary: 'Summary' })
      .expect(201);

    const createdSummary = createResponse.body;

    await request(app.getHttpServer())
      .delete(`/summaries/${createdSummary._id}`)
      .expect(200);

    const getResponse = await request(app.getHttpServer())
      .get(`/summaries/${createdSummary._id}`)
      .expect(404);
  });
});
