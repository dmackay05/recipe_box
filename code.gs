/**
 * Notebook — Recipe Box
 * Google Apps Script backend.
 *
 * Setup:
 * 1. Create a new Google Sheet.
 * 2. Extensions > Apps Script, paste this file in as Code.gs.
 * 3. Deploy > New deployment > type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone (needed for the app to reach it)
 * 4. Copy the /exec URL into the app's Sync sheet.
 *
 * Data model:
 * - One tab "Recipes" holds one row per recipe, with ingredients/steps as JSON.
 * - A "_data" tab holds the full raw JSON blob (source of truth for sync),
 *   chunked at 45,000 chars per cell to stay under Sheets' per-cell limit.
 *
 * Read-only sharing:
 * - Set OWNER_KEY below to any private string of your choosing (e.g. a random word).
 * - Your own app's Settings sheet must have that same value entered as the "Owner key"
 *   for Push to work. Anyone you share the /exec URL with, WITHOUT giving them the
 *   owner key, can only Pull (read) your recipes — any save/push attempt without the
 *   correct key is rejected by the server itself, regardless of what the client sends.
 * - Leave OWNER_KEY as an empty string to disable this protection (anyone with the
 *   URL can push, as in earlier versions of this script).
 */

const DATA_SHEET_NAME = '_data';
const RECIPES_SHEET_NAME = 'Recipes';
const CHUNK_SIZE = 45000;
const OWNER_KEY = 'kaosavenger05'; // <-- set this to a private string to protect Push; leave blank to disable

function doGet(e){
  const action = e.parameter.action;
  const callback = e.parameter.callback;

  if(action === 'load'){
    const json = loadDataJson();
    return respond(json, callback);
  }

  return respond({error: 'unknown action'}, callback);
}

function doPost(e){
  try{
    const payload = JSON.parse(e.parameter.payload);
    if(payload.action === 'save'){
      if(OWNER_KEY && payload.ownerKey !== OWNER_KEY){
        return ContentService.createTextOutput('error: not authorized to push (read-only access)');
      }
      saveDataJson(payload);
      rebuildRecipesTab(payload.recipes || []);
    }
    return ContentService.createTextOutput('ok');
  }catch(err){
    return ContentService.createTextOutput('error: ' + err.message);
  }
}

function respond(obj, callback){
  const json = JSON.stringify(obj);
  if(callback){
    return ContentService.createTextOutput(`${callback}(${json})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(name){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if(!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function saveDataJson(payload){
  const sheet = getOrCreateSheet(DATA_SHEET_NAME);
  sheet.clear();
  const json = JSON.stringify(payload);
  const chunks = [];
  for(let i=0; i<json.length; i += CHUNK_SIZE){
    chunks.push(json.slice(i, i + CHUNK_SIZE));
  }
  chunks.forEach((chunk, idx)=>{
    sheet.getRange(idx+1, 1).setValue(chunk);
  });
}

function loadDataJson(){
  const sheet = getOrCreateSheet(DATA_SHEET_NAME);
  const lastRow = sheet.getLastRow();
  if(lastRow === 0) return { recipes: [] };
  const values = sheet.getRange(1,1,lastRow,1).getValues();
  const json = values.map(r => r[0]).join('');
  try{
    return JSON.parse(json);
  }catch(e){
    return { recipes: [] };
  }
}

function rebuildRecipesTab(recipes){
  const sheet = getOrCreateSheet(RECIPES_SHEET_NAME);
  sheet.clear();
  const headers = ['ID','Title','Category','Servings','Prep Time','Cook Time','Equipment','Ingredients (JSON)','Steps (JSON)','Notes','Updated At'];
  sheet.appendRow(headers);
  recipes.forEach(r=>{
    sheet.appendRow([
      r.id || '',
      r.title || '',
      r.category || '',
      r.servings || '',
      r.prepTime || '',
      r.cookTime || '',
      r.equipment || '',
      JSON.stringify(r.ingredients||[]),
      JSON.stringify(r.steps||[]),
      r.notes || '',
      r.updatedAt ? new Date(r.updatedAt).toISOString() : '',
    ]);
  });
  if(recipes.length > 0){
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
}

