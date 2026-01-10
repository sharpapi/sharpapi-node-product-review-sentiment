![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Product Review Sentiment Checker API for Node.js

## ⭐ Analyze product review sentiment — powered by SharpAPI AI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-product-review-sentiment.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-product-review-sentiment)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-product-review-sentiment.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Product Review Sentiment** analyzes customer reviews to determine sentiment (positive, negative, neutral). Helps businesses understand customer satisfaction and identify issues quickly.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Examples](#examples)
6. [Use Cases](#use-cases)
7. [API Endpoint](#api-endpoint)
8. [Related Packages](#related-packages)
9. [License](#license)

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

const review = 'This product exceeded my expectations! Great quality and fast shipping.';

async function processText() {
  try {
    // Submit processing job
    const statusUrl = await service.analyzeReviewSentiment(review);
    console.log('Job submitted. Status URL:', statusUrl);

    // Fetch results (polls automatically until complete)
    const result = await service.fetchResults(statusUrl);
    console.log('Result:', result.getResultJson());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

processText();
```

---

## API Documentation

### Methods

The service provides methods for processing content asynchronously. All methods return a status URL for polling results.

**Parameters:**
- `content` (string, required): The content to process
- `language` (string, optional): Output language
- `voice_tone` (string, optional): Desired tone (e.g., professional, casual)
- `context` (string, optional): Additional context for better results

For complete API specifications, see the [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsa8).

### Response Format

The API returns structured JSON data. Response format varies by endpoint - see documentation for details.

---

## Examples

### Basic Example

```javascript
const { SharpApiProductReviewSentimentService } = require('@sharpapi/sharpapi-node-product-review-sentiment');

const service = new SharpApiProductReviewSentimentService(process.env.SHARP_API_KEY);

// Customize polling behavior if needed
service.setApiJobStatusPollingInterval(10);  // Poll every 10 seconds
service.setApiJobStatusPollingWait(180);     // Wait up to 3 minutes

// Use the service
// ... (implementation depends on specific service)
```

For more examples, visit the [Product Page](https://sharpapi.com/en/catalog/ai/e-commerce/product-review-sentiment-checker).

---

## Use Cases

- **Customer Feedback**: Quickly identify positive and negative reviews
- **Quality Control**: Spot product issues from review sentiment
- **Review Moderation**: Prioritize addressing negative feedback
- **Competitive Analysis**: Analyze competitor product sentiments
- **Product Development**: Use sentiment data to guide improvements
- **Marketing Insights**: Identify what customers love about products

---

## API Endpoint

**POST** `/ecommerce/review_sentiment`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsa8)
- [Product Page](https://sharpapi.com/en/catalog/ai/e-commerce/product-review-sentiment-checker)

---

## Related Packages

- [@sharpapi/sharpapi-node-travel-review-sentiment](https://www.npmjs.com/package/@sharpapi/sharpapi-node-travel-review-sentiment)
- [@sharpapi/sharpapi-node-product-categories](https://www.npmjs.com/package/@sharpapi/sharpapi-node-product-categories)
- [@sharpapi/sharpapi-node-detect-spam](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-spam)

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
