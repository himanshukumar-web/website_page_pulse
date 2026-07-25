const cheerio = require('cheerio');

const parseHtml = (html) => {
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim() || '';

  const metaDescription =
    $('meta[name="description"]').attr('content')?.trim() ||
    $('meta[property="og:description"]').attr('content')?.trim() ||
    '';

  const h1Count = $('h1').length;
  const totalImages = $('img').length;
  const missingAlt = $('img').filter((_, el) => {
    const alt = $(el).attr('alt');
    return alt === undefined || alt === null || !alt.trim();
  }).length;

  $('script, style, noscript, svg').remove();
  const bodyText = $('body').text() || '';
  const cleanText = bodyText.replace(/\s+/g, ' ').trim();
  const wordCount = cleanText ? cleanText.split(/\s+/).length : 0;

  return {
    title,
    metaDescription,
    h1Count,
    totalImages,
    missingAlt,
    wordCount,
  };
};

module.exports = parseHtml;
