# Project - Web Dev Trivia

:bulb: Users can test their knowledge by answering multiple-choice trivia questions across multiple categories

## Tech Stack

- NextJS
- Typescript
- Styled-Components
- MongoDb
- NextAuth.js

## Goals

- Answer random questions to test knowledge
- Ability to set questions by category
- Ability to select the number of questions
- Admin users able to import/export questions
- Full CRUD access for admin users (categories and questions)
- Open API endpoints to get question/question-set/categories etc.
- Trivia questions stored in a database
- Receive feedback if a question is incorrect

## Supported Type of Questions

- :grey_question: Multiple choice

## Properties of a Question

- question
- all answers
- correct answer
- type
- difficulty
- category
- author
- created-date
- modified-date
- id

## Properties of a Question Set

- category
- difficulty
- type
- number of questions
- results

## API Endpoints :globe_with_meridians:

**Random set of questions**

[https://web-dev-trivia.vercel.app/api/questions](https://web-dev-trivia.vercel.app/api/questions)

---

**Specific amount of questions**

[https://web-dev-trivia.vercel.app/api/questions?amount=6](https://web-dev-trivia.vercel.app/api/questions?amount=6)

---

**See available categories**

[https://web-dev-trivia.vercel.app/api/categories](https://web-dev-trivia.vercel.app/api/categories)

---

**Questions from specific category**

[https://web-dev-trivia.vercel.app/api/questions?category=git](https://web-dev-trivia.vercel.app/api/questions?category=git&amount=6)

---

**Specific amount of questions from specific category**

[https://web-dev-trivia.vercel.app/api/questions?category=git](https://web-dev-trivia.vercel.app/api/questions?category=git&amount=6)

[![web-dev-trivia](/images/posts/web-dev-trivia.PNG)](https://web-dev-trivia.vercel.app/)

[![web-dev-trivia](/images/posts/web-dev-trivia-admin.PNG)](https://web-dev-trivia.vercel.app/)
