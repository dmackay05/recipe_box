// ===== USDA FoodData Central lookup =====
// API key is entered in-app via the Settings sheet (gear icon) and stored
// in localStorage — no source file editing required.

const USDA_NUTRIENT_IDS = {
  calories: 1008, // Energy (kcal)
  protein: 1003,
  carbs: 1005,
  fat: 1004,
};

/**
 * Searches USDA FoodData Central and returns normalized per-100g macro data.
 * @param {string} query
 * @returns {Promise<Array<{description:string, fdcId:number, per100g:{calories:number,protein:number,carbs:number,fat:number}}>>}
 */
async function usdaSearchFoods(query){
  const apiKey = (typeof getUsdaKey === 'function') ? getUsdaKey() : '';
  if(!apiKey){
    throw new Error('USDA API key not set. Add it in Settings (⚙).');
  }
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(query)}&pageSize=15&dataType=Survey%20(FNDDS),SR%20Legacy,Foundation`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('USDA request failed: ' + res.status);
  const data = await res.json();
  const foods = data.foods || [];

  return foods.map(f=>{
    const per100g = {calories:0, protein:0, carbs:0, fat:0};
    (f.foodNutrients||[]).forEach(n=>{
      if(n.nutrientId === USDA_NUTRIENT_IDS.calories) per100g.calories = n.value||0;
      if(n.nutrientId === USDA_NUTRIENT_IDS.protein) per100g.protein = n.value||0;
      if(n.nutrientId === USDA_NUTRIENT_IDS.carbs) per100g.carbs = n.value||0;
      if(n.nutrientId === USDA_NUTRIENT_IDS.fat) per100g.fat = n.value||0;
    });
    return {
      description: f.description,
      fdcId: f.fdcId,
      per100g,
    };
  }).filter(f => f.per100g.calories > 0 || f.per100g.protein > 0); // drop empty entries
}
