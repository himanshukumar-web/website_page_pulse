/**
 * Calculates a 0–100 SEO score from the analysis report.
 *
 * Scoring breakdown:
 *   - Title exists:          15 pts
 *   - Meta description:      15 pts
 *   - Exactly 1 H1:          20 pts
 *   - All images have alt:   20 pts
 *   - Word count > 300:      15 pts
 *   - Fast response (<1s):   15 pts
 *   Total:                  100 pts
 */
const calculateSeoScore = (data) => {
  if (!data) return 0;

  let score = 0;

  // Title
  if (data.title && data.title.trim().length > 0) score += 15;

  // Meta description
  if (data.metaDescription && data.metaDescription.trim().length > 0) score += 15;

  // H1 count — exactly 1 is ideal
  if (data.h1Count === 1) {
    score += 20;
  } else if (data.h1Count > 1) {
    score += 8; // Partial credit
  }

  // Image alt coverage
  if (data.totalImages === 0) {
    score += 20; // No images, no penalty
  } else if (data.missingAlt === 0) {
    score += 20;
  } else {
    const coverage = (data.totalImages - data.missingAlt) / data.totalImages;
    score += Math.round(coverage * 20);
  }

  // Word count
  if (data.wordCount >= 300) {
    score += 15;
  } else if (data.wordCount >= 100) {
    score += 8;
  }

  // Response time
  if (data.responseTime < 1000) {
    score += 15;
  } else if (data.responseTime < 3000) {
    score += 8;
  }

  return Math.min(score, 100);
};

export default calculateSeoScore;
