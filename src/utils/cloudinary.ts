/**
 * Cloudinary Utilities for automatic image & video optimization.
 */

// Basic cloudinary URL regex checking
const CLOUDINARY_REGEX = /^https?:\/\/res\.cloudinary\.com\/(.+?)\/(image|video)\/upload\/(v\d+\/)?(.+)$/;

export const optimizeCloudinaryUrl = (
  url: string, 
  options: { width?: number; quality?: string | number, format?: string } = {}
) => {
  if (!url || !CLOUDINARY_REGEX.test(url)) return url;

  const match = url.match(CLOUDINARY_REGEX);
  if (!match) return url;

  const [_, cloudName, resourceType, version = '', publicIdWithTransformation] = match;

  // Set default optimizations
  const { width = 'auto', quality = 'auto', format = 'auto' } = options;
  
  // Construct new transformation string
  const transformations = [];
  if (format) transformations.push(`f_${format}`);
  if (quality) transformations.push(`q_${quality}`);
  if (width && width !== 'auto') transformations.push(`w_${width}`);

  const transformStr = transformations.length > 0 ? transformations.join(',') + '/' : '';

  // Extract publicId by removing existing transformations from what matched (if it matched like f_auto,q_auto/v123x)
  // Usually the structure is either an un-transformed url or already manually transformed.
  // A perfect extraction might be complex, so we simply replace "upload/" with "upload/transformations/" if the URL is clean.
  
  // Actually, we can reconstruct:
  let finalPublicId = publicIdWithTransformation;
  // If there's an existing transformation chunk (e.g. f_auto,q_auto,w_auto/), strip it.
  const transformParamRegex = /^([a-z]_[^/]+,)*[a-z]_[^/]+\//;
  if (transformParamRegex.test(finalPublicId)) {
    finalPublicId = finalPublicId.replace(transformParamRegex, '');
  }

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${transformStr}${version}${finalPublicId}`;
};

export const getVideoPoster = (videoUrl: string) => {
  if (!videoUrl || !CLOUDINARY_REGEX.test(videoUrl)) return '';
  const urlParts = videoUrl.split('.');
  urlParts[urlParts.length - 1] = 'jpg';
  // Use optimization to get a lightweight poster image
  return optimizeCloudinaryUrl(urlParts.join('.'), { quality: 'auto', format: 'auto' });
};
