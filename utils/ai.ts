// Mock AI caption generation for the hackathon
// In a real implementation, this would call an AI API

export const generateCaption = async (photoUri: string): Promise<string> => {
  try {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Mock captions for demo purposes
    const captions = [
      "Capturing this moment for sui network",
      "Evidence preserved in walrus",
      "A moment frozen in sui blockchain",
      "Sui sui sui!💧",
      "🌊",
      "Sui Snap 📸",
      "Sui Snap, Snap Snap 😜",
    ];

    return captions[Math.floor(Math.random() * captions.length)];
  } catch (error) {
    console.error("Error generating caption:", error);
    return "Add your caption here";
  }
};

export const generateHashtags = async (caption: string): Promise<string[]> => {
  try {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock hashtags for demo purposes
    const allHashtags = [
      "#SnapProof",
      "#verified",
      "#blockchain",
      "#sui",
      "#walrus",
      "#SuiNetwork",
      "#tusky",
      "#decentralized",
      "#SuiSnap",
      "#travel"
    ];

    // Select 3-5 random hashtags
    const count = 3 + Math.floor(Math.random() * 3);
    const shuffled = [...allHashtags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error("Error generating hashtags:", error);
    return ["#SnapProof"];
  }
};
