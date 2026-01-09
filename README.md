![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Product Review Sentiment Analyzer API for Node.js

## ⭐ Analyze product review sentiment with AI — powered by SharpAPI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-product-review-sentiment.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-product-review-sentiment)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-product-review-sentiment.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Product Review Sentiment Analyzer** uses advanced AI to determine if product reviews are positive, negative, or neutral with confidence scores. Perfect for e-commerce platforms, review management, and customer feedback analysis.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Examples](#examples)
6. [License](#license)

---

## Requirements

- Node.js >= 16.x
- npm or yarn

---

## Installation

### Step 1. Install the package via npm:

```bash
npm install @sharpapi/sharpapi-node-product-review-sentiment
```

### Step 2. Get your API key

Visit [SharpAPI.com](https://sharpapi.com/) to get your API key.

---

## Usage

```javascript
const { SharpApiProductReviewSentimentService } = require('@sharpapi/sharpapi-node-product-review-sentiment');

const apiKey = process.env.SHARP_API_KEY; // Store your API key in environment variables
const service = new SharpApiProductReviewSentimentService(apiKey);

const review = `
This product exceeded my expectations! The quality is outstanding and delivery was fast.
I highly recommend it to anyone looking for a reliable solution.
`;

async function analyzeReview() {
  try {
    // Submit sentiment analysis job
    const statusUrl = await service.analyzeSentiment(review);
    console.log('Job submitted. Status URL:', statusUrl);

    // Fetch results (polls automatically until complete)
    const result = await service.fetchResults(statusUrl);
    const sentiment = result.getResultJson();

    console.log('Sentiment:', sentiment.opinion);
    console.log('Confidence:', sentiment.score + '%');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

analyzeReview();
```

---

## API Documentation

### Methods

#### `analyzeSentiment(reviewText: string): Promise<string>`

Analyzes the sentiment of a product review.

**Parameters:**
- `reviewText` (string, required): The review text to analyze

**Returns:**
- Promise<string>: Status URL for polling the job result

**Example:**
```javascript
const statusUrl = await service.analyzeSentiment(customerReview);
const result = await service.fetchResults(statusUrl);
```

### Response Format

The API returns sentiment classification with confidence score:

```json
{
  "opinion": "POSITIVE",
  "score": 95,
  "key_phrases": [
    "exceeded expectations",
    "outstanding quality",
    "highly recommend"
  ]
}
```

**Sentiment Values:**
- `POSITIVE`: Review expresses satisfaction or praise
- `NEGATIVE`: Review expresses dissatisfaction or criticism
- `NEUTRAL`: Review is balanced or factual without strong opinion

---

## Examples

### Basic Sentiment Analysis

```javascript
const { SharpApiProductReviewSentimentService } = require('@sharpapi/sharpapi-node-product-review-sentiment');

const service = new SharpApiProductReviewSentimentService(process.env.SHARP_API_KEY);

const review = 'The product broke after 2 days. Very disappointed with the quality.';

service.analyzeSentiment(review)
  .then(statusUrl => service.fetchResults(statusUrl))
  .then(result => {
    const sentiment = result.getResultJson();

    const emoji = sentiment.opinion === 'POSITIVE' ? '😊' :
                  sentiment.opinion === 'NEGATIVE' ? '😞' : '😐';

    console.log(`${emoji} Sentiment: ${sentiment.opinion} (${sentiment.score}% confidence)`);
  })
  .catch(error => console.error('Analysis failed:', error));
```

### Batch Review Analysis

```javascript
const service = new SharpApiProductReviewSentimentService(process.env.SHARP_API_KEY);

const reviews = [
  { id: 1, text: 'Amazing product! Love it.' },
  { id: 2, text: 'Not worth the money, poor quality.' },
  { id: 3, text: 'Good product, fast shipping.' },
  { id: 4, text: 'Terrible experience, would not buy again.' }
];

const analyzed = await Promise.all(
  reviews.map(async (review) => {
    const statusUrl = await service.analyzeSentiment(review.text);
    const result = await service.fetchResults(statusUrl);
    const sentiment = result.getResultJson();

    return {
      id: review.id,
      text: review.text,
      sentiment: sentiment.opinion,
      score: sentiment.score
    };
  })
);

const positive = analyzed.filter(r => r.sentiment === 'POSITIVE').length;
const negative = analyzed.filter(r => r.sentiment === 'NEGATIVE').length;

console.log(`Positive reviews: ${positive}/${analyzed.length}`);
console.log(`Negative reviews: ${negative}/${analyzed.length}`);
```

### Product Rating Dashboard

```javascript
const service = new SharpApiProductReviewSentimentService(process.env.SHARP_API_KEY);

async function analyzeProductReviews(productId, reviews) {
  const sentiments = await Promise.all(
    reviews.map(async (review) => {
      const statusUrl = await service.analyzeSentiment(review.text);
      const result = await service.fetchResults(statusUrl);
      return result.getResultJson();
    })
  );

  const positiveCount = sentiments.filter(s => s.opinion === 'POSITIVE').length;
  const negativeCount = sentiments.filter(s => s.opinion === 'NEGATIVE').length;
  const neutralCount = sentiments.filter(s => s.opinion === 'NEUTRAL').length;

  const avgScore = sentiments.reduce((sum, s) => sum + s.score, 0) / sentiments.length;

  return {
    productId,
    totalReviews: reviews.length,
    positive: positiveCount,
    negative: negativeCount,
    neutral: neutralCount,
    averageConfidence: Math.round(avgScore),
    overallSentiment: positiveCount > negativeCount ? 'POSITIVE' : 'NEGATIVE'
  };
}

const productReviews = [
  { text: 'Great quality, very satisfied!' },
  { text: 'Perfect for my needs.' },
  { text: 'Not as described, disappointed.' }
];

const dashboard = await analyzeProductReviews('PROD-123', productReviews);
console.log('Product Sentiment Dashboard:', dashboard);
```

---

## Use Cases

- **E-commerce Platforms**: Analyze customer reviews automatically
- **Review Moderation**: Flag negative reviews for quick response
- **Product Insights**: Understand customer satisfaction trends
- **Quality Control**: Identify products with declining sentiment
- **Marketing**: Highlight positive reviews in campaigns
- **Customer Support**: Prioritize responses to negative feedback
- **Competitive Analysis**: Compare sentiment across products

---

## Sentiment Detection

The analyzer evaluates multiple factors:

- **Language Patterns**: Positive vs negative word choices
- **Emotional Indicators**: Expressions of satisfaction or frustration
- **Rating Consistency**: Alignment with explicit ratings
- **Key Phrases**: Important phrases indicating sentiment
- **Context Understanding**: Industry-specific terminology
- **Sarcasm Detection**: Identifies ironic or sarcastic reviews

---

## API Endpoint

**POST** `/ecommerce/review_sentiment`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsa8)
- [Product Page](https://sharpapi.com/en/catalog/ai/e-commerce/product-review-sentiment-checker)

---

## Related Packages

- [@sharpapi/sharpapi-node-travel-review-sentiment](https://www.npmjs.com/package/@sharpapi/sharpapi-node-travel-review-sentiment) - Travel review sentiment
- [@sharpapi/sharpapi-node-detect-spam](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-spam) - Spam detection
- [@sharpapi/sharpapi-node-product-categories](https://www.npmjs.com/package/@sharpapi/sharpapi-node-product-categories) - Product categorization
- [@sharpapi/sharpapi-node-client](https://www.npmjs.com/package/@sharpapi/sharpapi-node-client) - Full SharpAPI SDK

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

---

## Support

- **Documentation**: [SharpAPI.com Documentation](https://sharpapi.com/documentation)
- **Issues**: [GitHub Issues](https://github.com/sharpapi/sharpapi-node-client/issues)
- **Email**: contact@sharpapi.com

---

**Powered by [SharpAPI](https://sharpapi.com/) - AI-Powered API Workflow Automation**
