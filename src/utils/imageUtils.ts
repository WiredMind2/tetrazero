export const astronautImageCount = 1000;

export const getRandomAstronautImage = () => {
  const randomIndex = Math.floor(Math.random() * astronautImageCount) + 1;
  return `/astronauts/image_${randomIndex}.webp`;
};