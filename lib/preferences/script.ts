import { DEFAULT_PREFERENCES, PREFERENCE_OPTIONS, PREFERENCES_STORAGE_KEY } from "./options";

/**
 * Inline script executed in <head> before first paint so stored preferences
 * (theme, density, accent…) apply without a flash of default styling.
 * Mirrors `sanitizePreferences` + `applyPreferences`; keep them in sync.
 */
export const preferencesScript = `(function(){try{
var o=${JSON.stringify(PREFERENCE_OPTIONS)},p=${JSON.stringify(DEFAULT_PREFERENCES)},s={};
try{s=JSON.parse(localStorage.getItem(${JSON.stringify(PREFERENCES_STORAGE_KEY)})||"{}")||{}}catch(e){}
for(var k in o){if(o[k].indexOf(s[k])>-1)p[k]=s[k]}
var t=p.theme==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):p.theme;
var r=document.documentElement,d=r.dataset;
d.theme=t;d.style=p.style;d.density=p.density;d.radius=p.radius;d.accent=p.accent;d.motion=p.motion;
r.style.colorScheme=t;
}catch(e){}})();`;
