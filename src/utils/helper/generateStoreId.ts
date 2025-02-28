export const generateStoreID = (storeName: string): string => {
  
    const cleanedName = storeName.trim().toLowerCase().replace(/\s+/g, "");
  
 
    const timestamp = Date.now().toString().slice(-4);
  
  
    return `${cleanedName}${timestamp}`;
  };
  
