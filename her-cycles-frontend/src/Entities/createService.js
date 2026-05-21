// src/Entities/createService.js
function ensureISODate(value) {
    if (!value) return null;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  
  function applyDefaults(obj, schema) {
    if (!schema?.properties) return obj;
    const out = { ...obj };
    for (const [key, prop] of Object.entries(schema.properties)) {
      if (out[key] === undefined && prop?.default !== undefined) {
        out[key] = prop.default;
      }
    }
    return out;
  }
  
  function basicValidate(obj, schema) {
    // Minimal: check required and enum; skip full JSON Schema for brevity
    const errors = [];
    if (schema?.required?.length) {
      for (const key of schema.required) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
          errors.push(`Missing required field: ${key}`);
        }
      }
    }
    if (schema?.properties) {
      for (const [key, prop] of Object.entries(schema.properties)) {
        const val = obj[key];
        if (val === undefined || val === null) continue;
        if (prop.enum && !prop.enum.includes(val)) {
          errors.push(`Invalid value for ${key}; expected one of: ${prop.enum.join(", ")}`);
        }
        if (prop.format === "date") {
          const iso = ensureISODate(val);
          if (!iso) errors.push(`Invalid date format for ${key}`);
        }
      }
    }
    if (errors.length) {
      const err = new Error(errors.join("; "));
      err.details = errors;
      throw err;
    }
  }
  
  export default function createService(entityName, schema, { storageKey, seed = [] } = {}) {
    const STORAGE_KEY = storageKey || `hc_${entityName.toLowerCase()}s`;
  
    function read() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    }
  
    function write(items) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  
    // Seed once if empty
    (function seedIfEmpty() {
      const items = read();
      if (items.length || seed.length === 0) return;
      write(seed.map((x) => ({ id: crypto.randomUUID(), ...x })));
    })();
  
    return {
      async list(sort) {
        let items = read();
        if (sort) {
          const key = sort.replace(/^-/, "");
          const dir = sort.startsWith("-") ? -1 : 1;
          items = items.sort((a, b) => {
            const av = a[key] ?? "";
            const bv = b[key] ?? "";
            const ad = new Date(av);
            const bd = new Date(bv);
            const bothDates = !Number.isNaN(ad) && !Number.isNaN(bd);
            if (bothDates) return (ad - bd) * dir;
            if (av < bv) return -1 * dir;
            if (av > bv) return 1 * dir;
            return 0;
          });
          if (sort.startsWith("-")) items.reverse();
        }
        return items;
      },
  
      async create(data) {
        const items = read();
        const normalised = { ...data };
        // normalise date fields by schema
        for (const [k, prop] of Object.entries(schema?.properties || {})) {
          if (prop.format === "date" && normalised[k]) {
            normalised[k] = ensureISODate(normalised[k]);
          }
        }
        const withDefaults = applyDefaults(normalised, schema);
        basicValidate(withDefaults, schema);
        const item = { id: crypto.randomUUID(), ...withDefaults };
        items.push(item);
        write(items);
        return item;
      },
  
      async update(id, patch) {
        const items = read();
        const i = items.findIndex((x) => x.id === id);
        if (i === -1) throw new Error(`${entityName} not found`);
        const next = { ...items[i], ...patch };
        for (const [k, prop] of Object.entries(schema?.properties || {})) {
          if (prop.format === "date" && next[k]) {
            next[k] = ensureISODate(next[k]);
          }
        }
        basicValidate(next, schema);
        items[i] = next;
        write(items);
        return next;
      },
  
      async remove(id) {
        write(read().filter((x) => x.id !== id));
      },
    };
  }
  