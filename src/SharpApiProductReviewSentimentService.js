const { SharpApiCoreService, SharpApiJobTypeEnum } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for analyzing product review sentiment using SharpAPI.com
 */
class SharpApiProductReviewSentimentService extends SharpApiCoreService {
  /**
   * Creates a new SharpApiProductReviewSentimentService instance
   * @param {string} apiKey - Your SharpAPI API key
   * @param {string} [apiBaseUrl='https://sharpapi.com/api/v1'] - API base URL
   */
  constructor(apiKey, apiBaseUrl = 'https://sharpapi.com/api/v1') {
    super(apiKey, apiBaseUrl, '@sharpapi/sharpapi-node-product-review-sentiment/1.0.1');
  }

  /**
   * Parses the customer's product review and provides its sentiment (POSITIVE/NEGATIVE/NEUTRAL)
   * with a score between 0-100%. Great for sentiment report processing for any online store.
   *
   * @param {string} review
   * @returns {Promise<string>} - The status URL.
   */
  async productReviewSentiment(review) {
    const data = { content: review };
    const response = await this.makeRequest('POST', SharpApiJobTypeEnum.ECOMMERCE_REVIEW_SENTIMENT.url, data);
    return this.parseStatusUrl(response);
  }
}

module.exports = { SharpApiProductReviewSentimentService };