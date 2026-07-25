const generateReport = (fetchResult, parseResult) => {
  return {
    url: fetchResult.finalUrl,
    status: fetchResult.statusCode,
    responseTime: fetchResult.responseTime,
    contentType: fetchResult.contentType,
    title: parseResult.title,
    metaDescription: parseResult.metaDescription,
    h1Count: parseResult.h1Count,
    totalImages: parseResult.totalImages,
    missingAlt: parseResult.missingAlt,
    wordCount: parseResult.wordCount,
  };
};

module.exports = generateReport;
