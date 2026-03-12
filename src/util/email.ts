// replace email template placeholders with actual values
export const replacePlaceholders = (template: string,  placeholders: Record<string, string>): string => {
    try {
      if (!template) {
        throw new Error("Template is required");
      }
      Object.entries(placeholders || {})?.forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, "g");
        template = template.replace(regex, value);
      });
      return template;
    } 
    catch (error) {
      throw error;
    }
};
